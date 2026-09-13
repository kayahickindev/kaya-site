import type { Metadata } from "next";
import Link from "next/link";
import { Accessibility, ShieldCheck, Cloud, ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { awards, scholarships, programs } from "@/data/profile";
import { credentials } from "@/data/credentials";
import { recognitionPerson, profilePageJsonLd } from "@/lib/profile-content";
export const metadata: Metadata = {
  title: `Credentials & Recognition | ${siteConfig.name}`,
  description:
    "Kaya Hickin’s technical certifications, startup awards, Miami University and Sigma Chi scholarships, and academic honors.",
  alternates: { canonical: `${siteConfig.url}/proof` },
};
const featured = [
  {
    icon: Accessibility,
    issuer: "U.S. Department of Homeland Security",
    name: "Trusted Tester for Web",
    detail: "Web accessibility certification, 2026",
  },
  {
    icon: Cloud,
    issuer: "Microsoft Applied Skills",
    name: "Secure AI solutions in the cloud",
    detail: "Applied Skills credential, 2026",
  },
  {
    icon: ShieldCheck,
    issuer: "Fortinet",
    name: "NSE 1 Certified in Cybersecurity",
    detail: "Cybersecurity certification, 2026",
  },
];
export default function ProofPage() {
  return (
    <SubpageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              profilePageJsonLd(
                "/proof",
                "Kaya Hickin credentials and recognition",
              ),
              recognitionPerson,
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <header className="page-head">
        <p className="label">Credentials &amp; recognition</p>
        <h1 className="h-page">Built on doing the work.</h1>
        <p className="lead">
          Technical certifications, startup awards, scholarships, and the
          education behind the products.
        </p>
      </header>
      <section
        id="credentials"
        aria-label="Featured technical credentials"
        className="featured"
      >
        {featured.map(({ icon: Icon, ...c }) => (
          <article key={c.name}>
            <Icon aria-hidden />
            <p className="label">{c.issuer}</p>
            <h2>{c.name}</h2>
            <p>{c.detail}</p>
          </article>
        ))}
      </section>
      <section className="band split" id="engineering" aria-labelledby="depth-title">
        <div>
          <p className="label">Technical depth</p>
          <h2 className="h-section" id="depth-title">
            Accessibility. Security. AI.
          </h2>
          <div className="action-row">
            <Link href="/stack" className="arrow-link">
              The tools behind the work <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
        <div>
          <details className="disclosure">
            <summary>
              All {credentials.length} credentials &amp; completed courses
            </summary>
            <div className="disclosure-body">
              <ul className="rows">
                {credentials.map((c) => (
                  <li key={c.name}>
                    <h3>{c.name}</h3>
                    <p>
                      {c.issuer} · {c.kind}
                    </p>
                    {c.public_url && (
                      <a
                        className="inline-link"
                        href={c.public_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View credential ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </details>
          <details className="disclosure">
            <summary>Engineering experience</summary>
            <div className="disclosure-body">
              Full-stack product engineering for MyFutureSelf across iOS,
              Android, web, backend, and AI. Custom multimodal model training
              and iOS development for Dog AI. Real-time voice, subscriptions,
              analytics, accessibility, and release infrastructure.{" "}
              <Link href="/work" className="inline-link">
                Explore the projects.
              </Link>
            </div>
          </details>
        </div>
      </section>
      <section className="band split" id="awards" aria-labelledby="awards-title">
        <div>
          <p className="label">Startup recognition</p>
          <h2 className="h-section" id="awards-title">
            Ideas that stood out.
          </h2>
        </div>
        <ul className="rows">
          {awards.map((a) => (
            <li key={a.name}>
              <p className="label">{a.issuer}</p>
              <h3 style={{ marginTop: 8 }}>{a.name}</h3>
              <p>{a.detail}</p>
              {a.url && (
                <a
                  className="arrow-link"
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View recognition <ArrowUpRight size={15} aria-hidden />
                </a>
              )}
            </li>
          ))}
          {programs.map((p) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.detail}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="band split" id="education" aria-labelledby="honors-title">
        <div>
          <p className="label">Academic honors</p>
          <h2 className="h-section" id="honors-title">
            A strong foundation.
          </h2>
        </div>
        <ul className="rows">
          <li>
            <h3>Cum laude · Miami University, May 2026</h3>
            <p>
              B.S. in Business, Marketing major, Entrepreneurship minor. Farmer
              School of Business. 3.74 GPA.
            </p>
          </li>
          <li>
            <h3>Dean’s List · Engineering &amp; Business</h3>
            <p>
              Honors across Miami’s engineering school and Farmer School of
              Business.
            </p>
          </li>
          <li>
            <h3>Dolibois European Center · Luxembourg, fall 2024</h3>
            <p>Study abroad on the Luxembourg Exchange Scholarship.</p>
          </li>
          <li>
            <h3>Valedictorian · Crestwood High School, 2022</h3>
            <p>Graduated at the top of my class.</p>
          </li>
        </ul>
      </section>
      <section className="band split" id="scholarships" aria-labelledby="scholarships-title">
        <div>
          <p className="label">Scholarships &amp; academic awards</p>
          <h2 className="h-section" id="scholarships-title">
            Miami University. Sigma Chi.
          </h2>
        </div>
        <div>
          {["Miami University", "Sigma Chi"].map((group) => (
            <details
              key={group}
              className="disclosure"
              open={group === "Miami University"}
            >
              <summary>{group} scholarships &amp; awards</summary>
              <div className="disclosure-body">
                <ul className="rows">
                  {scholarships
                    .filter((s) => s.issuer.startsWith(group))
                    .map((s) => (
                      <li key={s.name}>
                        <h3>{s.name}</h3>
                        <p>{s.issuer}</p>
                        {s.url && (
                          <a
                            href={s.url}
                            className="inline-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Recipient record ↗
                          </a>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>
    </SubpageShell>
  );
}
