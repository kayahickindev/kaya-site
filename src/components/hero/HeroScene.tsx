"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, MathUtils, Vector3 } from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Sky } from "./Sky";
import { Terrain } from "./Terrain";
import { River } from "./River";
import { Towers, type TowerHandle } from "./Towers";
import { Crane, Drones, Monorail } from "./Traffic";
import { hero, resetHero } from "./state";
import { createCommonUniforms } from "./uniforms";
import {
  CAM_POS,
  CAM_TARGET,
  FOG_DENSITY,
  buildDroneCurves,
  buildRailCurve,
  buildTowers,
  craneAnchor,
} from "./world";

const Effects = dynamic(() => import("./Effects"), { ssr: false });

export type HeroMode = {
  /** Capture mode: no type, settled state, no motion. */
  poster: boolean;
  /** Freeze the scene clock at this second, for deterministic captures. */
  at: number | null;
  /** Publish frame times on window.__heroPerf. */
  perf: boolean;
  /** Phones drop the composer and a slice of the instances. */
  phone: boolean;
  /** Portrait needs its own, longer framing or the valley becomes a slit. */
  portrait: boolean;
};

const DEG = Math.PI / 180;

function Rig({ mode }: { mode: HeroMode }) {
  const { camera, size } = useThree();
  const offset = useMemo(() => new Vector3(), []);
  const target = useMemo(() => new Vector3(), []);
  const base = useMemo(
    () =>
      mode.portrait
        ? { pos: new Vector3(-10, 118, 250), look: new Vector3(196, 6, -520), fov: 56 }
        : { pos: CAM_POS.clone(), look: CAM_TARGET.clone(), fov: 38 },
    [mode.portrait],
  );

  useEffect(() => {
    const cam = camera as import("three").PerspectiveCamera;
    cam.fov = base.fov;
    cam.near = 2;
    cam.far = 3400;
    cam.updateProjectionMatrix();
  }, [camera, base, size]);

  useFrame(() => {
    const t = hero.time;
    // Idle: a slow orbit with a breathing dolly, small enough to read as air
    // moving rather than as a camera move.
    const orbit = Math.sin((t * Math.PI * 2) / 20) * 3 * DEG;
    const breathe = Math.sin((t * Math.PI * 2) / 26) * 0.035;
    const yaw = orbit + hero.pointerX * 4 * DEG;
    const pitch = Math.sin((t * Math.PI * 2) / 31) * 1.1 * DEG - hero.pointerY * 4 * DEG;

    offset.copy(base.pos).sub(base.look);
    offset.applyAxisAngle(new Vector3(0, 1, 0), yaw);
    const right = new Vector3(offset.z, 0, -offset.x).normalize();
    offset.applyAxisAngle(right, pitch);
    // The exit cranes up and back, so the city drops away under the next band.
    offset.multiplyScalar(1 + breathe + hero.scroll * 0.28);
    offset.y += hero.scroll * 150;

    target.copy(base.look);
    target.y += hero.scroll * 46;
    camera.position.copy(target).add(offset);
    camera.lookAt(target);
  });
  return null;
}

