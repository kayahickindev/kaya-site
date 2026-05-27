import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
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

const proofGroups = [
  {
    label: "Product traction",
    points: [
      "1,718 paid subscribers and $65K ARR",
      "26,000+ App Store downloads",
      "52% average monthly revenue growth",
      "4.7-star rating from 715 reviews",
    ],
  },
  {
    label: "Depth of build",
    points: [
      "Solo iOS, backend, and voice-AI stack",
      "D1 retention 69% / D7 retention 47%",
      "170,000+ lines of code, 1,400+ commits",
    ],
  },
  {
    label: "Founder pattern",
    points: [
      "Three-for-three profitable companies",
      "Appointra: $20k MRR in 3 months",
      "Winner, RedHawk Accelerator (Miami U)",
    ],
  },
];

const headlineMetrics = [
  { value: "1,718", label: "paid subscribers" },
  { value: "$65K", label: "ARR" },
  { value: "26K+", label: "downloads" },
  { value: "4.7★", label: "715 reviews" },
  { value: "52%", label: "avg monthly growth" },
];

export default function ProofPage() {
  return (
    <SubpageShell activePath="/proof">
      <div className="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex min-h-0 flex-col lg:col-span-5 lg:pr-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
            Proof
          </div>
          <h1 className="mt-2 text-4xl font-semibold leading-[0.95] text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
            The receipts, in{" "}
            <span className="font-serif italic font-normal text-amber-700 dark:text-amber-200">
              public
            </span>
            .
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-700 xl:text-base dark:text-neutral-300">
            Shipped products, paying users, durable usage, and a visible build trail. Numbers below are pulled from production.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {headlineMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="text-xl font-semibold text-neutral-950 sm:text-2xl dark:text-white">
                  {m.value}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wide text-neutral-500">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-500">
            {siteConfig.recognitions.map((r) => (
              <span
                key={r}
                className="rounded-md border border-black/10 bg-white/45 px-2 py-1 dark:border-white/10 dark:bg-white/[0.035]"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="grid min-h-0 gap-3 lg:col-span-7 lg:grid-rows-3">
          {proofGroups.map((group) => (
            <div
              key={group.label}
              className="flex min-h-0 flex-col rounded-md border border-black/10 bg-white/55 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
            >
              <h2 className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                {group.label}
              </h2>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {group.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-sm leading-snug text-neutral-700 dark:text-neutral-300"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-300"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SubpageShell>
  );
}
