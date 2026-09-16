"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FRAG, VERT } from "./shader";

export type HeroMode = {
  /** Capture mode: the settled frame, no type, no motion. */
  poster: boolean;
  /** Freeze the scene clock at this second, for deterministic captures. */
  at: number | null;
  /** Publish frame times on window.__heroPerf. */
  perf: boolean;
  /** Phones take a lower pixel ratio ceiling. */
  phone: boolean;
};

/** How long the field takes to open. Matches the CSS intro's feel without
 *  sharing its timeline: this one runs off the scene clock so a `?t=` capture
 *  replays it at the right moment. */
const INTRO_S = 1.6;
/** The second the poster is rendered at: far enough in that the drift has
 *  moved off its starting phase, so the still is the settled field. */
const POSTER_T = 24;

/**
 * The site's --ease, cubic-bezier(0.2, 0.6, 0.2, 1), solved rather than
 * approximated: the canvas intro and the CSS intro have to be the same curve
 * or the field and the type arrive on two different rhythms.
 */
function siteEase(x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bez = (t: number, a: number, b: number) => {
    const u = 1 - t;
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
  };
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    if (bez(mid, 0.2, 0.2) < x) lo = mid;
    else hi = mid;
  }
  return bez((lo + hi) / 2, 0.6, 1);
}

function build(gl: WebGL2RenderingContext) {
  const make = (type: number, src: string) => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };
  const vs = make(gl.VERTEX_SHADER, VERT);
  const fs = vs ? make(gl.FRAGMENT_SHADER, FRAG) : null;
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

export default function FieldScene({ mode }: { mode: HeroMode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const gl = cv.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: mode.phone ? "default" : "high-performance",
    });
    // No context and no program both leave the poster in place, which is the
    // same picture. Nothing here is allowed to blank the hero.
    if (!gl) return;
    const prog = build(gl);
    if (!prog) return;

    const u = {
      res: gl.getUniformLocation(prog, "uRes"),
      dpr: gl.getUniformLocation(prog, "uDpr"),
      time: gl.getUniformLocation(prog, "uTime"),
      intro: gl.getUniformLocation(prog, "uIntro"),
      scroll: gl.getUniformLocation(prog, "uScroll"),
      ptr: gl.getUniformLocation(prog, "uPtr"),
    };
    gl.useProgram(prog);

    const frozen = mode.poster || mode.at !== null;
    const cap = mode.phone ? 1.75 : 2;
    let dpr = 1;
    let clock = mode.poster ? POSTER_T : (mode.at ?? 0);
    let scroll = 0;
    // The pointer is chased rather than followed: the swell glides into place
    // and never snaps to a jump in the cursor.
    let ptrX = 0.5;
    let ptrY = 0.5;
    let aimX = 0.5;
    let aimY = 0.5;
    let power = 0;
    let aimPower = 0;
    let running = true;
    let raf = 0;
    let last = 0;
    const perf = { frames: 0, total: 0, worst: 0 };

    const draw = () => {
      gl.uniform2f(u.res, cv.width, cv.height);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.time, clock);
      gl.uniform1f(u.intro, siteEase(clock / INTRO_S));
      gl.uniform1f(u.scroll, scroll);
      gl.uniform3f(u.ptr, ptrX, 1 - ptrY, power);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, cap);
      const w = Math.max(1, Math.round(el.clientWidth * dpr));
      const h = Math.max(1, Math.round(el.clientHeight * dpr));
      if (cv.width === w && cv.height === h) return;
      cv.width = w;
      cv.height = h;
      gl.viewport(0, 0, w, h);
      if (frozen) draw();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      if (last && mode.perf) {
        const ms = now - last;
        perf.frames += 1;
        perf.total += ms;
        perf.worst = Math.max(perf.worst, ms);
        (window as { __heroPerf?: unknown }).__heroPerf = {
          frames: perf.frames,
          avgMs: +(perf.total / perf.frames).toFixed(2),
          worstMs: +perf.worst.toFixed(2),
          dpr,
          width: cv.width,
        };
      }
      last = now;
      clock += dt;
      ptrX += (aimX - ptrX) * 0.05;
      ptrY += (aimY - ptrY) * 0.05;
      power += (aimPower - power) * 0.05;
      draw();
    };
    // A stopped loop resets its clock reference, so the frame after a hidden
    // tab or a scrolled past hero never advances the scene by the whole gap.
    const sync = () => {
      const live = running && !document.hidden;
      if (live && !raf) {
        last = 0;
        raf = requestAnimationFrame(step);
      } else if (!live && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    if (frozen) {
      el.style.opacity = "1";
      draw();
    } else {
      sync();
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" });
    }

    const section = document.querySelector<HTMLElement>(".hero");
    let onMove: ((e: PointerEvent) => void) | null = null;
    let ctx: gsap.Context | null = null;

    if (!frozen) {
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        onMove = (e) => {
          aimX = e.clientX / window.innerWidth;
          aimY = e.clientY / window.innerHeight;
          aimPower = 1;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
      }
      document.addEventListener("visibilitychange", sync);

      if (section) {
        const proxy = { p: 0 };
        ctx = gsap.context(() => {
          gsap.to(proxy, {
            p: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
              onUpdate: () => {
                scroll = proxy.p;
              },
            },
            onUpdate: () => {
              scroll = proxy.p;
            },
          });
          // The last forty percent of the exit takes the canvas out entirely,
          // so the band below arrives against flat ground rather than a field
          // still dissolving under it.
          gsap.to(el, {
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: section, start: "60% top", end: "bottom top", scrub: 0.6 },
          });
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            onLeave: () => {
              running = false;
              sync();
            },
            onEnterBack: () => {
              running = true;
              sync();
            },
          });
        });
      }
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      ctx?.revert();
      if (onMove) window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", sync);
      // The program goes back, the context does not: getContext on a canvas
      // whose context has been deliberately lost hands back the same dead
      // context, so forcing the loss here blanks the canvas on every remount,
      // which in development is every single mount.
      gl.deleteProgram(prog);
    };
  }, [mode]);

  return (
    <div className="hero-canvas" ref={wrap}>
      <canvas ref={canvas} />
    </div>
  );
}
