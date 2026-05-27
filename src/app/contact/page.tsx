import type { Metadata } from "next";
import { BriefcaseBusiness, Handshake, Rocket } from "lucide-react";
import { ContactBody } from "@/components/ContactBody";
import { SubpageShell } from "@/components/SubpageShell";
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
    <SubpageShell activePath="/contact">
      <div className="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex min-h-0 flex-col lg:col-span-7 lg:pr-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
            Contact
          </div>
          <h1 className="mt-2 text-4xl font-semibold leading-[0.95] text-neutral-950 sm:text-5xl xl:text-6xl dark:text-white">
            Let&apos;s build{" "}
            <span className="font-serif italic font-normal text-amber-700 dark:text-amber-200">
              something
            </span>
            .
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-700 xl:text-base dark:text-neutral-300">
            {siteConfig.contact.body}
          </p>

          <div className="mt-5 grid flex-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {reasons.map(({ label, body, icon: Icon }) => (
              <div
                key={label}
                className="flex min-h-0 gap-3 rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-400/15 text-amber-700 ring-1 ring-amber-400/25 dark:text-amber-200">
                  <Icon size={15} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-950 dark:text-white">
                    {label}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-neutral-600 dark:text-neutral-400">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ContactBody />
      </div>
    </SubpageShell>
  );
}
