"use client";

import { siteConfig } from "@/data/content";
import { useCountUp } from "@/lib/hooks";
import { FadeIn } from "@/lib/animations";

function MetricCard({
  value,
  label,
  prefix,
  suffix,
  format,
  delay,
}: {
  value: number;
  label: string;
  prefix: string;
  suffix: string;
  format: boolean;
  delay: number;
}) {
  const { count, ref } = useCountUp(value, 2000, format);

  return (
    <FadeIn delay={delay} className="text-center">
      <div className="py-8">
        <span
          ref={ref}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          {prefix}
          {count}
          {suffix}
        </span>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500 font-medium">
          {label}
        </p>
      </div>
    </FadeIn>
  );
}

export function Metrics() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="border border-neutral-200 dark:border-neutral-800/50 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-neutral-200 dark:divide-neutral-800/50">
            {siteConfig.metrics.map((metric, i) => (
              <MetricCard key={metric.label} {...metric} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
