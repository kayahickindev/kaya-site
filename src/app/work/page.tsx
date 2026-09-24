import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Globe, Smartphone, type LucideIcon } from "lucide-react";
import { CompanyMark, hasCompanyMark } from "@/components/CompanyMark";
import { PhoneFan } from "@/components/PhoneFan";
import { StoreShotRow } from "@/components/StoreShotRow";
import { SubpageShell } from "@/components/SubpageShell";
import { dogAi, myFutureSelf } from "@/data/assets";
import { siteConfig } from "@/data/content";
import { getMarketingMetrics } from "@/lib/marketing-metrics";
import type { MarketingMetricsSnapshot } from "@/lib/marketing-metrics";
import { cardSurfaceHover, cardSurfaceFeaturedEmerald } from "@/lib/surfaces";
import { projectDetails } from "./_projectDetails";

type ProjectDetailItem = (typeof projectDetails)[number];

export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description:
    "Selected work by Kaya Hickin, including MyFutureSelf, Dog AI, Appointra, and LeadBoost Pro.",
  alternates: {
    canonical: `${siteConfig.url}/work`,
  },
};

function heroMetrics(
  metrics: MarketingMetricsSnapshot,
): Record<string, { value: string; label: string }> {
  return {
    myfutureself: {
      value: metrics.metrics.arr.display,
      label: `ARR · ${metrics.metrics.paidSubscribersEver.display} active paid · ${metrics.metrics.appStoreRating.display}★`,
    },
    "viral-loop": { value: "Live", label: "MVP shipped" },
    "dog-ai": { value: "Live", label: "App Store · paying product" },
    appointra: { value: "$20K", label: "MRR in 3 months" },
    "leadboost-pro": {
      value: "20+",
      label: "sites built · month-one profitable",
    },
  };
}

function cardHighlights(
  metrics: MarketingMetricsSnapshot,
): Record<string, string[]> {
  return {
    myfutureself: [
      `${metrics.metrics.appDownloads.display} downloads · ${metrics.metrics.appStoreReviews.display} ratings`,
      "Backed by Cintrifuse Capital",
    ],
    "viral-loop": [
      "Done-for-you AI UGC content pipeline",
      "Organic influencer distribution",
    ],
    "dog-ai": ["Custom multimodal LLM", "Trained on Harvard dataset"],
    // Dog AI 1.9.3 and MyFutureSelf 2.30 are the current App Store listings.
    appointra: [
      "$2M+ in client pipeline generated",
      "Cold-email infra for 8/9-figure founders",
    ],
    "leadboost-pro": [
      "Web dev, marketing, and consulting",
      "Blue collar businesses",
    ],
  };
}

const projectKind: Record<string, { label: string; icon: LucideIcon }> = {
  myfutureself: { label: "iOS App", icon: Smartphone },
  "viral-loop": { label: "Web Service", icon: Globe },
  "dog-ai": { label: "iOS App", icon: Smartphone },
  appointra: { label: "Agency", icon: Briefcase },
  "leadboost-pro": { label: "Agency", icon: Briefcase },
};

function KindChip({ slug }: { slug: string }) {
  const kind = projectKind[slug];
  if (!kind) return null;
  const Icon = kind.icon;
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-800 dark:border-emerald-300/25 dark:bg-emerald-300/10 dark:text-emerald-200">
      <Icon size={11} strokeWidth={2.25} />
      {kind.label}
    </span>
  );
}

