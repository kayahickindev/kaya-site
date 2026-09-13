import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile, programs } from "@/data/profile";
import { profilePageJsonLd } from "@/lib/profile-content";
import { SubpageShell } from "@/components/SubpageShell";
import { TravelMosaic } from "@/components/TravelMosaic";
import { siteConfig } from "@/data/content";
import { studioPortrait } from "@/data/assets";
export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description: profile.biography,
  alternates: { canonical: `${siteConfig.url}/about` },
};
export default function AboutPage() {
  return (
    <SubpageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            profilePageJsonLd("/about", "About Kaya Hickin"),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <section className="about-grid page-head" style={{ maxWidth: "none" }}>
        <div>
          <p className="label">About</p>
          <h1 className="h-page">Always building.</h1>
          <div className="prose" style={{ marginTop: 28 }}>
            <p>
              I’m Kaya Hickin, co-founder and CTO of MyFutureSelf, a consumer
              AI company backed by Cintrifuse Capital, based in Cincinnati,
              Ohio.
            </p>
            <p>
              I built the original product end to end. Today I lead
              engineering across its iOS and Android apps, web, backend, and
              AI systems, including real-time voice and personalized
              mentorship. Codex and Claude are part of my daily workflow.
            </p>
            <p>
              I also trained the custom multimodal model behind Dog AI and
              shipped its iOS app. Before that I co-founded Appointra, a B2B
              outbound agency, and LeadBoost Pro, the first company I ran. I
              like taking an idea all the way to something people pay for.
            </p>
          </div>
          <div className="action-row">
            <Link className="btn" href="/work">
              See the work <ArrowUpRight size={17} aria-hidden />
            </Link>
            <Link className="arrow-link" href="/contact">
              Get in touch <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
        <div className="about-portrait">
          <Image
            src={studioPortrait.src}
            alt={studioPortrait.alt}
            fill
            preload
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 520px, 40vw"
          />
        </div>
      </section>

      <section className="band split" aria-labelledby="journey-title">
        <div>
          <p className="label">The founder journey</p>
          <h2 className="h-section" id="journey-title">
            Cincinnati roots. A wider world.
          </h2>
        </div>
        <ul className="rows">
          {programs.map((p) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.detail}</p>
            </li>
          ))}
          <li>
            <h3>Appointra, then MyFutureSelf</h3>
            <p>
              Co-founded Appointra with Giancarlo Sarti in 2024, scaled it to
              $20k MRR in three months, then wound it down to build
              MyFutureSelf full-time.
            </p>
          </li>
        </ul>
      </section>

      <section className="band split" aria-labelledby="education-title">
        <div>
          <p className="label">Education</p>
          <h2 className="h-section" id="education-title">
            Curiosity came first.
          </h2>
          <div className="action-row">
            <Link href="/proof" className="arrow-link">
              Awards &amp; credentials <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
        <ul className="rows">
          <li>
            <h3>Miami University · Cum laude, May 2026</h3>
            <p>
              B.S. in Business, Marketing major, Entrepreneurship minor. Farmer
              School of Business. 3.74 GPA.
            </p>
          </li>
          <li>
            <h3>From engineering to entrepreneurship</h3>
            <p>
              Dean’s List honors across engineering and business. I began
              university in engineering before completing my degree at Farmer.
            </p>
          </li>
          <li>
            <h3>Luxembourg, fall 2024</h3>
            <p>
              A semester abroad at Miami University’s Dolibois European Center,
              on a Luxembourg Exchange Scholarship.
            </p>
          </li>
          <li>
            <h3>Crestwood High School · Valedictorian, 2022</h3>
            <p>Graduated at the top of my class.</p>
          </li>
        </ul>
      </section>

      <section className="band" aria-labelledby="travel-title">
        <div className="split">
          <div>
            <p className="label">Beyond the keyboard</p>
            <h2 className="h-section" id="travel-title">
              15 countries. More perspectives.
            </h2>
          </div>
          <div>
            <p className="lead">{profile.travel.description}</p>
            <p className="label" style={{ marginTop: 28 }}>
              Countries visited outside the US
            </p>
            <ul className="countries" aria-label="Countries visited">
              {profile.travel.countries.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
        <TravelMosaic />
      </section>

      <section className="band split" aria-labelledby="faq-title">
        <div>
          <p className="label">Quick answers</p>
          <h2 className="h-section" id="faq-title">
            The short version.
          </h2>
        </div>
        <div>
          <details className="disclosure">
            <summary>What does Kaya Hickin build?</summary>
            <div className="disclosure-body">
              Consumer AI products across iOS, Android, web, backend, and
              real-time voice. I’m the co-founder and CTO of MyFutureSelf, and
              I built and trained the custom multimodal model for Dog AI.{" "}
              <Link className="inline-link" href="/work">
                Explore my work.
              </Link>
            </div>
          </details>
          <details className="disclosure">
            <summary>What is Kaya’s technical background?</summary>
            <div className="disclosure-body">
              I’m a full-stack developer working with Swift, SwiftUI, React
              Native, TypeScript, Next.js, Firebase, and AI systems. My work
              includes {profile.github.display} GitHub contributions in the
              last year and {profile.tokens.display} tokens across Codex and
              Claude coding workflows.{" "}
              <Link className="inline-link" href="/stack">
                See my stack.
              </Link>
            </div>
          </details>
          <details className="disclosure">
            <summary>Where is Kaya based?</summary>
            <div className="disclosure-body">
              Cincinnati, Ohio. I’ve also built alongside founders in San
              Francisco through Founders Inc’s Off Season II and in New York
              City through Series Build’s inaugural cohort.
            </div>
          </details>
          <details className="disclosure">
            <summary>Where did Kaya study?</summary>
            <div className="disclosure-body">
              Miami University’s Farmer School of Business, graduating cum
              laude in May 2026 with a B.S. in Business, a Marketing major, and
              an Entrepreneurship minor, including a fall 2024 semester at the
              Dolibois European Center in Luxembourg.
            </div>
          </details>
        </div>
      </section>
    </SubpageShell>
  );
}
