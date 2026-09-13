export const revalidate = 3600;

import { HomePage } from "@/components/HomePage";
import { getMarketingMetrics, publicMarketingMetricsSnapshot } from "@/lib/marketing-metrics";

export default async function Home() {
  const metrics = await getMarketingMetrics();

  return <HomePage metrics={publicMarketingMetricsSnapshot(metrics)} />;
}
