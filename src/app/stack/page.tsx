import type { Metadata } from "next";
import { Braces, BrainCircuit, Code2, Workflow } from "lucide-react";
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

const layers = [
  {
    label: "iOS product",
    icon: Code2,
    body: "Swift, SwiftUI, Core Data, StoreKit, WebRTC. Native apps with payments, persistence, and realtime voice.",
  },
  {
    label: "Backend",
    icon: Braces,
    body: "Node.js, Firebase, Firestore, Cloud Functions. Fast iteration with production reliability.",
  },
  {
    label: "AI layer",
    icon: BrainCircuit,
    body: "OpenAI Responses, Claude API, realtime voice, orchestration around behavior-change loops.",
  },
  {
    label: "Workflow",
    icon: Workflow,
    body: "Claude Code, Codex, Cursor. Mixpanel and Superwall for measurement and monetization.",
  },
];

export default function StackPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: siteConfig.techStack.items.filter((it) => it.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <SubpageShell activePath="/stack">
      <div className="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex min-h-0 flex-col lg:col-span-5 lg:pr-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
            Stack
          </div>
          <h1 className="mt-2 text-4xl font-semibold leading-[0.95] text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
            How I build at{" "}
            <span className="font-serif italic font-normal text-amber-700 dark:text-amber-200">
              founder speed
            </span>
            .
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-700 xl:text-base dark:text-neutral-300">
            Optimized for shipping complete products: native iOS, backend systems, AI interaction, monetization, analytics, and AI-native development workflow.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {layers.map(({ label, icon: Icon, body }) => (
              <div
                key={label}
                className="rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="flex items-center gap-2">
                  <Icon size={15} className="text-amber-700 dark:text-amber-200" />
                  <span className="text-sm font-semibold text-neutral-950 dark:text-white">
                    {label}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-snug text-neutral-600 dark:text-neutral-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid min-h-0 grid-cols-2 gap-3 lg:col-span-7 lg:grid-cols-3 lg:grid-rows-2">
          {grouped.map((group) => (
            <div
              key={group.category}
              className="flex min-h-0 flex-col rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                <span className="h-1 w-1 rounded-full bg-amber-500" />
                <h2 className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
                  {group.category}
                </h2>
              </div>
              <ul className="mt-2 space-y-1 overflow-hidden">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="truncate text-xs text-neutral-700 dark:text-neutral-300"
                  >
                    {item.name}
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
