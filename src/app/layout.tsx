import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";
import { siteConfig } from "@/data/content";

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

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
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
    "a16z Speedrun",
    "Y Combinator",
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
    description: siteConfig.seo.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "profile",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ["/opengraph-image"],
    creator: "@KayaHickin",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kaya Hickin",
  alternateName: "Kaya",
  url: siteConfig.url,
  image: `${siteConfig.url}/headshot.jpg`,
  jobTitle: "Co-founder & CTO at MyFutureSelf",
  description:
    "Three-for-three profitable founder. Co-founder and CTO of MyFutureSelf, an AI iOS app with 1,718 paying subscribers, 26,000+ downloads, $65K ARR, 52% average monthly revenue growth, and a 4.7-star App Store rating from 715 verified reviews. Solo-engineered the iOS app, backend, and voice-AI stack end-to-end. Previously co-founded Appointra (B2B AI outbound, scaled to $20K MRR in 3 months and $2M+ in client pipeline) and LeadBoost Pro (profitable from month one freshman year, still generating MRR). 2,600+ GitHub contributions in the last year across product and infra. Daily AI-native stack: Claude Code, Codex, Granola, Wispr Flow, Ghostty, and OpenClaw running autonomously overnight. Domain expertise in consumer AI, iOS, voice agents, and behavior-change products.",
  email: "kaya@successai.app",
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
    "Winner, RedHawk Venture Pitch Competition, Miami University ($10,000 prize)",
    "4th of 250 teams, TCU Values & Ventures Pitch Competition ($2,500 prize)",
    "Valedictorian, Crestwood High School",
    "Dean's List, Miami University (8 consecutive semesters)",
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
      "AI iOS app delivering personalized future-self mentorship through a 90-day roadmap and a voice AI mentor.",
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

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MyFutureSelf",
  url: "https://myfutureselfapp.com",
  founder: { "@type": "Person", name: "Kaya Hickin", url: siteConfig.url },
  description:
    "AI iOS app that creates a personalized future-self mentor for each user — delivering a 90-day roadmap and voice-based AI coaching. Current traction: 26,000+ downloads, 1,718 paid subscribers, $65K ARR, 52% average monthly revenue growth, and a 4.7★ App Store rating from 715 verified reviews.",
  sameAs: [
    "https://apps.apple.com/us/app/myfutureself-achieve-success/id6745573360",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-white dark:bg-[#070605] text-neutral-900 dark:text-neutral-100 font-sans antialiased">
        <Script
          id="person-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Script
          id="organization-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
