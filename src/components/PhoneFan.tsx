"use client";

import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import type { StoreShot } from "@/data/assets";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

export type FanShots = { left: StoreShot; center: StoreShot; right: StoreShot };

export type FanGlow = "amber" | "emerald";

const glowByTone: Record<FanGlow, string> = {
  amber:
    "bg-[radial-gradient(ellipse_55%_55%_at_50%_55%,rgba(251,191,36,0.26),transparent_65%)] dark:bg-[radial-gradient(ellipse_55%_55%_at_50%_55%,rgba(251,191,36,0.20),transparent_65%)]",
  emerald:
    "bg-[radial-gradient(ellipse_55%_55%_at_50%_55%,rgba(16,185,129,0.22),transparent_65%)] dark:bg-[radial-gradient(ellipse_55%_55%_at_50%_55%,rgba(52,211,153,0.18),transparent_65%)]",
};

function FanPhone({ shot, className }: { shot: StoreShot; className: string }) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      unoptimized
      loading="eager"
      className={`block h-full w-auto rounded-xl ring-1 ring-black/10 dark:ring-white/10 ${className}`}
    />
  );
}

// Three real App Store composites fanned out: the center one forward and
// largest, the two sides smaller, tucked behind and turned outward.
//
// The fan's height is --fan-h, set by the caller through `sizeClassName`
// (it may use cqw, so the caller's column should be an @container). The fan is
// about 1.2x as wide as it is tall. With reduced motion the side phones appear
// in place (MotionConfig skips the transform and keeps the fade), with no
// server/client markup difference.
export function PhoneFan({
  shots,
  sizeClassName,
  glow = "amber",
}: {
  shots: FanShots;
  sizeClassName: string;
  glow?: FanGlow;
}) {
  const side = (direction: -1 | 1) => ({
    initial: { x: "-50%", rotate: 0, opacity: 0 },
    animate: {
      x: direction === -1 ? "-131%" : "31%",
      rotate: direction * 6,
      opacity: 1,
    },
    transition: { duration: 0.7, delay: 0.25, ease },
  });

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`relative mx-auto h-[var(--fan-h)] w-full ${sizeClassName}`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-[-8%] ${glowByTone[glow]}`}
        />
        <motion.div
          {...side(-1)}
          style={{ originX: 0.5, originY: 1 }}
          className="absolute bottom-[5%] left-1/2 h-[84%]"
        >
          <FanPhone
            shot={shots.left}
            className="brightness-[0.82] drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
        <motion.div
          {...side(1)}
          style={{ originX: 0.5, originY: 1 }}
          className="absolute bottom-[5%] left-1/2 h-[84%]"
        >
          <FanPhone
            shot={shots.right}
            className="brightness-[0.82] drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
        <div className="absolute bottom-0 left-1/2 z-10 h-full -translate-x-1/2">
          <FanPhone
            shot={shots.center}
            className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </MotionConfig>
  );
}
