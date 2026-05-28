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
import { BrandLogo } from "./BrandLogo";
import { cardSurface } from "@/lib/surfaces";

type Category = "iOS" | "Web" | "Backend" | "AI" | "Workflow";

type GroupedItem = {
  category: Category;
  items: { name: string; category: string }[];
};

const cyanAccent = "text-cyan-700 dark:text-cyan-300";
const cyanBar = "from-cyan-400/60 to-transparent";

const categoryMeta: Record<
  Category,
  { icon: LucideIcon; accent: string; bar: string }
> = {
  iOS: { icon: Apple, accent: cyanAccent, bar: cyanBar },
  Web: { icon: Globe, accent: cyanAccent, bar: cyanBar },
  Backend: { icon: Braces, accent: cyanAccent, bar: cyanBar },
  AI: { icon: BrainCircuit, accent: cyanAccent, bar: cyanBar },
  Workflow: { icon: Workflow, accent: cyanAccent, bar: cyanBar },
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

export function StackGrid({ grouped }: { grouped: GroupedItem[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
            className={`${cardSurface} p-3`}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${meta.bar}`}
            />
            <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-cyan-500/10 ring-1 ring-cyan-500/20 dark:bg-cyan-300/10 dark:ring-cyan-300/20">
                <Icon size={13} strokeWidth={2} className={meta.accent} />
              </span>
              <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
                {group.category}
              </h2>
            </div>
            <ul className="mt-3 grid gap-2.5">
              {group.items.map((item, itemIndex) => (
                <motion.li
                  key={item.name}
                  custom={itemIndex}
                  initial={reducedMotion ? false : "hidden"}
                  animate="show"
                  variants={itemVariants}
                  className="flex items-center gap-2.5 rounded-md bg-neutral-950/[0.04] px-2.5 py-3.5 text-sm text-neutral-800 transition hover:bg-neutral-950/[0.07] dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:bg-white/[0.07]"
                >
                  <BrandLogo name={item.name} size={22} />
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
