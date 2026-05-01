"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";
import { FadeIn, Stagger, staggerChild } from "@/lib/animations";

const CATEGORIES = ["iOS", "Web", "Backend", "AI", "Workflow"] as const;

export function TechStack() {
  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    items: siteConfig.techStack.items.filter((it) => it.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 dark:text-accent-300 mb-3 block">
              The toolkit
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              How I <span className="font-serif italic font-normal">build</span>.
            </h2>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-10">
          {grouped.map((group) => (
            <motion.div key={group.category} variants={staggerChild}>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-800/60">
                <span className="h-1 w-1 rounded-full bg-accent-400" />
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-neutral-300">
                  {group.category}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent-500 dark:hover:text-accent-300 transition-colors"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
