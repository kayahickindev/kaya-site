import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { DetailDialog } from "@/components/DetailDialog";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { getMarketingMetrics } from "@/lib/marketing-metrics";
import { cardSurfaceFeatured } from "@/lib/surfaces";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description:
    "About Kaya Hickin, co-founder and CTO of MyFutureSelf, an AI agent that is your future self. MyFutureSelf is his third profitable company.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

// GitHub contributions are contributions, never commits: the figure counts
// commits, pull requests, issues and reviews. 50,991 in the last year (to
// November 2026), read from GitHub's contribution calendar on 2026-11-02.
// The token figure is coding-tool usage across Codex and Claude, and is
// separate from the training of the Dog AI model.
const highlightStats = [
  { value: "9 yrs", label: "professional experience" },
  { value: "3-for-3", label: "profitable companies" },
  { value: "100B+", label: "Codex and Claude tokens" },
  { value: "50K+", label: "GitHub contributions" },
];

export default async function AboutPage() {
  const metrics = await getMarketingMetrics();
  const m = metrics.metrics;
  const summary = siteConfig.about.summary(m.payingSubscribers.display);
  const paragraphs = siteConfig.about.paragraphs(m.payingSubscribers.display);

  const experienceHighlights: Record<string, string[]> = {
    myfutureself: [
      `${m.arr.display} ARR · ${m.payingSubscribers.display} paying subscribers`,
      `${m.appDownloads.display} downloads · ${m.fiveStarRatings.display} 5-star ratings`,
      "Backed by Cintrifuse Capital",
    ],
    appointra: [
      "$20K MRR in three months",
      "$2M+ in client pipeline generated",
      "Cold-email infra for 8/9-figure founders",
    ],
    "leadboost-pro": [
      "Profitable from month one",
      "20+ custom websites built freshman year",
      "Web dev, marketing and consulting for blue collar businesses",
    ],
  };

  return (
    <SubpageShell accent="amber">
      <div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 gap-5 lg:grid-cols-12 lg:content-center lg:gap-x-8 lg:gap-y-4 xl:gap-y-5">
        <div className="flex flex-col gap-4 lg:col-span-7 lg:row-start-1 xl:gap-5">
          <div className="group flex w-fit items-center gap-3">
            <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-black/10 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.4)] ring-1 ring-amber-400/25 dark:border-white/15">
              <Image
                src="/headshot.jpg"
                alt="Kaya Hickin"
                width={56}
                height={56}
                priority
                className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-amber-700/90 dark:text-amber-200/80">
                Kaya Hickin
              </span>
              <span className="block text-xs text-neutral-500 dark:text-neutral-300">
                Co-founder &amp; CTO, MyFutureSelf · Cincinnati, OH
              </span>
            </span>
          </div>

          <div className="relative">
            <div aria-hidden className="aurora" style={{ opacity: 0.6 }} />
            <h1 className="relative text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
              Builder, operator, founder.
            </h1>
          </div>

          <div className="max-w-[44rem] space-y-3 text-base leading-relaxed text-neutral-700 xl:text-[17px] dark:text-neutral-300">
            {summary.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DetailDialog
              accent="amber"
              size="lg"
              triggerLabel="Read the full story"
              triggerClassName="inline-flex h-10 items-center gap-2 rounded-md border border-amber-400/40 bg-amber-400/15 px-4 text-sm font-medium text-amber-800 backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-amber-400/25 dark:text-amber-200 dark:hover:bg-amber-400/20"
              trigger={
                <>
                  <BookOpen size={16} />
                  Read the full story
                </>
              }
              eyebrow="Kaya Hickin · Co-founder & CTO"
              title="The full story"
            >
              <div className="space-y-3 text-[15px] leading-relaxed">
                {paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p>
                  On the side I trained a multimodal model on a Harvard
                  behavioral dataset and built Dog AI, a paying App Store app,
                  around it.
                </p>
              </div>
              <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-800 dark:text-amber-200">
                Recognition
              </h3>
              <ul className="mt-2 grid gap-1.5">
                {siteConfig.recognitions.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500 dark:bg-amber-300" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-800 dark:text-amber-200">
                Education
              </h3>
              <p className="mt-2">
                Miami University, cum laude.{" "}
                {siteConfig.about.sidebar[0]?.detail}
              </p>
              <p className="mt-6">
                DHS Trusted Tester with an assessed Microsoft credential in AI
                security.{" "}
                <Link
                  href="/credentials"
                  className="font-medium text-amber-800 underline underline-offset-4 dark:text-amber-200"
                >
                  View my credentials
                </Link>
                .
              </p>
            </DetailDialog>
            <Link
              href="/credentials"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-black/10 px-4 text-sm font-medium text-neutral-700 transition hover:-translate-y-0.5 hover:bg-black/5 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/10"
            >
              Credentials
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center">
          <ExperienceTimeline highlights={experienceHighlights} />
        </div>

        <div className="lg:col-span-7 lg:self-end">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {highlightStats.map((s) => (
              <div key={s.label} className={`${cardSurfaceFeatured} p-3`}>
                <p className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                  {s.value}
                </p>
                <p className="mt-0.5 text-[10px] uppercase leading-snug tracking-wide text-neutral-600 dark:text-neutral-300">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubpageShell>
  );
}
