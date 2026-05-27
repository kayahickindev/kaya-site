import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { PageFrame } from "@/components/PageFrame";
import { siteConfig } from "@/data/content";
import { getProjectDetail, projectDetails } from "../_projectDetails";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
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

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const detail = getProjectDetail(slug);

  if (!detail) {
    notFound();
  }

  const { project } = detail;
  const primaryAction = project.links.website
    ? { label: "Visit site", href: project.links.website, external: true, variant: "primary" as const }
    : project.links.appStore
      ? { label: "App Store", href: project.links.appStore, external: true, variant: "primary" as const }
      : undefined;
  const secondaryAction =
    project.links.website && project.links.appStore
      ? { label: "App Store", href: project.links.appStore, external: true }
      : undefined;

  return (
    <PageFrame
      activePath="/work"
      eyebrow="Work detail"
      title={
        <>
          {project.name}
          {project.tagline ? (
            <>
              <br />
              <span className="font-serif italic font-normal">{project.tagline}</span>
            </>
          ) : null}
        </>
      }
      description={project.description}
      actions={[
        ...(primaryAction ? [primaryAction] : []),
        ...(secondaryAction ? [secondaryAction] : []),
      ]}
    >
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/work"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-300"
          >
            <ArrowLeft size={16} />
            Back to work
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent-500 dark:text-accent-300">
                Overview
              </span>
              <div className="space-y-5">
                {detail.overview.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 dark:border-neutral-800/60 dark:bg-neutral-900/30">
              <div className="space-y-6">
                <div>
                  <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                    Role
                  </p>
                  <p className="font-semibold text-neutral-950 dark:text-white">
                    {detail.role}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                    Timeframe
                  </p>
                  <p className="font-semibold text-neutral-950 dark:text-white">
                    {detail.timeframe}
                  </p>
                </div>
                {project.status ? (
                  <div>
                    <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                      Status
                    </p>
                    <p className="font-semibold text-neutral-950 dark:text-white">
                      {project.status}
                    </p>
                  </div>
                ) : null}
                <div>
                  <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-200 dark:bg-neutral-800/60 dark:text-neutral-400 dark:ring-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {project.image ? (
            <div className="mt-14 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800/60 dark:bg-[#070605]">
              <div className="mx-auto max-w-xl px-6 py-8">
                <Image
                  src={project.image}
                  alt={`${project.name} app screenshots`}
                  width={781}
                  height={1250}
                  className="h-auto w-full drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-neutral-50/60 py-20 dark:bg-[#0a0807]/60 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent-500 dark:text-accent-300">
              Outcomes
            </span>
            <div className="space-y-3">
              {detail.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-4 text-sm leading-relaxed text-neutral-600 dark:border-neutral-800/60 dark:bg-neutral-900/30 dark:text-neutral-400"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 flex-shrink-0 text-accent-500 dark:text-accent-300"
                  />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent-500 dark:text-accent-300">
              Ownership
            </span>
            <div className="space-y-3">
              {detail.ownership.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm leading-relaxed text-neutral-600 dark:border-neutral-800/60 dark:bg-neutral-900/30 dark:text-neutral-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent-500 dark:text-accent-300">
                Stack
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                Tools and systems.
              </h2>
            </div>
            <Link
              href="/stack"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-300"
            >
              Full stack page
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {detail.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-400"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {project.links.website ? (
              <a
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
              >
                Website
                <ExternalLink size={15} />
              </a>
            ) : null}
            {project.links.appStore ? (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-accent-400/70 hover:text-accent-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-accent-300/70 dark:hover:text-accent-300"
              >
                App Store
                <ExternalLink size={15} />
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
