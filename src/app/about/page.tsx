import type { Metadata } from "next";
import {
  Compass,
  GraduationCap,
  MapPin,
  Target,
  type LucideIcon,
} from "lucide-react";
import { ContributionGraph } from "@/components/ContributionGraph";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { cardSurface, cardSurfaceFeatured } from "@/lib/surfaces";

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
  "Working full-time in my family's business at 14, valedictorian out of high school, shipping companies ever since. Now co-founder and CTO of MyFutureSelf, a voice AI mentor that speaks as your future self. Solo-built iOS, Firebase backend, and AI integration in six months.",
  "AI-native by default. 2,600+ contributions in the last year alongside Claude Code and Codex. I build consumer AI for behavior change, not engagement metrics.",
];

const highlightStats = [
  { value: "8 yrs", label: "professional experience" },
  { value: "3-for-3", label: "profitable companies" },
  { value: "8/8", label: "Dean's List semesters" },
  { value: "Valedictorian", label: "high school class of '22" },
];

const companyMarks: Record<string, { letter: string; accent: string }> = {
  MyFutureSelf: { letter: "M", accent: "bg-amber-400/20 text-amber-700 dark:text-amber-200" },
  "RedHawk Business Accelerator": { letter: "R", accent: "bg-red-500/15 text-red-700 dark:text-red-300" },
  Appointra: { letter: "A", accent: "bg-blue-500/15 text-blue-700 dark:text-blue-300" },
  "LeadBoost Pro": { letter: "L", accent: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
};

export default function AboutPage() {
  return (
    <SubpageShell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-7 lg:pr-2">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
              About
            </div>
            <h1 className="mt-1 text-4xl font-semibold leading-[0.9] tracking-tight text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
              Builder, operator, founder.
            </h1>
          </div>

          <div className="max-w-prose space-y-4 text-base leading-relaxed text-neutral-700 xl:text-lg dark:text-neutral-300">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {highlightStats.map((s) => (
              <div key={s.label} className={`${cardSurfaceFeatured} p-3`}>
                <p className="text-base font-semibold text-amber-800 dark:text-amber-200 xl:text-lg">
                  {s.value}
                </p>
                <p className="mt-0.5 text-[10px] uppercase leading-snug tracking-wide text-neutral-600 dark:text-neutral-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {siteConfig.about.sidebar.map((item) => {
              const Icon = SIDEBAR_ICONS[item.icon] ?? MapPin;
              return (
                <div key={item.label} className={`${cardSurface} p-3`}>
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

          <div className={`${cardSurface} p-4`}>
            <ContributionGraph contributionCount="2,600+" />
          </div>
        </div>

        <div className={`${cardSurface} flex flex-col gap-3 p-4 lg:col-span-5`}>
          <div className="flex items-center justify-between border-b border-black/10 pb-2 dark:border-white/10">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
              The path
            </h2>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
              2023 to present
            </span>
          </div>

          <ol className="relative space-y-3 border-l border-black/10 pl-4 dark:border-white/10">
            {siteConfig.timeline.map((entry) => {
              const mark = companyMarks[entry.company];
              return (
                <li key={entry.company} className="relative">
                  <span
                    className={`absolute -left-[21px] top-1 grid h-3 w-3 place-items-center rounded-full border-2 ${
                      entry.active
                        ? "border-amber-500 bg-amber-400 shadow-[0_0_10px_rgba(212,155,90,0.55)]"
                        : "border-neutral-400 bg-white dark:border-neutral-600 dark:bg-neutral-950"
                    }`}
                  />
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {mark ? (
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded text-[10px] font-bold ${mark.accent}`}
                        >
                          {mark.letter}
                        </span>
                      ) : null}
                      <p className="text-sm font-semibold text-neutral-950 dark:text-white">
                        {entry.company}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wide text-neutral-500">
                      {entry.period}
                    </span>
                  </div>
                  <p className="ml-7 text-xs text-neutral-500 dark:text-neutral-500">
                    {entry.role}
                  </p>
                  <p className="ml-7 mt-1 text-xs leading-snug text-neutral-700 dark:text-neutral-300">
                    {entry.description}
                  </p>
                  {entry.metrics && entry.metrics.length > 0 ? (
                    <div className="ml-7 mt-1.5 flex flex-wrap gap-1">
                      {entry.metrics.slice(0, 3).map((m) => (
                        <span
                          key={m}
                          className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                            entry.active
                              ? "bg-amber-400/15 text-amber-700 dark:text-amber-200"
                              : "bg-neutral-950/[0.05] text-neutral-600 dark:bg-white/[0.06] dark:text-neutral-400"
                          }`}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <div className="mt-1 grid grid-cols-1 gap-2 border-t border-black/10 pt-3 sm:grid-cols-2 dark:border-white/10">
            {siteConfig.recognitions.map((r) => (
              <div
                key={r}
                className="rounded bg-neutral-950/[0.04] px-2 py-1.5 text-[10px] leading-snug text-neutral-700 dark:bg-white/[0.04] dark:text-neutral-300"
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
