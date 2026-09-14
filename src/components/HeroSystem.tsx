"use client";
import { useEffect, useRef } from "react";

// The opening visual: Kaya's product architecture as one slowly turning system.
// The backend sits at the hub; iOS, the voice AI, Android, the app's AI model
// (OpenAI and Claude) and the web app ride a tilted orbit around it. Packets travel the links as soft
// comets and flare the node they reach; the voice node breathes; a faint drift
// of dust gives depth. Canvas 2D, DPR-aware, paced by the clock rather than the
// frame rate so it keeps time on a slow machine, paused when the tab is hidden,
// one still frame under reduced motion. Without JavaScript the CSS glow stands in.

type Node = { id: string; label: string; sub: string; a: number };

const HUB = { id: "backend", label: "Backend", sub: "Firebase · Node" };
const RING: Node[] = [
  { id: "ios", label: "iOS", sub: "Swift · SwiftUI", a: 0 },
  { id: "voice", label: "Voice AI", sub: "WebRTC · OpenAI", a: 72 },
  { id: "android", label: "Android", sub: "React Native", a: 144 },
  { id: "model", label: "Model", sub: "OpenAI · Claude", a: 216 },
  { id: "web", label: "Web", sub: "Next.js", a: 288 },
];
const EDGES: [string, string][] = [
  ...RING.map((n) => [HUB.id, n.id] as [string, string]),
  ["ios", "voice"],
  ["android", "voice"],
];
const BG = "#0a0e13";
const ACCENT = [127, 215, 223] as const;
const WHITE = [255, 255, 255] as const;
const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
const smooth = (t: number) => t * t * (3 - 2 * t);
const TURN = 0.00011; // radians per ms, one revolution in about 57s

type P = { x: number; y: number; s: number; near: number };

