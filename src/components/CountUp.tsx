"use client";
import { useEffect, useRef } from "react";

// Renders the final display string on the server. When it scrolls into view
// the numeric part counts up in its own unit (66K+ counts 0 to 66, 4.7 counts
// with one decimal), so the format never jumps.
export function CountUp({ display }: { display: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const m = display.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
    if (!m) return;
    const [, prefix, num, suffix] = m;
    const target = Number(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] ?? "").length;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const fmt = (n: number) =>
        n.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${prefix}${fmt(target * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = display;
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [display]);
  return <span ref={ref}>{display}</span>;
}
