import { CommandCenter } from "@/components/CommandCenter";
import { getMarketingMetrics } from "@/lib/marketing-metrics";

export default async function Home() {
  const metrics = await getMarketingMetrics();

  return <CommandCenter metrics={metrics} />;
}
