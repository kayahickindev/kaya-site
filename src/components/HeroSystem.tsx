"use client";
import { useEffect, useRef } from "react";

// The opening visual: Kaya's real product architecture as a living system.
// Six services exchange traffic over a drifting perspective grid while a
// build-and-deploy stream scrolls beside them. Canvas 2D, DPR-aware, pauses
// when the tab is hidden, and draws a single still frame under reduced motion.
// Without JavaScript the CSS background (grid + glow) stands in.

type NodeDef = { id: string; label: string; sub: string; d: [number, number]; m: [number, number] };

const NODES: NodeDef[] = [
  { id: "ios", label: "iOS", sub: "Swift · SwiftUI", d: [0.44, 0.3], m: [0.14, 0.12] },
  { id: "android", label: "Android", sub: "React Native", d: [0.44, 0.68], m: [0.14, 0.42] },
  { id: "web", label: "Web", sub: "Next.js", d: [0.6, 0.18], m: [0.5, 0.07] },
  { id: "backend", label: "Backend", sub: "Firebase · Node", d: [0.6, 0.5], m: [0.5, 0.3] },
  { id: "voice", label: "Voice AI", sub: "WebRTC · OpenAI", d: [0.72, 0.34], m: [0.84, 0.16] },
  { id: "model", label: "Model", sub: "Dog AI", d: [0.72, 0.66], m: [0.84, 0.42] },
];
const EDGES: [string, string][] = [
  ["ios", "backend"],
  ["android", "backend"],
  ["web", "backend"],
  ["backend", "voice"],
  ["ios", "voice"],
  ["backend", "model"],
  ["android", "voice"],
];
const LOG = [
  "$ git push origin main",
  "▲ next build · compiled",
  "$ xcodebuild archive · MyFutureSelf",
  "$ eas build --platform android",
  "$ firebase deploy --only functions",
  "POST /realtime/sessions → 201",
  "webrtc · peer connected",
  "voice · future self on the line",
  "$ claude › 14 files changed",
  "$ codex › tests green",
  "posthog · event captured",
  "model · mood scored in 0.3s",
];

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
    const accent = [116, 208, 216];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let mobile = false;
    let raf = 0;
    let running = true;
    const packets = EDGES.map((_, i) => ({
      t: (i * 0.37) % 1,
      speed: 0.07 + ((i * 7919) % 5) * 0.012,
      back: i % 3 === 0,
    }));
    const logs: { text: string; y: number }[] = [];
    let nextLog = 0;
    let last = performance.now();
    let elapsed = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      mobile = w < 760;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      logs.length = 0;
      const lineH = 24;
      const count = Math.ceil(h / lineH) + 2;
      for (let i = 0; i < count; i++) {
        logs.push({ text: LOG[(nextLog++) % LOG.length], y: h - i * lineH });
      }
    };

    const pos = (n: NodeDef): [number, number] => {
      const p = mobile ? n.m : n.d;
      return [p[0] * w, p[1] * h];
    };

    const draw = (dt: number) => {
      elapsed += dt;
      ctx.clearRect(0, 0, w, h);

      // Perspective floor grid drifting toward the viewer.
      const horizon = h * (mobile ? 0.62 : 0.56);
      ctx.strokeStyle = `rgba(${accent.join(",")},0.11)`;
      ctx.lineWidth = 1;
      const vx = w * (mobile ? 0.5 : 0.62);
      for (let i = -12; i <= 12; i++) {
        ctx.beginPath();
        ctx.moveTo(vx, horizon);
        ctx.lineTo(vx + i * w * 0.16, h + 40);
        ctx.stroke();
      }
      const rows = 14;
      const drift = (elapsed * 0.00012) % (1 / rows);
      for (let r = 0; r < rows; r++) {
        const k = r / rows + drift;
        const y = horizon + (h - horizon) * k * k;
        ctx.globalAlpha = 0.35 + k * 0.65;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Log stream (desktop only).
      if (!mobile) {
        const speed = 0.014;
        const lineH = 24;
        for (const l of logs) l.y -= dt * speed;
        while (logs.length && logs[0].y < -lineH) {
          logs.shift();
          const bottom = logs[logs.length - 1]?.y ?? h;
          logs.push({ text: LOG[(nextLog++) % LOG.length], y: bottom + lineH });
        }
        ctx.font = font(11);
        ctx.textAlign = "right";
        for (const l of logs) {
          const fade = Math.min(1, l.y / (h * 0.25), (h - l.y) / (h * 0.25));
          if (fade <= 0) continue;
          ctx.fillStyle = `rgba(200,225,230,${(0.38 * fade).toFixed(3)})`;
          ctx.fillText(l.text, w - 28, l.y);
        }
        ctx.textAlign = "left";
      }

      // Edges.
      const P = Object.fromEntries(NODES.map((n) => [n.id, pos(n)])) as Record<string, [number, number]>;
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.lineWidth = 1;
      for (const [a, b] of EDGES) {
        ctx.beginPath();
        ctx.moveTo(...P[a]);
        ctx.lineTo(...P[b]);
        ctx.stroke();
      }

      // Packets travelling along edges.
      EDGES.forEach(([a, b], i) => {
        const pk = packets[i];
        pk.t += dt * 0.001 * pk.speed;
        if (pk.t > 1) pk.t -= 1;
        const t = pk.back ? 1 - pk.t : pk.t;
        const [ax, ay] = P[a];
        const [bx, by] = P[b];
        const x = ax + (bx - ax) * t;
        const y = ay + (by - ay) * t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
        g.addColorStop(0, `rgba(${accent.join(",")},0.95)`);
        g.addColorStop(1, `rgba(${accent.join(",")},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      // Voice pulse: a ring every four seconds from the voice node.
      const [vxp, vyp] = P.voice;
      const phase = (elapsed % 4000) / 4000;
      ctx.strokeStyle = `rgba(${accent.join(",")},${(0.5 * (1 - phase)).toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(vxp, vyp, 12 + phase * (mobile ? 70 : 110), 0, Math.PI * 2);
      ctx.stroke();

      // Nodes.
      for (const n of NODES) {
        const [x, y] = P[n.id];
        const pulse = 0.5 + 0.5 * Math.sin(elapsed * 0.002 + x * 0.01);
        ctx.strokeStyle = `rgba(255,255,255,${(0.25 + pulse * 0.25).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, mobile ? 14 : 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#0b0f14";
        ctx.beginPath();
        ctx.arc(x, y, mobile ? 13 : 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = n.id === "voice" ? `rgb(${accent.join(",")})` : "#fff";
        ctx.beginPath();
        ctx.arc(x, y, mobile ? 3.5 : 4.5, 0, Math.PI * 2);
        ctx.fill();
        const flip = x > w * 0.66;
        ctx.textAlign = flip ? "right" : "left";
        const lx = flip ? x - 20 : x + (mobile ? 20 : 26);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.font = font(mobile ? 12 : 13, 500);
        ctx.fillText(n.label, lx, y + 1);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = font(mobile ? 10 : 11);
        ctx.fillText(n.sub, lx, y + (mobile ? 14 : 16));
        ctx.textAlign = "left";
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(50, now - last);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(canvas);
    if (reduced) {
      elapsed = 1800;
      draw(0);
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
        last = performance.now();
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
