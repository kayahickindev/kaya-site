import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers3,
  Sparkles,
  Target,
} from "lucide-react";
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
        <ExternalLink size={15} />
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
      <ArrowUpRight size={15} />
    </Link>
  );
}

function ShellHeader() {
  return (
    <header className="border-b border-black/10 bg-white/58 backdrop-blur-xl dark:border-white/10 dark:bg-[#050505]/72">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-neutral-950 transition hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
        >
          <span className="grid h-7 w-7 place-items-center rounded bg-neutral-950 text-xs text-white dark:bg-white dark:text-neutral-950">
            KH
          </span>
          <span>Kaya Hickin</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <Link href="/work" className="transition hover:text-neutral-950 dark:hover:text-white">
            Work
          </Link>
          <Link href="/proof" className="transition hover:text-neutral-950 dark:hover:text-white">
            Proof
          </Link>
          <Link href="/contact" className="transition hover:text-neutral-950 dark:hover:text-white">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

function MyFutureSelfVisual({ image, name }: { image?: string; name: string }) {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-md border border-white/10 bg-neutral-950 p-6 text-white lg:min-h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(34,211,238,0.18),transparent_31%),linear-gradient(150deg,rgba(34,211,238,0.09),transparent_38%,rgba(244,114,182,0.13)_76%,rgba(251,191,36,0.08))]" />
      {image ? (
        <Image
          src={image}
          alt={`${name} app screenshots`}
          width={781}
          height={1250}
          className="relative z-10 h-auto w-[82%] max-w-[520px] scale-125 drop-shadow-2xl"
          priority
        />
      ) : null}
    </div>
  );
}

