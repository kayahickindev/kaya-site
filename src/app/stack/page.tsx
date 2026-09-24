import type { Metadata } from "next";
import Image from "next/image";
import { StackGrid } from "@/components/StackGrid";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";
import { cardSurface } from "@/lib/surfaces";

export const metadata: Metadata = {
  title: `Stack | ${siteConfig.name}`,
  description:
    "The product, AI, iOS, backend, and workflow stack Kaya Hickin uses to ship consumer AI products.",
  alternates: {
    canonical: `${siteConfig.url}/stack`,
  },
};

const CATEGORY_ORDER = ["iOS", "Android", "Web", "Backend", "AI", "Workflow"] as const;

type UsageTile = {
  product: string;
  logos: { src: string; alt: string }[];
  primary: string;
  primaryLabel: string;
  secondary: string;
};

// Only two figures here are checked against a primary source, so only two are
// published. The token figure is reported cumulative usage across the Codex and
// Claude coding tools as of 2026-09-13, and it measures coding-tool usage: it
// has nothing to do with training the Dog AI model. The GitHub figure is 16,846
// contributions in the last year (to September 2026), read from GitHub's
// contribution calendar on 2026-09-23, and contributions are broader than commits.
const usage: UsageTile[] = [
  {
    product: "Codex + Claude",
    logos: [
      { src: "/logos/codex.svg", alt: "OpenAI Codex logo" },
      { src: "/logos/claude-code.svg", alt: "Claude Code logo" },
    ],
    primary: "100B+",
    primaryLabel: "coding tokens",
    secondary: "Across both coding tools, to Sep 2026",
  },
  {
    product: "GitHub",
    logos: [],
    primary: "16.8K+",
    primaryLabel: "contributions",
    secondary: "Last year, to Sep 2026 · not just commits",
  },
];

function GitHubGlyph({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#181717"
      aria-hidden
      className="h-7 w-7"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function StackPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: siteConfig.techStack.items.filter((it) => it.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <SubpageShell accent="cyan">
      <div className="flex flex-col gap-6">
        <header className="relative">
          <div aria-hidden className="aurora" style={{ opacity: 0.55 }} />
          <h1 className="relative text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
            How I build.
          </h1>
        </header>

        <StackGrid grouped={grouped} />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-cyan-500/10 ring-1 ring-cyan-500/20 dark:bg-cyan-300/10 dark:ring-cyan-300/20">
              <span className="block h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-cyan-300 accent-pulse" />
            </span>
            <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
              Daily drivers
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {usage.map((tile) => (
              <div key={tile.product} className={`${cardSurface} flex items-center gap-3 p-4`}>
                <span className="flex shrink-0 items-center -space-x-2">
                  {tile.logos.length > 0 ? (
                    tile.logos.map((logo) => (
                      <span
                        key={logo.src}
                        className="grid h-11 w-11 place-items-center rounded-md bg-white p-2 ring-1 ring-black/10"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={28}
                          height={28}
                          unoptimized
                          className="h-7 w-7 object-contain"
                        />
                      </span>
                    ))
                  ) : (
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-white p-2 ring-1 ring-black/10">
                      <GitHubGlyph />
                    </span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                    {tile.product}
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                      {tile.primary}
                    </span>
                    <span className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      {tile.primaryLabel}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[11px] text-neutral-600 dark:text-neutral-300">
                    {tile.secondary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubpageShell>
  );
}
