import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile, programs } from "@/data/profile";
import { profilePageJsonLd } from "@/lib/profile-content";
import { SubpageShell } from "@/components/SubpageShell";
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
              Co-founder and CTO of MyFutureSelf, a consumer AI company backed
              by Cintrifuse Capital. I built the original product end to end
              and lead engineering across iOS, Android, web, backend, and AI.
            </p>
            <p>
              Before that: Dog AI, where I trained the model; Appointra, a B2B
              outbound agency that hit $20k MRR in three months; and LeadBoost
              Pro, the first company I ran. From Cleveland, Ohio.
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
            Cleveland roots. A wider world.
          </h2>
        </div>
        <ul className="rows">
          {programs.map((p) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.detail}</p>
            </li>
          ))}
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
            <h3>Miami University · Cum laude, 2026</h3>
            <p>B.S. in Business, Marketing major, Entrepreneurship minor. 3.74 GPA.</p>
          </li>
          <li>
            <h3>Dolibois European Center · Luxembourg, fall 2024</h3>
            <p>A semester abroad on the Luxembourg Exchange Scholarship.</p>
          </li>
          <li>
            <h3>Dean’s List in engineering and business</h3>
            <p>Started in engineering, finished at the Farmer School of Business.</p>
          </li>
          <li>
            <h3>Crestwood High School · Valedictorian, 2022</h3>
          </li>
        </ul>
      </section>

      <section className="band split" aria-labelledby="travel-title">
        <div>
          <p className="label">Beyond the keyboard</p>
          <h2 className="h-section" id="travel-title">
            15 countries. Sweden more than once.
          </h2>
        </div>
        <ul className="countries" aria-label="Countries visited">
          {profile.travel.countries.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
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
              Consumer AI across iOS, Android, web, backend, and real-time
              voice: MyFutureSelf as co-founder and CTO, and the custom
              multimodal model behind Dog AI.{" "}
              <Link className="inline-link" href="/work">
                See the work.
              </Link>
            </div>
          </details>
          <details className="disclosure">
            <summary>What is Kaya’s technical background?</summary>
            <div className="disclosure-body">
              Full-stack: Swift, SwiftUI, React Native, TypeScript, Next.js,
              Firebase, and AI systems. {profile.github.display} GitHub
              contributions in the last year and {profile.tokens.display}{" "}
              tokens across Codex and Claude coding workflows.{" "}
              <Link className="inline-link" href="/stack">
                See the stack.
              </Link>
            </div>
          </details>
          <details className="disclosure">
            <summary>Where is Kaya from?</summary>
            <div className="disclosure-body">
              Cleveland, Ohio. Miami University graduate, cum laude, 2026, with
              a semester in Luxembourg. Built alongside founders in San
              Francisco (Founders Inc) and New York City (Series Build).
            </div>
          </details>
        </div>
      </section>
    </SubpageShell>
  );
}
