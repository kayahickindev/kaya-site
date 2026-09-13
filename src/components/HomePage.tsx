import Image from "next/image";
import Link from "next/link";
import { Accessibility, ArrowDown, ArrowUpRight, Cloud, ShieldCheck } from "lucide-react";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { HeroSystem } from "./HeroSystem";
import { VoiceCall } from "./VoiceCall";
import { StackLayers } from "./StackLayers";
import { ModelSchematic } from "./ModelSchematic";
import { WorldMap } from "./WorldMap";
import { SocialTiles } from "./SocialIcons";
import { ChapterNav } from "./ChapterNav";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/content";
import { recognition } from "@/data/recognition";
import { myFutureSelf, dogAi } from "@/data/assets";
import type { PublicMarketingMetricsSnapshot } from "@/lib/marketing-metrics";

const email = `${siteConfig.emailParts.user}@${siteConfig.emailParts.domain}`;

const chapters = [
  { label: "Product", href: "#product" },
  { label: "Builder", href: "#builder" },
  { label: "Model", href: "#model" },
  { label: "World", href: "#world" },
  { label: "Backing", href: "#backing" },
  { label: "Contact", href: "#contact" },
];

const credentials = [
  { Icon: Accessibility, name: "DHS Trusted Tester", line: "Web accessibility" },
  { Icon: Cloud, name: "Microsoft Applied Skills", line: "Secure AI in the cloud" },
  { Icon: ShieldCheck, name: "Fortinet NSE 1", line: "Cybersecurity" },
];

