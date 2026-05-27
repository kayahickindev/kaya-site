import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Target,
} from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { getProjectDetail, projectDetails } from "../_projectDetails";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectDetailItem = (typeof projectDetails)[number];

type ProjectAction = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

export function generateStaticParams() {
  return projectDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getProjectDetail(slug);

  if (!detail) {
    return {};
  }

  return {
    title: `${detail.project.name} | Work | ${siteConfig.name}`,
    description: detail.project.description,
    alternates: {
      canonical: `${siteConfig.url}/work/${detail.slug}`,
    },
  };
}

function ActionLink({ action }: { action: ProjectAction }) {
  const className = `inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition ${
    action.primary
      ? "bg-neutral-950 text-white hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
      : "border border-black/10 bg-white/55 text-neutral-800 hover:-translate-y-0.5 hover:border-black/25 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-white/25 dark:hover:bg-white/[0.08]"
  }`;

  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        {action.label}
        <ExternalLink size={14} />
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
      <ArrowUpRight size={14} />
    </Link>
  );
}

function MyFutureSelfVisual({ image, name }: { image?: string; name: string }) {
  return (
    <div className="relative flex h-full min-h-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-neutral-950 p-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(34,211,238,0.18),transparent_31%),linear-gradient(150deg,rgba(34,211,238,0.09),transparent_38%,rgba(244,114,182,0.13)_76%,rgba(251,191,36,0.08))]" />
      {image ? (
        <Image
          src={image}
          alt={`${name} app screenshots`}
          width={781}
          height={1250}
          className="relative z-10 h-full max-h-[460px] w-auto drop-shadow-2xl"
          priority
        />
      ) : null}
    </div>
  );
}

