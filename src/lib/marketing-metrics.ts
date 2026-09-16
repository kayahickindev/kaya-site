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

export const FALLBACK_MARKETING_METRICS: MarketingMetricsSnapshot = {
  generatedAt: "fallback",
  metrics: {
    appDownloads: { raw: 30000, display: "30K+", label: "Downloads" },
    appStoreRating: { raw: 4.73, display: "4.7", label: "App Store Rating" },
    appStoreReviews: { raw: 1032, display: "1,032", label: "App Store Reviews" },
    futureSelfActions: {
      raw: 171070,
      display: "171K+",
      label: "Future Self Actions",
    },
    coachingValueDelivered: {
      raw: 11119550,
      display: "$11.1M+",
      label: "Coaching Value Delivered",
    },
    paidSubscribersEver: {
      raw: 2948,
      display: "3K+",
      label: "Active Paid Subscribers",
    },
    arr: { raw: 115409, display: "$115K+", label: "Annual Run Rate" },
  },
};

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
    !snapshot.generatedAt ||
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

export function metricNumberInThousands(raw: number): number {
  return Math.max(0, Math.round(raw / 1000));
}
