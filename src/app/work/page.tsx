import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { projectDetails } from "./_projectDetails";

export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description:
    "Selected work by Kaya Hickin, including MyFutureSelf, Dog AI, Appointra, and LeadBoost Pro.",
  alternates: {
    canonical: `${siteConfig.url}/work`,
  },
};

const accents: Record<string, string> = {
  myfutureself: "from-cyan-500/15 via-transparent to-amber-500/10",
  "dog-ai": "from-emerald-500/15 via-transparent to-amber-500/10",
  appointra: "from-blue-500/15 via-transparent to-purple-500/10",
  "leadboost-pro": "from-amber-500/15 via-transparent to-emerald-500/10",
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
  return (
    <SubpageShell>
      <div className="flex h-full min-h-0 flex-col gap-4">
        <header>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
            Work
          </div>
          <h1 className="mt-1 text-3xl font-semibold leading-[0.95] text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
            Shipped products, not case studies.
          </h1>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2">
          {projectDetails.map((detail) => {
            const { project } = detail;
            const accent = accents[detail.slug] ?? "from-amber-500/10 via-transparent to-cyan-500/10";
            const highlights = cardHighlights[detail.slug] ?? [];

            return (
              <Link
                key={detail.slug}
                href={`/work/${detail.slug}`}
                className="group relative flex min-h-0 flex-col overflow-hidden rounded-md border border-black/10 bg-white/55 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-black/25 hover:bg-white/75 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/25 dark:hover:bg-white/[0.07]"
              >
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-60`}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                      {detail.role} · {detail.timeframe}
                    </p>
                    <h2 className="mt-1 text-3xl font-semibold leading-tight text-neutral-950 xl:text-4xl dark:text-white">
                      {project.name}
                    </h2>
                  </div>
                  {project.status ? (
                    <span className="shrink-0 rounded-md border border-black/10 bg-white/55 px-2 py-1 text-[10px] font-medium text-neutral-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300">
                      {project.status}
                    </span>
                  ) : null}
                </div>

                <p className="relative mt-3 text-base leading-snug text-neutral-700 dark:text-neutral-300">
                  {project.tagline}
                </p>

                <ul className="relative mt-3 grid flex-1 content-start gap-1.5 text-sm text-neutral-700 dark:text-neutral-200">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500 dark:bg-amber-300" />
                      <span className="leading-snug">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-4 flex items-center justify-between gap-2 border-t border-black/10 pt-3 dark:border-white/10">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-neutral-950/[0.055] px-1.5 py-0.5 text-[10px] text-neutral-600 dark:bg-white/[0.06] dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-800 transition group-hover:gap-2 dark:text-neutral-200">
                    Detail
                    <ArrowUpRight size={13} />
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