export function HomePage({
  metrics,
}: {
  metrics: PublicMarketingMetricsSnapshot;
}) {
  const m = metrics.metrics;
  const mfs = siteConfig.projects.find((p) => p.slug === "myfutureself")!;
  const dog = siteConfig.projects.find((p) => p.slug === "dog-ai")!;
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-name">
          <HeroSystem />
          <div className="hero-scrim" aria-hidden />
          <div className="wrap hero-top">
            <TopNav overlay />
          </div>
          <div className="wrap hero-content">
            <h1 className="display hero-name" id="hero-name">
              Kaya
              <br />
              Hickin
            </h1>
            <p className="hero-line">
              Full-stack developer and founder. Co‑founder &amp; CTO of{" "}
              <Link href="/work/myfutureself">MyFutureSelf</Link>.
            </p>
            <ul className="proof" aria-label="At a glance">
              <li>
                <strong>{m.appDownloads.display}</strong>
                <span>MyFutureSelf downloads</span>
              </li>
              <li>
                <strong>{profile.github.display}</strong>
                <span>GitHub contributions, last year</span>
              </li>
              <li>
                <strong>{profile.tokens.display}</strong>
                <span>tokens across Codex and Claude</span>
              </li>
            </ul>
            <a className="btn btn-light" href="#product">
              See the work <ArrowDown size={17} aria-hidden />
            </a>
          </div>
        </section>

        <section className="scene scene-mfs" id="product" aria-labelledby="product-title">
          <div className="wrap">
            <div className="scene-head">
              <p className="product-mark">
                <Image src={myFutureSelf.icon} alt="" width={36} height={36} />
                MyFutureSelf
              </p>
              <h2 className="h-scene" id="product-title">
                Your future self, calling.
              </h2>
              <p className="scene-line">
                A voice AI mentor who calls, plus a 90-day plan of daily actions.
                I built it end to end.
              </p>
            </div>
            <Reveal className="scene-visual">
              <VoiceCall />
            </Reveal>
            <dl className="metrics">
              <div>
                <dd>
                  <strong>
                    <CountUp display={m.appDownloads.display} />
                  </strong>
                </dd>
                <dt>
                  <span>Downloads</span>
                </dt>
              </div>
              <div>
                <dd>
                  <strong>{m.paidSubscribersEver.display}</strong>
                </dd>
                <dt>
                  <span>Active paid subscribers</span>
                </dt>
              </div>
              <div>
                <dd>
                  <strong>
                    <CountUp display={m.appStoreRating.display} /> / 5
                  </strong>
                </dd>
                <dt>
                  <span>App Store rating</span>
                </dt>
              </div>
              <div>
                <dd>
                  <strong>
                    <CountUp display={m.futureSelfActions.display} />
                  </strong>
                </dd>
                <dt>
                  <span>Future Self Actions taken</span>
                </dt>
              </div>
            </dl>
            <div className="action-row" style={{ justifyContent: "center" }}>
              <a className="btn" href={mfs.links.appStore} target="_blank" rel="noopener noreferrer">
                App Store <ArrowUpRight size={17} aria-hidden />
              </a>
              <a className="btn btn-ghost" href={mfs.links.website} target="_blank" rel="noopener noreferrer">
                myfutureselfapp.com <ArrowUpRight size={17} aria-hidden />
              </a>
              <Link className="arrow-link" href="/work/myfutureself">
                How I built it <ArrowUpRight size={18} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section className="scene scene-builder" id="builder" aria-labelledby="builder-title">
          <div className="wrap scene-split">
            <div className="scene-head">
              <p className="label">How I build</p>
              <h2 className="h-scene" id="builder-title">
                One person. Every layer.
              </h2>
              <p className="scene-line">
                Native iOS, Android, web, backend, and the voice AI. Shipped by
                me, with Codex and Claude Code every day.
              </p>
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
              <div className="action-row">
                <Link className="btn btn-ghost" href="/stack">
                  Full stack <ArrowUpRight size={17} aria-hidden />
                </Link>
                <Link className="arrow-link" href="/work">
                  All work <ArrowUpRight size={18} aria-hidden />
                </Link>
              </div>
            </div>
            <Reveal className="scene-visual">
              <StackLayers />
            </Reveal>
          </div>
        </section>

        <section className="scene scene-dog" id="model" aria-labelledby="model-title">
          <div className="wrap scene-split flip">
            <div className="scene-head">
              <p className="product-mark">
                <Image src={dogAi.icon} alt="" width={36} height={36} />
                Dog AI
              </p>
              <h2 className="h-scene" id="model-title">
                I trained the model.
              </h2>
              <p className="scene-line">
                A custom multimodal model that reads a dog’s mood, on a dataset
                I assembled, shipped as an iPhone app.
              </p>
              <div className="action-row">
                <a className="btn" href={dog.links.appStore} target="_blank" rel="noopener noreferrer">
                  App Store <ArrowUpRight size={17} aria-hidden />
                </a>
                <Link className="arrow-link" href="/work/dog-ai">
                  The full story <ArrowUpRight size={18} aria-hidden />
                </Link>
              </div>
            </div>
            <Reveal className="scene-visual">
              <ModelSchematic />
            </Reveal>
          </div>
        </section>

        <section className="scene scene-world" id="world" aria-labelledby="world-title">
          <div className="wrap">
            <div className="scene-head centered">
              <p className="label">Beyond the keyboard</p>
              <h2 className="h-scene" id="world-title">
                15 countries, and a semester in Luxembourg.
              </h2>
            </div>
            <Reveal className="scene-visual">
              <WorldMap />
            </Reveal>
            <ul className="countries centered" aria-label="Countries visited">
              {profile.travel.countries.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="scene scene-backing" id="backing" aria-labelledby="backing-title">
          <div className="wrap">
            <div className="scene-head centered">
              <p className="label">Backing and recognition</p>
              <h2 className="h-scene" id="backing-title">
                Backed, awarded, invited.
              </h2>
            </div>
            <ul className="logo-wall" aria-label="Backers, awards and programs">
              {recognition.map((r) => {
                const inner = (
                  <>
                    <span className="logo-box">
                      {r.logo ? (
                        <Image src={r.logo} alt={`${r.name} logo`} width={200} height={72} sizes="200px" />
                      ) : (
                        <strong>{r.name}</strong>
                      )}
                    </span>
                    <span className="logo-line">{r.line}</span>
                  </>
                );
                return (
                  <li key={r.name}>
                    {r.href ? (
                      <a href={r.href} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
            <ul className="badges" aria-label="Certifications">
              {credentials.map(({ Icon, name, line }) => (
                <li key={name}>
                  <Icon size={22} aria-hidden />
                  <strong>{name}</strong>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="action-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn-ghost" href="/proof">
                All credentials, awards &amp; scholarships <ArrowUpRight size={17} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section className="scene scene-contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact-page">
            <p className="label">Contact</p>
            <h2 className="h-scene" id="contact-title">
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
      <ChapterNav items={chapters} spy />
    </>
  );
}
