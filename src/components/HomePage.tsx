import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { ProductBand } from "./ProductBand";
import { HeroSlides } from "./HeroSlides";
import { ModelSchematic } from "./ModelSchematic";
import { SocialTiles } from "./SocialIcons";
import { profile, programs, awards } from "@/data/profile";
import { siteConfig } from "@/data/content";
import { myFutureSelf } from "@/data/assets";
import type { PublicMarketingMetricsSnapshot } from "@/lib/marketing-metrics";

const email = `${siteConfig.emailParts.user}@${siteConfig.emailParts.domain}`;

export function HomePage({
  metrics,
}: {
  metrics: PublicMarketingMetricsSnapshot;
}) {
  const m = metrics.metrics;
  const mfs = siteConfig.projects.find((p) => p.slug === "myfutureself")!;
  const dog = siteConfig.projects.find((p) => p.slug === "dog-ai")!;
  const catalyst = awards[0];
  const pitch = awards[1];
  return (
    <>
      <div className="wrap">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <TopNav />
      </div>
      <main id="main-content">
        <div className="wrap">
          <section className="hero" aria-labelledby="hero-name">
            <h1 className="display hero-name" id="hero-name">
              Kaya
              <br />
              Hickin
            </h1>
            <div className="hero-intro">
              <h2>Full-stack developer. AI builder. Founder.</h2>
              <p>
                Co-founder &amp; CTO of{" "}
                <Link href="/work/myfutureself">MyFutureSelf</Link>, backed by
                Cintrifuse Capital. I ship every layer, from native iOS to the
                real-time voice AI.
              </p>
            </div>
            <div className="hero-cta">
              <div className="action-row">
                <a className="btn" href="#work">
                  See the work <ArrowDown size={17} aria-hidden />
                </a>
                <Link className="arrow-link" href="/about">
                  About me <ArrowUpRight size={18} aria-hidden />
                </Link>
              </div>
            </div>
            <HeroSlides />
          </section>
        </div>

        <ProductBand
          variant="mfs"
          id="work"
          icon={myFutureSelf.icon}
          name="MyFutureSelf"
          label="Co-founder & CTO · 2025 to now"
          title="A voice AI mentor that speaks as your future self."
          lead="A Future You who calls, and a 90-day plan of daily actions. Built end to end."
          screens={myFutureSelf.home}
          links={[
            { label: "App Store", href: mfs.links.appStore! },
            { label: "myfutureselfapp.com", href: mfs.links.website! },
          ]}
          detailHref="/work/myfutureself"
        >
          <dl className="metrics" aria-label="MyFutureSelf traction">
            {[
              [m.appDownloads.display, "Downloads"],
              [m.paidSubscribersEver.display, "Active paid subscribers"],
              [`${m.appStoreRating.display} / 5`, "App Store rating"],
              [m.futureSelfActions.display, "Future Self Actions taken"],
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
        </ProductBand>

        <ProductBand
          variant="dog"
          icon={dogAiIcon}
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

        <section className="band" aria-labelledby="build-title">
          <div className="wrap split">
            <div>
              <p className="label">How I build</p>
              <h2 className="h-section" id="build-title">
                Mobile, web, backend, and AI. The whole thing.
              </h2>
              <div className="action-row">
                <Link className="btn btn-ghost" href="/stack">
                  Full stack <ArrowUpRight size={17} aria-hidden />
                </Link>
              </div>
            </div>
            <div className="figures">
              <div>
                <strong className="big-number">{profile.github.display}</strong>
                <span>GitHub contributions in the last year</span>
              </div>
              <div>
                <strong className="big-number">{profile.tokens.display}</strong>
                <span>Tokens across Codex and Claude coding workflows</span>
              </div>
            </div>
          </div>
          <div className="wrap">
            <nav className="past-work" aria-label="Earlier companies">
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
          </div>
        </section>

        <section className="band band-panel" aria-labelledby="recognition-title">
          <div className="wrap">
            <p className="label">Recognition</p>
            <h2 className="h-section" id="recognition-title">
              Backed, awarded, and invited.
            </h2>
            <div className="recognition">
              <div>
                <h3>Cintrifuse Capital</h3>
                <p>MyFutureSelf investor</p>
              </div>
              <a href={catalyst.url ?? "/proof"}>
                <h3>{catalyst.name}</h3>
                <p>{catalyst.issuer}</p>
              </a>
              <Link href="/proof#awards">
                <h3>{pitch.name}</h3>
                <p>$10,000 team prize, 2025</p>
              </Link>
              <div>
                <h3>Founders Inc</h3>
                <p>Off Season II, San Francisco</p>
              </div>
              <div>
                <h3>Series Build</h3>
                <p>Inaugural cohort, New York City</p>
              </div>
              <div>
                <h3>Y Combinator Startup School</h3>
                <p>{programs[3].detail}</p>
              </div>
            </div>
            <div className="action-row" style={{ marginTop: 44 }}>
              <Link className="btn btn-ghost" href="/proof">
                Credentials, awards &amp; scholarships{" "}
                <ArrowUpRight size={17} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="travel-title">
          <div className="wrap split">
            <div>
              <p className="label">Beyond the keyboard</p>
              <h2 className="h-section" id="travel-title">
                15 countries, and a semester in Luxembourg.
              </h2>
            </div>
            <div>
              <ul className="countries" aria-label="Countries visited">
                {profile.travel.countries.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="action-row">
                <Link className="arrow-link" href="/about">
                  More about me <ArrowUpRight size={18} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="band contact-band" aria-labelledby="contact-title">
          <div className="wrap">
            <p className="label">Contact</p>
            <h2 className="h-section" id="contact-title">
              Let’s talk.
            </h2>
            <a className="contact-email" href={`mailto:${email}`}>
              {email}
            </a>
            <SocialTiles />
          </div>
        </section>
      </main>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}

const dogAiIcon = "/products/dog-ai/icon.png";
