import { siteConfig } from "@/data/content";

type Project = (typeof siteConfig.projects)[number];

type ProjectDetail = {
  slug: string;
  project: Project;
  role: string;
  timeframe: string;
  overview: string[];
  outcomes: string[];
  ownership: string[];
  stack: string[];
};

function projectByName(name: Project["name"]) {
  const project = siteConfig.projects.find((item) => item.name === name);

  if (!project) {
    throw new Error(`Missing project config for ${name}`);
  }

  return project;
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "myfutureself",
    project: projectByName("MyFutureSelf"),
    role: "Co-founder · CTO",
    timeframe: "Jan 2025 to Present",
    overview: [
      "MyFutureSelf is the main company and product: an AI iOS app built around a 90-day roadmap, daily action, and a voice AI mentor that speaks as the user's future self.",
      "As CTO, Kaya led the technical build end to end across native iOS, backend systems, and AI interaction design. The product is active and scaling with paying users.",
    ],
    outcomes: [
      "1,750+ paid subscribers and $67K+ ARR",
      "26,000+ downloads on the App Store",
      "52% average monthly revenue growth",
      "4.7-star App Store rating from 715 verified reviews",
    ],
    ownership: [
      "Native iOS product architecture",
      "Backend and data model for user roadmaps",
      "Voice-AI mentor experience",
    ],
    stack: ["Swift", "SwiftUI", "StoreKit", "WebRTC", "Firebase", "OpenAI", "Claude"],
  },
  {
    slug: "viral-loop",
    project: projectByName("Viral Loop"),
    role: "Internal tool",
    timeframe: "2026",
    overview: [
      "Viral Loop is a done-for-you service that generates AI UGC content and runs the organic influencer pipeline end-to-end for clients.",
      "Built the MVP on Lovable to validate the offer and start onboarding paying clients.",
    ],
    outcomes: [
      "MVP live and accepting clients",
      "AI-generated UGC content pipeline",
    ],
    ownership: [
      "Service design and pricing",
      "Web implementation on Lovable",
      "Content generation pipeline",
    ],
    stack: ["Lovable", "AI UGC", "Web"],
  },
  {
    slug: "dog-ai",
    project: projectByName("Dog AI"),
    role: "Side quest",
    timeframe: "2025",
    overview: [
      "Dog AI is an iOS app that interprets dog behavior from a photo or video. I built and trained the underlying multimodal LLM on a Harvard behavioral dataset, then wrapped it in a fast, narrow consumer flow.",
      "Weekend build that became a paying App Store product. Custom multimodal model, not a wrapped API.",
    ],
    outcomes: [
      "Custom multimodal LLM trained on Harvard behavioral data",
      "Live on the App Store as a paying product",
      "Weekend prototype to monetized launch",
    ],
    ownership: [
      "Dataset assembly and model training",
      "iOS product and computer-vision flow",
      "App Store launch path",
    ],
    stack: ["iOS", "Custom LLM", "Computer vision", "Harvard dataset", "App Store"],
  },
  {
    slug: "appointra",
    project: projectByName("Appointra"),
    role: "Co-founder",
    timeframe: "Jun 2024 to Feb 2025",
    overview: [
      "Appointra was a B2B lead generation agency serving startups in San Francisco, New York City, and Chicago.",
      "The company scaled through AI-powered outbound systems, then was wound down so Kaya could focus full-time on MyFutureSelf.",
    ],
    outcomes: [
      "$20k MRR in three months",
      "Millions in client pipeline generated",
      "Hundreds of qualified meetings booked",
    ],
    ownership: [
      "Outbound system design",
      "AI-assisted prospecting workflows",
      "Agency growth and wind-down decision",
    ],
    stack: ["B2B outbound", "AI workflows", "Automation", "Operations"],
  },
  {
    slug: "leadboost-pro",
    project: projectByName("LeadBoost Pro"),
    role: "Co-founder",
    timeframe: "Jan 2023 to Jun 2024",
    overview: [
      "LeadBoost Pro was the first company Kaya ran: a web development, marketing, and consulting business for small and underrepresented businesses.",
      "It started in a dorm room, became profitable from month one, and established the pattern of building practical systems for real customers.",
    ],
    outcomes: [
      "Profitable from month one",
      "Served small and underrepresented businesses",
      "Combined web development, marketing, and consulting",
    ],
    ownership: [
      "Client websites and digital presence",
      "Marketing systems and consulting",
      "Small-business operating support",
    ],
    stack: ["Web development", "Marketing", "Consulting", "Local business systems"],
  },
];

export function getProjectDetail(slug: string) {
  return projectDetails.find((detail) => detail.slug === slug);
}
