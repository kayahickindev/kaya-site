"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";
import { FadeIn, Stagger, staggerChild } from "@/lib/animations";

export function Interests() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-12">
            {siteConfig.interests.heading}
          </h2>
        </FadeIn>

        <Stagger className="flex flex-wrap gap-3">
          {siteConfig.interests.items.map((interest) => (
            <motion.span
              key={interest}
              variants={staggerChild}
              className="px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-all duration-200"
            >
              {interest}
            </motion.span>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
