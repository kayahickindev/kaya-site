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
      "1,718 paid subscribers and $65K ARR",
      "26,000+ downloads on the App Store",
      "52% average monthly revenue growth",
      "4.7-star App Store rating from 715 verified reviews",
    ],
    ownership: [
      "Native iOS product architecture",
      "Backend and data model for user roadmaps",
      "Voice-AI mentor experience",
      "Payments, analytics, and production iteration loop",
    ],
    stack: ["Swift", "SwiftUI", "StoreKit", "WebRTC", "Firebase", "OpenAI", "Claude"],
  },
  {
    slug: "dog-ai",
    project: projectByName("Dog AI"),
    role: "Co-founder",
    timeframe: "Built · Live product",
    overview: [
      "Dog AI is an iOS app that interprets dog behavior from a photo or video. I built and trained the underlying LLM on tens of thousands of dog images, including a behavior dataset from Harvard, then wrapped it in a fast, narrow consumer flow.",
      "The product started as a weekend build and became a paying App Store product. Scope stayed intentionally tight around one clear question: what is the dog actually feeling.",
    ],
    outcomes: [
      "Custom LLM trained on tens of thousands of dog images",
      "Incorporated a behavior dataset from Harvard",
      "Live on the App Store as a paying product",
      "Weekend prototype to monetized launch",
    ],
    ownership: [
      "Dataset assembly and model training",
      "iOS product and computer-vision flow",
      "App Store launch path",
      "Consumer positioning and product scope",
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
      "Client acquisition and delivery operations",
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
      "It started in a dorm room, became profitable from year one, and established the pattern of building practical systems for real customers.",
    ],
    outcomes: [
      "Profitable from year one",
      "Served small and underrepresented businesses",
      "Combined web development, marketing, and consulting",
    ],
    ownership: [
      "Client websites and digital presence",
      "Marketing systems and consulting",
      "Sales and delivery",
      "Small-business operating support",
    ],
    stack: ["Web development", "Marketing", "Consulting", "Local business systems"],
  },
];

export function getProjectDetail(slug: string) {
  return projectDetails.find((detail) => detail.slug === slug);
}
