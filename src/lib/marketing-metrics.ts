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

// Last recorded public snapshot, checked against primary sources on 2026-09-13.
// Sources: App Store Connect (downloads, rating, ratings count), Superwall
// (active paid subscribers, annual run rate), and the MyFutureSelf metrics
// function (Future Self Actions, modeled coaching value).
//
// Production reads live figures through FOUNDER_METRICS_ACCESS_TOKEN. Without
// the token every page renders this snapshot, so it has to be correct on its own.
//
// `raw` is deliberately 0 for the two private financial metrics: the exact
// subscriber count and the exact annual run rate are not published, and this
// object is serialized into the client payload. Everything the interface shows
// for those two comes from `display`.
export const FALLBACK_MARKETING_METRICS: MarketingMetricsSnapshot = {
  generatedAt: "fallback",
  metrics: {
    appDownloads: { raw: 66074, display: "66K+", label: "Downloads" },
    appStoreRating: {
      raw: 4.68659565487275,
      display: "4.7",
      label: "App Store rating",
    },
    appStoreReviews: { raw: 1611, display: "1,611", label: "Ratings" },
    futureSelfActions: {
      raw: 239109,
      display: "239K+",
      label: "Future Self Actions",
    },
    coachingValueDelivered: {
      raw: 22468229,
      display: "$22.5M+",
      label: "Modeled Coaching Value",
    },
    paidSubscribersEver: {
      raw: 0,
      display: "3.8K+",
      label: "Active Paid Subscribers",
    },
    arr: { raw: 0, display: "$245K+", label: "Annual Run Rate" },
  },
};

export type MetricDisplayParts = {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
};

// Splits a published figure ("3.8K+", "$245K+", "66K+", "1,611") into the parts
// the animated tiles need. The tiles count up to the number inside the published
// string rather than to `raw`, so the animation can never land on a figure the
// site does not publish, and the private financial raws stay out of the payload.
export function parseMetricDisplay(display: string): MetricDisplayParts {
  const match = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/.exec(display);

  if (!match) {
    return { value: 0, prefix: "", suffix: display, decimals: 0 };
  }

  const [, prefix, digits, suffix] = match;
  const cleaned = digits.replace(/,/g, "");
  const decimalPoint = cleaned.indexOf(".");

  return {
    value: Number(cleaned),
    prefix,
    suffix,
    decimals: decimalPoint === -1 ? 0 : cleaned.length - decimalPoint - 1,
  };
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
