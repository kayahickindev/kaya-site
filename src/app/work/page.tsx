import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { ProductBand } from "@/components/ProductBand";
import { ModelSchematic } from "@/components/ModelSchematic";
import { siteConfig } from "@/data/content";
import { publicTools } from "@/data/profile";
import { myFutureSelf, dogAi } from "@/data/assets";
export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description:
    "Products built by Kaya Hickin: MyFutureSelf, Dog AI, Viral Loop, Appointra, LeadBoost Pro, and open-source developer tools.",
  alternates: { canonical: `${siteConfig.url}/work` },
};
export default function WorkPage() {
  const mfs = siteConfig.projects.find((p) => p.slug === "myfutureself")!;
  const dog = siteConfig.projects.find((p) => p.slug === "dog-ai")!;
  return (
    <SubpageShell current="/work">
      <header className="page-head">
        <p className="label">Work</p>
        <h1 className="h-page">From idea to in your hands.</h1>
        <p className="lead">Consumer AI, a custom model, and three companies.</p>
      </header>
      <div style={{ margin: "0 calc(-1 * var(--gutter))" }}>
        <ProductBand
          variant="mfs"
          id="myfutureself"
          icon={myFutureSelf.icon}
          name="MyFutureSelf"
          label="Co-founder & CTO · 2025 to now"
          title={mfs.tagline}
          lead="A Future You who calls, and a 90-day plan of daily actions. Built end to end."
          screens={[myFutureSelf.store[0], myFutureSelf.store[3], myFutureSelf.store[1]]}
          links={[
            { label: "App Store", href: mfs.links.appStore! },
            { label: "myfutureselfapp.com", href: mfs.links.website! },
          ]}
          detailHref="/work/myfutureself"
          eager
        />
        <ProductBand
          variant="dog"
          id="dog-ai"
          icon={dogAi.icon}
          name="Dog AI"
          label="Model training · iOS · 2025"
          title="I trained the model that reads a dog’s mood."
          lead="A custom multimodal model on a dataset I assembled, shipped as an iPhone app."
          visual={<ModelSchematic />}
          links={[{ label: "App Store", href: dog.links.appStore! }]}
          detailHref="/work/dog-ai"
          detailLabel="The full story"
          flip
        />
      </div>
      <section className="band split" aria-labelledby="companies-title">
        <div>
          <p className="label">Earlier companies</p>
          <h2 className="h-section" id="companies-title">
            Always making.
          </h2>
        </div>
        <nav className="past-work" style={{ marginTop: 0 }} aria-label="Earlier companies">
          {siteConfig.projects
            .filter((p) =>
              ["appointra", "leadboost-pro", "viral-loop"].includes(p.slug),
            )
            .map((p) => (
              <Link href={`/work/${p.slug}`} key={p.slug}>
                <h3>{p.name}</h3>
                <p>{p.tagline}</p>
                <ArrowUpRight size={20} aria-hidden />
              </Link>
            ))}
        </nav>
      </section>
      <section className="band split" aria-labelledby="oss-title">
        <div>
          <p className="label">Open source</p>
          <h2 className="h-section" id="oss-title">
            Tools for other builders.
          </h2>
          <div className="action-row">
            <a className="arrow-link" href={siteConfig.github.url} rel="me">
              Find me on GitHub <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
        </div>
        <ul className="rows">
          {publicTools.map((t) => (
            <li key={t.name}>
              <h3>{t.name}</h3>
              <p>{t.description}</p>
              <a
                className="arrow-link"
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub <ArrowUpRight size={16} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </SubpageShell>
  );
}
