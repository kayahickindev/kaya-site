import type { Metadata } from "next";
import Link from "next/link";
import { Accessibility, ShieldCheck, Cloud, ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { awards, scholarships } from "@/data/profile";
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
    name: "Trusted Tester",
    detail: "Web accessibility certification",
  },
  {
    icon: Cloud,
    issuer: "Microsoft Applied Skills",
    name: "Secure AI solutions in the cloud",
    detail: "Applied Skills credential",
  },
  {
    icon: ShieldCheck,
    issuer: "Fortinet",
    name: "NSE 1 Certified in Cybersecurity",
    detail: "Cybersecurity certification",
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
      <header className="page-heading">
        <p className="eyebrow">Credentials &amp; recognition</p>
        <h1 className="page-title">
          Built on
          <br />
          <em>doing the work.</em>
        </h1>
        <p className="lead">
          Technical certifications, startup wins, and the education behind the
          products.
        </p>
      </header>
      <section
        id="credentials"
        aria-label="Featured technical credentials"
        className="credential-featured"
      >
        {featured.map(({ icon: Icon, ...c }) => (
          <article className="credential-card" key={c.name}>
            <Icon aria-hidden />
            <p className="eyebrow">{c.issuer}</p>
            <h2>{c.name}</h2>
            <p>{c.detail}</p>
          </article>
        ))}
      </section>
      <section className="split-section" id="engineering">
        <div>
          <p className="eyebrow">Technical depth</p>
          <h2>
            Accessibility.
            <br />
            Security. AI.
          </h2>
          <Link href="/stack" className="text-link">
            The tools behind the work <ArrowUpRight size={18} aria-hidden />
          </Link>
        </div>
        <div>
          <details className="disclosure">
            <summary>
              All {credentials.length} credentials &amp; completed courses
            </summary>
            <div className="disclosure-body">
              <ul className="clean-list">
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
      <section className="split-section" id="awards">
        <div>
          <p className="eyebrow">Startup recognition</p>
          <h2>
            Ideas that
            <br />
            <em>stood out.</em>
          </h2>
        </div>
        <ul className="clean-list">
          {awards.map((a) => (
            <li key={a.name}>
              <p className="eyebrow">{a.issuer}</p>
              <h3 className="mt-2">{a.name}</h3>
              <p>{a.detail}</p>
              {a.url && (
                <a
                  className="text-link"
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View recognition <ArrowUpRight size={14} aria-hidden />
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="split-section" id="education">
        <div>
          <p className="eyebrow">Academic honors</p>
          <h2>A strong foundation.</h2>
        </div>
        <ul className="clean-list">
          <li>
            <h3>Cum laude · Miami University</h3>
            <p>
              B.S. in Business, Marketing major, Entrepreneurship minor. 3.74
              GPA.
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
            <h3>Valedictorian · Crestwood High School</h3>
            <p>Graduated at the top of my class.</p>
          </li>
        </ul>
      </section>
      <section className="split-section" id="scholarships">
        <div>
          <p className="eyebrow">Scholarships &amp; academic awards</p>
          <h2>
            Miami University.
            <br />
            <em>Sigma Chi.</em>
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
                <ul className="clean-list">
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
