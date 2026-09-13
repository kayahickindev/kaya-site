export const revalidate = 3600;
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { ProjectVisual } from "@/components/ProjectVisual";
import { siteConfig } from "@/data/content";
import { getMarketingMetrics } from "@/lib/marketing-metrics";
import { getProjectDetail, projectDetails } from "../_projectDetails";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projectDetails.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getProjectDetail(slug);
  return d
    ? {
        title: `${d.project.name} | Work | ${siteConfig.name}`,
        description: d.project.description,
        alternates: { canonical: `${siteConfig.url}/work/${slug}` },
      }
    : {};
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const d = getProjectDetail(slug);
  if (!d) notFound();
  const metrics =
    slug === "myfutureself" ? (await getMarketingMetrics()).metrics : null;
  const links: { website?: string; appStore?: string } = d.project.links;
  return (
    <SubpageShell>
      <Link href="/work" className="text-link">
        <ArrowLeft size={16} aria-hidden />
        All projects
      </Link>
      <section className="project-detail-hero">
        <div>
          <p className="eyebrow">{d.role}</p>
          <h1 className="page-title">{d.project.name}</h1>
          <p className="lead">{d.project.tagline}</p>
          <div className="action-row">
            {links.website && (
              <a
                className="button-link"
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit website <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
            {links.appStore && (
              <a
                className="button-link"
                href={links.appStore}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on App Store <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
          </div>
        </div>
        <ProjectVisual slug={slug} eager />
      </section>
      {metrics && (
        <div className="metrics-strip" aria-label="MyFutureSelf traction">
          {[
            [metrics.appDownloads.display, "Downloads"],
            [metrics.paidSubscribersEver.display, "Active paid subscribers"],
            [metrics.arr.display, "Annual run rate"],
            [`${metrics.appStoreRating.display}/5`, "App rating"],
          ].map(([v, l]) => (
            <div key={l}>
              <p>{v}</p>
              <span>{l}</span>
            </div>
          ))}
        </div>
      )}
      <section className="split-section">
        <div>
          <p className="eyebrow">The product</p>
          <h2>
            {slug === "dog-ai" ? (
              <>
                From training
                <br />
                <em>to launch.</em>
              </>
            ) : (
              <>
                Built to
                <br />
                <em>be used.</em>
              </>
            )}
          </h2>
        </div>
        <div className="prose-short">
          {d.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
      <section className="split-section">
        <div>
          <p className="eyebrow">My work</p>
          <h2>What I built.</h2>
        </div>
        <ul className="clean-list">
          {d.ownership.map((o) => (
            <li key={o}>
              <h3>{o}</h3>
            </li>
          ))}
        </ul>
      </section>
      <section className="split-section">
        <div>
          <p className="eyebrow">Outcomes &amp; tools</p>
          <h2>The result.</h2>
        </div>
        <div>
          <ul className="clean-list">
            {d.outcomes.map((o) => (
              <li key={o}>
                <h3>{o}</h3>
              </li>
            ))}
          </ul>
          <ul className="tag-list mt-8" aria-label="Project stack">
            {d.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>
    </SubpageShell>
  );
}
