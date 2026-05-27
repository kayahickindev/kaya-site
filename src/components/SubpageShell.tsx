"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/data/content";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

function SignalField() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
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

const navItems = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Proof", href: "/proof" },
  { label: "Stack", href: "/stack" },
  { label: "Contact", href: "/contact" },
];

type Props = {
  activePath: string;
  children: ReactNode;
};

export function SubpageShell({ activePath, children }: Props) {
  return (
    <main className="relative h-dvh overflow-hidden bg-[#f4f1ea] text-neutral-950 dark:bg-[#050505] dark:text-white max-lg:h-auto max-lg:min-h-dvh max-lg:overflow-y-auto">
      <SignalField />
      <div className="relative z-10 grid h-full min-h-0 grid-rows-[44px_minmax(0,1fr)_auto] gap-3 px-4 py-3 sm:px-5 lg:px-7">
        <header className="flex h-11 min-w-0 items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="Kaya Hickin home"
            className="flex h-10 shrink-0 items-center gap-3 rounded-md border border-black/10 bg-white/52 px-3 text-sm font-semibold backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.075]"
          >
            <span className="grid h-6 w-6 place-items-center rounded bg-neutral-950 text-xs text-white dark:bg-white dark:text-neutral-950">
              KH
            </span>
            <span>{siteConfig.name}</span>
          </Link>

          <Link
            href="/"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-black/10 bg-white/45 px-3 text-xs text-neutral-600 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-400 dark:hover:bg-white/[0.08]"
          >
            <ArrowLeft size={14} />
            Back home
          </Link>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease }}
          className="min-h-0"
        >
          {children}
        </motion.section>

        <motion.nav
          aria-label="Primary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.12, ease }}
          className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-black/10 bg-white/45 p-1.5 text-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.028]"
        >
          <div className="flex min-w-0 flex-wrap items-center gap-1">
            {navItems.map((item) => {
              const active = item.href === activePath;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-2.5 py-2 transition ${
                    active
                      ? "bg-neutral-950/[0.07] font-medium text-neutral-950 dark:bg-white/[0.08] dark:text-white"
                      : "text-neutral-700 hover:bg-neutral-950/[0.055] dark:text-neutral-300 dark:hover:bg-white/[0.07]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2 px-2 text-[11px] text-neutral-500 dark:text-neutral-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>{siteConfig.commandCenter.status}</span>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span>{siteConfig.commandCenter.availability}</span>
          </div>
        </motion.nav>
      </div>
    </main>
  );
}
