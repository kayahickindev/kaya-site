export const siteConfig = {
  name: "Kaya Hickin",
  title: "Founder, Builder, Operator",
  url: "https://kayahickin.com",

  seo: {
    title: "Kaya Hickin — Founder, Builder, Operator",
    description:
      "Building MyFutureSelf, an AI app with 19,000+ downloads. Three profitable companies since freshman year. Looking for an exceptional technical co-founder.",
  },

  hero: {
    headline: "I build products that move people forward.",
    description:
      "I've started three profitable companies since freshman year and I'm currently building MyFutureSelf — an AI app with 19,000+ downloads helping people become who they want to be. I design, code, and ship.",
    cta: {
      primary: { text: "View My Work", href: "#projects" },
      secondary: { text: "Get in Touch", href: "#contact" },
    },
  },

  metrics: [
    { value: 19000, label: "App Downloads", prefix: "", suffix: "+", format: true },
    { value: 565, label: "Paying Subscribers", prefix: "", suffix: "", format: false },
    { value: 30, label: "Revenue (First 4 Mo.)", prefix: "$", suffix: "k+", format: false },
    { value: 3, label: "Profitable Companies", prefix: "", suffix: "", format: false },
  ],

  about: {
    heading: "About Me",
    paragraphs: [
      "I've been starting companies since my freshman year of college. Three so far — all profitable. I don't wait for permission to build.",
      "Right now, I'm all-in on MyFutureSelf, an AI app that helps ambitious people create a vivid picture of their future self and then actually become that person through personalized guidance, accountability, and action. I built most of it myself — product, design, frontend, backend, prompts, analytics, and systems.",
      "I'm graduating from Miami University in May 2026 with a degree in Marketing and a minor in Entrepreneurship. After that, I'm heading to San Francisco to be closer to the people and energy that push things forward.",
      "I care deeply about AI, consumer products, behavior change, and building things that make a real difference in people's lives.",
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
        "Building an AI-powered personal development app. 19,000+ downloads, 565 paying subscribers, ~$30k revenue in first 4 months. Designed and built the product end to end.",
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
      "Beyond my main products, I've developed autonomous software engineer workflows using AI coding tools to accelerate development across everything I build. I move fast and push code daily.",
  },

  interests: {
    heading: "Beyond the Code",
    items: [
      "AI & Machine Learning",
      "Fitness & Nutrition",
      "Personal Development",
      "Hiking & Backpacking",
      "Reading",
      "Podcasts",
      "Consumer Products",
      "Behavior Change",
    ],
  },

  cofounder: {
    heading: "Looking for a Technical Co-Founder",
    description:
      "I'm looking for someone who's all-in. A high-agency, low-ego, technically exceptional full-stack engineer who moves fast, ships relentlessly, and wants to build something massive.",
    qualities: [
      "Technically exceptional — you can architect and build production systems end to end",
      "High agency — you don't wait to be told what to do",
      "Low ego — you care about the outcome, not who gets credit",
      "Moves fast — you ship in days, not months",
      "Ambitious — you want to build something that matters at scale",
    ],
    cta: "If this sounds like you, let's talk.",
  },

  contact: {
    heading: "Let's Build Something",
    description:
      "I'm always open to connecting with serious builders, technical co-founders, and investors who think big. If you're working on something ambitious or want to join forces, reach out.",
  },

  social: {
    github: "https://github.com/kayahickindev",
    twitter: "#",
    linkedin: "#",
    email: "mailto:hello@kayahickin.com",
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
