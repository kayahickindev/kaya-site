"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

type Day = { date: string; count: number };
export type ContributionPalette = "amber" | "emerald";

// Missing or malformed data never becomes invented activity.
export function ContributionGraph({ palette = "amber", username = "kayahickindev" }: { palette?: ContributionPalette; username?: string }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Activity unavailable");
        const data = await response.json();
        if (!Array.isArray(data.contributions) || data.contributions.length === 0 || !data.contributions.every((d: Day) => typeof d.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d.date) && Number.isFinite(Date.parse(d.date)) && Number.isSafeInteger(d.count) && d.count >= 0)) throw new Error("Invalid activity");
        const sorted = [...data.contributions].sort((a: Day, b: Day) => a.date.localeCompare(b.date));
        if (new Set(sorted.map((d: Day) => d.date)).size !== sorted.length) throw new Error("Duplicate dates");
        if (!cancelled) setDays(sorted);
      })
      .catch(() => { if (!cancelled) setFailed(true); })
      .finally(() => clearTimeout(timeout));
    return () => { cancelled = true; clearTimeout(timeout); controller.abort(); };
  }, [username]);
  const shown = days?.slice(-364) ?? [];
  const total = days?.reduce((sum, day) => sum + day.count, 0);
  const start = shown.length ? Date.parse(shown[0].date) : 0;
  const firstWeekday = new Date(start).getUTCDay();
  const weekCount = shown.length ? Math.ceil(((Date.parse(shown[shown.length - 1].date) - start) / 86400000 + firstWeekday + 1) / 7) : 52;
  const fill = (count: number) => `var(--gh-${palette === "emerald" ? "em-" : ""}${count === 0 ? 0 : count < 4 ? 1 : count < 9 ? 2 : count < 15 ? 3 : 4})`;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold">{total !== undefined ? total.toLocaleString("en-US") : profile.github.count.toLocaleString("en-US")} GitHub contributions</h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">{days ? `${days[0].date} to ${days[days.length - 1].date}` : profile.github.period}</p>
      </div>
      {shown.length ? (
        <svg viewBox={`0 0 ${weekCount * 12} 84`} className="w-full" role="img" aria-label="Daily GitHub contributions from the public activity feed">
          {shown.map((day) => {
            const offset = (Date.parse(day.date) - start) / 86400000 + firstWeekday;
            return <rect key={day.date} x={Math.floor(offset / 7) * 12} y={(offset % 7) * 12} width={9} height={9} rx={2} fill={fill(day.count)}><title>{day.date}: {day.count} contributions</title></rect>;
          })}
        </svg>
      ) : <p className="rounded-md border border-black/10 p-4 text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-400" role="status">{failed ? "Daily activity is unavailable here. View the full history on GitHub." : "Loading daily activity from GitHub's public contribution feed."}</p>}
    </div>
  );
}
