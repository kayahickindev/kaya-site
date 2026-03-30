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

        <div className="grid lg:grid-cols-[1fr,320px] gap-12 lg:gap-16">
          {/* Bio paragraphs */}
          <div className="space-y-6">
            {siteConfig.about.paragraphs.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>

          {/* Quick Facts sidebar */}
          <FadeIn delay={0.3}>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/20 p-6 lg:sticky lg:top-24">
              <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-6">
                Quick Facts
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Location</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    SF-bound (currently Ohio)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Education</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    Miami University, May 2026
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Marketing + Entrepreneurship Minor
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Focus</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    AI, Consumer Products, Behavior Change
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Companies</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    3 started, all profitable
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
