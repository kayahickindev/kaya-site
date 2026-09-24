import { CommandCenter } from "@/components/CommandCenter";
import { siteConfig } from "@/data/content";
import { getContributionCalendar } from "@/lib/github-contributions";
import { getMarketingMetrics } from "@/lib/marketing-metrics";

export default async function Home() {
  const [metrics, contributions] = await Promise.all([
    getMarketingMetrics(),
    getContributionCalendar(siteConfig.github.username),
  ]);

  return <CommandCenter metrics={metrics} contributions={contributions} />;
}
