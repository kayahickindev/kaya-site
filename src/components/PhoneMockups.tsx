"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { AppScreen } from "@/data/assets";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

export type MockupGlow = "amber" | "emerald";

const glowByTone: Record<MockupGlow, string> = {
  amber:
    "bg-[radial-gradient(ellipse_50%_42%_at_50%_62%,rgba(251,191,36,0.30),transparent_70%)] dark:bg-[radial-gradient(ellipse_50%_42%_at_50%_62%,rgba(251,191,36,0.22),transparent_70%)]",
  emerald:
    "bg-[radial-gradient(ellipse_50%_42%_at_50%_62%,rgba(16,185,129,0.26),transparent_70%)] dark:bg-[radial-gradient(ellipse_50%_42%_at_50%_62%,rgba(52,211,153,0.20),transparent_70%)]",
};

// One iPhone drawn in CSS around a real app screen. Sizes are in cqw of the
// phone itself, so the bezel, corners and buttons scale with any height.
function Phone({
  screens,
  index = 0,
  priority = false,
}: {
  screens: AppScreen[];
  index?: number;
  priority?: boolean;
}) {
  const shown = screens[index % screens.length];
  return (
    <div className="@container relative aspect-[712/1443] h-full">
      {/* Side buttons: action and volume on the left, power on the right. */}
      <span
        aria-hidden
        className="absolute -left-[1.1cqw] top-[16%] h-[5%] w-[1.4cqw] rounded-l-sm bg-gradient-to-r from-[#4a4a4f] to-[#2a2a2e]"
      />
      <span
        aria-hidden
        className="absolute -left-[1.1cqw] top-[24%] h-[9%] w-[1.4cqw] rounded-l-sm bg-gradient-to-r from-[#4a4a4f] to-[#2a2a2e]"
      />
      <span
        aria-hidden
        className="absolute -left-[1.1cqw] top-[35%] h-[9%] w-[1.4cqw] rounded-l-sm bg-gradient-to-r from-[#4a4a4f] to-[#2a2a2e]"
      />
      <span
        aria-hidden
        className="absolute -right-[1.1cqw] top-[27%] h-[13%] w-[1.4cqw] rounded-r-sm bg-gradient-to-l from-[#4a4a4f] to-[#2a2a2e]"
      />
      {/* Titanium band, then the black bezel, then the screen. */}
      <div className="absolute inset-0 rounded-[17cqw] bg-[linear-gradient(145deg,#8e8e93_0%,#3a3a3e_22%,#1c1c1f_55%,#4a4a50_85%,#8e8e93_100%)] p-[1.3cqw] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
        <div className="h-full w-full rounded-[15.8cqw] bg-black p-[2.6cqw]">
          <div className="relative h-full w-full overflow-hidden rounded-[13.2cqw] bg-[#0d1220]">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={shown.src}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <Image
                  src={shown.src}
                  alt={shown.alt}
                  fill
                  sizes="(min-width: 1024px) 320px, 45vw"
                  unoptimized
                  priority={priority}
                  loading={priority ? undefined : "eager"}
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
            {/* Glass glare. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_28%,transparent_42%)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Three iPhones rising out of a soft glow: the center one straight and
// forward, cycling through its screens; the two sides smaller, turned in and
// tucked behind. The bottoms fade out, so the phones read as coming up out of
// the page. The pointer tilts the group a few degrees.
//
// Height is --fan-h, set by the caller through `sizeClassName` (it may use cqw,
// so the caller's column should be an @container). The group is about 1.25x as
// wide as it is tall. Reduced motion keeps the first screen and drops the tilt.
export function PhoneMockups({
  left,
  center,
  right,
  sizeClassName,
  glow = "amber",
  intervalMs = 3800,
}: {
  left: AppScreen;
  center: AppScreen[];
  right: AppScreen;
  sizeClassName: string;
  glow?: MockupGlow;
  intervalMs?: number;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || center.length < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setIndex((i) => (i + 1) % center.length);
      }
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduce, center.length, intervalMs]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-1, 1], [-6, 6]);
  const rotateX = useTransform(sy, [-1, 1], [4, -4]);
  const sideShift = useTransform(sx, [-1, 1], [-8, 8]);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  const side = (direction: -1 | 1) => ({
    initial: { opacity: 0, x: "-50%", rotateY: 0, rotateZ: 0 },
    animate: {
      opacity: 1,
      x: direction === -1 ? "-122%" : "22%",
      rotateY: direction * -22,
      rotateZ: direction * 3,
    },
    transition: { duration: 0.8, delay: 0.2, ease },
  });

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={`relative mx-auto h-[var(--fan-h)] w-full ${sizeClassName}`}
        style={{ perspective: "1400px" } as CSSProperties}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-[-10%] ${glowByTone[glow]}`}
        />
        <motion.div
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <motion.div style={{ x: sideShift }} className="absolute inset-0">
            <motion.div
              {...side(-1)}
              style={{ transformOrigin: "50% 100%" }}
              className="absolute left-1/2 top-[13%] h-[96%] brightness-[0.72]"
            >
              <Phone screens={[left]} />
            </motion.div>
            <motion.div
              {...side(1)}
              style={{ transformOrigin: "50% 100%" }}
              className="absolute left-1/2 top-[13%] h-[96%] brightness-[0.72]"
            >
              <Phone screens={[right]} />
            </motion.div>
          </motion.div>
          <div className="absolute left-1/2 top-0 z-10 h-[112%] -translate-x-1/2 drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]">
            <Phone screens={center} index={index} priority />
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