/** The whole scene: one clock, one intro timeline, one scroll trigger. */
function Scene({ mode, onSettled }: { mode: HeroMode; onSettled: () => void }) {
  const common = useMemo(() => createCommonUniforms(), []);
  const towers = useMemo(() => buildTowers(mode.phone ? 110 : 178), [mode.phone]);
  const droneCurves = useMemo(
    () => buildDroneCurves(towers, mode.phone ? 7 : 11),
    [towers, mode.phone],
  );
  const rail = useMemo(() => buildRailCurve(), []);
  const anchor = useMemo(() => craneAnchor(towers), [towers]);
  const handleRef = useRef<TowerHandle | null>(null);
  const nextComplete = useRef(6.4);
  const rippleSlot = useRef(0);
  const { gl, size } = useThree();
  const pixelRatio = Math.min(gl.getPixelRatio(), 2);

  useEffect(() => {
    gl.toneMapping = ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
  }, [gl]);

  // Frame times, read back by the verification tooling.
  const perf = useRef({ n: 0, total: 0, worst: 0, last: 0 });
  const settled = useRef(0);

  useFrame((_, delta) => {
    // A capture has to end with a still surface: while the loop keeps redrawing
    // a large canvas the page screenshot catches a half composited frame.
    if (hero.frozen) {
      settled.current += 1;
      if (settled.current === 12) onSettled();
    }
    if (!hero.frozen) hero.time += Math.min(delta, 0.05);
    hero.pointerX = MathUtils.lerp(hero.pointerX, hero.targetX, 0.04);
    hero.pointerY = MathUtils.lerp(hero.pointerY, hero.targetY, 0.04);

    common.uTime.value = hero.time;
    common.uIgnition.value = hero.ignition;
    // The haze thickens as the hero leaves, so the city dissolves rather than
    // slides away.
    common.uFogDensity.value = FOG_DENSITY * (1 + hero.scroll * 1.7);

    if (!hero.frozen && hero.grow > 0.9 && hero.time > nextComplete.current) {
      nextComplete.current = hero.time + 4.2 + Math.random() * 3.4;
      const spot = handleRef.current?.complete(Math.floor(Math.random() * 400));
      if (spot) {
        const s = rippleSlot.current % 3;
        hero.ripples[s * 3] = spot.x;
        hero.ripples[s * 3 + 1] = spot.z;
        hero.ripples[s * 3 + 2] = hero.time;
        rippleSlot.current++;
      }
    }

    if (mode.perf) {
      const now = performance.now();
      if (perf.current.last) {
        const ms = now - perf.current.last;
        perf.current.n++;
        perf.current.total += ms;
        perf.current.worst = Math.max(perf.current.worst, ms);
        const w = window as unknown as { __heroPerf?: unknown };
        w.__heroPerf = {
          frames: perf.current.n,
          avgMs: +(perf.current.total / perf.current.n).toFixed(2),
          worstMs: +perf.current.worst.toFixed(2),
          dpr: gl.getPixelRatio(),
          width: size.width,
        };
      }
      perf.current.last = now;
    }
  });

  return (
    <>
      <Rig mode={mode} />
      <Sky common={common} />
      <Terrain
        common={common}
        pointCount={mode.phone ? 5200 : 9000}
        pixelRatio={pixelRatio}
      />
      <River common={common} />
      <Towers common={common} towers={towers} handleRef={handleRef} />
      <Monorail common={common} curve={rail} pixelRatio={pixelRatio} />
      <Drones common={common} curves={droneCurves} pixelRatio={pixelRatio} />
      <Crane common={common} tower={anchor} />
      {!mode.phone && <Effects />}
    </>
  );
}

export default function HeroScene({ mode }: { mode: HeroMode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    resetHero();
    // The sky is already up at the first frame, so the still and the live
    // scene share a horizon and the handover is only the ground rebuilding.
    hero.ignition = 0.4;

    const tl = gsap.timeline({ paused: true });
    tl.to(hero, { amp: 1, duration: 1.2, ease: "power2.out" }, 0)
      .to(hero, { scatter: 0, duration: 1.5, ease: "power1.inOut" }, 0.15)
      .to(hero, { ignition: 1, duration: 1.8, ease: "power2.out" }, 0.6)
      // Linear here: the per instance expo.out lives in the tower shader, and
      // easing twice collapses the whole stagger into the first few frames.
      .to(hero, { grow: 1, duration: 1.8, ease: "none" }, 0.9);

    if (mode.at !== null || mode.poster) {
      const at = mode.poster ? 26 : mode.at!;
      hero.time = at;
      hero.frozen = true;
      tl.time(Math.min(at, tl.duration()));
      // A still needs the skyline finished even a fraction of a second in.
      if (mode.poster) tl.progress(1);
    } else {
      tl.play(0);
    }

    const el = wrap.current;
    if (el) gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });

    return () => {
      tl.kill();
    };
  }, [mode]);

  // Pointer parallax, pointer devices only.
  useEffect(() => {
    if (mode.poster || mode.at !== null) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      hero.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      hero.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mode]);

  // Scroll: the scene reacts, and the loop stops once the hero has left.
  useEffect(() => {
    if (mode.poster || mode.at !== null) return;
    const section = document.querySelector(".hero");
    const el = wrap.current;
    if (!section || !el) return;
    const proxy = { p: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: () => {
            hero.scroll = proxy.p;
          },
        },
        onUpdate: () => {
          hero.scroll = proxy.p;
        },
      });
      gsap.to(el, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "60% top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onLeave: () => setRunning(false),
        onEnterBack: () => setRunning(true),
      });
    });
    return () => ctx.revert();
  }, [mode]);

  // Nothing renders while the tab is in the background.
  useEffect(() => {
    const onVis = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className="hero-canvas" ref={wrap}>
      <Canvas
        frameloop={running ? "always" : "never"}
        dpr={mode.phone ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !mode.phone,
          alpha: false,
          powerPreference: mode.phone ? "default" : "high-performance",
        }}
        camera={{ position: [CAM_POS.x, CAM_POS.y, CAM_POS.z], fov: 38, near: 2, far: 3400 }}
      >
        <Scene mode={mode} onSettled={() => setRunning(false)} />
      </Canvas>
    </div>
  );
}
