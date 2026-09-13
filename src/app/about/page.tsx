import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { profile, programs } from "@/data/profile";
import { profilePageJsonLd } from "@/lib/profile-content";
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

const highlightStats = [
  { value: profile.github.display, label: "GitHub contributions in one year*" },
  { value: profile.tokens.display, label: "Codex + Claude tokens, reported*" },
  { value: "Cum laude", label: "Miami University · 2026" },
  { value: "15 countries", label: "traveled outside the US" },
];

export default function AboutPage() {
  return (
    <SubpageShell accent="amber">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd("/about", "About Kaya Hickin")).replace(/</g, "\\u003c") }} />
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
                  Co-founder &amp; CTO · {profile.location}
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
              {profile.about.map((p) => (
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

            <Link href="/proof#engineering" className="text-xs text-neutral-600 underline underline-offset-4 dark:text-neutral-400">*Recorded September 13, 2026. Details and sources.</Link>
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

        <section className={`${cardSurfaceFeatured} space-y-4 p-5`} aria-labelledby="founder-programs">
          <h2 id="founder-programs" className="text-xl font-semibold">Built alongside other founders.</h2>
          <div className="grid gap-4 sm:grid-cols-2">{programs.map((p) => <div key={p.name}><h3 className="font-medium">{p.name}</h3><p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{p.detail}</p></div>)}</div>
          <Link href="/proof" className="inline-flex items-center gap-1 text-sm font-medium text-amber-800 underline underline-offset-4 dark:text-amber-200">Awards, scholarships, and credentials <ArrowUpRight size={14} /></Link>
        </section>

        <section className={`${cardSurfaceFeatured} space-y-3 p-5`} aria-labelledby="beyond-building">
          <h2 id="beyond-building" className="text-xl font-semibold">Beyond building.</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{profile.travel.description}</p>
          <ul className="flex flex-wrap gap-2">{profile.travel.countries.map((country) => <li key={country} className="rounded-full border border-black/10 px-3 py-1 text-xs dark:border-white/15">{country}</li>)}</ul>
        </section>

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
