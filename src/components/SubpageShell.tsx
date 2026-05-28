"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TopNav } from "./TopNav";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

export type Accent = "amber" | "cyan" | "emerald" | "violet" | "rose";

type AccentSpec = {
  glow: string;
  glowDark: string;
  dot: string;
  dotDark: string;
};

const accents: Record<Accent, AccentSpec> = {
  amber: {
    glow: "bg-[radial-gradient(circle_at_82%_8%,rgba(217,119,6,0.16),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(217,119,6,0.10),transparent_50%)]",
    glowDark: "dark:bg-[radial-gradient(circle_at_82%_8%,rgba(251,191,36,0.14),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(251,191,36,0.08),transparent_50%)]",
    dot: "bg-amber-700/35 shadow-[0_0_12px_rgba(217,119,6,0.30)]",
    dotDark: "dark:bg-amber-300/45 dark:shadow-[0_0_14px_rgba(251,191,36,0.30)]",
  },
  cyan: {
    glow: "bg-[radial-gradient(circle_at_82%_8%,rgba(8,145,178,0.16),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(8,145,178,0.10),transparent_50%)]",
    glowDark: "dark:bg-[radial-gradient(circle_at_82%_8%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(34,211,238,0.08),transparent_50%)]",
    dot: "bg-cyan-700/35 shadow-[0_0_12px_rgba(8,145,178,0.30)]",
    dotDark: "dark:bg-cyan-300/45 dark:shadow-[0_0_14px_rgba(34,211,238,0.30)]",
  },
  emerald: {
    glow: "bg-[radial-gradient(circle_at_82%_8%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(16,185,129,0.10),transparent_50%)]",
    glowDark: "dark:bg-[radial-gradient(circle_at_82%_8%,rgba(52,211,153,0.14),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(52,211,153,0.08),transparent_50%)]",
    dot: "bg-emerald-700/35 shadow-[0_0_12px_rgba(16,185,129,0.30)]",
    dotDark: "dark:bg-emerald-300/45 dark:shadow-[0_0_14px_rgba(52,211,153,0.30)]",
  },
  violet: {
    glow: "bg-[radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.16),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(124,58,237,0.10),transparent_50%)]",
    glowDark: "dark:bg-[radial-gradient(circle_at_82%_8%,rgba(167,139,250,0.16),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(167,139,250,0.10),transparent_50%)]",
    dot: "bg-violet-700/35 shadow-[0_0_12px_rgba(124,58,237,0.30)]",
    dotDark: "dark:bg-violet-300/45 dark:shadow-[0_0_14px_rgba(167,139,250,0.30)]",
  },
  rose: {
    glow: "bg-[radial-gradient(circle_at_82%_8%,rgba(244,63,94,0.16),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(244,63,94,0.10),transparent_50%)]",
    glowDark: "dark:bg-[radial-gradient(circle_at_82%_8%,rgba(251,113,133,0.14),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(251,113,133,0.08),transparent_50%)]",
    dot: "bg-rose-700/35 shadow-[0_0_12px_rgba(244,63,94,0.30)]",
    dotDark: "dark:bg-rose-300/45 dark:shadow-[0_0_14px_rgba(251,113,133,0.30)]",
  },
};

function SignalField({ accent }: { accent: Accent }) {
  const reducedMotion = useReducedMotion();
  const spec = accents[accent];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      <div className={`absolute inset-0 ${spec.glow} ${spec.glowDark}`} />
      {Array.from({ length: 11 }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 9) * 0.28;
        return (
          <motion.span
            key={i}
            className={`absolute h-1 w-1 rounded-full ${spec.dot} ${spec.dotDark}`}
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={
              reducedMotion
                ? undefined
                : { opacity: [0.18, 0.6, 0.18], scale: [0.8, 1.05, 0.8] }
            }
            transition={{
              duration: 6.8 + (i % 5),
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

type Props = {
  children: ReactNode;
  accent?: Accent;
};

export function SubpageShell({ children, accent = "amber" }: Props) {
  return (
    <main className="relative min-h-dvh overflow-x-clip bg-[#f4f1ea] text-neutral-950 dark:bg-[#050505] dark:text-white">
      <SignalField accent={accent} />
      <div className="relative z-10 flex flex-col gap-6 px-4 py-3 sm:px-5 sm:py-4 lg:px-7">
        <TopNav />

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease }}
          className="pb-6"
        >
          {children}
        </motion.section>
      </div>
    </main>
  );
}
