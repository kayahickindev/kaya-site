"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import type { HeroMode } from "./hero/HeroScene";
import { heroPoster } from "@/data/assets";

// The opening screen: a still of the scene is painted first and a live WebGL
// valley takes over once the page has finished loading and the main thread is
// idle, so the name and the fonts never queue behind a renderer. Reduced
// motion, no WebGL and no JavaScript all stay on the still.
const HeroScene = dynamic(() => import("./hero/HeroScene"), { ssr: false });

/** The moment the CSS fallback has already shown the type. It has to match the
 *  animation delay on the `.hero-name` rule in globals.css. */
const INTRO_DEADLINE_MS = 1200;

function readMode(): HeroMode {
  const q = new URLSearchParams(window.location.search);
  const t = q.get("t");
  return {
    poster: q.get("poster") === "1",
    at: t === null ? null : Number.parseFloat(t),
    perf: q.get("perf") === "1",
    phone: window.matchMedia("(max-width: 760px)").matches,
    portrait: window.innerHeight > window.innerWidth,
  };
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function HeroStage() {
  const [mode, setMode] = useState<HeroMode | null>(null);

  // The scene only starts downloading after load and an idle slot.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!hasWebGL()) return;
    let cancelled = false;
    let idle = 0;
    const mount = () => {
      if (!cancelled) setMode(readMode());
    };
    const schedule = () => {
      if (cancelled) return;
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(mount, { timeout: 1500 })
        : window.setTimeout(mount, 240);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle);
    };
  }, []);

  // The type has its own timeline: it must not wait for a renderer to arrive,
  // and it has to run even where the scene never will.
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".hero");
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const capture = new URLSearchParams(window.location.search);
    if (capture.get("poster") === "1") {
      section.dataset.intro = "capture";
      return;
    }
    if (capture.has("t")) {
      section.dataset.intro = "off";
      return;
    }
    const name = section.querySelector<HTMLElement>(".hero-name");
    const line = section.querySelector<HTMLElement>(".hero-line");
    const proof = section.querySelectorAll<HTMLElement>(".proof li");
    const button = section.querySelector<HTMLElement>(".btn-light");
    if (!name) return;

    let split: InstanceType<typeof SplitText> | null = null;
    const rest = [line, ...proof, button].filter(Boolean) as HTMLElement[];
    // Past the CSS deadline the type is already painted and is already the
    // page's largest contentful paint. Running the intro now would hide it
    // again, and wrapping the h1 in SplitText's spans re-emits a later LCP
    // candidate on top of that: on a throttled phone the pair cost a whole
    // second and thirty Lighthouse points. So late hydration leaves the
    // server-rendered type exactly where it is and takes the parallax only.
    const late = performance.now() > INTRO_DEADLINE_MS;
    const ctx = gsap.context(() => {
      section.dataset.intro = late ? "off" : "on";
      if (!late) {
        split = new SplitText(name, { type: "chars,lines", mask: "lines" });
        // The intro moves the type in percentages and the parallax moves it in
        // pixels, so the two never write the same transform channel.
        gsap.set(name, { opacity: 1 });
        gsap.set(rest, { opacity: 0, yPercent: 45 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(split.chars, { yPercent: 118, duration: 0.9, stagger: 0.022 }, 0.6)
          .to(line, { opacity: 1, yPercent: 0, duration: 0.75 }, 1.2)
          .to(proof, { opacity: 1, yPercent: 0, duration: 0.75, stagger: 0.09 }, 1.35)
          .to(button, { opacity: 1, yPercent: 0, duration: 0.6 }, 1.65);
      }

      // Depth: the name hangs back furthest and the button leaves soonest. The
      // spread between neighbours stays under the leading, so nothing in the
      // block ever runs into the line beneath it.
      const lag = (factor: number) => ({
        y: () => section.offsetHeight * (1 - factor),
        ease: "none" as const,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(name, lag(0.72));
      gsap.to(line, lag(0.76));
      gsap.to(proof, lag(0.82));
      gsap.to(button, lag(0.86));
      gsap.to(section.querySelector(".hero-content"), {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "55% top",
          scrub: 0.6,
        },
      });
    }, section);

    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      split?.revert();
      delete section.dataset.intro;
    };
  }, []);

  return (
    <div className="hero-stage" aria-hidden>
      <Image
        className="hero-poster"
        src={heroPoster.src}
        alt=""
        fill
        preload
        sizes="100vw"
        quality={85}
      />
      {mode && <HeroScene mode={mode} />}
    </div>
  );
}
