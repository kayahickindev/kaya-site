import type { Metadata } from "next";
import {
  Award,
  GraduationCap,
  MapPin,
  Target,
  type LucideIcon,
} from "lucide-react";
import { CompanyMark, hasCompanyMark } from "@/components/CompanyMark";
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
};

const paragraphs = [
  "Working full-time in my family's business at 14, valedictorian out of high school, shipping companies ever since. I build consumer AI for behavior change.",
  "Shipped two iOS apps to the App Store. Two crypto projects at $500K+ combined market cap. 200K+ lines of code and 2,600+ contributions this year. Self-funded my Miami University tuition. Graduated with honors.",
];

const highlightStats = [
  { value: "8 yrs", label: "professional experience" },
  { value: "3-for-3", label: "profitable companies" },
  { value: "200K+", label: "LOC shipped this year" },
  { value: "2,600+", label: "contributions this year" },
];

const companyMarks: Record<string, { letter: string; accent: string }> = {
  MyFutureSelf: { letter: "M", accent: "bg-amber-400/20 text-amber-700 dark:text-amber-200" },
  "RedHawk Business Accelerator": { letter: "R", accent: "bg-red-500/15 text-red-700 dark:text-red-300" },
  Appointra: { letter: "A", accent: "bg-blue-500/15 text-blue-700 dark:text-blue-300" },
  "LeadBoost Pro": { letter: "L", accent: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
};

export default function AboutPage() {
  return (
    <SubpageShell accent="amber">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="relative">
          <div aria-hidden className="aurora" style={{ opacity: 0.6 }} />
          <h1 className="relative text-4xl font-semibold leading-[0.9] tracking-tight text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
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

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {siteConfig.about.sidebar.map((item) => {
            const Icon = SIDEBAR_ICONS[item.icon] ?? MapPin;
            const detail = "detail" in item ? item.detail : undefined;
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
                {detail ? (
                  <p className="mt-0.5 text-[10px] leading-snug text-neutral-500 dark:text-neutral-500">
                    {detail}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
              The path
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-800 backdrop-blur dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-200">
              <Award size={12} />
              Winner · RedHawk 2025
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {siteConfig.timeline.map((entry) => {
              const mark = companyMarks[entry.company];
              const showLogo = hasCompanyMark(entry.company);
              return (
                <div key={entry.company} className={`${cardSurface} flex flex-col gap-2 p-4`}>
                  <div className="flex items-center justify-between border-b border-black/10 pb-2 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span
                        className={`grid h-3 w-3 shrink-0 place-items-center rounded-full border-2 ${
                          entry.active
                            ? "border-amber-500 bg-amber-400 shadow-[0_0_10px_rgba(212,155,90,0.55)]"
                            : "border-neutral-400 bg-white dark:border-neutral-600 dark:bg-neutral-950"
                        }`}
                      />
                      <span className="text-[10px] font-mono uppercase tracking-wide text-neutral-500">
                        {entry.period}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {showLogo ? (
                      <CompanyMark company={entry.company} size={28} />
                    ) : mark ? (
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded text-xs font-bold ${mark.accent}`}
                      >
                        {mark.letter}
                      </span>
                    ) : null}
                    <p className="text-base font-semibold text-neutral-950 dark:text-white">
                      {entry.company}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    {entry.role}
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {entry.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </SubpageShell>
  );
}
