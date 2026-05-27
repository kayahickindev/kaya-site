import type { Metadata } from "next";
import { Braces, BrainCircuit, Code2, Cpu, Workflow } from "lucide-react";
import { GitHub } from "@/components/GitHub";
import { PageFrame } from "@/components/PageFrame";
import { TechStack } from "@/components/TechStack";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Stack | ${siteConfig.name}`,
  description:
    "The product, AI, iOS, backend, and workflow stack Kaya Hickin uses to ship consumer AI products.",
  alternates: {
    canonical: `${siteConfig.url}/stack`,
  },
};

const layers = [
  {
    label: "iOS product",
    icon: Code2,
    body: "Swift, SwiftUI, Core Data, StoreKit, and WebRTC for native products with payments, persistence, and realtime voice.",
  },
  {
    label: "Backend systems",
    icon: Braces,
    body: "Node.js, Firebase, Firestore, and Cloud Functions for fast iteration without losing production reliability.",
  },
  {
    label: "AI layer",
    icon: BrainCircuit,
    body: "OpenAI, Claude, realtime voice, and model orchestration around behavior-change product loops.",
  },
  {
    label: "Workflow",
    icon: Workflow,
    body: "Claude Code, Codex, Cursor, Mixpanel, and Superwall as the daily build, measurement, and monetization loop.",
  },
];

export default function StackPage() {
  return (
    <PageFrame
      activePath="/stack"
      eyebrow="Stack"
      title={
        <>
          How I build at{" "}
          <span className="font-serif italic font-normal">founder speed</span>.
        </>
      }
      description="The stack is optimized for shipping complete products: native iOS, backend systems, AI interaction, monetization, analytics, and AI-native development workflow."
      actions={[
        { label: "View work", href: "/work", variant: "primary" },
        { label: "Proof of shipping", href: "/proof" },
      ]}
    >
      <TechStack />

      <section className="bg-neutral-50/60 py-20 dark:bg-[#0a0807]/60 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex max-w-2xl items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-400/10 text-accent-600 ring-1 ring-accent-400/15 dark:text-accent-300">
              <Cpu size={20} />
            </div>
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-accent-500 dark:text-accent-300">
                Build surface
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                Full-stack means product-stack.
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {layers.map(({ label, icon: Icon, body }) => (
              <div
                key={label}
                className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800/60 dark:bg-neutral-900/30"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-300">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-950 dark:text-white">
                  {label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GitHub />
    </PageFrame>
  );
}
