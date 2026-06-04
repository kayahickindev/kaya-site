import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  GraduationCap,
  MapPin,
  Target,
  type LucideIcon,
} from "lucide-react";
import { ContributionGraph } from "@/components/ContributionGraph";
import { PathTimeline } from "@/components/PathTimeline";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { cardSurfaceFeatured } from "@/lib/surfaces";

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
  "Shipped two iOS apps to the App Store. Two crypto projects at $500K+ combined market cap. Self-funded my Miami University tuition. Graduated with honors.",
];

const highlightStats = [
  { value: "8 yrs", label: "professional experience" },
  { value: "3-for-3", label: "profitable companies" },
  { value: "467K+", label: "tracked LOC" },
  { value: "3,000+", label: "GitHub commits" },
];

export default function AboutPage() {
  return (
    <SubpageShell accent="amber">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-7">
            <div className="group flex w-fit items-center gap-3">
              <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-black/10 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.4)] ring-1 ring-amber-400/25 dark:border-white/15">
                <Image
                  src="/headshot.jpg"
                  alt="Kaya Hickin"
                  width={64}
                  height={64}
                  priority
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-amber-700/90 dark:text-amber-200/80">
                  Kaya Hickin
                </span>
                <span className="block text-xs text-neutral-500 dark:text-neutral-300">
                  Founder &amp; CTO · Cleveland, OH
                </span>
              </span>
            </div>
            <div className="relative">
              <div aria-hidden className="aurora" style={{ opacity: 0.6 }} />
              <h1 className="relative text-3xl font-semibold leading-[0.9] tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
                Builder, operator, founder.
              </h1>
            </div>
            <div className="max-w-prose space-y-3 text-base leading-relaxed text-neutral-700 xl:text-lg dark:text-neutral-300">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5">
            <div className="grid grid-cols-2 gap-2">
              {highlightStats.map((s) => (
                <div key={s.label} className={`${cardSurfaceFeatured} p-3`}>
                  <p className="text-base font-semibold text-amber-800 dark:text-amber-200 xl:text-lg">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase leading-snug tracking-wide text-neutral-600 dark:text-neutral-300">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {siteConfig.about.sidebar.map((item) => {
              const Icon = SIDEBAR_ICONS[item.icon] ?? MapPin;
              const detail = "detail" in item ? item.detail : undefined;
              return (
                <div key={item.label} className={`${cardSurfaceFeatured} p-3`}>
                  <div className="flex items-center gap-1.5">
                    <Icon size={12} className="text-amber-700 dark:text-amber-300" />
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-amber-800/80 dark:text-amber-200/80">
                      {item.label}
                    </p>
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-snug text-neutral-950 dark:text-white">
                    {item.value}
                  </p>
                  {detail ? (
                    <p className="mt-0.5 text-[11px] leading-snug text-neutral-600 dark:text-neutral-300">
                      {detail}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <PathTimeline />
        </div>

        <div className="relative overflow-hidden rounded-md border border-black/10 bg-gradient-to-b from-white/80 to-white/40 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur dark:border-white/10 dark:from-white/[0.05] dark:to-white/[0.015] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="flex flex-col gap-3">
            <ContributionGraph palette="amber" />
            <div className="flex items-center justify-end">
              <a
                href={siteConfig.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs text-neutral-500 dark:text-neutral-400 transition hover:text-amber-700 dark:hover:text-amber-300"
              >
                github.com/{siteConfig.github.username}
                <ArrowUpRight size={12} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SubpageShell>
  );
}
