import type { Metadata } from "next";
import { BriefcaseBusiness, Handshake, Rocket } from "lucide-react";
import { Contact } from "@/components/Contact";
import { PageFrame } from "@/components/PageFrame";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description:
    "Contact Kaya Hickin about consumer AI, technical co-founder opportunities, MyFutureSelf, investing, or ambitious product builds.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

const reasons = [
  {
    label: "Founding-level builder",
    body: "You need a technical co-founder who can own product, engineering, and shipping pace.",
    icon: BriefcaseBusiness,
  },
  {
    label: "Consumer AI",
    body: "You are investing in or building AI products that change real user behavior.",
    icon: Rocket,
  },
  {
    label: "MyFutureSelf",
    body: "You want to talk about the app, the market, or where future-self coaching can go next.",
    icon: Handshake,
  },
];

export default function ContactPage() {
  return (
    <PageFrame
      activePath="/contact"
      eyebrow="Contact"
      title={
        <>
          Let&apos;s build{" "}
          <span className="font-serif italic font-normal">something</span>.
        </>
      }
      description={siteConfig.contact.body}
      actions={[{ label: "See proof", href: "/proof", variant: "primary" }]}
    >
      <section className="border-b border-neutral-200/70 py-16 dark:border-neutral-800/50 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-3">
          {reasons.map(({ label, body, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800/60 dark:bg-neutral-900/30"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-400/10 text-accent-600 ring-1 ring-accent-400/15 dark:text-accent-300">
                <Icon size={18} />
              </div>
              <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
                {label}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Contact />
    </PageFrame>
  );
}
