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
      "A 90-day roadmap, daily actions, and a voice AI mentor that speaks as the user's future self. I built the original product end to end and lead engineering across mobile, web, backend, and AI.",
    ],
    outcomes: ["Backed by Cintrifuse Capital"],
    ownership: [
      "iOS, Android, and web product engineering",
      "Backend and data model for user roadmaps",
      "Real-time voice and personalized AI experiences",
      "Subscriptions, analytics, accessibility, and release infrastructure",
    ],
    stack: ["Swift", "SwiftUI", "React Native", "Next.js", "TypeScript", "WebRTC", "Firebase", "OpenAI", "Claude"],
  },
  {
    slug: "viral-loop",
    project: projectByName("Viral Loop"),
    role: "Internal tool",
    timeframe: "2026",
    overview: [
      "A done-for-you service that generates AI UGC content and runs the organic influencer pipeline for clients. The MVP was built on Lovable to validate the offer.",
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
    role: "Developer · Model training",
    timeframe: "2025",
    overview: [
      "Dog AI reads a dog's mood from a photo or video. I assembled the dataset, trained the custom multimodal model, and built the iOS app through to a paid App Store launch.",
    ],
    outcomes: [
      "Custom multimodal model built and trained for Dog AI",
      "Live on the App Store as a paying product",
      "Model training through monetized iOS launch",
    ],
    ownership: [
      "Dataset assembly and model training",
      "iOS product and computer-vision flow",
      "App Store launch path",
    ],
    stack: ["iOS", "Custom LLM", "Computer vision", "App Store"],
  },
  {
    slug: "appointra",
    project: projectByName("Appointra"),
    role: "Co-founder",
    timeframe: "Jun 2024 to Feb 2025",
    overview: [
      "A B2B lead generation agency for startups in San Francisco, New York City, and Chicago, built on AI-powered outbound. Wound down to go full-time on MyFutureSelf.",
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
      "The first company I ran: web development, marketing, and consulting for small and underrepresented businesses. Started in a dorm room, profitable from month one.",
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
