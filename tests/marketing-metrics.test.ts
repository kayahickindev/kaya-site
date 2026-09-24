import assert from "node:assert/strict";
import test from "node:test";
import {
  FALLBACK_MARKETING_METRICS,
  normalizeMarketingMetricsSnapshot,
  parseMetricDisplay,
  publicMarketingMetricsSnapshot,
} from "../src/lib/marketing-metrics.ts";

// Stands in for a live upstream response. Upstream still sends the exact
// subscriber count and annual run rate; the site never publishes them, so the
// two raw values here are deliberately made-up placeholders.
const currentSnapshot = {
  generatedAt: "2026-09-13T04:15:58.000Z",
  metrics: {
    appDownloads: { raw: 66074, display: "66K+", label: "Downloads" },
    appStoreRating: { raw: 4.68659565487275, display: "4.7", label: "App Store rating" },
    appStoreReviews: { raw: 1611, display: "1,611", label: "Ratings" },
    futureSelfActions: { raw: 239109, display: "239K+", label: "Future Self Actions" },
    coachingValueDelivered: {
      raw: 22468229,
      display: "$22.5M+",
      label: "Modeled Coaching Value",
    },
    paidSubscribersEver: {
      raw: 1,
      display: "3.8K+",
      label: "Active Paid Subscribers",
    },
    arr: { raw: 1, display: "$245K+", label: "Annual Run Rate" },
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

test("accepts a complete upstream snapshot", () => {
  assert.deepEqual(
    normalizeMarketingMetricsSnapshot(currentSnapshot),
    currentSnapshot,
  );
});

test("removes exact private values from the public profile snapshot", () => {
  const publicSnapshot = publicMarketingMetricsSnapshot(currentSnapshot);

  assert.deepEqual(publicSnapshot.metrics.arr, {
    display: "$245K+",
    label: "Annual Run Rate",
  });
  assert.deepEqual(publicSnapshot.metrics.paidSubscribersEver, {
    display: "3.8K+",
    label: "Active Paid Subscribers",
  });
  assert.equal(publicSnapshot.metrics.appStoreReviews.raw, 1611);
});

test("the recorded snapshot carries the figures the site publishes", () => {
  const recorded = FALLBACK_MARKETING_METRICS.metrics;

  assert.equal(recorded.appDownloads.display, "66K+");
  assert.equal(recorded.appStoreRating.display, "4.7");
  assert.equal(recorded.appStoreReviews.display, "1,611");
  assert.equal(recorded.futureSelfActions.display, "239K+");
  assert.equal(recorded.coachingValueDelivered.display, "$22.5M+");
  assert.equal(recorded.paidSubscribersEver.display, "3.8K+");
  assert.equal(recorded.arr.display, "$245K+");
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
  assert.deepEqual(parseMetricDisplay("$245K+"), {
    value: 245,
    prefix: "$",
    suffix: "K+",
    decimals: 0,
  });
  assert.deepEqual(parseMetricDisplay("66K+"), {
    value: 66,
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
  assert.deepEqual(parseMetricDisplay("1,611"), {
    value: 1611,
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
