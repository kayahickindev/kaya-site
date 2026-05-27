import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { cardSurfaceHover, cardSurfaceFeatured } from "@/lib/surfaces";
import { projectDetails } from "./_projectDetails";

export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description:
    "Selected work by Kaya Hickin, including MyFutureSelf, Dog AI, Appointra, and LeadBoost Pro.",
  alternates: {
    canonical: `${siteConfig.url}/work`,
  },
};

const heroAccent = "from-cyan-500/20 via-transparent to-amber-500/15";
const cardAccent = "from-amber-500/15 via-transparent to-amber-500/5";

const heroMetrics: Record<string, { value: string; label: string }> = {
  myfutureself: { value: "$65K", label: "ARR · 1,718 paid · 4.7★" },
  "dog-ai": { value: "Live", label: "App Store · paying product" },
  appointra: { value: "$20K", label: "MRR in 3 months" },
  "leadboost-pro": { value: "20+", label: "sites built · year-one profitable" },
};

const cardHighlights: Record<string, string[]> = {
  myfutureself: [
    "1,718 paid subscribers · $65K ARR",
    "4.7★ from 715 App Store reviews",
    "26K+ downloads · 52% avg monthly growth",
  ],
  "dog-ai": [
    "Custom LLM, trained on tens of thousands of dog images",
    "Behavior dataset from Harvard",
    "Live on the App Store as a paying product",
  ],
  appointra: [
    "$20k MRR in three months",
    "$2M+ in client pipeline generated",
    "Hundreds of qualified meetings booked",
  ],
  "leadboost-pro": [
    "Profitable from year one",
    "20+ custom websites freshman year",
    "Dorm-room start, still live",
  ],
};

export default function WorkPage() {
  const hero = projectDetails.find((d) => d.slug === "myfutureself");
  const rest = projectDetails.filter((d) => d.slug !== "myfutureself");

  return (
    <SubpageShell accent="amber">
      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
            Shipped products.
          </h1>
        </header>

        {hero ? (
          <Link
            href={`/work/${hero.slug}`}
            className={`${cardSurfaceFeatured} group block p-0 transition hover:-translate-y-0.5 hover:border-amber-400/50`}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${heroAccent}`}
            />
            <div className="relative grid grid-cols-1 gap-0 md:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-3 p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                    {hero.role} · {hero.timeframe}
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-2 py-0.5 text-[10px] font-medium text-amber-800 dark:text-amber-200">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 accent-pulse" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-300" />
                    </span>
                    Current focus
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
                    {hero.project.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                    {hero.project.tagline}
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tracking-tight text-amber-700 sm:text-4xl dark:text-amber-200">
                    {heroMetrics[hero.slug].value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                    {heroMetrics[hero.slug].label}
                  </span>
                </div>

                <ul className="grid gap-1 text-[13px] text-neutral-700 dark:text-neutral-300">
                  {cardHighlights[hero.slug].map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500 dark:bg-amber-300" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap gap-1">
                    {hero.project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/10 bg-white/55 px-2 py-0.5 text-[10px] font-medium text-neutral-700 dark:border-white/15 dark:bg-white/[0.06] dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex h-8 items-center gap-2 rounded-md bg-neutral-950 px-3 text-xs font-medium text-white transition group-hover:gap-3 dark:bg-white dark:text-neutral-950">
                    Case study
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>

              <div className="relative min-h-[220px] overflow-hidden md:min-h-0">
                {hero.project.image ? (
                  <Image
                    src={hero.project.image}
                    alt={`${hero.project.name} app screenshots`}
                    width={781}
                    height={1250}
                    unoptimized
                    className="absolute inset-0 m-auto h-full max-h-[340px] w-auto scale-[1.2] object-contain mix-blend-screen drop-shadow-2xl"
                  />
                ) : null}
              </div>
            </div>
          </Link>
        ) : null}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {rest.map((detail) => {
            const { project } = detail;
            const highlights = cardHighlights[detail.slug] ?? [];
            const hero = heroMetrics[detail.slug];

            return (
              <Link
                key={detail.slug}
                href={`/work/${detail.slug}`}
                className={`${cardSurfaceHover} group flex flex-col p-4`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cardAccent}`}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                      {detail.role}
                    </p>
                    <p className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                      {detail.timeframe}
                    </p>
                  </div>
                </div>

                <h2 className="relative mt-2 text-xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-2xl dark:text-white">
                  {project.name}
                </h2>
                <p className="relative mt-0.5 text-xs leading-snug text-neutral-600 dark:text-neutral-400">
                  {project.tagline}
                </p>

                <div className="relative mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                    {hero.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                    {hero.label}
                  </span>
                </div>

                <ul className="relative mt-2 grid gap-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-3 flex items-center justify-end border-t border-black/10 pt-2 dark:border-white/10">
                  <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-black/15 bg-white/55 px-2.5 text-[11px] font-medium text-neutral-800 transition group-hover:border-black/30 group-hover:bg-white group-hover:gap-2 dark:border-white/15 dark:bg-white/[0.05] dark:text-neutral-200 dark:group-hover:border-white/30 dark:group-hover:bg-white/[0.1]">
                    Detail
                    <ArrowUpRight size={11} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </SubpageShell>
  );
}
