export const revalidate = 3600;
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { Screens } from "@/components/ProductBand";
import { ModelSchematic } from "@/components/ModelSchematic";
import { siteConfig } from "@/data/content";
import { myFutureSelf, dogAi } from "@/data/assets";
import { getMarketingMetrics } from "@/lib/marketing-metrics";
import { getProjectDetail, projectDetails } from "../_projectDetails";
type Props = { params: Promise<{ slug: string }> };
const logos: Record<string, string> = {
  appointra: "/logos/appointra.png",
  "leadboost-pro": "/logos/leadboost-pro.png",
};
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
  const screens =
    slug === "myfutureself"
      ? myFutureSelf.detail
      : slug === "dog-ai"
        ? dogAi.detail
        : [];
  const icon =
    slug === "myfutureself"
      ? myFutureSelf.icon
      : slug === "dog-ai"
        ? dogAi.icon
        : logos[slug];
  return (
    <SubpageShell>
      <Link href="/work" className="arrow-link">
        <ArrowLeft size={16} aria-hidden />
        All work
      </Link>
      <section className="detail-hero">
        <div>
          <p className="label">
            {d.role} · {d.timeframe}
          </p>
          <h1 className="h-page">{d.project.name}</h1>
          <p className="lead">{d.project.tagline}</p>
          <div className="action-row">
            {links.appStore && (
              <a
                className="btn"
                href={links.appStore}
                target="_blank"
                rel="noopener noreferrer"
              >
                App Store <ArrowUpRight size={17} aria-hidden />
              </a>
            )}
            {links.website && (
              <a
                className={links.appStore ? "btn btn-ghost" : "btn"}
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit website <ArrowUpRight size={17} aria-hidden />
              </a>
            )}
          </div>
        </div>
        {slug === "dog-ai" ? (
          <div className="band-dog detail-screens">
            <ModelSchematic />
          </div>
        ) : screens.length > 0 ? (
          <div className="band-mfs detail-screens">
            <Screens screens={screens} eager sizes="(max-width: 760px) 64vw, 16vw" />
            <p className="snap-hint">Swipe to see more screens.</p>
          </div>
        ) : (
          <div className="brand-tile">
            {icon && <Image src={icon} alt="" width={96} height={96} />}
            <span>{d.project.name}</span>
          </div>
        )}
      </section>
      {metrics && (
        <dl className="metrics band-paper" aria-label="MyFutureSelf traction" style={{ marginTop: 0 }}>
          {[
            [metrics.appDownloads.display, "Downloads"],
            [metrics.paidSubscribersEver.display, "Active paid subscribers"],
            [metrics.arr.display, "Annual run rate"],
            [`${metrics.appStoreRating.display} / 5`, "App Store rating"],
          ].map(([v, l]) => (
            <div key={l}>
              <dd>
                <strong>{v}</strong>
              </dd>
              <dt>
                <span>{l}</span>
              </dt>
            </div>
          ))}
        </dl>
      )}
      {slug === "dog-ai" && (
        <section className="band" aria-labelledby="app-title">
          <div className="split">
            <div>
              <p className="label">The app</p>
              <h2 className="h-section" id="app-title">
                Scan, score, track.
              </h2>
            </div>
            <div className="band-dog detail-screens">
              <Screens screens={screens} sizes="(max-width: 760px) 64vw, 14vw" />
              <p className="snap-hint">Swipe to see more screens.</p>
            </div>
          </div>
        </section>
      )}
      <section className="band split" aria-labelledby="overview-title">
        <div>
          <p className="label">The product</p>
          <h2 className="h-section" id="overview-title">
            {slug === "dog-ai" ? "From training to launch." : "Built to be used."}
          </h2>
        </div>
        <div className="prose">
          {d.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
      <section className="band split" aria-labelledby="built-title">
        <div>
          <p className="label">My work</p>
          <h2 className="h-section" id="built-title">
            What I built.
          </h2>
        </div>
        <ul className="rows">
          {d.ownership.map((o) => (
            <li key={o}>
              <h3>{o}</h3>
            </li>
          ))}
        </ul>
      </section>
      <section className="band split" aria-labelledby="result-title">
        <div>
          <p className="label">Outcomes &amp; tools</p>
          <h2 className="h-section" id="result-title">
            The result.
          </h2>
        </div>
        <div>
          <ul className="rows">
            {d.outcomes.map((o) => (
              <li key={o}>
                <h3>{o}</h3>
              </li>
            ))}
          </ul>
          <ul className="tag-list" aria-label="Project stack">
            {d.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>
    </SubpageShell>
  );
}
