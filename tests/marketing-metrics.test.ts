import assert from "node:assert/strict";
import test from "node:test";
import {
  FALLBACK_MARKETING_METRICS,
  clientMarketingMetricsSnapshot,
  normalizeMarketingMetricsSnapshot,
  parseMetricDisplay,
  payingSubscribersMetric,
  publicMarketingMetricsSnapshot,
} from "../src/lib/marketing-metrics.ts";

// Stands in for a live upstream response. Upstream still sends the exact
// subscriber counts and ARR; the site never publishes them, so the
// private raw values here are deliberately made-up placeholders.
const currentSnapshot = {
  generatedAt: "2026-11-02T05:16:33.999Z",
  metrics: {
    appDownloads: { raw: 92260, display: "92K+", label: "Downloads" },
    appStoreRating: { raw: 4.637945695931476, display: "4.6", label: "App Store Rating" },
    appStoreReviews: { raw: 2335, display: "2,335", label: "App Store Reviews" },
    fiveStarRatings: { raw: 2003, display: "2,000+", label: "5-Star Ratings" },
    futureSelfActions: { raw: 173355, display: "173K+", label: "Future Self Actions" },
    coachingValueDelivered: {
      raw: 15396532,
      display: "$15.4M+",
      label: "Coaching Value Delivered",
    },
    paidSubscribersEver: {
      raw: 1,
      display: "4.7K+",
      label: "Active Paid Subscribers",
    },
    paidSubscribers: { raw: 5432, display: "5,432", label: "Paid Subscriptions" },
    arr: { raw: 1, display: "$189K", label: "ARR" },
    // An upstream field the site does not type; it must never reach a client.
    annualizedSales: { raw: 7, display: "$7", label: "Annualized Sales" },
  },
};

test("rejects a fresh upstream snapshot when private metrics are missing", () => {
  const redactedSnapshot = {
    ...currentSnapshot,
    metrics: {
      appDownloads: currentSnapshot.metrics.appDownloads,
      appStoreRating: currentSnapshot.metrics.appStoreRating,
      appStoreReviews: currentSnapshot.metrics.appStoreReviews,
      futureSelfActions: currentSnapshot.metrics.futureSelfActions,
      coachingValueDelivered: currentSnapshot.metrics.coachingValueDelivered,
    },
  };

  assert.equal(normalizeMarketingMetricsSnapshot(redactedSnapshot), null);
});

test("rejects a snapshot without the paid subscription count", () => {
  const metrics: Record<string, unknown> = { ...currentSnapshot.metrics };
  delete metrics.paidSubscribers;
  assert.equal(
    normalizeMarketingMetricsSnapshot({ ...currentSnapshot, metrics }),
    null,
  );
});

test("accepts a complete upstream snapshot and derives paying subscribers", () => {
  assert.deepEqual(normalizeMarketingMetricsSnapshot(currentSnapshot), {
    ...currentSnapshot,
    metrics: {
      ...currentSnapshot.metrics,
      payingSubscribers: {
        raw: 5000,
        display: "5,000+",
        label: "Paying subscribers",
      },
    },
  });
});

test("a snapshot without 5-star ratings keeps the recorded figure", () => {
  const metrics: Record<string, unknown> = { ...currentSnapshot.metrics };
  delete metrics.fiveStarRatings;
  const normalized = normalizeMarketingMetricsSnapshot({
    ...currentSnapshot,
    metrics,
  });
  assert.ok(normalized);
  assert.deepEqual(
    normalized.metrics.fiveStarRatings,
    FALLBACK_MARKETING_METRICS.metrics.fiveStarRatings,
  );
});

test("paying subscribers are floored to the thousand, never the exact count", () => {
  assert.deepEqual(payingSubscribersMetric(5093), {
    raw: 5000,
    display: "5,000+",
    label: "Paying subscribers",
  });
  assert.equal(payingSubscribersMetric(5999).display, "5,000+");
  assert.equal(payingSubscribersMetric(6000).display, "6,000+");
  assert.equal(payingSubscribersMetric(12345).display, "12,000+");
});

