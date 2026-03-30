"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";
import { FadeIn, Stagger, staggerChild } from "@/lib/animations";

export function Timeline() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
            Experience
          </h2>
          <p className="text-neutral-500 dark:text-neutral-500 mb-12 max-w-xl">
            A timeline of building. Every venture profitable.
          </p>
        </FadeIn>

        <Stagger className="relative">
          {/* Timeline line */}
          <div className="absolute left-[8px] top-3 bottom-3 w-[2px] bg-neutral-200 dark:bg-neutral-800" />

          <div className="space-y-14">
            {siteConfig.timeline.map((entry) => (
              <motion.div
                key={entry.company}
                variants={staggerChild}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-[5px] w-[18px] h-[18px] rounded-full border-2 ${
                    entry.active
                      ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white ring-4 ring-neutral-900/10 dark:ring-white/10"
                      : "border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-950"
                  }`}
                />

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {entry.company}
                    </h3>
                    <span className="text-sm text-neutral-500 dark:text-neutral-500 font-mono">
                      {entry.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500 mb-2">
                    {entry.role}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
