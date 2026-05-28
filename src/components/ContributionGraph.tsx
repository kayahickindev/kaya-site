"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatCellDate(daysAgo: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function levelFromCount(count: number) {
  if (count === 0) return 0;
  if (count < 4) return 1;
  if (count < 9) return 2;
  if (count < 15) return 3;
  return 4;
}

// Deterministic fallback heatmap so the graph renders before (or instead of) live data.
function rndFor(week: number, day: number) {
  const seed = (week * 7 + day) * 9301 + 49297;
  return (seed % 233280) / 233280;
}

function fallbackCount(week: number, day: number) {
  const rnd = rndFor(week, day);
  const recency = week / 52;
  const weekendDip = day === 0 || day === 6 ? 0.55 : 1;
  const base = (rnd * 0.7 + recency * 0.35) * weekendDip;
  if (base < 0.18) return 0;
  if (base < 0.34) return 1 + Math.floor(rnd * 3);
  if (base < 0.52) return 4 + Math.floor(rnd * 5);
  if (base < 0.72) return 9 + Math.floor(rnd * 6);
  return 15 + Math.floor(rnd * 11);
}

type RemoteDay = { date: string; count: number };

async function fetchContributions(username: string): Promise<RemoteDay[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { cache: "force-cache" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { contributions: RemoteDay[] };
    return json.contributions ?? null;
  } catch {
    return null;
  }
}

export type ContributionPalette = "amber" | "emerald";

const cellFillsByPalette: Record<ContributionPalette, string[]> = {
  amber: ["var(--gh-0)", "var(--gh-1)", "var(--gh-2)", "var(--gh-3)", "var(--gh-4)"],
  emerald: [
    "var(--gh-em-0)",
    "var(--gh-em-1)",
    "var(--gh-em-2)",
    "var(--gh-em-3)",
    "var(--gh-em-4)",
  ],
};

export function ContributionGraph({
  weeks = 52,
  contributionCount,
  palette = "amber",
  username = "kayahickindev",
}: {
  weeks?: number;
  contributionCount?: string;
  palette?: ContributionPalette;
  username?: string;
}) {
  const reducedMotion = useReducedMotion();
  const cellFills = cellFillsByPalette[palette];

  const [remote, setRemote] = useState<RemoteDay[] | null>(null);
  const [remoteTotal, setRemoteTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchContributions(username).then((days) => {
      if (cancelled || !days) return;
      setRemote(days);
      setRemoteTotal(days.reduce((sum, d) => sum + d.count, 0));
    });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const cells = useMemo(() => {
    const result: {
      x: number;
      y: number;
      level: number;
      commits: number;
      daysAgo: number;
    }[] = [];

    if (remote && remote.length > 0) {
      // Take the most recent (weeks * 7) days from the remote series and lay them out
      // so the last cell is "today" (week 51, day 6).
      const total = weeks * 7;
      const slice = remote.slice(Math.max(0, remote.length - total));
      slice.forEach((day, i) => {
        const offsetFromEnd = slice.length - 1 - i;
        const w = weeks - 1 - Math.floor(offsetFromEnd / 7);
        const d = 6 - (offsetFromEnd % 7);
        if (w < 0 || w >= weeks) return;
        result.push({
          x: w,
          y: d,
          level: levelFromCount(day.count),
          commits: day.count,
          daysAgo: offsetFromEnd,
        });
      });

      // Fill any cells that didn't get assigned (older history not in slice) with 0s.
      const seen = new Set(result.map((c) => `${c.x},${c.y}`));
      for (let w = 0; w < weeks; w++) {
        for (let d = 0; d < 7; d++) {
          const key = `${w},${d}`;
          if (!seen.has(key)) {
            const daysAgo = (weeks - 1 - w) * 7 + (6 - d);
            result.push({ x: w, y: d, level: 0, commits: 0, daysAgo });
          }
        }
      }
      return result;
    }

    // Fallback: deterministic heatmap until/if remote data arrives.
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < 7; d++) {
        const commits = fallbackCount(w, d);
        const daysAgo = (weeks - 1 - w) * 7 + (6 - d);
        result.push({ x: w, y: d, level: levelFromCount(commits), commits, daysAgo });
      }
    }
    return result;
  }, [weeks, remote]);

  const displayCount = contributionCount ?? (
    remoteTotal !== null ? `${remoteTotal.toLocaleString()}` : "2,600+"
  );

  const cellSize = 11;
  const gap = 3;
  const width = weeks * (cellSize + gap);
  const height = 7 * (cellSize + gap);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-end gap-3">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          A year of shipping
        </p>
        <span aria-hidden className="h-3 w-px bg-neutral-400/30" />
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          {displayCount} contributions
        </p>
      </div>
      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto block max-w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="GitHub-style contribution graph showing consistent activity"
        >
          {cells.map((cell, i) => (
            <motion.rect
              key={i}
              x={cell.x * (cellSize + gap)}
              y={cell.y * (cellSize + gap)}
              width={cellSize}
              height={cellSize}
              rx={2}
              fill={cellFills[cell.level]}
              className="cursor-pointer transition-opacity hover:opacity-80"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.25,
                delay: reducedMotion ? 0 : cell.x * 0.006 + cell.y * 0.01,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <title>
                {cell.commits === 0
                  ? `No contributions on ${formatCellDate(cell.daysAgo)}`
                  : `${cell.commits} contribution${cell.commits === 1 ? "" : "s"} on ${formatCellDate(cell.daysAgo)}`}
              </title>
            </motion.rect>
          ))}
        </svg>
      </div>
      <div className="flex items-center justify-end gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <span
            key={lvl}
            className="block h-2.5 w-2.5 rounded-sm"
            style={{ background: cellFills[lvl] }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
