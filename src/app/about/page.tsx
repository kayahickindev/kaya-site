import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile, programs } from "@/data/profile";
import { profilePageJsonLd } from "@/lib/profile-content";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
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
      <section className="about-intro">
        <div>
          <p className="eyebrow">A little about me</p>
          <h1 className="page-title">
            Always
            <br />
            <em>building.</em>
          </h1>
          <div className="prose-short">
            <p>
              I’m Kaya Hickin, co-founder and CTO of MyFutureSelf, a consumer AI
              company backed by Cintrifuse Capital.
            </p>
            <p>
              I built the original product end to end. Today, I lead engineering
              across mobile, web, backend, and AI, including real-time voice and
              personalized mentorship.
            </p>
            <p>
              I also trained the custom multimodal model behind Dog AI and
              shipped its iOS app. I like taking an idea all the way to
              something people can use.
            </p>
          </div>
          <Link className="text-link" href="/work">
            See what I’m building <ArrowUpRight size={18} aria-hidden />
          </Link>
        </div>
        <div className="about-portrait">
          <Image
            src="/portraits/kaya.jpg"
            alt="Portrait of Kaya Hickin"
            fill
            preload
            sizes="(max-width: 700px) 100vw, 45vw"
          />
        </div>
      </section>
      <section className="split-section">
        <div>
          <p className="eyebrow">The founder journey</p>
          <h2>
            Cincinnati roots.
            <br />
            <em>A wider world.</em>
          </h2>
          <p className="lead">Good company makes ambitious ideas bigger.</p>
        </div>
        <div>
          <div className="place-photo">
            <Image
              src="/portraits/san-francisco.png"
              alt="The Golden Gate Bridge in San Francisco at sunset"
              fill
              sizes="(max-width: 700px) 100vw, 55vw"
            />
          </div>
          <ul className="clean-list">
            {programs.map((p) => (
              <li key={p.name}>
                <h3>{p.name}</h3>
                <p>{p.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="split-section">
        <div>
          <p className="eyebrow">Education</p>
          <h2>Curiosity came first.</h2>
          <Link href="/proof" className="text-link">
            Awards &amp; credentials <ArrowUpRight size={18} aria-hidden />
          </Link>
        </div>
        <ul className="clean-list">
          <li>
            <h3>Miami University · Cum laude</h3>
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
            <h3>Crestwood High School · Valedictorian</h3>
            <p>Graduated at the top of my class.</p>
          </li>
        </ul>
      </section>
      <section className="split-section">
        <div>
          <p className="eyebrow">Beyond the keyboard</p>
          <p className="travel-count">
            15<span className="text-4xl">↗</span>
          </p>
          <h2>
            Countries.
            <br />
            <em>More perspectives.</em>
          </h2>
        </div>
        <div>
          <p className="lead">
            I studied abroad in Luxembourg at Miami University’s Dolibois
            European Center. Since then, the world has felt a little more
            connected.
          </p>
          <div className="prose-short mt-5">
            <p>
              From the Sahara to New Zealand, I love seeing how differently
              people live. Sweden is a favorite. I’ve been back more than once.
            </p>
          </div>
          <p className="eyebrow mt-8">Countries visited outside the US</p>
          <ul className="country-list">
            {profile.travel.countries.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="split-section">
        <div>
          <p className="eyebrow">Quick answers</p>
          <h2>The short version.</h2>
        </div>
        <div>
          <details className="disclosure">
            <summary>What does Kaya Hickin build?</summary>
            <div className="disclosure-body">
              I build consumer AI products across iOS, Android, web, backend,
              and real-time voice. I’m the co-founder and CTO of MyFutureSelf
              and built and trained the custom multimodal model for Dog AI.{" "}
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
              includes {profile.github.display} GitHub contributions in a year
              and {profile.tokens.display} tokens across Codex and Claude coding
              workflows.{" "}
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
        </div>
      </section>
    </SubpageShell>
  );
}
