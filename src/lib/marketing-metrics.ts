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
    // Derived on the server from the feed's `paidSubscribers` count, floored to
    // the thousand ("5,000+"). `raw` is that published floor, never the exact count.
    payingSubscribers: MarketingMetric;
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

// Last recorded public snapshot, 2026-11-02. Store and product figures are the
// live feed's snapshot generated 2026-11-02 05:16 UTC (App Store Connect for
// downloads, rating and ratings count; the MyFutureSelf metrics function for
// Future Self Actions and coaching value). Paying subscribers and ARR are the
// figures Kaya verified on 2026-11-02.
//
// Production reads live figures through FOUNDER_METRICS_ACCESS_TOKEN. Without
// the token every page renders this snapshot, so it has to be correct on its own.
//
// `raw` is deliberately 0 for the two private financial metrics: the exact
// subscriber count and the exact ARR are not published. Everything the
// interface shows for those two comes from `display`. `paidSubscribersEver`
// is kept for the profile feed contract and is not rendered; the site shows
// `payingSubscribers`.
export const FALLBACK_MARKETING_METRICS: MarketingMetricsSnapshot = {
  generatedAt: "fallback",
  metrics: {
    // The live feed carries the exact download count; this raw is the floor of
    // the published 92K+ and only ever feeds the `raw > 0` shape check.
    appDownloads: { raw: 92000, display: "92K+", label: "Downloads" },
    appStoreRating: {
      raw: 4.637945695931476,
      display: "4.6",
      label: "App Store rating",
    },
    appStoreReviews: { raw: 2335, display: "2,335", label: "Ratings" },
    futureSelfActions: {
      raw: 173355,
      display: "173K+",
      label: "Future Self Actions",
    },
    coachingValueDelivered: {
      raw: 15396532,
      display: "$15.4M+",
      label: "Modeled Coaching Value",
    },
    paidSubscribersEver: {
      raw: 0,
      display: "4.7K+",
      label: "Active Paid Subscribers",
    },
    arr: { raw: 0, display: "$189K", label: "ARR" },
    payingSubscribers: {
      raw: 5000,
      display: "5,000+",
      label: "Paying subscribers",
    },
  },
};

export type MetricDisplayParts = {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
};

// Splits a published figure ("5,000+", "$189K", "92K+", "2,335") into the parts
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

// Upstream metrics a snapshot must carry. `paidSubscribers` is the exact paid
// subscription count; the site only ever publishes its thousand floor.
const REQUIRED_METRIC_NAMES = [
  "appDownloads",
  "appStoreRating",
  "appStoreReviews",
  "futureSelfActions",
  "coachingValueDelivered",
  "paidSubscribersEver",
  "paidSubscribers",
  "arr",
] as const;

// 5093 -> "5,000+": floored to the thousand so the site never overstates the
// count and never publishes the exact figure.
export function payingSubscribersMetric(count: number): MarketingMetric {
  const floor = Math.floor(count / 1000) * 1000;
  return {
    raw: floor,
    display: `${floor.toLocaleString("en-US")}+`,
    label: "Paying subscribers",
  };
}

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
  const paidSubscribers = snapshot.metrics.paidSubscribers as MarketingMetric;
  if (paidSubscribers.raw < 1000) return null;
  return {
    ...(value as MarketingMetricsSnapshot),
    metrics: {
      ...(snapshot.metrics as MarketingMetricsSnapshot["metrics"]),
      payingSubscribers: payingSubscribersMetric(paidSubscribers.raw),
    },
  };
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

// What a Client Component may receive. Props are serialized into the page's
// RSC payload, so this keeps only the typed metrics, drops the raw values of the
// two private financial figures, and leaves every other upstream field (the
// exact paid subscription count among them) on the server.
export function clientMarketingMetricsSnapshot(
  snapshot: MarketingMetricsSnapshot,
): PublicMarketingMetricsSnapshot {
  const { metrics } = snapshot;
  const keep = ({ raw, display, label }: MarketingMetric) => ({
    raw,
    display,
    label,
  });
  return {
    generatedAt: snapshot.generatedAt,
    metrics: {
      appDownloads: keep(metrics.appDownloads),
      appStoreRating: keep(metrics.appStoreRating),
      appStoreReviews: keep(metrics.appStoreReviews),
      futureSelfActions: keep(metrics.futureSelfActions),
      coachingValueDelivered: keep(metrics.coachingValueDelivered),
      paidSubscribersEver: {
        display: metrics.paidSubscribersEver.display,
        label: metrics.paidSubscribersEver.label,
      },
      arr: { display: metrics.arr.display, label: metrics.arr.label },
      payingSubscribers: keep(metrics.payingSubscribers),
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
