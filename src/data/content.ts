export const siteConfig = {
  name: "Kaya Hickin",
  title: "Founder, Builder, Operator",
  url: "https://kayahickin.com",

  seo: {
    title: "Kaya Hickin | Founder, Builder, Operator",
    description:
      "Building MyFutureSelf, an AI app with 19,000+ downloads. Three profitable companies since freshman year. Looking for an exceptional technical co-founder.",
  },

  hero: {
    headline: "I build products that move people forward.",
    description:
      "I've started three profitable companies since freshman year and I'm currently building MyFutureSelf, an AI app with 19,000+ downloads helping people become who they want to be. I design, code, and ship.",
    cta: {
      primary: { text: "View My Work", href: "#projects" },
      secondary: { text: "Get in Touch", href: "#contact" },
    },
  },

  metrics: [
    { value: 19000, label: "App Downloads", prefix: "", suffix: "+", format: true },
    { value: 1200, label: "Paying Subscribers", prefix: "", suffix: "+", format: true },
    { value: 30, label: "Revenue (First 4 Mo.)", prefix: "$", suffix: "k+", format: false },
    { value: 3, label: "Profitable Companies", prefix: "", suffix: "", format: false },
  ],

  recognition: "Winner, RedHawk Business Accelerator, Miami University 2025",

  about: {
    heading: "About Me",
    paragraphs: [
      "I started my first company freshman year because I wanted to see if I could actually build something people would pay for. Turns out I could, so I kept going.",
      "My main focus right now is MyFutureSelf, an AI app that helps people create a vivid version of their future self and then become that person through personalized guidance, accountability, and action. I designed and built most of it myself: the product, the frontend, the backend, the prompt systems, all of it.",
      "I'm finishing up at Miami University this spring with a Marketing degree and an Entrepreneurship minor, then heading to San Francisco after graduation.",
      "Most of my time goes toward thinking about how AI can make consumer products that change real behavior, not just engagement metrics.",
    ],
    sidebar: [
      { label: "Location", value: "SF-bound (currently Ohio)" },
      { label: "Education", value: "Miami University, May 2026", detail: "Marketing + Entrepreneurship Minor" },
      { label: "Focus", value: "AI, Consumer Products, Behavior Change" },
      { label: "Other interests", value: "Fitness, hiking, reading, podcasts" },
    ],
  },

  techStack: {
    heading: "What I Build With",
    items: [
      "Swift",
      "SwiftUI",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Firebase",
      "OpenAI API",
      "Claude API",
      "Tailwind CSS",
      "Python",
      "Git",
    ],
  },

  projects: [
    {
      name: "MyFutureSelf",
      description:
        "AI app helping people create their future self and become that person through personalized guidance, accountability, and action.",
      links: {
        website: "https://myfutureselfapp.com/",
        appStore:
          "https://apps.apple.com/us/app/myfutureself-daily-habit-coach/id6745573360",
      },
      featured: true,
      tags: ["AI", "Consumer", "iOS"],
    },
    {
      name: "Dog AI",
      description:
        "AI-powered app using computer vision to help interpret dog behavior and detect when something may be wrong.",
      links: {
        appStore:
          "https://apps.apple.com/us/app/dog-ai-dog-mood-detector/id6746574124",
      },
      featured: false,
      tags: ["AI", "Vision", "iOS"],
    },
    {
      name: "LeadBoost Pro",
      description:
        "Marketing, web development, and consulting business helping companies improve their digital presence and growth.",
      links: {
        website: "https://leadboost-pro.com/",
      },
      featured: false,
      tags: ["Marketing", "Web Dev", "Consulting"],
    },
    {
      name: "Appointra",
      description:
        "B2B lead generation and outbound business serving startups across New York, San Francisco, and Chicago.",
      links: {
        website: "https://appointra.net/",
      },
      featured: false,
      tags: ["B2B", "Lead Gen", "Outbound"],
    },
  ],

  timeline: [
    {
      company: "MyFutureSelf",
      role: "Founder & Builder",
      period: "2024 — Present",
      description:
        "Building an AI-powered personal development app. 19,000+ downloads, 1,200+ paying subscribers, ~$30k revenue in first 4 months. Designed and built the product end to end.",
      active: true,
    },
    {
      company: "RedHawk Business Accelerator",
      role: "Winner — Miami University",
      period: "April 2025",
      description:
        "Won the university's competitive business accelerator program for MyFutureSelf.",
      active: false,
    },
    {
      company: "Appointra",
      role: "Founder",
      period: "2023 — Present",
      description:
        "B2B lead generation business serving startups in major US markets. Profitable from early operations.",
      active: true,
    },
    {
      company: "LeadBoost Pro",
      role: "Founder",
      period: "2022 — Present",
      description:
        "Started a marketing and web development consultancy during freshman year. Profitable from month one.",
      active: true,
    },
  ],

  github: {
    username: "kayahickindev",
    url: "https://github.com/kayahickindev",
    heading: "I Ship Constantly",
    description:
      "I build with AI-assisted workflows and ship fast. Most of my work lives across Swift/SwiftUI for iOS and React/Next.js for web, with OpenAI and Claude APIs powering the AI layers. I push code daily.",
  },

  whatsNext: {
    heading: "Where I'm Headed",
    items: [
      {
        title: "Moving to San Francisco",
        description: "This summer. To be around the people and companies pushing things forward.",
      },
      {
        title: "Scaling MyFutureSelf",
        description: "Focused on retention, AI depth, and building something people use every day, not just download once.",
      },
      {
        title: "Finding a co-founder",
        description: "The right technical partner to take MFS from a strong start to something much bigger.",
      },
      {
        title: "Raising and accelerating",
        description: "Exploring early-stage funding and accelerator programs to fuel the next stage of growth.",
      },
    ],
  },

  cofounder: {
    heading: "Looking for a Technical Co-Founder",
    description:
      "MyFutureSelf has real traction and I need a technical partner to help turn it into something much bigger. Someone who can own the engineering, the infrastructure, the scale, the AI systems, while I drive product, design, and growth.",
    qualities: [
      "You can architect and ship production systems end to end",
      "You move fast and would rather ship and iterate than plan forever",
      "You care about the outcome, not who gets credit",
      "You want to build a product that millions of people actually use",
    ],
    cta: "If this sounds like you, reach out. Let's talk.",
  },

  contact: {
    heading: "Let's Build Something",
    description:
      "If you're a builder, investor, or someone working on something ambitious, I'd love to connect.",
  },

  social: {
    github: "https://github.com/kayahickindev",
    twitter: "https://x.com/KayaHickin",
    linkedin: "https://www.linkedin.com/in/kayahickin/",
    email: "",
    myfutureself: "https://myfutureselfapp.com/",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "GitHub", href: "#github" },
    { label: "Contact", href: "#contact" },
  ],
};
