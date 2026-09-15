"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { home, pins } from "@/data/geo";

// The World chapter as a globe. The sphere is a Fibonacci lattice of points;
// each point asks the site's own generated map what is there, so the land, the
// fifteen visited countries and the home country carry the same colours as the
// flat map and come from the same Natural Earth data. Photo pins and home sit
// on top as markers. It turns slowly, follows a drag with damping, and stops
// when it is off screen or the tab is hidden. It is drawn on a 2D canvas at
// device pixel ratio 2, so it reads the same on every machine. Without
// scripting, or if the map cannot be read, the map images stand in.
//
// cobe was the first plan and is out: its sphere shader samples no land in
// current Chrome, in software and on the GPU, in 2.0.1 and in 0.6.5.

const photos = [
  { src: "/pins/tekapo.webp", label: "Lake Tekapo" },
  { src: "/pins/merzouga.webp", label: "Merzouga" },
  { src: "/pins/kilauea.webp", label: "Kīlauea" },
  { src: "/pins/stockholm.webp", label: "Stockholm" },
];

// Natural Earth (Patterson and Savric), the projection tools/build-world-map.py
// draws with. The pixel fit is a least squares solve over the ten pins in
// src/generated/world-map.json, which the same projection placed: it lands
// every one of them inside a twentieth of a pixel.
const MAP_W = 1000;
const MAP_H = 444;
const PX_SCALE = 182.04607;
const PX_X0 = 499.99706;
const PX_Y0 = 259.00715;

