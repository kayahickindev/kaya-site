"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Apple,
  BrainCircuit,
  Braces,
  Globe,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Category = "iOS" | "Web" | "Backend" | "AI" | "Workflow";

type GroupedItem = {
  category: Category;
  items: { name: string; category: string }[];
};

const categoryMeta: Record<Category, { icon: LucideIcon; blurb: string; accent: string; dotBg: string }> = {
  iOS: {
    icon: Apple,
    blurb: "Native consumer products with payments, persistence, and realtime voice.",
    accent: "text-cyan-700 dark:text-cyan-300",
    dotBg: "bg-cyan-500 dark:bg-cyan-300",
  },
  Web: {
    icon: Globe,
    blurb: "Marketing sites, dashboards, and conversion surfaces.",
    accent: "text-emerald-700 dark:text-emerald-300",
    dotBg: "bg-emerald-500 dark:bg-emerald-300",
  },
  Backend: {
    icon: Braces,
    blurb: "Fast iteration with production reliability.",
    accent: "text-amber-700 dark:text-amber-300",
    dotBg: "bg-amber-500 dark:bg-amber-300",
  },
  AI: {
    icon: BrainCircuit,
    blurb: "Models and voice loops wired into behavior change.",
    accent: "text-purple-700 dark:text-purple-300",
    dotBg: "bg-purple-500 dark:bg-purple-300",
  },
  Workflow: {
    icon: Workflow,
    blurb: "Daily AI-native build, measure, and monetize loop.",
    accent: "text-rose-700 dark:text-rose-300",
    dotBg: "bg-rose-500 dark:bg-rose-300",
  },
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

export function StackGrid({ grouped }: { grouped: GroupedItem[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-5">
      {grouped.map((group, columnIndex) => {
        const meta = categoryMeta[group.category];
        const Icon = meta.icon;

        return (
          <motion.div
            key={group.category}
            custom={columnIndex}
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            variants={columnVariants}
            className="flex min-h-0 flex-col rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
              <Icon size={15} className={meta.accent} />
              <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
                {group.category}
              </h2>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-neutral-500">{meta.blurb}</p>
            <ul className="mt-3 grid flex-1 content-start gap-1.5">
              {group.items.map((item, itemIndex) => (
                <motion.li
                  key={item.name}
                  custom={columnIndex * 6 + itemIndex}
                  initial={reducedMotion ? false : "hidden"}
                  animate="show"
                  variants={itemVariants}
                  className="flex items-center gap-2 rounded bg-neutral-950/[0.035] px-2 py-1.5 text-xs text-neutral-800 dark:bg-white/[0.04] dark:text-neutral-200"
                >
                  <span className={`h-1 w-1 rounded-full ${meta.dotBg}`} />
                  <span className="truncate">{item.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
