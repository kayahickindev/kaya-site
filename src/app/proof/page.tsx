export const revalidate = 3600;

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { MetricTiles } from "@/components/MetricTiles";
import { siteConfig } from "@/data/content";
import { profile, programs, awards, scholarships, publicTools } from "@/data/profile";
import { credentials } from "@/data/credentials";
import { getMarketingMetrics, metricsCaption } from "@/lib/marketing-metrics";
import { cardSurface } from "@/lib/surfaces";

export const metadata: Metadata = {
  title: `Proof | ${siteConfig.name}`,
  description: "Kaya Hickin's engineering work, startup awards, Miami and Sigma Chi scholarships, professional credentials, and dated product metrics.",
  alternates: { canonical: `${siteConfig.url}/proof` },
};

const heading = "text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl dark:text-white";
const body = "text-sm leading-relaxed text-neutral-700 dark:text-neutral-300";
const linkStyle = "inline-flex items-center gap-1 text-sm font-medium text-amber-800 underline decoration-amber-500/40 underline-offset-4 dark:text-amber-200";

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={linkStyle}>{children}<ArrowUpRight size={13} aria-hidden /></a>;
}

export default async function ProofPage() {
  const snapshot = await getMarketingMetrics();
  const m = snapshot.metrics;
  return (
    <SubpageShell accent="amber">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 pb-8">
        <header className="max-w-3xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-200">Work, recognition, credentials</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">The work behind the bio.</h1>
          <p className={body}>I build and operate AI products end to end. Here are the products, technical work, awards, and education behind that story.</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Profile updated {profile.updatedLabel}</p>
        </header>

        <section aria-labelledby="engineering" className="space-y-4">
          <h2 id="engineering" className={heading}>Engineering in practice</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className={`${cardSurface} space-y-3 p-5`}>
              <h3 className="text-lg font-semibold">MyFutureSelf</h3>
              <p className={body}>Built the original product end to end. I lead mobile, web, backend, and AI engineering, including real-time voice, personalized roadmaps, subscriptions, and product analytics.</p>
              <Link href="/work/myfutureself" className={linkStyle}>Explore the product <ArrowUpRight size={13} aria-hidden /></Link>
            </article>
            <article className={`${cardSurface} space-y-3 p-5`}>
              <h3 className="text-lg font-semibold">Dog AI</h3>
              <p className={body}>Built and trained a custom multimodal model for interpreting dog behavior, assembled the dataset, and shipped the iOS experience to the App Store.</p>
              <Link href="/work/dog-ai" className={linkStyle}>Explore Dog AI <ArrowUpRight size={13} aria-hidden /></Link>
            </article>
            {publicTools.map((t) => <article key={t.name} className={`${cardSurface} space-y-2 p-5`}><h3 className="font-semibold">{t.name}</h3><p className={body}>{t.description}</p><SourceLink href={t.url}>View repository</SourceLink></article>)}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className={`${cardSurface} space-y-2 p-5`}>
              <p className="text-3xl font-semibold text-amber-800 dark:text-amber-200">{profile.github.display}</p>
              <h3 className="font-medium">GitHub contributions in one year</h3>
              <p className={body}>{profile.github.count.toLocaleString("en-US")} contributions, {profile.github.period}. Includes contributions beyond commits.</p>
              <SourceLink href={`${siteConfig.github.url}?tab=overview&from=${profile.github.from}&to=${profile.github.to}`}>GitHub activity</SourceLink>
            </div>
            <div className={`${cardSurface} space-y-2 p-5`}>
              <p className="text-3xl font-semibold text-amber-800 dark:text-amber-200">{profile.tokens.display}</p>
              <h3 className="font-medium">Tokens across Codex and Claude</h3>
              <p className={body}>{profile.tokens.description}</p>
              <Link href="/stack" className={linkStyle}>My development stack <ArrowUpRight size={13} aria-hidden /></Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="backing" className="space-y-4">
          <h2 id="backing" className={heading}>Backing and founder programs</h2>
          <dl className="grid gap-3 sm:grid-cols-2">{programs.map((p) => <div key={p.name} className={`${cardSurface} p-5`}><dt className="font-semibold">{p.name}</dt><dd className={`mt-1 ${body}`}>{p.detail}</dd></div>)}</dl>
        </section>

        <section aria-labelledby="recognition" className="space-y-4">
          <h2 id="recognition" className={heading}>Awards and recognition</h2>
          <div className="grid gap-3 md:grid-cols-3">{awards.map((a) => <article key={a.name} className={`${cardSurface} space-y-2 p-5`}><p className="text-xs text-neutral-500 dark:text-neutral-400">{a.issuer}</p><h3 className="font-semibold">{a.name}</h3><p className={body}>{a.detail}</p>{a.url && <SourceLink href={a.url}>University announcement</SourceLink>}</article>)}</div>
        </section>

        <section aria-labelledby="education" className="space-y-4">
          <h2 id="education" className={heading}>Education and scholarships</h2>
          <p className={body}>{profile.education}</p>
          <p className={body}>{profile.academicHonors}</p>
          <p className={body}>Studied abroad in Luxembourg at Miami University&apos;s Dolibois European Center, Fall 2024.</p>
          <ul className="grid gap-3 sm:grid-cols-2">{scholarships.map((s) => <li key={s.name} className={`${cardSurface} space-y-1 p-4`}><p className="font-medium">{s.name}</p><p className="text-xs text-neutral-500 dark:text-neutral-400">{s.issuer}</p>{s.url && <SourceLink href={s.url}>Recipient record</SourceLink>}</li>)}</ul>
        </section>

        <section aria-labelledby="credentials" className="space-y-4">
          <h2 id="credentials" className={heading}>Certifications and completed training</h2>
          <p className={body}>Accessibility, secure AI, cybersecurity, software security, and education-data privacy.</p>
          <div className="grid gap-3 sm:grid-cols-2">{credentials.map((c) => <article key={c.name} className={`${cardSurface} space-y-2 p-5`}><p className="text-xs text-neutral-500 dark:text-neutral-400">{c.issuer} · {c.earned}</p><h3 className="font-semibold leading-snug">{c.name}</h3><p className={body}>{c.kind}</p>{c.credential_id && <p className="break-all font-mono text-xs text-neutral-500 dark:text-neutral-400">Credential ID: {c.credential_id}</p>}{c.public_url && <SourceLink href={c.public_url}>View credential</SourceLink>}</article>)}</div>
        </section>

        <section aria-labelledby="metrics" className="scroll-mt-6 space-y-4">
          <h2 id="metrics" className={heading}>Product metrics, with context</h2>
          <p className={body}>MyFutureSelf · {metricsCaption(snapshot)}</p>
          <MetricTiles accent="amber" metrics={[{ display: m.appDownloads.display, label: "Downloads" }, { display: `${m.appStoreRating.display}★`, label: "App rating" }, { display: m.paidSubscribersEver.display, label: "Active paid subscribers" }, { display: m.arr.display, label: "Annual run rate" }]} />
          <dl className={`space-y-3 ${body}`}>
            <div><dt className="font-semibold">Annual run rate</dt><dd>The last completed calendar month&apos;s gross sales multiplied by 12. This is an annualized sales measure.</dd></div>
            <div><dt className="font-semibold">Paid subscribers</dt><dd>Active paid subscribers at the time of the snapshot. Public figures are rounded.</dd></div>
            <div><dt className="font-semibold">Downloads and rating</dt><dd>Company-reported app metrics. The {m.appStoreRating.display}-star rating is based on {m.appStoreReviews.display} ratings in the combined app metrics feed.</dd></div>
            <div><dt className="font-semibold">Freshness</dt><dd>Updated from the company feed when available. If it is unavailable, the last recorded figures display their recording date.</dd></div>
          </dl>
        </section>
      </div>
    </SubpageShell>
  );
}