function project(lat: number, lng: number) {
  const lam = (lng * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const p2 = phi * phi;
  const p4 = p2 * p2;
  const p6 = p4 * p2;
  const p8 = p4 * p4;
  const p10 = p8 * p2;
  const p12 = p10 * p2;
  const x = lam * (0.8707 - 0.131979 * p2 - 0.013791 * p4 + 0.003971 * p10 - 0.001529 * p12);
  const y = phi * (1.007226 + 0.015085 * p2 - 0.044475 * p6 + 0.028874 * p8 - 0.005916 * p10);
  return { x: PX_SCALE * x + PX_X0, y: PX_Y0 - PX_SCALE * y };
}

// The three fills the map is baked with (tools/bake-world-map.py, light theme).
const FILLS: [number, number, number][] = [
  [235, 234, 227], // land
  [11, 117, 128], // visited
  [77, 81, 76], // the home country
];

type Dot = { x: number; y: number; z: number; kind: number };
type Palette = { land: string; visited: string; home: string; ocean: string; rim: string };

const LATTICE = 14000;

function readLand(image: HTMLImageElement): Dot[] {
  const sheet = document.createElement("canvas");
  sheet.width = MAP_W;
  sheet.height = MAP_H;
  const ctx = sheet.getContext("2d");
  if (!ctx) return [];
  ctx.drawImage(image, 0, 0, MAP_W, MAP_H);
  const { data } = ctx.getImageData(0, 0, MAP_W, MAP_H);
  const dots: Dot[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < LATTICE; i++) {
    const y = 1 - (2 * i + 1) / LATTICE;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const turn = i * golden;
    const x = Math.cos(turn) * ring;
    const z = Math.sin(turn) * ring;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lng = (Math.atan2(z, x) * 180) / Math.PI;
    const at = project(lat, lng);
    const px = Math.round(at.x);
    const py = Math.round(at.y);
    if (px < 0 || py < 0 || px >= MAP_W || py >= MAP_H) continue;
    const o = (py * MAP_W + px) * 4;
    if (data[o + 3] < 128) continue;
    let kind = 0;
    let best = Infinity;
    for (let f = 0; f < FILLS.length; f++) {
      const gap =
        (data[o] - FILLS[f][0]) ** 2 + (data[o + 1] - FILLS[f][1]) ** 2 + (data[o + 2] - FILLS[f][2]) ** 2;
      if (gap < best) {
        best = gap;
        kind = f;
      }
    }
    dots.push({ x, y, z, kind });
  }
  return dots;
}

function token(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

// Phi is the longitude facing the viewer. At rest it is the Atlantic, so the
// Americas and Europe are both in frame before anything moves.
const START_PHI = (-40 * Math.PI) / 180;
const TILT = 0.36;

export function Globe() {
  const figureRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[] | null>(null);
  const paletteRef = useRef<Palette | null>(null);
  const phiRef = useRef(START_PHI);
  const spinRef = useRef(0);
  const spinTarget = useRef(0);
  const dragFrom = useRef<number | null>(null);
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  // next-themes writes the scheme as a class on <html>.
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setDark(root.classList.contains("dark"));
    read();
    const watcher = new MutationObserver(read);
    watcher.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => watcher.disconnect();
  }, []);

  // Read the map once, from the same file the fallback shows.
  useEffect(() => {
    let alive = true;
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      if (!alive) return;
      const dots = readLand(image);
      if (!dots.length) {
        figureRef.current?.setAttribute("data-globe", "failed");
        return;
      }
      dotsRef.current = dots;
      setReady(true);
    };
    image.onerror = () => figureRef.current?.setAttribute("data-globe", "failed");
    image.src = "/world/map-light.svg";
    return () => {
      alive = false;
    };
  }, []);

  // Draw only while the globe is on screen and the tab is in front.
  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    let onScreen = false;
    let visible = !document.hidden;
    const sync = () => setActive(onScreen && visible);
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        sync();
      },
      { rootMargin: "160px" },
    );
    io.observe(figure);
    const onVisibility = () => {
      visible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    paletteRef.current = {
      land: token("--ink-2", dark ? "#a9aea6" : "#4d514c"),
      visited: token("--accent", dark ? "#74d0d8" : "#0b7580"),
      home: token("--ink", dark ? "#f2f1eb" : "#121412"),
      ocean: token("--panel", dark ? "#171a18" : "#ebeae3"),
      rim: token("--line", dark ? "#2a2e2b" : "#d6d5cd"),
    };
  }, [dark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dots = dotsRef.current;
    if (!canvas || !ready || !active || !dots) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const marks = [
      ...pins
        .filter((p) => p.name !== home.name)
        .map((p) => ({ lat: p.lat, lng: p.lng, r: 4.2, home: false })),
      { lat: home.lat, lng: home.lng, r: 6.4, home: true },
    ].map((m) => {
      const phi = (m.lat * Math.PI) / 180;
      const lam = (m.lng * Math.PI) / 180;
      return {
        ...m,
        x: Math.cos(phi) * Math.cos(lam),
        y: Math.sin(phi),
        z: Math.cos(phi) * Math.sin(lam),
      };
    });

    let frame = 0;
    const draw = () => {
      const palette = paletteRef.current;
      const size = canvas.clientWidth;
      if (!palette || !size) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.round(size * dpr)) {
        canvas.width = Math.round(size * dpr);
        canvas.height = Math.round(size * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      if (dragFrom.current === null && !still) phiRef.current += 0.0026;
      spinRef.current += (spinTarget.current - spinRef.current) * 0.1;
      const phi = phiRef.current + spinRef.current;
      const cp = Math.cos(phi);
      const sp = Math.sin(phi);
      const ct = Math.cos(TILT);
      const st = Math.sin(TILT);
      const radius = size * 0.46;
      const cx = size / 2;
      const cy = size / 2;

      ctx.fillStyle = palette.ocean;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      const unit = radius / 300;
      const land = new Path2D();
      const visited = new Path2D();
      const homeland = new Path2D();
      const byKind = [land, visited, homeland];
      // Orthographic: east across the screen, the tilt tipping the north pole
      // toward the viewer, and the remaining axis pointing out of the screen.
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const east = d.z * cp - d.x * sp;
        const out = d.x * cp + d.z * sp;
        const up = d.y * ct - out * st;
        const depth = d.y * st + out * ct;
        if (depth <= 0.02) continue;
        const size2 = (d.kind === 0 ? 1.6 : 1.9) * unit * (0.5 + 0.5 * depth);
        const px = cx + east * radius;
        const py = cy - up * radius;
        const path = byKind[d.kind];
        path.moveTo(px + size2, py);
        path.arc(px, py, size2, 0, Math.PI * 2);
      }
      ctx.globalAlpha = 0.82;
      ctx.fillStyle = palette.land;
      ctx.fill(land);
      ctx.globalAlpha = 0.9;
      ctx.fill(homeland);
      ctx.globalAlpha = 1;
      ctx.fillStyle = palette.visited;
      ctx.fill(visited);

      for (const m of marks) {
        const east = m.z * cp - m.x * sp;
        const out = m.x * cp + m.z * sp;
        const up = m.y * ct - out * st;
        const depth = m.y * st + out * ct;
        if (depth <= 0.03) continue;
        const px = cx + east * radius;
        const py = cy - up * radius;
        const rad = m.r * unit * 2 * (0.7 + 0.3 * depth);
        ctx.beginPath();
        ctx.arc(px, py, rad + 1.8, 0, Math.PI * 2);
        ctx.fillStyle = palette.ocean;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fillStyle = m.home ? palette.home : palette.visited;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = palette.rim;
      ctx.lineWidth = 1;
      ctx.stroke();
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [ready, active]);

  const grab = (event: React.PointerEvent<HTMLCanvasElement>) => {
    dragFrom.current = event.clientX + spinTarget.current * 260;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.cursor = "grabbing";
  };
  const release = (event: React.PointerEvent<HTMLCanvasElement>) => {
    dragFrom.current = null;
    event.currentTarget.style.cursor = "grab";
  };
  const drag = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragFrom.current === null) return;
    spinTarget.current = (dragFrom.current - event.clientX) / 260;
  };

  return (
    <div className="globe-figure" ref={figureRef} data-ready={ready ? "true" : undefined}>
      <div className="globe-stage">
        <canvas
          className="globe-canvas"
          ref={canvasRef}
          onPointerDown={grab}
          onPointerUp={release}
          onPointerLeave={release}
          onPointerCancel={release}
          onPointerMove={drag}
          aria-hidden
        />
      </div>
      <div className="globe-fallback">
        <Image
          className="world-map world-map-light"
          src="/world/map-light.svg"
          alt="World map with the visited countries highlighted"
          width={MAP_W}
          height={MAP_H}
          unoptimized
          loading="lazy"
        />
        <Image
          className="world-map world-map-dark"
          src="/world/map-dark.svg"
          alt=""
          width={MAP_W}
          height={MAP_H}
          unoptimized
          loading="lazy"
        />
      </div>
      <ul className="globe-photos" aria-label="Photographs from the road">
        {photos.map((p) => (
          <li key={p.src}>
            <Image src={p.src} alt="" width={200} height={267} sizes="(max-width: 860px) 42vw, 200px" />
            <span>{p.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
