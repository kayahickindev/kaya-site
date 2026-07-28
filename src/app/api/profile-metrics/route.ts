import {
  FALLBACK_MARKETING_METRICS,
  getMarketingMetrics,
  publicMarketingMetricsSnapshot,
} from "@/lib/marketing-metrics";

const PUBLIC_CACHE_HEADERS = {
  "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=300",
};

export async function GET() {
  const snapshot = await getMarketingMetrics();

  if (snapshot.generatedAt === FALLBACK_MARKETING_METRICS.generatedAt) {
    return Response.json(
      { error: "Current marketing metrics are unavailable" },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  return Response.json(
    publicMarketingMetricsSnapshot(snapshot),
    { headers: PUBLIC_CACHE_HEADERS },
  );
}