function DogAiVisual() {
  return (
    <div className="relative grid h-full min-h-0 place-items-center overflow-hidden rounded-md border border-white/10 bg-neutral-950 p-5 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(34,197,94,0.18),transparent_33%),linear-gradient(145deg,rgba(20,184,166,0.12),transparent_40%,rgba(251,191,36,0.11))]" />
      <div className="relative grid w-full max-w-md gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-200/80">
            Custom LLM
          </p>
          <p className="mt-2 text-3xl font-semibold leading-tight">
            Tens of thousands of dog images.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Built and trained the underlying model myself, including a behavior dataset from Harvard.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-xl font-semibold">10,000s</p>
            <p className="mt-0.5 text-[10px] leading-snug text-neutral-400">training images</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-xl font-semibold">Harvard</p>
            <p className="mt-0.5 text-[10px] leading-snug text-neutral-400">behavior dataset</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-xl font-semibold">Live</p>
            <p className="mt-0.5 text-[10px] leading-snug text-neutral-400">App Store, paid</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointraVisual() {
  const columns = [
    { label: "Prospects", value: "2,400", items: ["Seed startups", "Hiring signals", "New funding"] },
    { label: "Warm", value: "318", items: ["Replies", "Qualified", "Calendar fit"] },
    { label: "Booked", value: "100s", items: ["Meetings", "Pipeline", "Revenue"] },
  ];

  return (
    <div className="relative h-full min-h-0 overflow-hidden rounded-md border border-white/10 bg-neutral-950 p-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(59,130,246,0.2),transparent_30%),linear-gradient(145deg,rgba(14,165,233,0.12),transparent_40%,rgba(168,85,247,0.12))]" />
      <div className="relative flex h-full flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-blue-200/75">Outbound system</p>
            <h3 className="mt-1 text-2xl font-semibold">Pipeline engine</h3>
          </div>
          <BriefcaseBusiness className="text-blue-200/80" size={24} />
        </div>
        <div className="grid flex-1 gap-2 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.label} className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
              <p className="text-[10px] text-neutral-400">{column.label}</p>
              <p className="mt-1 text-2xl font-semibold">{column.value}</p>
              <div className="mt-3 space-y-1.5">
                {column.items.map((item) => (
                  <div key={item} className="rounded bg-black/24 px-2 py-1 text-[11px] text-neutral-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-xl font-semibold">$20k</p>
            <p className="text-[10px] text-neutral-400">MRR in three months</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-xl font-semibold">Millions</p>
            <p className="text-[10px] text-neutral-400">in client pipeline</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadBoostVisual() {
  return (
    <div className="relative h-full min-h-0 overflow-hidden rounded-md border border-white/10 bg-neutral-950 p-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(251,191,36,0.18),transparent_32%),linear-gradient(145deg,rgba(251,191,36,0.1),transparent_42%,rgba(34,197,94,0.1))]" />
      <div className="relative flex h-full flex-col justify-center">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/24 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-300" />
            <span className="h-2 w-2 rounded-full bg-yellow-300" />
            <span className="h-2 w-2 rounded-full bg-green-300" />
            <span className="ml-3 rounded-md bg-white/[0.08] px-2.5 py-0.5 text-[10px] text-neutral-400">
              leadboost-pro.com
            </span>
          </div>
          <div className="grid gap-4 p-4 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[10px] font-mono uppercase text-amber-200/75">
                Local business systems
              </p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight">
                Websites, marketing, and operating support.
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Web", "SEO", "Ads", "Consulting"].map((tag) => (
                  <span key={tag} className="rounded-md bg-white/[0.08] px-2 py-1 text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              {[70, 48, 86].map((width, index) => (
                <div key={width} className="rounded-xl bg-black/24 p-3">
                  <div className="mb-2 h-2 w-20 rounded-full bg-white/15" />
                  <div className="h-2 rounded-full bg-amber-200/80" style={{ width: `${width}%` }} />
                  <div className="mt-1.5 h-2 w-2/3 rounded-full bg-white/10" />
                  {index === 1 ? <div className="mt-1.5 h-2 w-1/2 rounded-full bg-white/10" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({ detail }: { detail: ProjectDetailItem }) {
  if (detail.slug === "myfutureself") {
    return <MyFutureSelfVisual image={detail.project.image} name={detail.project.name} />;
  }

  if (detail.slug === "dog-ai") {
    return <DogAiVisual />;
  }

  if (detail.slug === "appointra") {
    return <AppointraVisual />;
  }

  return <LeadBoostVisual />;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const detail = getProjectDetail(slug);

  if (!detail) {
    notFound();
  }

  const { project } = detail;
  const actions: ProjectAction[] = [
    ...(project.links.website
      ? [{ label: "Visit site", href: project.links.website, external: true, primary: true }]
      : []),
    ...(project.links.appStore
      ? [{
          label: project.links.website ? "App Store" : "Open App Store",
          href: project.links.appStore,
          external: true,
          primary: !project.links.website,
        }]
      : []),
  ];

  return (
    <SubpageShell activePath="/work">
      <div className="flex h-full min-h-0 flex-col gap-3">
        <Link
          href="/work"
          className="inline-flex w-fit items-center gap-2 text-xs font-medium text-neutral-500 transition hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft size={14} />
          All work
        </Link>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="flex min-h-0 flex-col gap-3 lg:col-span-7">
            <div className="rounded-md border border-black/10 bg-white/55 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                    {detail.role} · {detail.timeframe}
                  </p>
                  <h1 className="mt-2 text-4xl font-semibold leading-[0.96] tracking-tight text-neutral-950 sm:text-5xl dark:text-white">
                    {project.name}
                  </h1>
                </div>
                {project.status ? (
                  <span className="shrink-0 rounded-md border border-black/10 bg-white/60 px-2.5 py-1.5 text-[11px] font-medium text-neutral-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300">
                    {project.status}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 font-serif text-2xl italic leading-tight text-amber-700 dark:text-amber-200">
                {project.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {project.description}
              </p>
              {actions.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {actions.map((action) => (
                    <ActionLink key={`${action.label}-${action.href}`} action={action} />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex min-h-0 flex-col rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                  <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-300" />
                  <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
                    Outcomes
                  </h2>
                </div>
                <ul className="mt-2 grid flex-1 content-start gap-1.5">
                  {detail.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex gap-2 text-xs leading-snug text-neutral-700 dark:text-neutral-300"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-300" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex min-h-0 flex-col rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                  <Target size={14} className="text-amber-700 dark:text-amber-200" />
                  <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
                    Ownership
                  </h2>
                </div>
                <ul className="mt-2 grid flex-1 content-start gap-1.5">
                  {detail.ownership.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-xs leading-snug text-neutral-700 dark:text-neutral-300"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500 dark:bg-amber-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-black/10 bg-white/45 px-3 py-2 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]">
              <span className="mr-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                Stack
              </span>
              {detail.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-neutral-950/[0.055] px-2 py-0.5 text-[11px] text-neutral-700 dark:bg-white/[0.06] dark:text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="min-h-0 lg:col-span-5">
            <ProjectVisual detail={detail} />
          </div>
        </div>
      </div>
    </SubpageShell>
  );
}