export function HeroSystem() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() ||
      "ui-monospace, monospace";
    const font = (px: number, weight = 400) => `${weight} ${px}px ${mono}`;
    const hero = canvas.parentElement;

    let w = 0;
    let h = 0;
    let mobile = false;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let raf = 0;
    let running = true;
    const t0 = performance.now();
    let last = 0;
    let time = 0;

    // Deterministic dust field.
    const dust = Array.from({ length: 64 }, (_, i) => {
      const s = Math.sin(i * 12.9898) * 43758.5453;
      const r = (k: number) => (((s * (k + 1)) % 1) + 1) % 1;
      return { x: r(1), y: r(2), z: 0.3 + r(3) * 0.7, v: 0.004 + r(4) * 0.008 };
    });
    // Packet schedule: each link fires every 3.4 to 5.6s at its own offset.
    const links = EDGES.map((_, i) => ({
      period: 3400 + ((i * 613) % 2200),
      offset: (i * 1471) % 3000,
      travel: 1400,
      back: i % 3 === 1,
    }));
    const flare: Record<string, number> = {};

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      mobile = w < 760;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Measure the copy so the system never runs into it: the top bar above,
      // the proof row below, the name to the left.
      const box = (sel: string) => hero?.querySelector(sel)?.getBoundingClientRect();
      const content = box(".hero-content");
      const navBottom = (box(".hero-top")?.bottom ?? rect.top + 76) - rect.top;
      const contentTop = (content?.top ?? rect.bottom) - rect.top;
      const proofTop = (box(".proof")?.top ?? contentTop) - rect.top;
      const name = hero?.querySelector(".hero-name");
      let nameRight = 0;
      if (name) {
        const range = document.createRange();
        range.selectNodeContents(name);
        nameRight = range.getBoundingClientRect().right - rect.left;
      }
      const gutter = content ? content.left - rect.left : 20;
      const labelW = mobile ? 62 : 126; // widest label block plus its gap
      const labelH = mobile ? 26 : 46;
      const nodeR = 9;
      if (mobile || h > w) {
        // Portrait: the system sits in the band between the top bar and the name.
        const free = Math.max(160, contentTop - 16 - navBottom);
        R = Math.min(w * (mobile ? 0.28 : 0.3), (free - 2 * labelH) / 1.16, w / 2 - gutter - nodeR - labelW);
        cx = w * 0.5;
        cy = navBottom + (free - (R * 1.16 + 2 * labelH)) / 2 + labelH + R * 0.44;
      } else {
        // Landscape: the system fills the space to the right of the name and
        // above the proof row.
        const left = nameRight + 28 + labelW + nodeR;
        const right = w - gutter - labelW - nodeR;
        R = Math.min(w * 0.205, h * 0.33, 310, (proofTop - navBottom - 24 - 2 * labelH) / 1.16, (right - left) / 2);
        cx = (left + right) / 2;
        cy = (navBottom + proofTop) / 2 - R * 0.14;
      }
    };

    // Rotate the ring around its axis, tilt it toward the viewer, project with
    // perspective. `near` is 1 at the front of the orbit and 0 at the back.
    const tiltAt = (t: number) => 0.55 + (reduced ? 0 : Math.sin(t * 0.00045) * 0.035);
    const project = (a: number, t: number): P => {
      const tilt = tiltAt(t);
      const x = Math.cos(a) * R;
      const z = Math.sin(a) * R;
      const y2 = -z * Math.sin(tilt);
      const z2 = z * Math.cos(tilt);
      const f = R * 3.6;
      const s = f / (f + z2);
      return { x: cx + x * s, y: cy + y2 * s, s, near: 0.5 - z2 / (2 * R * Math.cos(tilt)) };
    };

    const line = (a: P, b: P, alphaA: number, alphaB: number, width = 1) => {
      const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      g.addColorStop(0, rgba(WHITE, alphaA));
      g.addColorStop(1, rgba(WHITE, alphaB));
      ctx.strokeStyle = g;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };

    type Label = { label: string; sub: string; p: P; rr: number; hub: boolean };

    const drawLabel = ({ label, sub, p, rr, hub }: Label) => {
      const big = mobile ? 11 : 13;
      const small = mobile ? 0 : 11;
      ctx.font = font(big, 500);
      const wl = ctx.measureText(label).width;
      let ws = 0;
      if (small) {
        ctx.font = font(small);
        ws = ctx.measureText(sub).width;
      }
      const bw = Math.max(wl, ws);
      const bh = small ? big + small + 5 : big;
      const gap = mobile ? 10 : 14;
      // Labels sit on the outward normal of the orbit, sliding continuously from
      // "beside" at the sides to "above" and "below" at the far and near points.
      let dx = 1;
      let dy = 0;
      if (!hub) {
        const ang = Math.atan2(p.y - cy, p.x - cx);
        dx = Math.cos(ang);
        dy = Math.sin(ang);
      }
      const bx = p.x + dx * (rr + gap + bw / 2) - bw / 2;
      const by = p.y + dy * (rr + gap + bh / 2) - bh / 2;
      const alignFrac = hub ? 0 : (1 - dx) / 2;
      const alpha = 0.55 + p.near * 0.4;
      // Clear the canvas under the whole label block so links never cross the
      // words, then set the text.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = BG;
      ctx.fillRect(bx - 4, by - 3, bw + 8, bh + 6);
      ctx.globalCompositeOperation = "source-over";
      const draw = (text: string, px: number, weight: number, width: number, baseline: number, a: number) => {
        ctx.font = font(px, weight);
        ctx.fillStyle = rgba(WHITE, a);
        ctx.fillText(text, bx + alignFrac * (bw - width), baseline);
      };
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      draw(label, big, 500, wl, by + big * 0.78, alpha);
      if (small) draw(sub, small, 400, ws, by + big + 5 + small * 0.78, alpha * 0.6);
    };

    const drawNode = (p: P, rr: number, accent: boolean, f: number, hub: boolean) => {
      const near = p.near;
      const c = accent ? ACCENT : WHITE;
      const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rr * 4);
      halo.addColorStop(0, rgba(c, (0.09 + f * 0.4) * (0.5 + near * 0.5)));
      halo.addColorStop(1, rgba(c, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = rgba(WHITE, 0.22 + near * 0.4 + f * 0.3);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
      ctx.stroke();
      if (hub) {
        ctx.setLineDash([1.5, 5]);
        ctx.lineDashOffset = -time * 0.006;
        ctx.strokeStyle = rgba(WHITE, 0.22);
        ctx.beginPath();
        ctx.arc(p.x, p.y, rr * 1.55, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      const breath = accent && !reduced ? 1 + 0.12 * Math.sin(time * 0.0025) : 1;
      ctx.fillStyle = accent ? rgba(ACCENT, 0.75 + near * 0.25) : rgba(WHITE, 0.6 + near * 0.4);
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr * 0.36 * breath + f * 1.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      const theta = reduced ? 0.7 : time * TURN;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";

      // Dust, drifting upward, brighter when closer.
      const dt = Math.min(100, time - last);
      last = time;
      const count = mobile ? 36 : dust.length;
      for (let i = 0; i < count; i++) {
        const d = dust[i];
        if (!reduced) d.y -= (dt / 1000) * d.v;
        if (d.y < -0.02) d.y += 1.04;
        ctx.fillStyle = rgba(WHITE, 0.06 + d.z * 0.24);
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, 0.5 + d.z * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      const P: Record<string, P> = { [HUB.id]: { x: cx, y: cy, s: 1, near: 0.5 } };
      for (const n of RING) P[n.id] = project((n.a * Math.PI) / 180 + theta, time);

      // The orbit itself: one thin ellipse, dimmer along its far half.
      const steps = 96;
      let prev = project(0, time);
      for (let i = 1; i <= steps; i++) {
        const q = project((i / steps) * Math.PI * 2, time);
        line(prev, q, 0.04 + prev.near * 0.1, 0.04 + q.near * 0.1);
        prev = q;
      }

      // Links: spokes to the hub, two chords between the clients and the voice AI.
      EDGES.forEach(([a, b], i) => {
        const pa = P[a];
        const pb = P[b];
        const k = i < RING.length ? 0.28 : 0.16;
        line(pa, pb, k * (0.45 + pa.near * 0.55), k * (0.45 + pb.near * 0.55));
      });

      // Packets: comets with a fading tail, eased along the link.
      EDGES.forEach(([a, b], i) => {
        const L = links[i];
        const phase = (time + L.offset) % L.period;
        if (phase > L.travel) return;
        const raw = phase / L.travel;
        const t = smooth(raw);
        const from = L.back ? P[b] : P[a];
        const to = L.back ? P[a] : P[b];
        const at = (k: number) => ({ x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k });
        const head = at(t);
        const tail = at(Math.max(0, t - 0.2));
        const g = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        g.addColorStop(0, rgba(ACCENT, 0));
        g.addColorStop(1, rgba(ACCENT, 0.85));
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.stroke();
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 7);
        glow.addColorStop(0, rgba(ACCENT, 0.95));
        glow.addColorStop(0.35, rgba(ACCENT, 0.35));
        glow.addColorStop(1, rgba(ACCENT, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 7, 0, Math.PI * 2);
        ctx.fill();
        if (raw > 0.97) flare[L.back ? a : b] = time;
      });

      // Voice pulse: two soft rings breathing out of the voice node.
      const vp = P.voice;
      for (let k = 0; k < 2; k++) {
        const ph = ((time + k * 1800) % 3600) / 3600;
        const e = 1 - (1 - ph) * (1 - ph);
        const radius = 8 + e * (mobile ? 40 : 60) * vp.s;
        ctx.strokeStyle = rgba(ACCENT, 0.36 * (1 - ph) * (0.45 + vp.near * 0.55));
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(vp.x, vp.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Nodes, far to near, then every label on top.
      const base = mobile ? 6 : 7;
      const labels: Label[] = [];
      const order = [...RING.map((n) => ({ ...n, hub: false })), { ...HUB, a: 0, hub: true }].sort(
        (m, n) => P[m.id].near - P[n.id].near,
      );
      for (const n of order) {
        const p = P[n.id];
        const rr = (n.hub ? base + 4 : base) * p.s;
        const f = flare[n.id] ? Math.exp(-(time - flare[n.id]) / 550) : 0;
        drawNode(p, rr, n.id === "voice", f, n.hub);
        labels.push({ label: n.label, sub: n.sub, p, rr: n.hub ? rr * 1.55 : rr, hub: n.hub });
      }
      for (const l of labels) drawLabel(l);
    };

    const loop = (now: number) => {
      if (!running) return;
      time = now - t0;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    const still = () => {
      time = 2600;
      last = time;
      draw();
    };
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) still();
    });
    ro.observe(canvas);
    if (reduced) {
      still();
      document.fonts?.ready.then(still);
    } else {
      raf = requestAnimationFrame(loop);
    }
    const onVis = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return <canvas ref={ref} className="hero-system" aria-hidden />;
}
