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

export default function WorkPage() {
  return (
    <SubpageShell activePath="/work">
      <div className="flex h-full min-h-0 flex-col gap-4">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
              Work
            </div>
            <h1 className="mt-1 text-3xl font-semibold leading-[0.95] text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
              Shipped products, not{" "}
              <span className="font-serif italic font-normal text-amber-700 dark:text-amber-200">
                case studies
              </span>
              .
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Four companies, three profitable, one App Store hit, all built end to end. Click any card to read the detail page.
          </p>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2">
          {projectDetails.map((detail) => {
            const { project } = detail;
            const accent = accents[detail.slug] ?? "from-amber-500/10 via-transparent to-cyan-500/10";

            return (
              <Link
                key={detail.slug}
                href={`/work/${detail.slug}`}
                className="group relative flex min-h-0 flex-col overflow-hidden rounded-md border border-black/10 bg-white/55 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-black/25 hover:bg-white/75 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/25 dark:hover:bg-white/[0.07]"
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
                    <h2 className="mt-1 truncate text-2xl font-semibold leading-tight text-neutral-950 xl:text-3xl dark:text-white">
                      {project.name}
                    </h2>
                  </div>
                  {project.status ? (
                    <span className="shrink-0 rounded-md border border-black/10 bg-white/55 px-2 py-1 text-[10px] font-medium text-neutral-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300">
                      {project.status}
                    </span>
                  ) : null}
                </div>

                <p className="relative mt-2 font-serif text-lg italic leading-snug text-amber-700 dark:text-amber-200">
                  {project.tagline}
                </p>

                <p className="relative mt-2 text-sm leading-snug text-neutral-700 dark:text-neutral-300">
                  {project.description}
                </p>

                <ul className="relative mt-3 grid flex-1 gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                  {detail.outcomes.slice(0, 3).map((outcome) => (
                    <li key={outcome} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500 dark:bg-amber-300" />
                      <span className="leading-snug">{outcome}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-3 flex items-center justify-between gap-2 border-t border-black/10 pt-2 dark:border-white/10">
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
                    Read detail
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
