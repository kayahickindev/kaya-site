"use client";

import { siteConfig } from "@/data/content";
import { FadeIn } from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-12">
            {siteConfig.about.heading}
          </h2>
        </FadeIn>

        <div className="max-w-3xl space-y-6">
          {siteConfig.about.paragraphs.map((paragraph, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
