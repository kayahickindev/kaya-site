// Email is split to prevent plain-text scraping. Reassembled on click only.
const EMAIL_USER = "kaya";
const EMAIL_DOMAIN = "successai.app";

export const siteConfig = {
  name: "Kaya Hickin",
  url: "https://www.kayahickin.com",

  seo: {
    title: "Kaya Hickin — Technical Co-founder & CTO, MyFutureSelf",
    description:
      "Three-for-three profitable founder. Co-founder & CTO of MyFutureSelf, an AI iOS app with 2,900+ active paid subscribers, a $115K+ annual run rate, 30K+ downloads, 52% average monthly growth, and a 4.7★ App Store rating. Solo-built iOS, backend, and voice-AI stack end-to-end. Building consumer AI for behavior change.",
  },

  availability: "Cleveland, OH",

  recognitions: [
    "Winner, RedHawk Business Accelerator (Miami University 2025)",
    "Honorable Mention, TCU Values & Ventures Competition",
  ],

  about: {
    paragraphs: [
      "I started my first company freshman year because I wanted to see if I could build something people would pay for. Turns out I could, so I kept going. Three companies later, I'm three for three on profitability.",
      "My main focus right now is MyFutureSelf, an AI app that helps people define who they want to become and then become that person through a 90-day personalized roadmap, an AI mentor that speaks as their future self, and daily action. As CTO, I led the technical build end to end: iOS, backend, and AI systems.",
      "I'm AI-native in how I build. In the last year I've logged 6,000+ GitHub contributions, mostly written alongside Claude Code and Codex. My active local repos now span 1.9M+ tracked lines of code, with 9B+ lifetime Codex tokens used.",
      "I graduated from Miami University with a Marketing degree and an Entrepreneurship minor and am based in Cleveland, OH. Most of my time goes toward thinking about how AI can build consumer products that change real behavior, not just engagement metrics.",
    ],
    sidebar: [
      { label: "Education", value: "Miami University", detail: "BA Marketing, Minor in Entrepreneurship, May 2026", icon: "GraduationCap" },
    ],
  },

  techStack: {
    items: [
      { name: "Swift / SwiftUI", category: "iOS" },
      { name: "Core Data / StoreKit", category: "iOS" },
      { name: "WebRTC", category: "iOS" },
      { name: "RevenueCat", category: "iOS" },
      { name: "Superwall", category: "iOS" },
      { name: "TestFlight", category: "iOS" },
      { name: "TypeScript", category: "Web" },
      { name: "Next.js 16 / React 19", category: "Web" },
      { name: "Tailwind CSS v4", category: "Web" },
      { name: "Framer Motion", category: "Web" },
      { name: "Vercel", category: "Web" },
      { name: "Node.js", category: "Backend" },
      { name: "Firebase / Firestore", category: "Backend" },
      { name: "Cloud Functions", category: "Backend" },
      { name: "Supabase", category: "Backend" },
      { name: "Stripe", category: "Backend" },
      { name: "PostHog", category: "Backend" },
      { name: "OpenAI Responses API", category: "AI" },
      { name: "Claude API", category: "AI" },
      { name: "Realtime / Voice", category: "AI" },
      { name: "Whisper", category: "AI" },
      { name: "ElevenLabs", category: "AI" },
      { name: "Claude Code", category: "Workflow" },
      { name: "Codex", category: "Workflow" },
      { name: "Ghostty", category: "Workflow" },
      { name: "Wispr Flow", category: "Workflow" },
      { name: "Granola", category: "Workflow" },
      { name: "Lovable", category: "Workflow" },
    ],
  },

  projects: [
    {
      slug: "myfutureself",
      name: "MyFutureSelf",
      tagline: "AI mentorship for the person you're becoming.",
      description:
        "A 90-day roadmap and a voice AI mentor that speaks as your future self.",
      highlights: [
        "2,900+ active paid subscribers · $115K+ annual run rate",
        "30,000+ downloads · 4.7★ from 1,032 reviews",
        "52% average monthly revenue growth",
      ],
      links: {
        website: "https://myfutureselfapp.com/",
        appStore:
          "https://apps.apple.com/us/app/myfutureself-achieve-success/id6745573360",
      },
      image: "/mfs-hero.webp",
      featured: true,
      tags: ["AI", "Consumer", "iOS", "Voice"],
      status: "Current focus",
    },
    {
      slug: "viral-loop",
      name: "Viral Loop",
      tagline: "Done-for-you AI UGC influencer service.",
      description:
        "Service that generates AI UGC content and runs an organic influencer pipeline end-to-end. Built on Lovable.",
      links: {
        website: "https://viralloopmvp.lovable.app",
      },
      featured: false,
      tags: ["AI", "UGC", "Service"],
      status: "Live · MVP",
    },
    {
      slug: "dog-ai",
      name: "Dog AI",
      tagline: "Custom multimodal LLM, trained on Harvard behavioral data.",
      description:
        "iOS app that interprets dog behavior with a custom multimodal LLM I built and trained on a Harvard behavioral dataset. A weekend build that turned into a paying App Store product.",
      links: {
        appStore:
          "https://apps.apple.com/us/app/dog-ai-dog-mood-detector/id6746574124",
      },
      featured: false,
      tags: ["AI", "Vision", "iOS"],
      status: "Past · Live",
    },
    {
      slug: "appointra",
      name: "Appointra",
      tagline: "B2B outbound, on autopilot.",
      description:
        "Lead generation agency for SF, NYC, and Chicago startups. Scaled to $20k MRR in three months using AI-powered outbound, generating millions in pipeline and hundreds of qualified meetings.",
      links: {
        website: "https://appointra.net/",
      },
      featured: false,
      tags: ["B2B", "Outbound", "Agency"],
      status: "Past · Wound down",
    },
    {
      slug: "leadboost-pro",
      name: "LeadBoost Pro",
      tagline: "Marketing for businesses that don't have a marketing team.",
      description:
        "Web development, marketing, and consulting for small and underrepresented businesses in the local community. The first company I ran. Profitable from month one.",
      links: {
        website: "https://leadboost-pro.com/",
      },
      featured: false,
      tags: ["Marketing", "Web Dev", "Consulting"],
      status: "Past · Live",
    },
  ],

  timeline: [
    {
      company: "MyFutureSelf",
      role: "Co-Founder · CTO",
      period: "Jan 2025 to Present",
      description:
        "AI iOS app: 90-day roadmap and a voice mentor that speaks as your future self. Solo-built iOS, Firebase backend, and AI integration in six months.",
      metrics: [],
      active: true,
    },
    {
      company: "Appointra",
      role: "Co-Founder · CTO",
      period: "Jun 2024 to Feb 2025",
      description:
        "Co-founded with Giancarlo. Built cold-email infra that hit $20k MRR in three months and drove $2M+ in pipeline for 8/9-figure founders.",
      metrics: [],
      active: false,
    },
    {
      company: "LeadBoost Pro",
      role: "Co-Founder",
      period: "Jan 2023 to Jun 2024",
      description:
        "Dorm-room start, profitable from month one. Built 20+ custom websites freshman year. Marketing, web dev, and consulting for blue collar businesses.",
      metrics: [],
      active: false,
    },
  ],

  github: {
    username: "kayahickindev",
    url: "https://github.com/kayahickindev",
  },

  // Email parts kept separate so the literal address never appears in source HTML.
  emailParts: {
    user: EMAIL_USER,
    domain: EMAIL_DOMAIN,
  },

  social: {
    github: "https://github.com/kayahickindev",
    twitter: "https://x.com/KayaHickin",
    linkedin: "https://www.linkedin.com/in/kayahickin/",
    instagram: "https://www.instagram.com/kayahickin/",
    myfutureself: "https://myfutureselfapp.com/",
  },
};
