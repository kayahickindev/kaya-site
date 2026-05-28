// Shared visual surfaces. One depth/elevation system used everywhere.
// Rule: cards have a top-edge highlight, a subtle inner gradient, and a hover lift.
// Light source is "above" — top edges brighter, hover shadow points down.

export const cardSurface =
  "relative overflow-hidden rounded-md border border-black/10 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] " +
  "dark:border-white/10 dark:from-white/[0.05] dark:to-white/[0.015] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

export const cardSurfaceHover =
  cardSurface +
  " transition-[transform,box-shadow,border-color] duration-200 " +
  "hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_10px_30px_-14px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.85)] " +
  "dark:hover:border-white/25 dark:hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]";

// Featured/active variant — amber edge highlight.
export const cardSurfaceFeatured =
  "relative overflow-hidden rounded-md border border-amber-400/30 bg-gradient-to-b from-amber-200/15 to-transparent backdrop-blur " +
  "shadow-[inset_0_1px_0_rgba(255,200,120,0.35),0_8px_24px_-12px_rgba(212,155,90,0.3)] " +
  "dark:border-amber-300/30 dark:from-amber-300/10 dark:shadow-[inset_0_1px_0_rgba(255,200,120,0.25),0_10px_30px_-12px_rgba(212,155,90,0.35)]";

// Emerald featured variant — green edge highlight (used on Work hero).
export const cardSurfaceFeaturedEmerald =
  "relative overflow-hidden rounded-md border border-emerald-400/30 bg-gradient-to-b from-emerald-200/15 to-transparent backdrop-blur " +
  "shadow-[inset_0_1px_0_rgba(120,255,170,0.30),0_8px_24px_-12px_rgba(52,211,153,0.30)] " +
  "dark:border-emerald-300/30 dark:from-emerald-300/10 dark:shadow-[inset_0_1px_0_rgba(120,255,170,0.20),0_10px_30px_-12px_rgba(52,211,153,0.35)]";

// Chip — small, always rounded-full, no depth treatment.
export const chip =
  "inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2 py-0.5 text-[10px] font-medium text-neutral-700 " +
  "dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-300";
