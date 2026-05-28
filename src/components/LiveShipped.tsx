"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/content";

function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMo = Math.round(diffDay / 30);
  return `${diffMo}mo ago`;
}

export function LiveShipped() {
  const [label, setLabel] = useState<string>("Live: MyFutureSelf scaling");

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${siteConfig.github.username}/events/public?per_page=20`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((events) => {
        if (!events || cancelled) return;
        const push = (events as Array<{ type: string; created_at: string }>).find(
          (event) => event.type === "PushEvent"
        );
        if (push) {
          setLabel(`Last shipped ${relativeTime(push.created_at)}`);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex h-10 items-center gap-2 rounded-md border border-black/10 bg-white/45 px-3 text-xs text-neutral-600 backdrop-blur dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-400">
      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
      <span className="truncate">{label}</span>
    </div>
  );
}
