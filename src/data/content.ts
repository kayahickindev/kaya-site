// Email is split to prevent plain-text scraping. Reassembled on click only.
const EMAIL_USER = "kaya";
const EMAIL_DOMAIN = "myfutureselfapp.com";

export const siteConfig = {
  name: "Kaya Hickin",
  url: "https://www.kayahickin.com",

  seo: {
    title: "Kaya Hickin | Co-founder & CTO, MyFutureSelf",
    // layout.tsx fills in the live paying subscriber and ARR figures, so the
    // description never goes stale.
    description: (payingSubscribers: string, arr: string) =>
      "Kaya Hickin is the co-founder and CTO of MyFutureSelf, an AI agent that is your future self. " +
      "It tells you what to do today and who can help you get there. " +
      `MyFutureSelf has ${payingSubscribers} paying subscribers and ${arr} ARR, and it is his third profitable company. ` +
      "He built the iOS and Android apps, the backend, the AI and the company brain the team's agents work off 24/7.",
  },

  availability: "Cincinnati, OH",

  recognitions: [
    "Startup Catalyst Award, Miami University 2026",
    "RedHawk Venture Pitch Prize, Miami University 2025",
    "Values and Ventures Honorable Mention, TCU 2026",
  ],

  about: {
    // The LinkedIn About, verbatim. The about page passes in the live paying
    // subscriber figure ("5,000+"), so the last paragraph never goes stale.
    paragraphs: (payingSubscribers: string) => [
      "I'm the co-founder and CTO of MyFutureSelf, an AI agent that is your future self. It tells you what to do today and who can help you get there.",
      "I grew up poor in a farm town and started working in my dad's landscaping business at 13. That money bought my first computer, and I went from hacking Minecraft servers to learning how to code in middle school. I graduated valedictorian as a three-sport athlete, then paid my own way through Miami University and finished cum laude.",
      "MyFutureSelf is my third profitable company. I co-founded a web development agency freshman year, then Appointra, a cold outreach agency for AI startups that hit $20K MRR in three months.",
      "Giancarlo Sarti and I started MyFutureSelf together, and I lead development. I built our iOS and Android apps, the backend, the AI, and the company brain our agents work off 24/7, writing code, fixing bugs and shipping releases. In one month I merged over 3,000 PRs myself.",
      `Today ${payingSubscribers} people pay for MyFutureSelf, and we're now bringing it to universities and corporations.`,
    ],
    sidebar: [
      { label: "Education", value: "Miami University · Cum laude", detail: "B.S. in Business, Marketing major, Entrepreneurship minor. Farmer School of Business, May 2026.", icon: "GraduationCap" },
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
      { name: "React Native", category: "Android" },
      { name: "Expo", category: "Android" },
      { name: "Google Play", category: "Android" },
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
      tagline:
        "An AI agent that is your future self. It tells you what to do today and who can help you get there.",
      description:
        "MyFutureSelf is an AI agent that is your future self. It tells you what to do today and who can help you get there.",
      links: {
        website: "https://myfutureselfapp.com/",
        appStore:
          "https://apps.apple.com/us/app/myfutureself-achieve-success/id6745573360",
      },
      featured: true,
      tags: ["AI", "Consumer", "iOS", "Android", "Voice"],
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
        "Cold outreach agency for AI startups in SF, NYC, and Chicago. Scaled to $20K MRR in three months with AI-powered outbound, generating millions in pipeline and hundreds of qualified meetings.",
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
      period: "Feb 2025 to Present",
      description:
        "An AI agent that is your future self, co-founded with Giancarlo Sarti. I lead development and built the iOS and Android apps, the university platform, the backend and the AI.",
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