export default async function WorkPage() {
  const metrics = await getMarketingMetrics();
  const liveHeroMetrics = heroMetrics(metrics);
  const liveCardHighlights = cardHighlights(metrics);
  const lead = projectDetails.find((d) => d.slug === "myfutureself");
  const dog = projectDetails.find((d) => d.slug === "dog-ai");
  const rest = projectDetails.filter(
    (d) => d.slug !== "myfutureself" && d.slug !== "dog-ai",
  );

  return (
    <SubpageShell accent="emerald">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-5">
        <header className="relative">
          <div aria-hidden className="aurora" style={{ opacity: 0.55 }} />
          <h1 className="relative text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
            Shipped products.
          </h1>
        </header>

        {lead ? (
          <Link
            href={`/work/${lead.slug}`}
            className={`${cardSurfaceFeaturedEmerald} group block transition hover:-translate-y-0.5 hover:border-emerald-400/50`}
          >
            <div className="grid grid-cols-1 items-center md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-8">
                <FeatureEyebrow detail={lead} />
                <FeatureName detail={lead} />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-4xl font-semibold tracking-tight text-emerald-700 lg:text-5xl dark:text-emerald-200">
                    {metrics.metrics.arr.display} ARR
                  </span>
                  <span className="text-sm font-medium text-neutral-700 sm:text-base dark:text-neutral-300">
                    {metrics.metrics.paidSubscribersEver.display} active paid ·{" "}
                    {metrics.metrics.appStoreRating.display}★
                  </span>
                </div>

                <FeatureBullets items={liveCardHighlights[lead.slug]} />
              </div>

              <div className="@container px-4 pb-8 pt-2 sm:px-6 md:py-10 md:pr-8">
                <PhoneFan
                  shots={{
                    left: myFutureSelf.store[2],
                    center: myFutureSelf.store[1],
                    right: myFutureSelf.store[3],
                  }}
                  glow="emerald"
                  sizeClassName="[--fan-h:min(80cqw,440px)]"
                />
              </div>
            </div>
          </Link>
        ) : null}

        {dog ? (
          <Link
            href={`/work/${dog.slug}`}
            className={`${cardSurfaceHover} group block`}
          >
            <div className="grid grid-cols-1 items-center md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
              <div className="order-2 pb-6 md:order-1 md:py-8 md:pl-8 md:pr-2">
                <StoreShotRow shots={dogAi.store} />
              </div>

              <div className="order-1 flex flex-col gap-4 p-5 sm:p-6 md:order-2 lg:p-8">
                <FeatureEyebrow detail={dog} />
                <FeatureName detail={dog} />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-4xl font-semibold tracking-tight text-neutral-950 lg:text-5xl dark:text-white">
                    {liveHeroMetrics[dog.slug].value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-neutral-500 sm:text-xs dark:text-neutral-400">
                    {liveHeroMetrics[dog.slug].label}
                  </span>
                </div>

                <FeatureBullets items={liveCardHighlights[dog.slug]} />
              </div>
            </div>
          </Link>
        ) : null}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {rest.map((detail) => {
            const { project } = detail;
            const highlights = liveCardHighlights[detail.slug] ?? [];
            const hero = liveHeroMetrics[detail.slug];

            return (
              <Link
                key={detail.slug}
                href={`/work/${detail.slug}`}
                className={`${cardSurfaceHover} group flex flex-col p-4`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,0%),rgba(16,185,129,0.14),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,0%),rgba(52,211,153,0.14),transparent_55%)]"
                />

                <div className="relative flex items-center justify-between gap-2">
                  <p className="truncate text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                    {detail.role}
                    {detail.timeframe ? ` · ${detail.timeframe}` : ""}
                  </p>
                  <KindChip slug={detail.slug} />
                </div>

                <div className="relative mt-2 flex items-center gap-2">
                  {hasCompanyMark(project.name) ? (
                    <CompanyMark company={project.name} size={22} />
                  ) : null}
                  <h2 className="text-xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-2xl dark:text-white">
                    {project.name}
                  </h2>
                </div>

                <div className="relative mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                    {hero.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    {hero.label}
                  </span>
                </div>

                <ul className="relative mt-2 grid gap-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-500/60 dark:bg-emerald-300/60" />
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </div>
    </SubpageShell>
  );
}

function FeatureEyebrow({ detail }: { detail: ProjectDetailItem }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="pt-0.5 text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
        {detail.role}
        {detail.timeframe ? ` · ${detail.timeframe}` : ""}
      </p>
      <KindChip slug={detail.slug} />
    </div>
  );
}

function FeatureName({ detail }: { detail: ProjectDetailItem }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        {hasCompanyMark(detail.project.name) ? (
          <CompanyMark company={detail.project.name} size={36} />
        ) : null}
        <h2 className="text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl dark:text-white">
          {detail.project.name}
        </h2>
      </div>
      <p className="mt-2 text-sm text-neutral-700 sm:text-base dark:text-neutral-300">
        {detail.project.tagline}
      </p>
    </div>
  );
}

function FeatureBullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-1.5 text-sm text-neutral-700 dark:text-neutral-300">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
