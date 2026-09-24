"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  formatCount,
  type ContributionCalendar,
  type ContributionDay,
} from "@/lib/github-contributions";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAY_MS = 86_400_000;

function formatDay(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

// Shade by quartile of the active days, the way GitHub's calendar used to.
// Fixed cut-offs would paint nearly every day at full strength at this volume,
// and GitHub's current levels are set by a handful of outlier days.
function quartileThresholds(days: ContributionDay[]) {
  const active = days
    .map((day) => day.count)
    .filter((count) => count > 0)
    .sort((a, b) => a - b);
  if (active.length === 0) return [0, 0, 0];
  const at = (q: number) =>
    active[Math.min(active.length - 1, Math.floor(q * active.length))];
  return [at(0.25), at(0.5), at(0.75)];
}

function levelFromCount(count: number, thresholds: number[]) {
  if (count === 0) return 0;
  if (count <= thresholds[0]) return 1;
  if (count <= thresholds[1]) return 2;
  if (count <= thresholds[2]) return 3;
  return 4;
}

type Cell = {
  x: number;
  y: number;
  level: number;
  count: number;
  date: string;
};

// Lays the calendar out the way GitHub does: one column per week, Sunday on
// the top row, the most recent day in the last column. Only real days are
// drawn; a slot with no day behind it stays empty.
function layoutCells(days: ContributionDay[], weeks: number): Cell[] {
  if (days.length === 0) return [];
  const utc = (date: string) => Date.parse(`${date}T00:00:00Z`);
  const thresholds = quartileThresholds(days);
  const last = utc(days[days.length - 1].date);
  const lastWeekday = new Date(last).getUTCDay();
  const cells: Cell[] = [];

  for (const day of days) {
    const offset = Math.round((last - utc(day.date)) / DAY_MS);
    const slot = 6 - lastWeekday + offset;
    const weeksBack = Math.floor(slot / 7);
    if (weeksBack >= weeks) continue;
    cells.push({
      x: weeks - 1 - weeksBack,
      y: 6 - (slot % 7),
      level: levelFromCount(day.count, thresholds),
      count: day.count,
      date: day.date,
    });
  }
  return cells;
}

function cellTitle(cell: Cell) {
  return cell.count === 0
    ? `No contributions on ${formatDay(cell.date)}`
    : `${formatCount(cell.count)} contribution${cell.count === 1 ? "" : "s"} on ${formatDay(cell.date)}`;
}

export type ContributionPalette = "amber" | "emerald";

const cellFillsByPalette: Record<ContributionPalette, string[]> = {
  amber: [
    "var(--gh-0)",
    "var(--gh-1)",
    "var(--gh-2)",
    "var(--gh-3)",
    "var(--gh-4)",
  ],
  emerald: [
    "var(--gh-em-0)",
    "var(--gh-em-1)",
    "var(--gh-em-2)",
    "var(--gh-em-3)",
    "var(--gh-em-4)",
  ],
};

const CELL = 11;
const GAP = 3;
const PITCH = CELL + GAP;

const COMPACT_CELL = 10;
const COMPACT_GAP = 4;
const COMPACT_PITCH = COMPACT_CELL + COMPACT_GAP;

// A static heatmap that fills its container's width. The home page uses it at
// two lengths: the full year on wider screens, the last six months on phones so
// the cells stay legible.
function CompactHeatmap({
  days,
  weeks,
  fills,
  className,
}: {
  days: ContributionDay[];
  weeks: number;
  fills: string[];
  className: string;
}) {
  const cells = useMemo(() => layoutCells(days, weeks), [days, weeks]);
  const width = weeks * COMPACT_PITCH - COMPACT_GAP;
  const height = 7 * COMPACT_PITCH - COMPACT_GAP;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={`GitHub contribution calendar for the last ${weeks === 26 ? "six months" : "year"}`}
    >
      {cells.map((cell) => (
        <rect
          key={cell.date}
          x={cell.x * COMPACT_PITCH}
          y={cell.y * COMPACT_PITCH}
          width={COMPACT_CELL}
          height={COMPACT_CELL}
          rx={2}
          fill={fills[cell.level]}
        >
          <title>{cellTitle(cell)}</title>
        </rect>
      ))}
    </svg>
  );
}

export function ContributionGraph({
  calendar,
  palette = "amber",
  variant = "full",
}: {
  calendar: ContributionCalendar;
  palette?: ContributionPalette;
  variant?: "full" | "compact";
}) {
  const reducedMotion = useReducedMotion();
  const cellFills = cellFillsByPalette[palette];
  const weeks = 53;
  const cells = useMemo(
    () => layoutCells(calendar.days, weeks),
    [calendar.days],
  );

  if (variant === "compact") {
    return (
      <>
        <CompactHeatmap
          days={calendar.days}
          weeks={weeks}
          fills={cellFills}
          className="hidden h-auto w-full sm:block"
        />
        <CompactHeatmap
          days={calendar.days}
          weeks={26}
          fills={cellFills}
          className="block h-auto w-full sm:hidden"
        />
      </>
    );
  }

  const width = weeks * PITCH - GAP;
  const height = 7 * PITCH - GAP;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-end gap-3">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          A year of shipping
        </p>
        <span aria-hidden className="h-3 w-px bg-neutral-400/30" />
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          {formatCount(calendar.total)} contributions
        </p>
      </div>
      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto block max-w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="GitHub contribution calendar for the last year"
        >
          {cells.map((cell) => (
            <motion.rect
              key={cell.date}
              x={cell.x * PITCH}
              y={cell.y * PITCH}
              width={CELL}
              height={CELL}
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
              <title>{cellTitle(cell)}</title>
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
