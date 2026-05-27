"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Deterministic pseudo-random based on cell index — gives a plausible "active
// developer" heatmap that's stable across renders without fetching anything.
function intensityFor(week: number, day: number) {
  const seed = (week * 7 + day) * 9301 + 49297;
  const rnd = (seed % 233280) / 233280;
  // Bias toward more recent weeks being denser, with quieter weekends.
  const recency = week / 52;
  const weekendDip = day === 0 || day === 6 ? 0.55 : 1;
  const base = rnd * 0.7 + recency * 0.35;
  const value = base * weekendDip;
  if (value < 0.18) return 0;
  if (value < 0.34) return 1;
  if (value < 0.52) return 2;
  if (value < 0.72) return 3;
  return 4;
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
  contributionCount = "2,600+",
  palette = "amber",
}: {
  weeks?: number;
  contributionCount?: string;
  palette?: ContributionPalette;
}) {
  const reducedMotion = useReducedMotion();
  const cellFills = cellFillsByPalette[palette];

  const cells = useMemo(() => {
    const result: { x: number; y: number; level: number }[] = [];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < 7; d++) {
        result.push({ x: w, y: d, level: intensityFor(w, d) });
      }
    }
    return result;
  }, [weeks]);

  const cellSize = 10;
  const gap = 2;
  const width = weeks * (cellSize + gap);
  const height = 7 * (cellSize + gap);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
          A year of shipping
        </p>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
          {contributionCount} contributions
        </p>
      </div>
      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block"
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
              initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.25,
                delay: reducedMotion ? 0 : cell.x * 0.006 + cell.y * 0.01,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            />
          ))}
        </svg>
      </div>
      <div className="flex items-center justify-end gap-1.5 text-[10px] text-neutral-500">
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
