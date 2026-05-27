import type { Metadata } from "next";
import { Award, CheckCircle2, ExternalLink, TrendingUp, Wrench } from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Proof | ${siteConfig.name}`,
  description:
    "Traction, shipping velocity, product proof, and founder track record for Kaya Hickin and MyFutureSelf.",
  alternates: {
    canonical: `${siteConfig.url}/proof`,
  },
};

const headlineMetrics = [
  { value: "1,718", label: "paid subscribers", detail: "server-validated via Apple" },
  { value: "$65K", label: "ARR", detail: "MyFutureSelf, 7 months in" },
  { value: "26K+", label: "downloads", detail: "App Store, 7 months" },
  { value: "4.7★", label: "App Store rating", detail: "715 verified reviews" },
  { value: "52%", label: "avg MoM growth", detail: "revenue, last 6 months" },
];

const proofGroups = [
  {
    label: "Product traction",
    icon: TrendingUp,
    points: [
      "1,718 paid subscribers and $65K ARR",
      "26,000+ App Store downloads in 7 months",
      "52% average monthly revenue growth",
      "4.7-star rating across 715 verified reviews",
      "D1 retention 69% · D7 retention 47%",
      "Live and scaling on the App Store",
    ],
  },
  {
    label: "Depth of build",
    icon: Wrench,
    points: [
      "Solo-built iOS, backend, and voice-AI stack",
      "Native SwiftUI with Core Data and StoreKit",
      "Realtime voice via WebRTC and OpenAI Realtime",
      "Firebase, Firestore, and Cloud Functions backend",
      "2,600+ GitHub contributions in the last year",
      "Claude Code and Codex in the daily build loop",
    ],
  },
  {
    label: "Founder pattern",
    icon: Award,
    points: [
      "Three-for-three on profitable companies",
      "LeadBoost Pro: profitable from year one",
      "Appointra: $20k MRR in three months",
      "Generated millions in client pipeline",
      "Winner, RedHawk Accelerator at Miami University",
      "Honorable Mention, TCU Values & Ventures",
    ],
  },
];

export default function ProofPage() {
  return (
    <SubpageShell activePath="/proof">
      <div className="flex h-full min-h-0 flex-col gap-3">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
              Proof
            </div>
            <h1 className="mt-1 text-3xl font-semibold leading-[0.95] text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
              The receipts, in public.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Shipped products, paying users, durable usage, and a visible build trail. Every number on this page is pulled from production.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {headlineMetrics.map((m) => (
            <div
              key={m.label}
              className="rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
            >
              <div className="text-2xl font-semibold text-neutral-950 xl:text-3xl dark:text-white">
                {m.value}
              </div>
              <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
                {m.label}
              </div>
              <div className="mt-0.5 text-[10px] leading-snug text-neutral-500 dark:text-neutral-500">
                {m.detail}
              </div>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
          {proofGroups.map(({ label, icon: Icon, points }) => (
            <div
              key={label}
              className="flex min-h-0 flex-col rounded-md border border-black/10 bg-white/55 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                <Icon size={15} className="text-amber-700 dark:text-amber-200" />
                <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
                  {label}
                </h2>
              </div>
              <ul className="mt-3 grid flex-1 content-start gap-2">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-sm leading-snug text-neutral-700 dark:text-neutral-300"
                  >
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-300"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a
          href={siteConfig.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 rounded-md border border-black/10 bg-white/45 px-3 py-2 text-xs text-neutral-600 backdrop-blur transition hover:bg-white/70 dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-400 dark:hover:bg-white/[0.06]"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} />
            github.com/{siteConfig.github.username} · 2,600+ contributions in the last year
          </span>
          <span className="text-neutral-500">View profile →</span>
        </a>
      </div>
    </SubpageShell>
  );
}
