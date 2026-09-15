"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CustomEase } from "gsap/CustomEase";

// The server renders the finished value, so no-JS and reduced-motion visitors
// read the real number straight away. With scripting the number counts inside
// its own display unit the first time it scrolls into view: "66K+" counts 0 to
// 66 and keeps the suffix, "4.7" keeps its single decimal, so the format never
// jumps and the figures stay tabular.

let siteEase: string | undefined;
function ease() {
  if (!siteEase) {
    gsap.registerPlugin(CustomEase);
    // The --ease token, cubic-bezier(0.2, 0.6, 0.2, 1), as a GSAP curve.
    CustomEase.create("kh-site", "M0,0 C0.2,0.6 0.2,1 1,1");
    siteEase = "kh-site";
  }
  return siteEase;
}

export function NumberTicker({ display }: { display: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const parts = display.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
    if (!parts) return;
    const [, prefix, num, suffix] = parts;
    const target = Number(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] ?? "").length;
    const fmt = (n: number) =>
      n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const count = { value: 0 };
    const tween = gsap.to(count, {
      value: target,
      duration: 0.9,
      ease: ease(),
      paused: true,
      onUpdate: () => {
        el.textContent = `${prefix}${fmt(count.value)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = display;
      },
    });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => tween.play(),
    });
    return () => {
      trigger.kill();
      tween.kill();
      el.textContent = display;
    };
  }, [display]);
  return (
    <span className="ticker" ref={ref}>
      {display}
    </span>
  );
}
