"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Award, CheckCircle2, TrendingUp, Wrench, type LucideIcon } from "lucide-react";
import { cardSurface } from "@/lib/surfaces";
import { Sparkline } from "./Sparkline";

type ProofGroup = {
  label: string;
  icon: "TrendingUp" | "Wrench" | "Award";
  accent: string;
  iconColor: string;
  bar: string;
  points: string[];
};

const ICONS: Record<ProofGroup["icon"], LucideIcon> = {
  TrendingUp,
  Wrench,
  Award,
};

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease, delay: i * 0.04 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease, delay: 0.16 + i * 0.04 },
  }),
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease, delay: 0.04 + i * 0.05 },
  }),
};

type Metric = {
  value: string;
  label: string;
  detail: string;
  sparkline?: number[];
  accent?: string;
};

function parseMetric(value: string) {
  const match = value.match(/^([^\d.]*)([\d.,]+)(.*)$/);
  if (!match) return { num: 0, prefix: "", suffix: value, decimals: 0, commas: false };
  const [, prefix, body, suffix] = match;
  const commas = body.includes(",");
  const cleaned = body.replace(/,/g, "");
  const decimalsMatch = cleaned.match(/\.(\d+)/);
  const decimals = decimalsMatch ? decimalsMatch[1].length : 0;
  return { num: parseFloat(cleaned), prefix, suffix, decimals, commas };
}

function formatNum(n: number, decimals: number, commas: boolean): string {
  const fixed = n.toFixed(decimals);
  if (!commas) return fixed;
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart ? `${withCommas}.${decPart}` : withCommas;
}

function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const meta = useMemo(() => parseMetric(value), [value]);
  const [display, setDisplay] = useState(() =>
    reducedMotion ? value : `${meta.prefix}${formatNum(0, meta.decimals, meta.commas)}${meta.suffix}`,
  );

  useEffect(() => {
    if (reducedMotion || !inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = meta.num * eased;
      setDisplay(`${meta.prefix}${formatNum(current, meta.decimals, meta.commas)}${meta.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, meta, duration, reducedMotion, value]);

  return <span ref={ref}>{display}</span>;
}

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
          className={`${cardSurface} p-3 transition hover:-translate-y-0.5 hover:border-amber-400/40 dark:hover:border-amber-300/40`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="text-2xl font-semibold tracking-tight tabular-nums text-neutral-950 xl:text-3xl dark:text-white">
              <CountUp value={m.value} />
            </div>
            {m.sparkline ? (
              <Sparkline points={m.sparkline} accent={m.accent ?? "rgb(212,155,90)"} animate />
            ) : null}
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
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {groups.map((group, columnIndex) => {
        const Icon = ICONS[group.icon];

        return (
          <motion.div
            key={group.label}
            custom={columnIndex}
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            variants={columnVariants}
            className={`${cardSurface} p-4`}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${group.bar}`}
            />
            <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
              <Icon size={15} className={group.iconColor} />
              <h2 className={`text-[11px] font-mono uppercase tracking-[0.18em] ${group.accent}`}>
                {group.label}
              </h2>
            </div>
            <ul className="mt-3 grid gap-2">
              {group.points.map((point, itemIndex) => (
                <motion.li
                  key={point}
                  custom={itemIndex}
                  initial={reducedMotion ? false : "hidden"}
                  animate="show"
                  variants={itemVariants}
                  className="flex gap-2 text-sm leading-snug text-neutral-700 dark:text-neutral-300"
                >
                  <CheckCircle2
                    size={14}
                    className={`mt-0.5 flex-shrink-0 ${group.iconColor}`}
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
