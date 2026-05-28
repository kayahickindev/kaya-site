import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContributionGraph } from "@/components/ContributionGraph";
import { ProofGrid, ProofMetrics } from "@/components/ProofGrid";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { cardSurface } from "@/lib/surfaces";

export const metadata: Metadata = {
  title: `Proof | ${siteConfig.name}`,
  description:
    "Traction, shipping velocity, product proof, and founder track record for Kaya Hickin and MyFutureSelf.",
  alternates: {
    canonical: `${siteConfig.url}/proof`,
  },
};

const headlineMetrics = [
  {
    value: "1,718",
    label: "paid subscribers",
    sparkline: [12, 38, 90, 220, 480, 880, 1350, 1718],
    accent: "rgb(34,197,94)",
  },
  {
    value: "$65K",
    label: "ARR",
    sparkline: [2, 6, 12, 22, 35, 48, 58, 65],
    accent: "rgb(212,155,90)",
  },
  {
    value: "26K+",
    label: "downloads",
    sparkline: [0.4, 1.2, 3, 6.5, 11, 16, 21, 26],
    accent: "rgb(34,211,238)",
  },
  {
    value: "4.7★",
    label: "App Store rating",
    sparkline: [4.4, 4.5, 4.6, 4.6, 4.7, 4.7, 4.7, 4.7],
    accent: "rgb(251,191,36)",
  },
  {
    value: "52%",
    label: "avg MoM growth",
    sparkline: [38, 44, 49, 51, 50, 53, 56, 52],
    accent: "rgb(244,114,182)",
  },
];

const emeraldAccent = {
  accent: "text-emerald-700 dark:text-emerald-300",
  iconColor: "text-emerald-600 dark:text-emerald-300",
  bar: "from-emerald-400/60 to-transparent",
};

const proofGroups = [
  {
    label: "Depth of build",
    icon: "Wrench" as const,
    ...emeraldAccent,
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
    ...emeraldAccent,
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
    <SubpageShell accent="emerald">
      <div className="flex flex-col gap-6">
        <header className="relative">
          <div aria-hidden className="aurora" style={{ opacity: 0.55 }} />
          <h1 className="relative text-4xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
            By the numbers.
          </h1>
        </header>

        <ProofMetrics metrics={headlineMetrics} />

        <ProofGrid groups={proofGroups} />

        <div className={`${cardSurface} flex flex-col gap-4 p-5`}>
          <ContributionGraph contributionCount="2,600+" palette="emerald" />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4 dark:border-white/10">
            <span className="font-mono text-xs text-neutral-500">
              github.com/{siteConfig.github.username}
            </span>
            <a
              href={siteConfig.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-8 items-center gap-1.5 rounded-md bg-neutral-950 px-3 text-xs font-medium text-white transition hover:gap-2 dark:bg-white dark:text-neutral-950"
            >
              View profile
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </SubpageShell>
  );
}
