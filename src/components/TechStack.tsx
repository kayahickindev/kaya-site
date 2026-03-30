"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";
import { FadeIn, Stagger, staggerChild } from "@/lib/animations";

export function TechStack() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-10 text-center">
            {siteConfig.techStack.heading}
          </h2>
        </FadeIn>

        <Stagger className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
          {siteConfig.techStack.items.map((item) => (
            <motion.span
              key={item}
              variants={staggerChild}
              className="px-5 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 text-sm font-mono font-medium text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-all duration-200"
            >
              {item}
            </motion.span>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
