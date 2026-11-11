import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Globe,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { CompanyMark, hasCompanyMark } from "@/components/CompanyMark";
import { DetailDialog } from "@/components/DetailDialog";
import { PhoneMockups } from "@/components/PhoneMockups";
import { StoreShotRow } from "@/components/StoreShotRow";
import { SubpageShell } from "@/components/SubpageShell";
import { dogAi, myFutureSelfScreens as screens } from "@/data/assets";
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
      label: "ARR",
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
      `${metrics.metrics.appDownloads.display} downloads`,
      `${metrics.metrics.fiveStarRatings.display} 5-star ratings across iOS and Android`,
      "Backed by Cintrifuse Capital",
    ],
    "viral-loop": [
      "Done-for-you AI UGC content pipeline",
      "Organic influencer distribution",
    ],
    "dog-ai": ["Custom multimodal LLM", "Trained on Harvard dataset"],
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
  myfutureself: { label: "iOS + Android", icon: Smartphone },
  "viral-loop": { label: "Web Service", icon: Globe },
  "dog-ai": { label: "iOS App", icon: Smartphone },
  appointra: { label: "Agency", icon: Briefcase },
  "leadboost-pro": { label: "Agency", icon: Briefcase },
};

// The order the side column lists the rest of the work in.
const SIDE_ORDER = ["dog-ai", "appointra", "leadboost-pro", "viral-loop"];

