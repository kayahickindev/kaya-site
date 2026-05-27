import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, MapPin, Sparkles } from "lucide-react";
import { About } from "@/components/About";
import { PageFrame } from "@/components/PageFrame";
import { Timeline } from "@/components/Timeline";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description:
    "About Kaya Hickin, co-founder and CTO of MyFutureSelf, AI-native builder, and three-for-three profitable founder.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

const altBg = "bg-neutral-50/60 dark:bg-[#0a0807]/60";

const quickFacts = [
  {
    label: "Current focus",
    value: "MyFutureSelf",
    detail: "Consumer AI for behavior change",
    icon: Sparkles,
  },
  {
    label: "Location",
    value: "Oxford, OH",
    detail: "San Francisco-bound this summer",
    icon: MapPin,
  },
  {
    label: "Recognition",
    value: "RedHawk Business Accelerator",
    detail: "Winner, Miami University 2025",
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <PageFrame
      activePath="/about"
      eyebrow="About"
      title={
        <>
          Builder, operator,{" "}
          <span className="font-serif italic font-normal">founder</span>.
        </>
      }
      description="The longer version: I build and run consumer products end to end, with a current focus on AI systems that help people change their behavior in the real world."
      actions={[
        { label: "See the work", href: "/work", variant: "primary" },
        { label: "Get in touch", href: "/contact" },
      ]}
    >
      <About />

      <section className={altBg}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-4 sm:grid-cols-3">
            {quickFacts.map(({ label, value, detail, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800/60 dark:bg-neutral-900/30"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-400/10 text-accent-600 ring-1 ring-accent-400/15 dark:text-accent-300">
                  <Icon size={18} />
                </div>
                <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                  {label}
                </p>
                <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
                  {value}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {siteConfig.recognitions.map((recognition) => (
              <span
                key={recognition}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-400"
              >
                {recognition}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Timeline />

      <section className={altBg}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-neutral-950 transition-colors hover:text-accent-600 dark:text-white dark:hover:text-accent-300"
          >
            View selected work
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
