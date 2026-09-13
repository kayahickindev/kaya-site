type Metric = { display: string; label: string };
type TileAccent = "neutral" | "amber" | "emerald" | "cyan" | "violet";
const valueColors: Record<TileAccent, string> = {
  neutral: "text-neutral-950 dark:text-white",
  amber: "text-amber-800 dark:text-amber-200",
  emerald: "text-emerald-700 dark:text-emerald-200",
  cyan: "text-cyan-700 dark:text-cyan-200",
  violet: "text-violet-700 dark:text-violet-200",
};

export function MetricTiles({ metrics, accent = "neutral" }: { metrics: Metric[]; accent?: TileAccent }) {
  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col rounded-md border border-black/10 bg-white/55 px-3 py-2.5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
          <dt className="order-2 mt-0.5 text-[11px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">{metric.label}</dt>
          <dd className={`text-lg font-semibold tabular-nums xl:text-xl ${valueColors[accent]}`}>{metric.display}</dd>
        </div>
      ))}
    </dl>
  );
}