function KindChip({ slug }: { slug: string }) {
  const kind = projectKind[slug];
  if (!kind) return null;
  const Icon = kind.icon;
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-800 dark:border-emerald-300/25 dark:bg-emerald-300/10 dark:text-emerald-200">
      <Icon size={11} strokeWidth={2.25} />
      {kind.label}
    </span>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Everything the old card and case-study teaser carried, in the dialog.
function ProjectDialogBody({
  detail,
  highlights,
}: {
  detail: ProjectDetailItem;
  highlights: string[];
}) {
  const links = detail.project.links as {
    website?: string;
    appStore?: string;
  };
  return (
    <>
      <p className="text-[15px] text-neutral-800 dark:text-neutral-200">
        {detail.project.tagline}
      </p>
      <div className="mt-3 space-y-3">
        {detail.overview.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {detail.slug === "dog-ai" ? (
        <div className="mt-5">
          <StoreShotRow shots={dogAi.store} />
        </div>
      ) : null}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-200">
            Outcomes
          </h3>
          <div className="mt-2">
            <Bullets items={[...new Set([...highlights, ...detail.outcomes])]} />
          </div>
        </div>
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-200">
            What I owned
          </h3>
          <div className="mt-2">
            <Bullets items={detail.ownership} />
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {detail.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-black/10 bg-white/70 px-2 py-0.5 text-[11px] font-medium text-neutral-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-300"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/work/${detail.slug}`}
          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-emerald-400/40 bg-emerald-400/15 px-3 text-sm font-medium text-emerald-800 transition hover:bg-emerald-400/25 dark:text-emerald-200"
        >
          Read the case study <ArrowRight size={14} />
        </Link>
        {links.appStore ? (
          <a
            href={links.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-black/10 px-3 text-sm font-medium text-neutral-700 transition hover:bg-black/5 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/10"
          >
            App Store <ArrowUpRight size={14} />
          </a>
        ) : null}
        {links.website ? (
          <a
            href={links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-black/10 px-3 text-sm font-medium text-neutral-700 transition hover:bg-black/5 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/10"
          >
            Website <ArrowUpRight size={14} />
          </a>
        ) : null}
      </div>
    </>
  );
}

function dialogTitle(detail: ProjectDetailItem) {
  return (
    <span className="flex items-center gap-3">
      {hasCompanyMark(detail.project.name) ? (
        <CompanyMark company={detail.project.name} size={32} />
      ) : null}
      {detail.project.name}
    </span>
  );
}

export default async function WorkPage() {
  const metrics = await getMarketingMetrics();
  const m = metrics.metrics;
  const liveHeroMetrics = heroMetrics(metrics);
  const liveCardHighlights = cardHighlights(metrics);
  const lead = projectDetails.find((d) => d.slug === "myfutureself");
  const rest = SIDE_ORDER.map((slug) =>
    projectDetails.find((d) => d.slug === slug),
  ).filter((d): d is ProjectDetailItem => Boolean(d));

  return (
    <SubpageShell accent="emerald">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-3">
        <header className="relative flex flex-wrap items-end justify-between gap-2">
          <div aria-hidden className="aurora" style={{ opacity: 0.55 }} />
          <h1 className="relative text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
            Shipped products.
          </h1>
          <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
            Click any product for the details
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          {lead ? (
            <DetailDialog
              overlay
              accent="emerald"
              size="lg"
              triggerLabel={`${lead.project.name}: open details`}
              triggerClassName={`${cardSurfaceFeaturedEmerald} group transition hover:-translate-y-0.5 hover:border-emerald-400/50 lg:col-span-7`}
              eyebrow={`${lead.role} · ${lead.timeframe}`}
              title={dialogTitle(lead)}
              trigger={
                <div className="grid h-full grid-cols-1 items-center sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="flex flex-col gap-3 p-5 lg:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                        {lead.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CompanyMark company={lead.project.name} size={40} />
                      <h2 className="text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 xl:text-4xl dark:text-white">
                        {lead.project.name}
                      </h2>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      {lead.project.tagline}
                    </p>
                    <div>
                      <p className="text-4xl font-semibold tracking-tight text-emerald-700 xl:text-5xl dark:text-emerald-200">
                        {m.arr.display}{" "}
                        <span className="text-2xl xl:text-3xl">ARR</span>
                      </p>
                      <p className="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {m.payingSubscribers.display} paying subscribers
                      </p>
                    </div>
                    <div className="text-sm text-neutral-700 dark:text-neutral-300">
                      <Bullets items={liveCardHighlights[lead.slug]} />
                    </div>
                    <div className="flex items-center gap-2">
                      <KindChip slug={lead.slug} />
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 transition group-hover:translate-x-0.5 dark:text-emerald-200">
                        Details <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                  <div className="@container hidden h-full items-end overflow-hidden px-2 pt-6 sm:flex">
                    <PhoneMockups
                      left={screens.actions}
                      center={[screens.home, screens.chat, screens.forYou]}
                      right={screens.reflect}
                      glow="emerald"
                      sizeClassName="[--fan-h:min(80cqw,calc(100dvh-260px),460px)]"
                    />
                  </div>
                </div>
              }
            >
              <ProjectDialogBody
                detail={lead}
                highlights={[
                  `${m.arr.display} ARR · ${m.payingSubscribers.display} paying subscribers`,
                  ...liveCardHighlights[lead.slug],
                ]}
              />
            </DetailDialog>
          ) : null}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.map((detail) => {
              const hero = liveHeroMetrics[detail.slug];
              return (
                <DetailDialog
                  key={detail.slug}
                  accent="emerald"
                  size="lg"
                  triggerLabel={`${detail.project.name}: open details`}
                  triggerClassName={`${cardSurfaceHover} group flex w-full flex-col px-4 py-3`}
                  eyebrow={`${detail.role} · ${detail.timeframe}`}
                  title={dialogTitle(detail)}
                  trigger={
                    <>
                      <span className="flex items-center justify-between gap-2">
                        <span className="flex min-w-0 items-center gap-2.5">
                          {hasCompanyMark(detail.project.name) ? (
                            <CompanyMark company={detail.project.name} size={26} />
                          ) : (
                            <span className="grid h-[26px] w-[26px] place-items-center rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                              <Globe size={14} />
                            </span>
                          )}
                          <span className="truncate text-lg font-semibold tracking-tight text-neutral-950 dark:text-white">
                            {detail.project.name}
                          </span>
                        </span>
                        <KindChip slug={detail.slug} />
                      </span>
                      <span className="mt-1.5 line-clamp-1 text-[13px] text-neutral-600 dark:text-neutral-300">
                        {detail.project.tagline}
                      </span>
                      <span className="mt-2 flex items-baseline justify-between gap-2">
                        <span className="flex items-baseline gap-2">
                          <span className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                            {hero.value}
                          </span>
                          <span className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                            {hero.label}
                          </span>
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                          {detail.timeframe.replace(" to ", " – ")}
                        </span>
                      </span>
                    </>
                  }
                >
                  <ProjectDialogBody
                    detail={detail}
                    highlights={liveCardHighlights[detail.slug] ?? []}
                  />
                </DetailDialog>
              );
            })}
          </div>
        </div>
      </div>
    </SubpageShell>
  );
}
