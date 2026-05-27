import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GitHub } from "@/components/GitHub";
import { Metrics } from "@/components/Metrics";
import { PageFrame } from "@/components/PageFrame";
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
      "1,718 paid subscribers and $65K ARR for MyFutureSelf",
      "26,000+ downloads on the App Store",
      "52% average monthly revenue growth",
      "4.7-star App Store rating from 715 verified reviews",
    ],
  },
  {
    label: "Depth of build",
    points: [
      "Solo-built the iOS, backend, and voice-AI stack end to end",
      "D1 retention at 69% and D7 retention at 47%",
      "170,000+ lines of code and 1,400+ commits in the last year",
    ],
  },
  {
    label: "Founder pattern",
    points: [
      "Three-for-three on profitable companies",
      "Scaled Appointra to $20k MRR in three months",
      "Winner, RedHawk Business Accelerator at Miami University",
    ],
  },
];

export default function ProofPage() {
  return (
    <PageFrame
      activePath="/proof"
      eyebrow="Proof"
      title={
        <>
          The receipts, in{" "}
          <span className="font-serif italic font-normal">public</span>.
        </>
      }
      description="The strongest signals are shipped products, paying users, durable usage, and a visible build trail. This page pulls those signals into one place."
      actions={[
        { label: "Open work", href: "/work", variant: "primary" },
        { label: "See stack", href: "/stack" },
      ]}
    >
      <div className="bg-neutral-50/60 dark:bg-[#0a0807]/60">
        <Metrics />
      </div>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent-500 dark:text-accent-300">
              Operating proof
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
              Built, launched, and monetized.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {proofGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800/60 dark:bg-neutral-900/30"
              >
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
                  {group.label}
                </h3>
                <ul className="space-y-4">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 flex-shrink-0 text-accent-500 dark:text-accent-300"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link
            href="/work/myfutureself"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-accent-600 dark:text-neutral-300 dark:hover:text-accent-300"
          >
            Read the MyFutureSelf detail page
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      <div className="bg-neutral-50/60 dark:bg-[#0a0807]/60">
        <GitHub />
      </div>
    </PageFrame>
  );
}
