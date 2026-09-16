import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeMarketingMetricsSnapshot,
  publicMarketingMetricsSnapshot,
} from "../src/lib/marketing-metrics.ts";

const currentSnapshot = {
  generatedAt: "2026-07-28T04:15:22.849Z",
  metrics: {
    appDownloads: { raw: 30000, display: "30K+", label: "Downloads" },
    appStoreRating: { raw: 4.73, display: "4.7", label: "App Store Rating" },
    appStoreReviews: { raw: 1032, display: "1,032", label: "App Store Reviews" },
    futureSelfActions: { raw: 171070, display: "171K+", label: "Future Self Actions" },
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
    display: "$115K+",
    label: "Annual Run Rate",
  });
  assert.deepEqual(publicSnapshot.metrics.paidSubscribersEver, {
    display: "3K+",
    label: "Active Paid Subscribers",
  });
  assert.equal(publicSnapshot.metrics.appStoreReviews.raw, 1032);
});
