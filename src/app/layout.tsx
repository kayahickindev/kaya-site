import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";
import { siteConfig } from "@/data/content";
import {
  getMarketingMetrics,
  type MarketingMetricsSnapshot,
} from "@/lib/marketing-metrics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

function tractionDescription(metrics: MarketingMetricsSnapshot) {
  const { payingSubscribers, arr } = metrics.metrics;
  return siteConfig.seo.description(payingSubscribers.display, arr.display);
}

export async function generateMetadata(): Promise<Metadata> {
  const metrics = await getMarketingMetrics();
  const description = tractionDescription(metrics);
  return {
    title: siteConfig.seo.title,
    description,
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    keywords: [
      "Kaya Hickin",
      "MyFutureSelf",
      "Appointra",
      "consumer AI founder",
      "technical co-founder",
      "iOS engineer",
      "Swift",
      "SwiftUI",
      "voice AI",
      "Claude Code",
      "Codex",
      "AI-native developer",
      "behavior change",
      "Cintrifuse Capital",
      "Dog AI",
      "full-stack developer",
      "Cleveland Ohio",
      "consumer AI startup",
      "three-time founder",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
    openGraph: {
      title: siteConfig.seo.title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "profile",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.seo.title,
      description,
      images: ["/opengraph-image"],
      creator: "@KayaHickin",
    },
    alternates: {
      canonical: siteConfig.url,
    },
  };
}

function personJsonLd(metrics: MarketingMetricsSnapshot) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kaya Hickin",
    alternateName: "Kaya",
    url: siteConfig.url,
    image: `${siteConfig.url}/headshot.jpg`,
    jobTitle: "Co-founder & CTO at MyFutureSelf",
    description:
      tractionDescription(metrics) +
      " Freshman year he co-founded LeadBoost Pro, a web development agency " +
      "that was profitable from month one. He then co-founded Appointra, a " +
      "cold outreach agency for AI startups, and grew it to $20K MRR in three " +
      "months. " +
      "In one month he merged over 3,000 PRs himself. " +
      "16,846 GitHub contributions in the last " +
      "year (to September 2026) across product and infra, a figure that counts " +
      "commits, pull requests, issues and reviews, and 100B+ tokens across " +
      "the Codex and Claude coding tools.",
    email: "kaya@myfutureselfapp.com",
    gender: "Male",
    nationality: "American",
    homeLocation: { "@type": "Place", name: "Cleveland, Ohio, USA" },
    workLocation: { "@type": "Place", name: "Cleveland, Ohio, USA" },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Miami University, Farmer School of Business",
        sameAs: "https://miamioh.edu/fsb/",
      },
    ],
    award: [
      "Startup Catalyst Award, Miami University, 2026 (John W. Altman Institute for Entrepreneurship)",
      "RedHawk Venture Pitch Prize, Miami University, 2025 ($10,000 team prize)",
      "Values and Ventures Honorable Mention, TCU, 2026 ($2,500 team award)",
      "Cum laude, Miami University, 2026",
      "Valedictorian, Crestwood High School, 2022",
      "Dean's List honors, Miami University",
    ],
    knowsAbout: [
      "Consumer AI",
      "iOS engineering",
      "Swift",
      "SwiftUI",
      "Voice AI",
      "WebRTC",
      "OpenAI Realtime API",
      "Claude API",
      "Firebase",
      "Cloud Functions",
      "Next.js",
      "TypeScript",
      "Behavior change product design",
      "B2B outbound systems",
      "Cold email infrastructure (DNS, SPF, DKIM, warmup)",
      "AI-native software development with Claude Code, Codex, and autonomous overnight agents",
      "Granola",
      "Wispr Flow",
      "Ghostty",
      "OpenClaw",
    ],
    worksFor: {
      "@type": "Organization",
      name: "MyFutureSelf",
      url: "https://myfutureselfapp.com",
      description:
        "MyFutureSelf is an AI agent that is your future self. It tells you what to do today and who can help you get there.",
      funder: { "@type": "Organization", name: "Cintrifuse Capital" },
    },
    sameAs: [
      "https://github.com/kayahickindev",
      "https://x.com/KayaHickin",
      "https://www.linkedin.com/in/kayahickin/",
      "https://www.instagram.com/kayahickin/",
      "https://myfutureselfapp.com/",
      "https://apps.apple.com/us/app/myfutureself-achieve-success/id6745573360",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Co-founder & CTO, MyFutureSelf",
        occupationLocation: { "@type": "City", name: "Cleveland, Ohio" },
        skills:
          "iOS engineering (Swift/SwiftUI), backend (Node.js/Firebase/Cloud Functions), voice AI (WebRTC, OpenAI Realtime), AI integration (Claude, OpenAI), product design, growth, AI-native development with Claude Code and Codex",
      },
    ],
  };
}

function orgJsonLd(metrics: MarketingMetricsSnapshot) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MyFutureSelf",
    url: "https://myfutureselfapp.com",
    founder: [
      { "@type": "Person", name: "Kaya Hickin", url: siteConfig.url },
      { "@type": "Person", name: "Giancarlo Sarti" },
    ],
    foundingDate: "2025-02",
    description:
      "MyFutureSelf is an AI agent that is your future self. It tells you " +
      "what to do today and who can help you get there. MyFutureSelf is now " +
      "bringing the agent to universities and corporations, where the person " +
      "who can help you most is already in your network through your school " +
      "or company. The agent finds them and connects you. " +
      `It has ${metrics.metrics.payingSubscribers.display} paying subscribers and ` +
      `${metrics.metrics.arr.display} ARR.`,
    funder: { "@type": "Organization", name: "Cintrifuse Capital" },
    sameAs: [
      "https://apps.apple.com/us/app/myfutureself-achieve-success/id6745573360",
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metrics = await getMarketingMetrics();
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-white dark:bg-[#070605] text-neutral-900 dark:text-neutral-100 font-sans antialiased">
        <Script
          id="person-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd(metrics)).replace(/</g, "\\u003c"),
          }}
        />
        <Script
          id="organization-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgJsonLd(metrics)).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