test("the client snapshot carries only typed metrics and published figures", () => {
  const normalized = normalizeMarketingMetricsSnapshot(currentSnapshot);
  assert.ok(normalized);
  const client = clientMarketingMetricsSnapshot(normalized);
  const serialized = JSON.stringify(client);

  assert.deepEqual(Object.keys(client.metrics).sort(), [
    "appDownloads",
    "appStoreRating",
    "appStoreReviews",
    "arr",
    "coachingValueDelivered",
    "fiveStarRatings",
    "futureSelfActions",
    "paidSubscribersEver",
    "payingSubscribers",
  ]);
  assert.deepEqual(client.metrics.arr, { display: "$189K", label: "ARR" });
  assert.deepEqual(client.metrics.paidSubscribersEver, {
    display: "4.7K+",
    label: "Active Paid Subscribers",
  });
  assert.equal(client.metrics.payingSubscribers.display, "5,000+");
  assert.equal(serialized.includes("5432"), false);
  assert.equal(serialized.includes("annualizedSales"), false);
});

test("removes exact private values from the public profile snapshot", () => {
  const normalized = normalizeMarketingMetricsSnapshot(currentSnapshot);
  assert.ok(normalized);
  const publicSnapshot = publicMarketingMetricsSnapshot(normalized);

  assert.deepEqual(publicSnapshot.metrics.arr, {
    display: "$189K",
    label: "ARR",
  });
  assert.deepEqual(publicSnapshot.metrics.paidSubscribersEver, {
    display: "4.7K+",
    label: "Active Paid Subscribers",
  });
  assert.equal(publicSnapshot.metrics.appStoreReviews.raw, 2335);
});


test("the recorded snapshot carries the figures the site publishes", () => {
  const recorded = FALLBACK_MARKETING_METRICS.metrics;

  assert.equal(recorded.appDownloads.display, "92K+");
  assert.equal(recorded.appStoreRating.display, "4.6");
  assert.equal(recorded.appStoreReviews.display, "2,335");
  assert.equal(recorded.fiveStarRatings.display, "2,000+");
  assert.equal(recorded.futureSelfActions.display, "173K+");
  assert.equal(recorded.coachingValueDelivered.display, "$15.4M+");
  assert.equal(recorded.payingSubscribers.display, "5,000+");
  assert.equal(recorded.arr.display, "$189K");
  assert.equal(recorded.arr.label, "ARR");
});

test("the recorded snapshot keeps the private financial raws out of the payload", () => {
  assert.equal(FALLBACK_MARKETING_METRICS.metrics.paidSubscribersEver.raw, 0);
  assert.equal(FALLBACK_MARKETING_METRICS.metrics.arr.raw, 0);
});

test("parses a published figure into the parts the tiles animate", () => {
  assert.deepEqual(parseMetricDisplay("3.8K+"), {
    value: 3.8,
    prefix: "",
    suffix: "K+",
    decimals: 1,
  });
  assert.deepEqual(parseMetricDisplay("$150K+"), {
    value: 150,
    prefix: "$",
    suffix: "K+",
    decimals: 0,
  });
  assert.deepEqual(parseMetricDisplay("72K+"), {
    value: 72,
    prefix: "",
    suffix: "K+",
    decimals: 0,
  });
  assert.deepEqual(parseMetricDisplay("4.7"), {
    value: 4.7,
    prefix: "",
    suffix: "",
    decimals: 1,
  });
  assert.deepEqual(parseMetricDisplay("5,000+"), {
    value: 5000,
    prefix: "",
    suffix: "+",
    decimals: 0,
  });
  assert.deepEqual(parseMetricDisplay("1,762"), {
    value: 1762,
    prefix: "",
    suffix: "",
    decimals: 0,
  });
  assert.deepEqual(parseMetricDisplay("$22.5M+"), {
    value: 22.5,
    prefix: "$",
    suffix: "M+",
    decimals: 1,
  });
});

test("a display string with no number never invents one", () => {
  assert.deepEqual(parseMetricDisplay("unavailable"), {
    value: 0,
    prefix: "",
    suffix: "unavailable",
    decimals: 0,
  });
});
