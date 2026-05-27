import type { Metadata } from "next";
import { ContactPanel } from "@/components/ContactBody";
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

export default function ContactPage() {
  return (
    <SubpageShell activePath="/contact">
      <ContactPanel />
    </SubpageShell>
  );
}
