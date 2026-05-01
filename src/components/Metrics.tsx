"use client";

import { siteConfig } from "@/data/content";
import { useCountUp } from "@/lib/hooks";
import { FadeIn } from "@/lib/animations";

function MetricCard({
  value,
  label,
  detail,
  prefix,
  suffix,
  format,
  decimals,
  delay,
}: {
  value: number;
  label: string;
  detail?: string;
  prefix: string;
  suffix: string;
  format: boolean;
  decimals?: number;
  delay: number;
}) {
  const { count, ref } = useCountUp(value, 1800, format, decimals);

  return (
    <FadeIn delay={delay}>
      <div className="group relative border-t border-neutral-300 dark:border-neutral-800 pt-8 pb-2 transition-colors duration-300 hover:border-accent-400/60">
        <span
          ref={ref}
          className="block text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900 dark:text-white"
        >
          {prefix}
          {count}
          <span className="text-accent-500 dark:text-accent-300">{suffix}</span>
        </span>
        <p className="mt-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </p>
        {detail && (
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed">
            {detail}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

export function Metrics() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 dark:text-accent-300 mb-3 block">
              Live numbers
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              The proof, in <span className="font-serif italic font-normal">numbers</span>.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-12">
          {siteConfig.metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              {...metric}
              decimals={"decimals" in metric ? (metric.decimals as number) : 0}
              delay={i * 0.08}
            />
          ))}
        </div>

        {siteConfig.recognitions && siteConfig.recognitions.length > 0 && (
          <FadeIn delay={0.4}>
            <div className="mt-12 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-500 dark:text-neutral-500">
              {siteConfig.recognitions.map((r) => (
                <span key={r} className="inline-flex items-center gap-1.5">
                  <span aria-hidden>&#127942;</span>
                  {r}
                </span>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
