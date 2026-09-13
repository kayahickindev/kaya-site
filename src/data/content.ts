import { profile, awards } from "./profile";

// Centralized email parts for contact links and display.
const EMAIL_USER = "kaya";
const EMAIL_DOMAIN = "successai.app";

export const siteConfig = {
  name: "Kaya Hickin",
  url: "https://kayahickin.com",

  seo: {
    title: "Kaya Hickin | Full-Stack Developer & MyFutureSelf CTO",
    description: "Kaya Hickin, co-founder and CTO of Cintrifuse-backed MyFutureSelf. Full-stack developer building consumer AI, real-time voice, and custom multimodal models.",
  },

  availability: profile.location,
  recognitions: awards.map((award) => `${award.name}, ${award.issuer}`),

  about: {
    paragraphs: profile.about,
    sidebar: [
      { label: "Education", value: "Miami University · Cum laude", detail: "B.S. in Business, Marketing major, Entrepreneurship minor. May 2026 · 3.74 GPA.", icon: "GraduationCap" },
      { label: "Background", value: "Valedictorian · Class of 2022", detail: "Crestwood High School. Dean's List honors across engineering and business at Miami.", icon: "GraduationCap" },
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
      { name: "Next.js / React", category: "Web" },
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
      tagline: "A voice AI mentor that speaks as your future self.",
      description:
        "A 90-day roadmap, daily actions, and a voice AI mentor that speaks as your future self. Built end to end by Kaya Hickin across iOS, Android, web, backend, and real-time voice.",
      highlights: [
        "Backed by Cintrifuse Capital",
        "Mobile, web, backend, and real-time voice AI",
      ],
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
      tagline: "A done-for-you AI UGC influencer service, built on Lovable.",
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
      tagline: "A custom multimodal model, shipped as an iPhone app.",
      description:
        "Dog AI reads a dog's mood from a photo or video. Kaya assembled the dataset, trained the custom multimodal model behind it, and shipped the iOS app to the App Store.",
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
      tagline: "B2B outbound agency. $20k MRR in three months.",
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
      tagline: "Web and marketing for local businesses. Profitable from month one.",
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
        "Consumer AI: a 90-day roadmap and a voice mentor that speaks as your future self. Built the original product end to end and lead engineering across mobile, web, backend, and AI.",
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

  // Contact address used by the contact page.
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
