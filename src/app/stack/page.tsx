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

const CATEGORY_ORDER = ["iOS", "Web", "Backend", "AI", "Workflow"] as const;

type UsageTile = {
  product: string;
  logo: string;
  alt: string;
  primary: string;
  primaryLabel: string;
  secondary: string;
};

const usage: UsageTile[] = [
  {
    product: "Wispr Flow",
    logo: "/logos/wispr-flow.png",
    alt: "Wispr Flow logo",
    primary: "200K+",
    primaryLabel: "words dictated",
    secondary: "75-day streak · 119 WPM",
  },
  {
    product: "Claude Code",
    logo: "/logos/claude-code.svg",
    alt: "Claude Code logo",
    primary: "48.7M",
    primaryLabel: "tokens consumed",
    secondary: "391 sessions · Opus 4.7 favorite",
  },
  {
    product: "Codex",
    logo: "/logos/codex.svg",
    alt: "OpenAI Codex logo",
    primary: "6.05B",
    primaryLabel: "tokens, all-time",
    secondary: "617 threads · since Oct 2025",
  },
];

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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {usage.map((tile) => (
              <div key={tile.product} className={`${cardSurface} flex items-center gap-3 p-4`}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white p-2 ring-1 ring-black/10">
                  <Image
                    src={tile.logo}
                    alt={tile.alt}
                    width={28}
                    height={28}
                    unoptimized
                    className="h-7 w-7 object-contain"
                  />
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
