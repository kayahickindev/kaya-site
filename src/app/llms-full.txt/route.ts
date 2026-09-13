import { getMarketingMetrics } from "@/lib/marketing-metrics";
import { profileText } from "@/lib/profile-content";

export const revalidate = 3600;

export async function GET() {
  const metrics = await getMarketingMetrics();
  return new Response(profileText(metrics, true), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
