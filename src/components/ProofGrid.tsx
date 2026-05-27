"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Award, CheckCircle2, TrendingUp, Wrench, type LucideIcon } from "lucide-react";

type ProofGroup = {
  label: string;
  icon: "TrendingUp" | "Wrench" | "Award";
  accent: string;
  dotBg: string;
  points: string[];
};

const ICONS: Record<ProofGroup["icon"], LucideIcon> = {
  TrendingUp,
  Wrench,
  Award,
};

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: i * 0.08 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease, delay: 0.18 + i * 0.04 },
  }),
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease, delay: 0.05 + i * 0.06 },
  }),
};

type Metric = {
  value: string;
  label: string;
  detail: string;
};

export function ProofMetrics({ metrics }: { metrics: Metric[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          custom={i}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
          variants={tileVariants}
          className="rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/70 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-amber-300/40 dark:hover:bg-white/[0.07]"
        >
          <div className="text-2xl font-semibold text-neutral-950 xl:text-3xl dark:text-white">
            {m.value}
          </div>
          <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
            {m.label}
          </div>
          <div className="mt-0.5 text-[10px] leading-snug text-neutral-500 dark:text-neutral-500">
            {m.detail}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ProofGrid({ groups }: { groups: ProofGroup[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
      {groups.map((group, columnIndex) => {
        const Icon = ICONS[group.icon];

        return (
          <motion.div
            key={group.label}
            custom={columnIndex}
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            variants={columnVariants}
            className="flex min-h-0 flex-col rounded-md border border-black/10 bg-white/55 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
              <Icon size={15} className={group.accent} />
              <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
                {group.label}
              </h2>
            </div>
            <ul className="mt-3 grid flex-1 content-start gap-2">
              {group.points.map((point, itemIndex) => (
                <motion.li
                  key={point}
                  custom={columnIndex * 6 + itemIndex}
                  initial={reducedMotion ? false : "hidden"}
                  animate="show"
                  variants={itemVariants}
                  className="flex gap-2 text-sm leading-snug text-neutral-700 dark:text-neutral-300"
                >
                  <CheckCircle2
                    size={14}
                    className={`mt-0.5 flex-shrink-0 ${group.dotBg}`}
                  />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
