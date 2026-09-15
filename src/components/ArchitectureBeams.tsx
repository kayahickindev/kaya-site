"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// The architecture as beams: four platforms wired to one backend hub, the voice
// lane carrying traffic both ways. Paths are measured from the node elements
// themselves and remeasured on resize, so they stay attached at every width.
// The travelling gradient is the AnimatedBeam idea from Magic UI (MIT),
// reimplemented here: one linear gradient in user space per beam, slid along
// the straight line between its ends by GSAP, started by ScrollTrigger and
// looping. Reduced motion keeps the beams, lit and still.

type Node = { key: string; name: string; tech: string[]; logos: string[] };

const hub: Node = { key: "backend", name: "Backend", tech: ["Firebase", "Node.js"], logos: ["Firebase", "Node.js"] };

// Swift and SwiftUI share one mark, and Expo has none, so those nodes show a
// single logo rather than the same icon twice or a letter in a box.
const spokes: Node[] = [
  { key: "ios", name: "iOS", tech: ["Swift", "SwiftUI"], logos: ["Swift"] },
  { key: "android", name: "Android", tech: ["React Native", "Expo"], logos: ["React Native"] },
  { key: "web", name: "Web", tech: ["Next.js", "TypeScript"], logos: ["Next.js", "TypeScript"] },
  { key: "voice", name: "Voice AI", tech: ["OpenAI Realtime", "WebRTC"], logos: ["OpenAI Realtime", "WebRTC"] },
];

// The voice lane is the one that answers back.
const twoWay = "voice";

type Point = { x: number; y: number };
type Beam = { key: string; d: string; from: Point; to: Point };

