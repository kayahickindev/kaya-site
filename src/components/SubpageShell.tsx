"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TopNav } from "./TopNav";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

function SignalField() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,145,178,0.08),transparent_36%,rgba(217,119,6,0.08)_68%,transparent)] dark:bg-[linear-gradient(120deg,rgba(34,211,238,0.07),transparent_36%,rgba(251,191,36,0.08)_68%,transparent)]" />
      {Array.from({ length: 14 }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 9) * 0.28;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-neutral-900/18 shadow-[0_0_10px_rgba(0,0,0,0.12)] dark:bg-white/28 dark:shadow-[0_0_12px_rgba(255,255,255,0.18)]"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={
              reducedMotion
                ? undefined
                : { opacity: [0.16, 0.55, 0.16], scale: [0.8, 1, 0.8] }
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
};

export function SubpageShell({ children }: Props) {
  return (
    <main className="relative min-h-dvh bg-[#f4f1ea] text-neutral-950 dark:bg-[#050505] dark:text-white">
      <SignalField />
      <div className="relative z-10 flex flex-col gap-6 px-4 py-3 sm:px-5 sm:py-4 lg:px-7">
        <TopNav />

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease }}
          className="pb-12"
        >
          {children}
        </motion.section>
      </div>
    </main>
  );
}