function DogAiVisual() {
  return (
    <div className="relative grid min-h-[360px] place-items-center overflow-hidden rounded-md border border-white/10 bg-neutral-950 p-6 text-white lg:min-h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(34,197,94,0.18),transparent_33%),linear-gradient(145deg,rgba(20,184,166,0.12),transparent_40%,rgba(251,191,36,0.11))]" />
      <div className="relative grid w-full max-w-xl gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
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
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-2xl font-semibold">10,000s</p>
            <p className="mt-1 text-[11px] leading-snug text-neutral-400">training images</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-2xl font-semibold">Harvard</p>
            <p className="mt-1 text-[11px] leading-snug text-neutral-400">behavior dataset</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-2xl font-semibold">Live</p>
            <p className="mt-1 text-[11px] leading-snug text-neutral-400">App Store, paid</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs text-neutral-400">
          Solo build: dataset assembly, model training, iOS app, App Store launch.
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
    <div className="relative min-h-[360px] overflow-hidden rounded-md border border-white/10 bg-neutral-950 p-5 text-white lg:min-h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(59,130,246,0.2),transparent_30%),linear-gradient(145deg,rgba(14,165,233,0.12),transparent_40%,rgba(168,85,247,0.12))]" />
      <div className="relative flex h-full flex-col justify-between gap-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-blue-200/75">Outbound system</p>
            <h2 className="mt-1 text-2xl font-semibold">Pipeline engine</h2>
          </div>
          <BriefcaseBusiness className="text-blue-200/80" size={28} />
        </div>
        <div className="grid flex-1 gap-3 md:grid-cols-3">
          {columns.map((column) => (
            <div key={column.label} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
              <p className="text-xs text-neutral-400">{column.label}</p>
              <p className="mt-1 text-3xl font-semibold">{column.value}</p>
              <div className="mt-5 space-y-2">
                {column.items.map((item) => (
                  <div key={item} className="rounded-lg bg-black/24 px-3 py-2 text-xs text-neutral-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-2xl font-semibold">$20k</p>
            <p className="text-xs text-neutral-400">MRR in three months</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-2xl font-semibold">Millions</p>
            <p className="text-xs text-neutral-400">in client pipeline</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadBoostVisual() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-md border border-white/10 bg-neutral-950 p-5 text-white lg:min-h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(251,191,36,0.18),transparent_32%),linear-gradient(145deg,rgba(251,191,36,0.1),transparent_42%,rgba(34,197,94,0.1))]" />
      <div className="relative flex h-full flex-col justify-center">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/24 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
            <span className="ml-3 rounded-md bg-white/[0.08] px-3 py-1 text-xs text-neutral-400">
              leadboost-pro.com
            </span>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[10px] font-mono uppercase text-amber-200/75">
                Local business systems
              </p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight">
                Websites, marketing, and operating support.
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Web", "SEO", "Ads", "Consulting"].map((tag) => (
                  <span key={tag} className="rounded-md bg-white/[0.08] px-2.5 py-1.5 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              {[70, 48, 86].map((width, index) => (
                <div key={width} className="rounded-xl bg-black/24 p-4">
                  <div className="mb-3 h-2 w-24 rounded-full bg-white/15" />
                  <div className="h-2 rounded-full bg-amber-200/80" style={{ width: `${width}%` }} />
                  <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
                  {index === 1 ? <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" /> : null}
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
      ? [{ label: project.links.website ? "App Store" : "Open App Store", href: project.links.appStore, external: true, primary: !project.links.website }]
      : []),
  ];

  return (
    <div className="min-h-dvh bg-[#f4f1ea] text-neutral-950 dark:bg-[#050505] dark:text-white">
      <ShellHeader />

      <main className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8 lg:py-7">
        <Link
          href="/work"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to work
        </Link>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)] lg:items-start">
          <div className="rounded-md border border-black/10 bg-white/58 p-5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] lg:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                  {detail.role}
                </p>
                <h1 className="mt-3 text-5xl font-semibold leading-[0.96] tracking-tight text-neutral-950 sm:text-6xl dark:text-white">
                  {project.name}
                </h1>
              </div>
              {project.status ? (
                <span className="rounded-md border border-black/10 bg-white/60 px-3 py-2 text-xs font-medium text-neutral-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300">
                  {project.status}
                </span>
              ) : null}
            </div>

            <p className="mt-4 max-w-2xl font-serif text-3xl italic leading-tight text-amber-700 dark:text-amber-200">
              {project.tagline}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              {project.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                <p className="text-[10px] font-mono uppercase text-neutral-500">Timeframe</p>
                <p className="mt-1 text-sm font-semibold text-neutral-950 dark:text-white">
                  {detail.timeframe}
                </p>
              </div>
              <div className="rounded-md border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                <p className="text-[10px] font-mono uppercase text-neutral-500">Stack</p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-neutral-950 dark:text-white">
                  {detail.stack.slice(0, 3).join(" · ")}
                </p>
              </div>
              <div className="rounded-md border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                <p className="text-[10px] font-mono uppercase text-neutral-500">Signal</p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-neutral-950 dark:text-white">
                  {detail.outcomes[0]}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {detail.overview.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-black/10 bg-white/55 px-2.5 py-1.5 text-xs text-neutral-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {actions.length > 0 ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <ActionLink key={`${action.label}-${action.href}`} action={action} />
                ))}
              </div>
            ) : null}
          </div>

          <ProjectVisual detail={detail} />
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-md border border-black/10 bg-white/58 p-5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={17} className="text-amber-600 dark:text-amber-200" />
              <h2 className="text-lg font-semibold">Outcomes</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {detail.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex gap-3 rounded-md border border-black/10 bg-white/50 p-3 text-sm leading-relaxed text-neutral-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-300"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-black/10 bg-white/58 p-5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mb-4 flex items-center gap-2">
              <Target size={17} className="text-cyan-700 dark:text-cyan-200" />
              <h2 className="text-lg font-semibold">Ownership</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {detail.ownership.map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-black/10 bg-white/50 p-3 text-sm leading-relaxed text-neutral-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-md border border-black/10 bg-white/58 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <Code2 size={17} className="text-neutral-500" />
              {detail.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-neutral-950/[0.055] px-2.5 py-1.5 text-xs text-neutral-700 dark:bg-white/[0.06] dark:text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href="/stack"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-black/10 bg-white/55 px-3 text-sm font-medium text-neutral-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300 dark:hover:bg-white/[0.08]"
              >
                Full stack
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-neutral-950 px-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
              >
                Contact
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 py-6 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 text-xs text-neutral-500 sm:px-6 lg:px-8 dark:text-neutral-500">
          <Link href="/work" className="inline-flex items-center gap-2 transition hover:text-neutral-950 dark:hover:text-white">
            <Layers3 size={14} />
            All work
          </Link>
          <span>{siteConfig.name}</span>
        </div>
      </footer>
    </div>
  );
}
