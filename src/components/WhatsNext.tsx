"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";
import { FadeIn, Stagger, staggerChild } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

export function WhatsNext() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-12 text-center">
            {siteConfig.whatsNext.heading}
          </h2>
        </FadeIn>

        <Stagger className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {siteConfig.whatsNext.items.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerChild}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800/50 bg-white dark:bg-neutral-900/20 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-2">
                <ArrowRight
                  size={16}
                  className="mt-1 text-neutral-400 dark:text-neutral-600 flex-shrink-0"
                />
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-7">
                {item.description}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
