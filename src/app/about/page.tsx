import type { Metadata } from "next";
import {
  Compass,
  GraduationCap,
  MapPin,
  Target,
  type LucideIcon,
} from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description:
    "About Kaya Hickin, co-founder and CTO of MyFutureSelf, AI-native builder, and three-for-three profitable founder.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

const SIDEBAR_ICONS: Record<string, LucideIcon> = {
  MapPin,
  GraduationCap,
  Target,
  Compass,
};

const paragraphs = [
  "Started working full-time in my family's business at 14. Graduated high school valedictorian. Built 20+ custom websites and launched 2 crypto projects ($500K+ combined market cap) freshman year of college.",
  "Three companies later, three for three on profitability. Now co-founder and CTO of MyFutureSelf, a voice AI mentor that speaks as your future self. Solo-built the iOS app, Firebase backend, and AI integration in six months.",
  "Previously co-founded Appointra with Giancarlo. Built the automated cold-email infra that drove $2M+ in pipeline for 8/9-figure founders. Wound it down to go all-in on MyFutureSelf.",
  "AI-native: 2,600+ contributions in the last year alongside Claude Code and Codex. I think about how AI can change real behavior, not engagement metrics.",
];

const highlightStats = [
  { value: "8 yrs", label: "professional experience" },
  { value: "3-for-3", label: "profitable companies" },
  { value: "8/8", label: "Dean's List semesters" },
  { value: "Valedictorian", label: "high school class of '22" },
];

export default function AboutPage() {
  return (
    <SubpageShell activePath="/about">
      <div className="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex min-h-0 flex-col lg:col-span-7 lg:pr-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
            About
          </div>
          <h1 className="mt-2 text-4xl font-semibold leading-[0.95] text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
            Builder, operator, founder.
          </h1>

          <div className="mt-4 space-y-2.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {highlightStats.map((s) => (
              <div
                key={s.label}
                className="rounded-md border border-amber-500/20 bg-amber-400/[0.06] p-2.5 backdrop-blur dark:border-amber-300/20 dark:bg-amber-300/[0.04]"
              >
                <p className="text-base font-semibold text-amber-800 dark:text-amber-200 xl:text-lg">
                  {s.value}
                </p>
                <p className="mt-0.5 text-[10px] uppercase leading-snug tracking-wide text-neutral-600 dark:text-neutral-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2 pt-4 sm:grid-cols-4">
            {siteConfig.about.sidebar.map((item) => {
              const Icon = SIDEBAR_ICONS[item.icon] ?? MapPin;
              return (
                <div
                  key={item.label}
                  className="rounded-md border border-black/10 bg-white/55 p-2.5 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <div className="flex items-center gap-1.5">
                    <Icon size={12} className="text-neutral-500" />
                    <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                      {item.label}
                    </p>
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-snug text-neutral-950 dark:text-white">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-0 flex-col rounded-md border border-black/10 bg-white/55 p-4 backdrop-blur lg:col-span-5 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center justify-between border-b border-black/10 pb-2 dark:border-white/10">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
              The path
            </h2>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
              2023 to present
            </span>
          </div>

          <ol className="relative mt-3 flex-1 space-y-3 border-l border-black/10 pl-4 dark:border-white/10">
            {siteConfig.timeline.map((entry) => (
              <li key={entry.company} className="relative">
                <span
                  className={`absolute -left-[21px] top-1 grid h-3 w-3 place-items-center rounded-full border-2 ${
                    entry.active
                      ? "border-amber-500 bg-amber-400 shadow-[0_0_10px_rgba(212,155,90,0.55)]"
                      : "border-neutral-400 bg-white dark:border-neutral-600 dark:bg-neutral-950"
                  }`}
                />
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-neutral-950 dark:text-white">
                    {entry.company}
                  </p>
                  <span className="text-[10px] font-mono uppercase tracking-wide text-neutral-500">
                    {entry.period}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                  {entry.role}
                </p>
                <p className="mt-1 text-xs leading-snug text-neutral-700 dark:text-neutral-300">
                  {entry.description}
                </p>
                {entry.metrics && entry.metrics.length > 0 ? (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {entry.metrics.slice(0, 3).map((m) => (
                      <span
                        key={m}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                          entry.active
                            ? "bg-amber-400/15 text-amber-700 dark:text-amber-200"
                            : "bg-neutral-950/[0.055] text-neutral-600 dark:bg-white/[0.06] dark:text-neutral-400"
                        }`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-black/10 pt-3 dark:border-white/10">
            {siteConfig.recognitions.map((r) => (
              <div
                key={r}
                className="rounded bg-neutral-950/[0.045] px-2 py-1.5 text-[10px] leading-snug text-neutral-700 dark:bg-white/[0.04] dark:text-neutral-300"
              >
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubpageShell>
  );
}
