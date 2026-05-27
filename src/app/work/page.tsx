import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageFrame } from "@/components/PageFrame";
import { Projects } from "@/components/Projects";
import { siteConfig } from "@/data/content";
import { projectDetails } from "./_projectDetails";

export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description:
    "Selected work by Kaya Hickin, including MyFutureSelf, Dog AI, Appointra, and LeadBoost Pro.",
  alternates: {
    canonical: `${siteConfig.url}/work`,
  },
};

export default function WorkPage() {
  return (
    <PageFrame
      activePath="/work"
      eyebrow="Work"
      title={
        <>
          Shipped products, not{" "}
          <span className="font-serif italic font-normal">case studies</span>.
        </>
      }
      description="A focused view of the companies and products Kaya has built: consumer AI, App Store products, AI-powered outbound, and local business systems."
      actions={[
        { label: "See proof", href: "/proof", variant: "primary" },
        { label: "Open stack", href: "/stack" },
      ]}
    >
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent-500 dark:text-accent-300">
                Deep dives
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
                Detail pages.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-500 dark:text-neutral-500">
              Each page keeps the focus on role, outcomes, ownership, and links.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {projectDetails.map(({ slug, project, role, outcomes }) => (
              <Link
                key={slug}
                href={`/work/${slug}`}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/60 dark:border-neutral-800/60 dark:bg-neutral-900/30"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                      {role}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                      {project.name}
                    </h3>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="mt-1 flex-shrink-0 text-neutral-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-500 dark:group-hover:text-accent-300"
                  />
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {outcomes.slice(0, 2).map((outcome) => (
                    <span
                      key={outcome}
                      className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-neutral-50/60 dark:bg-[#0a0807]/60">
        <Projects />
      </div>
    </PageFrame>
  );
}
