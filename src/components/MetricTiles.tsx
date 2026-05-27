"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useCountUp } from "@/lib/hooks";
import { Sparkline } from "./Sparkline";

type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: boolean;
  decimals?: number;
  display?: string;
  label: string;
  sparkline?: number[];
  accent?: string;
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

type TileAccent = "neutral" | "amber" | "emerald" | "cyan" | "violet";

const valueColorByAccent: Record<TileAccent, string> = {
  neutral: "text-neutral-950 dark:text-white",
  amber: "text-amber-800 dark:text-amber-200",
  emerald: "text-emerald-700 dark:text-emerald-200",
  cyan: "text-cyan-700 dark:text-cyan-200",
  violet: "text-violet-700 dark:text-violet-200",
};

function MetricTile({
  metric,
  index,
  accent,
}: {
  metric: Metric;
  index: number;
  accent: TileAccent;
}) {
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
      <div className="flex items-start justify-between gap-2">
        <span
          ref={ref}
          className={`block text-lg font-semibold tabular-nums xl:text-xl ${valueColorByAccent[accent]}`}
        >
          {display}
        </span>
        {metric.sparkline && metric.accent ? (
          <Sparkline
            points={metric.sparkline}
            accent={metric.accent}
            width={56}
            height={18}
            strokeWidth={1.25}
          />
        ) : null}
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
        {metric.label}
      </div>
    </motion.div>
  );
}

export function MetricTiles({
  metrics,
  accent = "neutral",
}: {
  metrics: Metric[];
  accent?: TileAccent;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {metrics.map((metric, index) => (
        <MetricTile
          key={metric.label}
          metric={reducedMotion ? { ...metric, display: metric.display ?? `${metric.prefix ?? ""}${metric.value}${metric.suffix ?? ""}` } : metric}
          index={index}
          accent={accent}
        />
      ))}
    </div>
  );
}
