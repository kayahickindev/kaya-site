import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { SelectedWork } from "./SelectedWork";
import { profile } from "@/data/profile";
import type { PublicMarketingMetricsSnapshot } from "@/lib/marketing-metrics";
export function CommandCenter({
  metrics,
}: {
  metrics: PublicMarketingMetricsSnapshot;
}) {
  const m = metrics.metrics;
  return (
    <div className="site-shell home-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <TopNav />
      <main id="main-content">
        <section className="portrait-hero" aria-labelledby="hero-name">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> Founder. Full-stack developer.
            </p>
            <h1 id="hero-name">
              Kaya
              <br />
              <span>Hickin</span>
              <span className="name-period">.</span>
            </h1>
            <div className="hero-intro">
              <h2>I build AI for real life.</h2>
              <p>
                Co-founder &amp; CTO of{" "}
                <Link href="/work/myfutureself">MyFutureSelf</Link>.<br />
                Backed by Cintrifuse Capital.
              </p>
            </div>
            <a className="text-link hero-cta" href="#selected-work">
              Explore my work <ArrowDown size={18} aria-hidden />
            </a>
          </div>
          <div className="hero-photo">
            <Image
              src="/portraits/kaya.jpg"
              alt="Kaya Hickin, co-founder and CTO of MyFutureSelf"
              fill
              preload
              sizes="(max-width: 700px) 100vw, 58vw"
            />
            <span className="photo-caption">Cincinnati, OH ↗</span>
          </div>
        </section>
        <section className="section" id="selected-work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Ideas, shipped.</h2>
            </div>
            <Link className="text-link" href="/work">
              All projects <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
          <SelectedWork />
          <div className="metrics-strip" aria-label="MyFutureSelf traction">
            {[
              [m.appDownloads.display, "MyFutureSelf downloads"],
              [m.paidSubscribersEver.display, "Active paid subscribers"],
              [`${m.appStoreRating.display}/5`, "App rating"],
              [m.futureSelfActions.display, "Future Self Actions"],
            ].map(([v, l]) => (
              <div key={l}>
                <p>{v}</p>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="section home-story">
          <div>
            <p className="eyebrow">A builder, through and through</p>
            <h2>
              From the first line
              <br />
              to the <em>whole thing.</em>
            </h2>
            <Link className="text-link" href="/about">
              A little more about me <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
          <div className="story-right">
            <p className="lead">
              Mobile. Web. Backend. AI. I build the systems behind the
              experience, and the experience itself.
            </p>
            <div className="engineering-stats">
              <div>
                <strong>{profile.github.display}</strong>
                <span>GitHub contributions in a year</span>
              </div>
              <div>
                <strong>{profile.tokens.display}</strong>
                <span>Tokens across Codex &amp; Claude coding workflows</span>
              </div>
            </div>
            <Link className="text-link" href="/stack">
              Explore my stack <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
        </section>
        <section className="recognition-band">
          <p className="eyebrow">Along the way</p>
          <div>
            <Link href="/proof">
              Miami University<span>Cum laude · Startup Catalyst Award</span>
            </Link>
            <Link href="/about">
              Founders Inc<span>Off Season II · San Francisco</span>
            </Link>
            <Link href="/about">
              Series Build<span>Inaugural cohort · New York City</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
