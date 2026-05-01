"use client";

import { MapPin, GraduationCap, Target, Compass, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/data/content";
import { FadeIn } from "@/lib/animations";

const ICONS: Record<string, LucideIcon> = {
  MapPin,
  GraduationCap,
  Target,
  Compass,
};

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 dark:text-accent-300 mb-3 block">
              About
            </span>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Who I <span className="font-serif italic font-normal">am</span>.
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-20">
          {/* Bio paragraphs */}
          <div className="space-y-6">
            {siteConfig.about.paragraphs.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>

          {/* Basics card */}
          <FadeIn delay={0.3}>
            <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800/60 bg-gradient-to-br from-neutral-50/80 via-white to-neutral-50/40 dark:from-neutral-900/50 dark:via-neutral-950/30 dark:to-neutral-900/20 p-7 overflow-hidden lg:sticky lg:top-24">
              {/* Decorative accent corner glow */}
              <div
                aria-hidden
                className="absolute -top-12 -right-12 w-40 h-40 pointer-events-none opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,155,90,0.22), transparent 65%)",
                }}
              />
              {/* Top accent line */}
              <div
                aria-hidden
                className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent"
              />

              <div className="relative">
                <div className="flex items-center gap-2 mb-7">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400 accent-pulse" />
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent-500 dark:text-accent-300">
                    The Basics
                  </h3>
                </div>

                <div className="space-y-1">
                  {siteConfig.about.sidebar.map((item, i) => {
                    const Icon = ICONS[item.icon] ?? MapPin;
                    const isLast = i === siteConfig.about.sidebar.length - 1;
                    return (
                      <div
                        key={item.label}
                        className={`flex items-start gap-3.5 py-4 ${
                          !isLast
                            ? "border-b border-neutral-200/70 dark:border-neutral-800/40"
                            : ""
                        }`}
                      >
                        <div className="mt-0.5 p-2 rounded-lg bg-accent-400/10 text-accent-600 dark:text-accent-300 flex-shrink-0 ring-1 ring-accent-400/15">
                          <Icon size={14} strokeWidth={1.8} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 mb-1">
                            {item.label}
                          </p>
                          <p className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug">
                            {item.value}
                          </p>
                          {"detail" in item && item.detail && (
                            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                              {item.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
