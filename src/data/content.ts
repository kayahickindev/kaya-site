// Email is split to prevent plain-text scraping. Reassembled on click only.
const EMAIL_USER = "kaya";
const EMAIL_DOMAIN = "successai.app";

export const siteConfig = {
  name: "Kaya Hickin",
  title: "Co-founder · Builder · Operator",
  url: "https://www.kayahickin.com",

  seo: {
    title: "Kaya Hickin, Co-founder of MyFutureSelf",
    description:
      "Co-founder and CTO of MyFutureSelf, an AI app with 950+ paying subscribers and a 4.7★ App Store rating. Always looking for technical co-founders.",
  },

  status: {
    pill: "Currently shipping MyFutureSelf",
  },

  hero: {
    eyebrow: "Co-founder · Builder · Operator",
    headline: "I build products that move people forward.",
    description:
      "Co-founder and CTO at MyFutureSelf, an AI iOS app with 950+ paying subscribers and a 4.7★ App Store rating. I design, code, and ship.",
    cta: {
      primary: { text: "See what I've built", href: "#projects" },
      secondary: { text: "Get in touch", href: "#contact" },
    },
  },

  metrics: [
    {
      value: 953,
      label: "Active Paid Subscribers",
      detail: "MyFutureSelf, server-validated via Apple",
      prefix: "",
      suffix: "+",
      format: true,
    },
    {
      value: 95916,
      label: "User Actions Completed",
      detail: "Tasks, voice sessions, daily check-ins",
      prefix: "",
      suffix: "+",
      format: true,
    },
    {
      value: 4.7,
      label: "App Store Rating",
      detail: "From 636 verified reviews",
      prefix: "",
      suffix: "★",
      format: false,
      decimals: 1,
    },
  ],

  recognitions: [
    "Winner, RedHawk Business Accelerator (Miami University 2025)",
    "Honorable Mention, TCU Values & Ventures Competition",
  ],

  about: {
    heading: "About",
    paragraphs: [
      "I started my first company freshman year because I wanted to see if I could build something people would pay for. Turns out I could, so I kept going.",
      "My main focus right now is MyFutureSelf, an AI app that helps people define who they want to become and then become that person through a 90-day personalized roadmap, an AI mentor that speaks as their future self, and daily action. As CTO, I led the technical build end to end: iOS, backend, and AI systems.",
      "I'm graduating from Miami University this month with a Marketing degree and an Entrepreneurship minor, then heading to San Francisco.",
      "Most of my time goes toward thinking about how AI can build consumer products that change real behavior, not just engagement metrics.",
    ],
    sidebar: [
      { label: "Based in", value: "Oxford, OH", detail: "SF-bound this summer", icon: "MapPin" },
      { label: "Education", value: "Miami University", detail: "BA Marketing, Minor in Entrepreneurship, May 2026", icon: "GraduationCap" },
      { label: "Focus", value: "AI · Consumer · Behavior change", icon: "Target" },
      { label: "Off-screen", value: "Lifting, hiking, reading, podcasts", icon: "Compass" },
    ],
  },

  techStack: {
    heading: "How I build",
    items: [
      { name: "Swift / SwiftUI", category: "iOS" },
      { name: "Core Data / StoreKit", category: "iOS" },
      { name: "WebRTC", category: "iOS" },
      { name: "TypeScript", category: "Web" },
      { name: "Next.js / React", category: "Web" },
      { name: "Tailwind CSS", category: "Web" },
      { name: "Node.js", category: "Backend" },
      { name: "Firebase / Firestore", category: "Backend" },
      { name: "Cloud Functions", category: "Backend" },
      { name: "OpenAI Responses API", category: "AI" },
      { name: "Claude API", category: "AI" },
      { name: "Realtime / Voice", category: "AI" },
      { name: "Cursor", category: "Workflow" },
      { name: "Claude Code", category: "Workflow" },
      { name: "Mixpanel", category: "Workflow" },
      { name: "Superwall", category: "Workflow" },
    ],
  },

  projects: [
    {
      name: "MyFutureSelf",
      tagline: "AI mentorship for the person you're becoming.",
      description:
        "A 90-day roadmap and a voice AI mentor that speaks as your future self.",
      highlights: [
        "950+ active paid subscribers",
        "4.7★ on App Store · 636 reviews",
        "95K+ user actions completed",
      ],
      links: {
        website: "https://myfutureselfapp.com/",
        appStore:
          "https://apps.apple.com/us/app/myfutureself-achieve-success/id6745573360",
      },
      image: "/mfs-hero.webp",
      featured: true,
      tags: ["AI", "Consumer", "iOS", "Voice"],
      status: "Active · Scaling",
    },
    {
      name: "Dog AI",
      tagline: "What's your dog actually feeling?",
      description:
        "iOS app that uses computer vision to interpret dog behavior and flag when something might be wrong. A weekend build that turned into a paying product.",
      links: {
        appStore:
          "https://apps.apple.com/us/app/dog-ai-dog-mood-detector/id6746574124",
      },
      featured: false,
      tags: ["AI", "Vision", "iOS"],
      status: "Live",
    },
    {
      name: "Appointra",
      tagline: "B2B outbound, on autopilot.",
      description:
        "Lead generation agency for SF, NYC, and Chicago startups. Generated millions in pipeline and hundreds of qualified meetings using AI-powered outbound. Reached $20k MRR before I wound it down to focus full-time on MyFutureSelf.",
      links: {
        website: "https://appointra.net/",
      },
      featured: false,
      tags: ["B2B", "Outbound", "Agency"],
      status: "Wound down",
    },
    {
      name: "LeadBoost Pro",
      tagline: "Marketing for businesses that don't have a marketing team.",
      description:
        "Web development, marketing, and consulting for small and underrepresented businesses in the local community. The first company I ran. Profitable from year one.",
      links: {
        website: "https://leadboost-pro.com/",
      },
      featured: false,
      tags: ["Marketing", "Web Dev", "Consulting"],
      status: "Active",
    },
  ],

  timeline: [
    {
      company: "MyFutureSelf",
      role: "Co-Founder · CTO",
      period: "Jan 2025 to Present",
      description:
        "Building an iOS app with a 90-day personalized roadmap and a voice AI mentor. Led the product and technical build end to end. Now serving 950+ active paid subscribers with a 4.7★ App Store rating.",
      metrics: ["950+ paid", "4.7★", "95K+ actions"],
      active: true,
    },
    {
      company: "RedHawk Business Accelerator",
      role: "Winner, Miami University",
      period: "April 2025",
      description:
        "Won Miami University's competitive business accelerator with MyFutureSelf.",
      active: false,
    },
    {
      company: "Appointra",
      role: "Co-Founder",
      period: "Jun 2024 to Feb 2025",
      description:
        "Built a B2B lead generation agency serving startups in SF, NYC, and Chicago. Generated millions in pipeline, booked hundreds of qualified meetings via AI-powered outbound. Hit $20k MRR before I wound it down to focus on MyFutureSelf.",
      metrics: ["$20k MRR", "100s of meetings booked"],
      active: false,
    },
    {
      company: "LeadBoost Pro",
      role: "Co-Founder",
      period: "Jan 2023 to Jun 2024",
      description:
        "Started in my dorm room. Built a marketing, web development, and consulting business focused on helping small and underrepresented businesses grow through stronger digital presence and better systems.",
      metrics: ["Profitable year one"],
      active: false,
    },
  ],

  github: {
    username: "kayahickindev",
    url: "https://github.com/kayahickindev",
    heading: "I ship constantly.",
    description:
      "I'm AI-native in how I build, with Cursor and Claude Code in my daily flow. Most of my code lives in Swift/SwiftUI for iOS and TypeScript/Next.js for web.",
  },

  contact: {
    eyebrow: "Reach out",
    heading: "Let's build something.",
    body:
      "I'm always looking for a technical co-founder at founding level with equity, for MyFutureSelf and for what comes next. Investors backing consumer AI and builders shipping ambitious products, drop a line too.",
    primaryCta: {
      label: "Email me",
    },
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

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
};
