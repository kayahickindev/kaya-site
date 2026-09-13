export const revalidate = 3600;

import { CommandCenter } from "@/components/CommandCenter";
import { getMarketingMetrics, publicMarketingMetricsSnapshot } from "@/lib/marketing-metrics";

export default async function Home() {
  const metrics = await getMarketingMetrics();

  return <CommandCenter metrics={publicMarketingMetricsSnapshot(metrics)} />;
}
