import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StackGrid } from "@/components/StackGrid";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { profile } from "@/data/profile";
export const metadata: Metadata = {
  title: `Stack | ${siteConfig.name}`,
  description:
    "Kaya Hickin’s full-stack development toolkit: Swift, SwiftUI, React Native, Next.js, TypeScript, Firebase, real-time voice, Codex, and Claude.",
  alternates: { canonical: `${siteConfig.url}/stack` },
};
export default function StackPage() {
  const grouped = ["iOS", "Android", "Web", "Backend", "AI", "Workflow"].map(
    (category) => ({
      category,
      items: siteConfig.techStack.items.filter((i) => i.category === category),
    }),
  );
  return (
    <SubpageShell>
      <header className="page-head">
        <p className="label">Stack</p>
        <h1 className="h-page">Full stack. All in.</h1>
        <p className="lead">The tools I use to take a product all the way.</p>
      </header>
      <StackGrid grouped={grouped} />
      <section className="token-feature" aria-label="Coding-tool usage">
        <strong className="big-number">{profile.tokens.display}</strong>
        <div>
          <p>Tokens across Codex and Claude coding workflows.</p>
          <div className="action-row" style={{ marginTop: 16 }}>
            <Link className="arrow-link" href="/work">
              See what I’ve built <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}
