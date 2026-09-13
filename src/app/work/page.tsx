import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { SelectedWork } from "@/components/SelectedWork";
import { ProjectVisual } from "@/components/ProjectVisual";
import { siteConfig } from "@/data/content";
import { publicTools } from "@/data/profile";
export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description:
    "Products built by Kaya Hickin: MyFutureSelf, Dog AI, Viral Loop, Appointra, LeadBoost Pro, and open-source developer tools.",
  alternates: { canonical: `${siteConfig.url}/work` },
};
export default function WorkPage() {
  return (
    <SubpageShell>
      <header className="page-heading">
        <p className="eyebrow">Products &amp; companies</p>
        <h1 className="page-title">
          From idea
          <br />
          <em>to in your hands.</em>
        </h1>
        <p className="lead">
          Consumer AI, custom models, and businesses built from the ground up.
        </p>
      </header>
      <SelectedWork />
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">More from the journey</p>
            <h2>Always making.</h2>
          </div>
        </div>
        <div className="small-projects">
          {siteConfig.projects
            .filter((p) => !["myfutureself", "dog-ai"].includes(p.slug))
            .map((p) => (
              <Link
                className="project-link"
                href={`/work/${p.slug}`}
                key={p.slug}
              >
                <ProjectVisual slug={p.slug} />
                <div className="project-caption">
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.tagline}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <section className="split-section">
        <div>
          <p className="eyebrow">Open source</p>
          <h2>
            Tools for
            <br />
            <em>other builders.</em>
          </h2>
          <a className="text-link" href={siteConfig.github.url}>
            Find me on GitHub <ArrowUpRight size={18} aria-hidden />
          </a>
        </div>
        <div className="tools-list">
          {publicTools.map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <h3>{t.name}</h3>
                <p>{t.description}</p>
              </div>
              <ArrowUpRight size={22} aria-hidden />
            </a>
          ))}
        </div>
      </section>
    </SubpageShell>
  );
}
