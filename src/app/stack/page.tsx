import type { Metadata } from "next";
import {
  Apple,
  BrainCircuit,
  Braces,
  Globe,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Stack | ${siteConfig.name}`,
  description:
    "The product, AI, iOS, backend, and workflow stack Kaya Hickin uses to ship consumer AI products.",
  alternates: {
    canonical: `${siteConfig.url}/stack`,
  },
};

type Category = "iOS" | "Web" | "Backend" | "AI" | "Workflow";

const categoryMeta: Record<Category, { icon: LucideIcon; blurb: string; accent: string }> = {
  iOS: {
    icon: Apple,
    blurb: "Native consumer products with payments, persistence, and realtime voice.",
    accent: "text-cyan-700 dark:text-cyan-300",
  },
  Web: {
    icon: Globe,
    blurb: "Marketing sites, dashboards, and conversion surfaces.",
    accent: "text-emerald-700 dark:text-emerald-300",
  },
  Backend: {
    icon: Braces,
    blurb: "Fast iteration with production reliability.",
    accent: "text-amber-700 dark:text-amber-300",
  },
  AI: {
    icon: BrainCircuit,
    blurb: "Models and voice loops wired into behavior change.",
    accent: "text-purple-700 dark:text-purple-300",
  },
  Workflow: {
    icon: Workflow,
    blurb: "Daily AI-native build, measure, and monetize loop.",
    accent: "text-rose-700 dark:text-rose-300",
  },
};

const CATEGORY_ORDER: Category[] = ["iOS", "Web", "Backend", "AI", "Workflow"];

const principles = [
  {
    label: "Solo-shippable",
    body: "Every layer chosen so one person can ship complete products end to end.",
  },
  {
    label: "AI in the loop",
    body: "Claude Code and Codex write alongside me daily, 170K+ lines last year.",
  },
  {
    label: "Production from day one",
    body: "StoreKit, Firebase, Mixpanel, and Superwall wired in before launch.",
  },
];

export default function StackPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: siteConfig.techStack.items.filter((it) => it.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <SubpageShell activePath="/stack">
      <div className="flex h-full min-h-0 flex-col gap-3">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
              Stack
            </div>
            <h1 className="mt-1 text-3xl font-semibold leading-[0.95] text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
              How I build at founder speed.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Optimized for shipping complete products end to end: native iOS, backend, AI interaction, monetization, analytics, and an AI-native build loop.
          </p>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-5">
          {grouped.map((group) => {
            const meta = categoryMeta[group.category];
            const Icon = meta.icon;

            return (
              <div
                key={group.category}
                className="flex min-h-0 flex-col rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                  <Icon size={15} className={meta.accent} />
                  <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
                    {group.category}
                  </h2>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-neutral-500">
                  {meta.blurb}
                </p>
                <ul className="mt-3 grid flex-1 content-start gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-2 rounded bg-neutral-950/[0.035] px-2 py-1.5 text-xs text-neutral-800 dark:bg-white/[0.04] dark:text-neutral-200"
                    >
                      <span className={`h-1 w-1 rounded-full ${meta.accent.replace("text-", "bg-")}`} />
                      <span className="truncate">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.label}
              className="rounded-md border border-black/10 bg-white/45 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                {p.label}
              </p>
              <p className="mt-1 text-xs leading-snug text-neutral-700 dark:text-neutral-300">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SubpageShell>
  );
}
