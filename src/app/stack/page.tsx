import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
          <h1 className="relative text-4xl font-semibold leading-[0.95] tracking-tight text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
            How I build.
          </h1>
        </header>

        <StackGrid grouped={grouped} />

        <Link
          href="/work/myfutureself"
          className={`${cardSurface} group relative flex flex-col gap-3 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6 dark:hover:border-cyan-300/40`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_50%,rgba(34,211,238,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_12%_50%,rgba(34,211,238,0.10),transparent_60%)]"
          />
          <div className="relative min-w-0">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Shipped with this stack
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl dark:text-white">
              MyFutureSelf, solo-built in 6 months
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              $65K ARR · 1,718 paid · 4.7★ from 715 reviews · 26K+ downloads
            </p>
          </div>
          <span className="relative inline-flex h-9 shrink-0 items-center gap-2 self-start rounded-md bg-neutral-950 px-3 text-sm font-medium text-white transition group-hover:gap-3 sm:self-auto dark:bg-white dark:text-neutral-950">
            Case study
            <ArrowUpRight size={14} />
          </span>
        </Link>
      </div>
    </SubpageShell>
  );
}
