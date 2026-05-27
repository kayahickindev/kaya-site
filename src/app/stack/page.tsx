import type { Metadata } from "next";
import { StackGrid } from "@/components/StackGrid";
import { SubpageShell } from "@/components/SubpageShell";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Stack | ${siteConfig.name}`,
  description:
    "The product, AI, iOS, backend, and workflow stack Kaya Hickin uses to ship consumer AI products.",
  alternates: {
    canonical: `${siteConfig.url}/stack`,
  },
};

const CATEGORY_ORDER = ["iOS", "Web", "Backend", "AI", "Workflow"] as const;

export default function StackPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: siteConfig.techStack.items.filter((it) => it.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <SubpageShell accent="cyan">
      <div className="flex flex-col gap-6">
        <header className="relative flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div aria-hidden className="aurora" style={{ opacity: 0.55 }} />
          <h1 className="relative text-4xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
            How I build.
          </h1>
          <p className="relative max-w-md text-sm leading-snug text-neutral-600 dark:text-neutral-400 sm:text-right">
            Solo-shippable layers. AI in the loop. Production from day one.
          </p>
        </header>

        <StackGrid grouped={grouped} />
      </div>
    </SubpageShell>
  );
}
