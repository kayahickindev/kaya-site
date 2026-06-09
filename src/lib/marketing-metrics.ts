export type MarketingMetric = {
  raw: number;
  display: string;
  label: string;
};

export type MarketingMetricsSnapshot = {
  generatedAt: string;
  metrics: {
    appStoreRating: MarketingMetric;
    appStoreReviews: MarketingMetric;
    futureSelfActions: MarketingMetric;
    coachingValueDelivered: MarketingMetric;
    paidSubscribersEver: MarketingMetric;
    arr: MarketingMetric;
  };
};

export const FALLBACK_MARKETING_METRICS: MarketingMetricsSnapshot = {
  generatedAt: "fallback",
  metrics: {
    appStoreRating: { raw: 4.7, display: "4.7", label: "App Store Rating" },
    appStoreReviews: { raw: 715, display: "715", label: "App Store Reviews" },
    futureSelfActions: {
      raw: 105000,
      display: "105K+",
      label: "Future Self Actions",
    },
    coachingValueDelivered: {
      raw: 6800000,
      display: "$6.8M+",
      label: "Coaching Value Delivered",
    },
    paidSubscribersEver: {
      raw: 1938,
      display: "1,938+",
      label: "Active Paid Subscribers",
    },
    arr: { raw: 76576, display: "$77K+", label: "ARR" },
  },
};

const DEFAULT_METRICS_URL =
  "https://us-central1-success-ai-dbdf7.cloudfunctions.net/getMarketingMetrics";

function isSnapshot(value: unknown): value is MarketingMetricsSnapshot {
  if (!value || typeof value !== "object") return false;
  const metrics = (value as { metrics?: unknown }).metrics;
  return Boolean(metrics && typeof metrics === "object");
}

export async function getMarketingMetrics(): Promise<MarketingMetricsSnapshot> {
  const url = process.env.MARKETING_METRICS_URL || DEFAULT_METRICS_URL;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return FALLBACK_MARKETING_METRICS;
    const data: unknown = await response.json();
    return isSnapshot(data) ? data : FALLBACK_MARKETING_METRICS;
  } catch {
    return FALLBACK_MARKETING_METRICS;
  }
}

export function metricNumberInThousands(raw: number): number {
  return Math.max(0, Math.round(raw / 1000));
}
