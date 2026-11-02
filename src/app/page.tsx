import { CommandCenter } from "@/components/CommandCenter";
import { siteConfig } from "@/data/content";
import { getContributionCalendar } from "@/lib/github-contributions";
import {
  clientMarketingMetricsSnapshot,
  getMarketingMetrics,
} from "@/lib/marketing-metrics";

export default async function Home() {
  const [metrics, contributions] = await Promise.all([
    getMarketingMetrics(),
    getContributionCalendar(siteConfig.github.username),
  ]);

  // CommandCenter is a Client Component, so only the published figures cross.
  return (
    <CommandCenter
      metrics={clientMarketingMetricsSnapshot(metrics)}
      contributions={contributions}
    />
  );
}
