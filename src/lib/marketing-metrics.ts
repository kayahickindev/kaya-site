export type MarketingMetric = {
  raw: number;
  display: string;
  label: string;
};

export type MarketingMetricsSnapshot = {
  generatedAt: string;
  metrics: {
    appDownloads: MarketingMetric;
    appStoreRating: MarketingMetric;
    appStoreReviews: MarketingMetric;
    futureSelfActions: MarketingMetric;
    coachingValueDelivered: MarketingMetric;
    paidSubscribersEver: MarketingMetric;
    arr: MarketingMetric;
  };
};

export type PublicMarketingMetricsSnapshot = Omit<
  MarketingMetricsSnapshot,
  "metrics"
> & {
  metrics: Omit<
    MarketingMetricsSnapshot["metrics"],
    "paidSubscribersEver" | "arr"
  > & {
    paidSubscribersEver: Omit<MarketingMetric, "raw">;
    arr: Omit<MarketingMetric, "raw">;
  };
};

// Last recorded public snapshot. The API still returns 503 on fallback.
// Private raw financial values are deliberately absent from this snapshot.
export const RECORDED_METRICS_DATE = "2026-09-13T04:15:58Z";
export const FALLBACK_MARKETING_METRICS: MarketingMetricsSnapshot = {
  generatedAt: "fallback",
  metrics: {
    appDownloads: { raw: 66074, display: "66K+", label: "Downloads" },
    appStoreRating: { raw: 4.68659565487275, display: "4.7", label: "App rating" },
    appStoreReviews: { raw: 1611, display: "1,611", label: "Ratings" },
    futureSelfActions: { raw: 239109, display: "239K+", label: "Future Self Actions" },
    coachingValueDelivered: { raw: 22468229, display: "$22.5M+", label: "Modeled Coaching Value" },
    paidSubscribersEver: { raw: 0, display: "3.8K+", label: "Active Paid Subscribers" },
    arr: { raw: 0, display: "$245K+", label: "Annual Run Rate" },
  },
};

export function metricsDate(snapshot: { generatedAt: string }): string {
  const date = snapshot.generatedAt === "fallback" ? RECORDED_METRICS_DATE : snapshot.generatedAt;
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(date));
}

export function metricsCaption(snapshot: { generatedAt: string }): string {
  return `${snapshot.generatedAt === "fallback" ? "Recorded" : "Updated"} ${metricsDate(snapshot)} · company-reported`;
}

export function tractionLines(snapshot: MarketingMetricsSnapshot): string[] {
  const m = snapshot.metrics;
  return [
    `${m.appDownloads.display} downloads`,
    `${m.paidSubscribersEver.display} active paid subscribers`,
    `${m.arr.display} annual run rate`,
    `${m.appStoreRating.display}-star app rating from ${m.appStoreReviews.display} ratings`,
  ];
}

const DEFAULT_METRICS_URL =
  "https://us-central1-success-ai-dbdf7.cloudfunctions.net/getMarketingMetrics";

const REQUIRED_METRIC_NAMES = [
  "appDownloads",
  "appStoreRating",
  "appStoreReviews",
  "futureSelfActions",
  "coachingValueDelivered",
  "paidSubscribersEver",
  "arr",
] as const;

function isMetric(value: unknown): value is MarketingMetric {
  if (!value || typeof value !== "object") return false;
  const metric = value as Partial<MarketingMetric>;
  return (
    typeof metric.raw === "number" &&
    Number.isFinite(metric.raw) &&
    metric.raw > 0 &&
    typeof metric.display === "string" &&
    metric.display.length > 0 &&
    typeof metric.label === "string" &&
    metric.label.length > 0
  );
}

export function normalizeMarketingMetricsSnapshot(
  value: unknown,
): MarketingMetricsSnapshot | null {
  if (!value || typeof value !== "object") return null;
  const snapshot = value as {
    generatedAt?: unknown;
    metrics?: Record<string, unknown>;
  };
  if (
    typeof snapshot.generatedAt !== "string" ||
    !Number.isFinite(Date.parse(snapshot.generatedAt)) ||
    !snapshot.metrics ||
    typeof snapshot.metrics !== "object" ||
    !REQUIRED_METRIC_NAMES.every((name) => isMetric(snapshot.metrics?.[name]))
  ) {
    return null;
  }
  return value as MarketingMetricsSnapshot;
}

export function publicMarketingMetricsSnapshot(
  snapshot: MarketingMetricsSnapshot,
): PublicMarketingMetricsSnapshot {
  const publicMetric = ({ display, label }: MarketingMetric) => ({
    display,
    label,
  });
  return {
    generatedAt: snapshot.generatedAt,
    metrics: {
      ...snapshot.metrics,
      paidSubscribersEver: publicMetric(
        snapshot.metrics.paidSubscribersEver,
      ),
      arr: publicMetric(snapshot.metrics.arr),
    },
  };
}

export async function getMarketingMetrics(): Promise<MarketingMetricsSnapshot> {
  const url = process.env.MARKETING_METRICS_URL || DEFAULT_METRICS_URL;
  const accessToken = process.env.FOUNDER_METRICS_ACCESS_TOKEN?.trim();

  if (!accessToken) return FALLBACK_MARKETING_METRICS;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return FALLBACK_MARKETING_METRICS;
    const data: unknown = await response.json();
    return (
      normalizeMarketingMetricsSnapshot(data) ??
      FALLBACK_MARKETING_METRICS
    );
  } catch {
    return FALLBACK_MARKETING_METRICS;
  }
}
