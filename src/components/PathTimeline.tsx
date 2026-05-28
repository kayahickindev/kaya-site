"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CompanyMark, hasCompanyMark } from "./CompanyMark";
import { cardSurface } from "@/lib/surfaces";
import { siteConfig } from "@/data/content";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

export function PathTimeline() {
  const reducedMotion = useReducedMotion();
  const timeline = [...siteConfig.timeline].reverse();

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {timeline.map((entry, idx, arr) => {
        const showLogo = hasCompanyMark(entry.company);
        const isLast = idx === arr.length - 1;
        const segmentTint =
          idx === 0
            ? "from-amber-400/25 via-amber-400/40 to-amber-400/55"
            : "from-amber-400/55 via-amber-400/70 to-amber-400/90";
        const dotDelay = idx * 0.55;
        const drawDelay = 0.4 + idx * 0.55;
        return (
          <div key={entry.company} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <motion.span
                initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: dotDelay, duration: 0.35, ease }}
                className={`grid h-3 w-3 shrink-0 place-items-center rounded-full border-2 ${
                  entry.active
                    ? "border-amber-500 bg-amber-400 shadow-[0_0_10px_rgba(212,155,90,0.55)]"
                    : "border-neutral-400 bg-white dark:border-neutral-600 dark:bg-neutral-950"
                }`}
              />
              <span className="whitespace-nowrap text-[11px] font-mono uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {entry.period}
              </span>
              {!isLast ? (
                <motion.span
                  aria-hidden
                  initial={reducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: drawDelay, duration: 0.6, ease }}
                  style={{ transformOrigin: "left" }}
                  className={`hidden h-px flex-1 self-center bg-gradient-to-r md:block ${segmentTint}`}
                />
              ) : null}
            </div>
            <div className={`${cardSurface} flex flex-col gap-2 p-3`}>
              <div className="flex items-center gap-2.5">
                {showLogo ? <CompanyMark company={entry.company} size={24} /> : null}
                <p className="text-sm font-semibold text-neutral-950 dark:text-white">
                  {entry.company}
                </p>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {entry.role}
              </p>
              <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                {entry.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
