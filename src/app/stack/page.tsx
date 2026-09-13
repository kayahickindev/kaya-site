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
      <header className="page-heading">
        <p className="eyebrow">The toolkit</p>
        <h1 className="page-title">
          Full stack.
          <br />
          <em>All in.</em>
        </h1>
        <p className="lead">
          Native apps, web experiences, backend systems, and AI. The tools I use
          to take a product all the way.
        </p>
      </header>
      <StackGrid grouped={grouped} />
      <section className="token-feature">
        <strong>{profile.tokens.display}</strong>
        <div>
          <p>Tokens across Codex and Claude coding workflows.</p>
          <Link className="text-link" href="/work">
            See what I’ve built <ArrowUpRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}
