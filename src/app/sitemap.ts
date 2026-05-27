import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/content";

const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/work", changeFrequency: "weekly", priority: 0.9 },
  { path: "/proof", changeFrequency: "weekly", priority: 0.9 },
  { path: "/stack", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/work/myfutureself", changeFrequency: "weekly", priority: 0.9 },
  { path: "/work/dog-ai", changeFrequency: "monthly", priority: 0.7 },
  { path: "/work/appointra", changeFrequency: "monthly", priority: 0.7 },
  { path: "/work/leadboost-pro", changeFrequency: "monthly", priority: 0.7 },
  { path: "/llms.txt", changeFrequency: "weekly", priority: 0.5 },
  { path: "/llms-full.txt", changeFrequency: "weekly", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