export function ArchitectureBeams() {
  const uid = useId().replace(/:/g, "");
  const hostRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const gradRefs = useRef<Record<string, SVGLinearGradientElement | null>>({});
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [beams, setBeams] = useState<Beam[]>([]);

  const measure = useCallback(() => {
    const host = hostRef.current;
    const hubEl = hubRef.current;
    if (!host || !hubEl) return;
    const frame = host.getBoundingClientRect();
    if (!frame.width) return;
    const rel = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { cx: r.left - frame.left + r.width / 2, cy: r.top - frame.top + r.height / 2, w: r.width, h: r.height };
    };
    const target = rel(hubEl);
    const next: Beam[] = [];
    for (const spoke of spokes) {
      const el = nodeRefs.current[spoke.key];
      if (!el) continue;
      const start = rel(el);
      const dx = target.cx - start.cx;
      const dy = target.cy - start.cy;
      const sideways = Math.abs(dx) > Math.abs(dy);
      let from: Point;
      let to: Point;
      let c1: Point;
      let c2: Point;
      if (sideways) {
        const way = Math.sign(dx) || 1;
        from = { x: start.cx + way * (start.w / 2 + 8), y: start.cy };
        to = { x: target.cx - way * (target.w / 2 + 8), y: target.cy };
        const bend = Math.abs(to.x - from.x) * 0.42;
        c1 = { x: from.x + way * bend, y: from.y };
        c2 = { x: to.x - way * bend, y: to.y };
      } else {
        const way = Math.sign(dy) || 1;
        from = { x: start.cx, y: start.cy + way * (start.h / 2 + 8) };
        to = { x: target.cx, y: target.cy - way * (target.h / 2 + 8) };
        const bend = Math.abs(to.y - from.y) * 0.42;
        c1 = { x: from.x, y: from.y + way * bend };
        c2 = { x: to.x, y: to.y - way * bend };
      }
      const d = `M${from.x.toFixed(1)},${from.y.toFixed(1)} C${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
      next.push({ key: spoke.key, d, from, to });
      if (spoke.key === twoWay) next.push({ key: `${spoke.key}-back`, d, from: to, to: from });
    }
    setBox({ w: frame.width, h: frame.height });
    setBeams(next);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(host);
    for (const el of Object.values(nodeRefs.current)) if (el) ro.observe(el);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    if (!beams.length) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const place = (el: SVGLinearGradientElement, beam: Beam, head: number, band: number) => {
      const len = Math.hypot(beam.to.x - beam.from.x, beam.to.y - beam.from.y) || 1;
      const ux = (beam.to.x - beam.from.x) / len;
      const uy = (beam.to.y - beam.from.y) / len;
      el.setAttribute("x1", String(beam.from.x + ux * head));
      el.setAttribute("y1", String(beam.from.y + uy * head));
      el.setAttribute("x2", String(beam.from.x + ux * (head + band)));
      el.setAttribute("y2", String(beam.from.y + uy * (head + band)));
    };
    const span = (beam: Beam) => {
      const len = Math.hypot(beam.to.x - beam.from.x, beam.to.y - beam.from.y) || 1;
      return { len, band: Math.max(90, len * 0.38) };
    };
    if (still) {
      beams.forEach((beam) => {
        const el = gradRefs.current[beam.key];
        if (!el) return;
        const { len, band } = span(beam);
        place(el, beam, (len - band) / 2, band);
      });
      return;
    }
    const tweens = beams.map((beam, i) => {
      const el = gradRefs.current[beam.key];
      if (!el) return null;
      const { len, band } = span(beam);
      const state = { head: -band };
      place(el, beam, state.head, band);
      return gsap.to(state, {
        head: len + band,
        duration: 2.1,
        ease: "none",
        repeat: -1,
        repeatDelay: 0.6,
        delay: (i % 4) * 0.45,
        paused: true,
        onUpdate: () => place(el, beam, state.head, band),
      });
    });
    const trigger = ScrollTrigger.create({
      trigger: hostRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => tweens.forEach((t) => t?.play()),
    });
    return () => {
      trigger.kill();
      tweens.forEach((t) => t?.kill());
    };
  }, [beams]);

  const card = (node: Node, kind: "hub" | "spoke") => (
    <div
      className={`beam-node beam-${kind}`}
      data-node={node.key}
      ref={(el) => {
        if (kind === "hub") hubRef.current = el;
        else nodeRefs.current[node.key] = el;
      }}
    >
      <span className="beam-logos">
        {node.logos.map((logo) => (
          <BrandLogo key={logo} name={logo} size={kind === "hub" ? 26 : 22} />
        ))}
      </span>
      <strong>{node.name}</strong>
      <span className="beam-tech">{node.tech.join(" · ")}</span>
    </div>
  );

  return (
    <div className="beams-wrap">
      <div className="beams" ref={hostRef} aria-hidden>
        <svg className="beams-svg" width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`} fill="none">
          <defs>
            {beams.map((beam) => (
              <linearGradient
                key={beam.key}
                id={`${uid}-${beam.key}`}
                className="beam-gradient"
                gradientUnits="userSpaceOnUse"
                ref={(el) => {
                  gradRefs.current[beam.key] = el;
                }}
              >
                <stop offset="0" stopOpacity="0" />
                <stop offset="0.5" stopOpacity="1" />
                <stop offset="1" stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {beams.map((beam) => (
            <path key={`rail-${beam.key}`} className="beam-rail" d={beam.d} />
          ))}
          {beams.map((beam) => (
            <path key={`flow-${beam.key}`} className="beam-flow" d={beam.d} stroke={`url(#${uid}-${beam.key})`} />
          ))}
        </svg>
        {card(spokes[0], "spoke")}
        {card(spokes[1], "spoke")}
        {card(hub, "hub")}
        {card(spokes[2], "spoke")}
        {card(spokes[3], "spoke")}
      </div>
      <ol className="sr-only" aria-label="The architecture I build">
        <li>
          {hub.name}: {hub.tech.join(", ")}, the hub every platform talks to
        </li>
        {spokes.map((node) => (
          <li key={node.key}>
            {node.name}: {node.tech.join(", ")}
            {node.key === twoWay ? ", talking to the backend in both directions" : ""}
          </li>
        ))}
      </ol>
    </div>
  );
}
