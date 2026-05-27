import type { Metadata } from "next";
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

const principles = [
  {
    label: "Solo-shippable",
    body: "Every layer chosen so one person can ship complete products end to end.",
  },
  {
    label: "AI in the loop",
    body: "Claude Code and Codex write alongside me daily — 2,600+ contributions last year.",
  },
  {
    label: "Production from day one",
    body: "StoreKit, Firebase, Mixpanel, and Superwall wired in before launch.",
  },
];

export default function StackPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: siteConfig.techStack.items.filter((it) => it.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <SubpageShell>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
              Stack
            </div>
            <h1 className="mt-1 text-4xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
              How I build.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-snug text-neutral-600 dark:text-neutral-400 sm:text-right">
            Solo-shippable layers. AI in the loop. Production from day one.
          </p>
        </header>

        <StackGrid grouped={grouped} />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {principles.map((p) => (
            <div key={p.label} className={`${cardSurface} p-3`}>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                {p.label}
              </p>
              <p className="mt-1 text-xs leading-snug text-neutral-700 dark:text-neutral-300">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SubpageShell>
  );
}
