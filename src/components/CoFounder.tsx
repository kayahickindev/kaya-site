"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { siteConfig } from "@/data/content";
import { FadeIn, Stagger, staggerChild } from "@/lib/animations";

export function CoFounder() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/20 p-8 sm:p-12 lg:p-16">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
              {siteConfig.cofounder.heading}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mb-10">
              {siteConfig.cofounder.description}
            </p>
          </FadeIn>

          <Stagger className="space-y-4 mb-10" staggerDelay={0.08}>
            {siteConfig.cofounder.qualities.map((quality) => (
              <motion.div
                key={quality}
                variants={staggerChild}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 p-1 rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <Check size={12} className="text-neutral-700 dark:text-neutral-300" />
                </div>
                <span className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {quality}
                </span>
              </motion.div>
            ))}
          </Stagger>

          <FadeIn delay={0.3}>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
              {siteConfig.cofounder.cta}
            </p>
            <a
              href="#contact"
              className="inline-flex px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
            >
              Reach Out
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
