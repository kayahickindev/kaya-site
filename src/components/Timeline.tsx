"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/data/content";
import { FadeIn, Stagger, staggerChild } from "@/lib/animations";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 dark:text-accent-300 mb-3 block">
              The path
            </span>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-3">
              <span className="font-serif italic font-normal">Experience</span>.
            </h2>
            <p className="text-neutral-500 dark:text-neutral-500 max-w-xl">
              The path so far.
            </p>
          </div>
        </FadeIn>

        <div ref={containerRef} className="relative">
          {/* Background line */}
          <div className="absolute left-[8px] top-3 bottom-3 w-[2px] bg-neutral-200 dark:bg-neutral-800/60" />
          {/* Animated accent fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[8px] top-3 w-[2px] bg-gradient-to-b from-accent-400 via-accent-500 to-accent-400/0"
          />

          <Stagger>
            <div className="space-y-14">
              {siteConfig.timeline.map((entry) => (
                <motion.div
                  key={entry.company}
                  variants={staggerChild}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  {entry.active ? (
                    <span className="absolute left-0 top-[5px] flex h-[18px] w-[18px] items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400/40 accent-pulse" />
                      <span className="relative h-[18px] w-[18px] rounded-full border-2 border-accent-400 bg-accent-400 shadow-[0_0_18px_rgba(212,155,90,0.55)]" />
                    </span>
                  ) : (
                    <span className="absolute left-0 top-[5px] h-[18px] w-[18px] rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950" />
                  )}

                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-1">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                        {entry.company}
                      </h3>
                      <span className="text-xs text-neutral-500 dark:text-neutral-500 font-mono tracking-wide uppercase">
                        {entry.period}
                      </span>
                    </div>
                    <p className="font-serif italic text-base text-neutral-500 dark:text-neutral-400 mb-3">
                      {entry.role}
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      {entry.description}
                    </p>
                    {entry.metrics && entry.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.metrics.map((m) => (
                          <span
                            key={m}
                            className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                              entry.active
                                ? "border-accent-400/50 bg-accent-400/10 text-accent-700 dark:text-accent-200"
                                : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 text-neutral-600 dark:text-neutral-400"
                            }`}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
