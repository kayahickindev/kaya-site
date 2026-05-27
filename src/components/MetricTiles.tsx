"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useCountUp } from "@/lib/hooks";

type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: boolean;
  decimals?: number;
  display?: string;
  label: string;
};

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease, delay: 0.35 + i * 0.06 },
  }),
};

function MetricTile({ metric, index }: { metric: Metric; index: number }) {
  const { count, ref } = useCountUp(metric.value, 1600, metric.format ?? false, metric.decimals ?? 0);
  const display = metric.display ?? `${metric.prefix ?? ""}${count}${metric.suffix ?? ""}`;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="show"
      variants={tileVariants}
      className="rounded-md border border-black/10 bg-white/55 px-3 py-2.5 backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/70 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-amber-300/40 dark:hover:bg-white/[0.07]"
    >
      <span
        ref={ref}
        className="block text-lg font-semibold text-neutral-950 xl:text-xl dark:text-white"
      >
        {display}
      </span>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
        {metric.label}
      </div>
    </motion.div>
  );
}

export function MetricTiles({ metrics }: { metrics: Metric[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {metrics.map((metric, index) => (
        <MetricTile
          key={metric.label}
          metric={reducedMotion ? { ...metric, display: metric.display ?? `${metric.prefix ?? ""}${metric.value}${metric.suffix ?? ""}` } : metric}
          index={index}
        />
      ))}
    </div>
  );
}
