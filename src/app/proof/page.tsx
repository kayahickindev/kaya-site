import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { ProofGrid, ProofMetrics } from "@/components/ProofGrid";
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
    icon: "TrendingUp" as const,
    accent: "text-cyan-700 dark:text-cyan-300",
    dotBg: "text-cyan-600 dark:text-cyan-300",
    points: [
      "1,718 paid subscribers · $65K ARR",
      "26K+ App Store downloads in 7 months",
      "52% avg monthly revenue growth",
      "4.7★ rating across 715 reviews",
    ],
  },
  {
    label: "Depth of build",
    icon: "Wrench" as const,
    accent: "text-emerald-700 dark:text-emerald-300",
    dotBg: "text-emerald-600 dark:text-emerald-300",
    points: [
      "Solo-built iOS, backend, and voice-AI stack",
      "SwiftUI · Core Data · StoreKit",
      "Realtime voice via WebRTC + OpenAI Realtime",
      "2,600+ GitHub contributions last year",
    ],
  },
  {
    label: "Founder pattern",
    icon: "Award" as const,
    accent: "text-amber-700 dark:text-amber-200",
    dotBg: "text-amber-600 dark:text-amber-300",
    points: [
      "Three-for-three on profitable companies",
      "Appointra: $20K MRR in three months",
      "Millions in client pipeline generated",
      "Winner, RedHawk Accelerator (Miami University)",
    ],
  },
];

export default function ProofPage() {
  return (
    <SubpageShell>
      <div className="flex h-full min-h-0 flex-col gap-3">
        <header>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
            Proof
          </div>
          <h1 className="mt-1 text-3xl font-semibold leading-[0.95] text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
            The receipts.
          </h1>
        </header>

        <ProofMetrics metrics={headlineMetrics} />

        <ProofGrid groups={proofGroups} />

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
