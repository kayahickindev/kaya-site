"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { siteConfig } from "@/data/content";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socials = [
  { icon: GitHubIcon, href: siteConfig.social.github, label: "GitHub" },
  { icon: TwitterIcon, href: siteConfig.social.twitter, label: "X / Twitter" },
  { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Mail, href: siteConfig.social.email, label: "Email" },
];

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

export function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 order-2 lg:order-1">
            <motion.p
              {...fadeUp(0)}
              className="text-sm font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-500 mb-4"
            >
              {siteConfig.title}
            </motion.p>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-6"
            >
              {siteConfig.hero.headline}
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mb-8"
            >
              {siteConfig.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mb-10">
              <a
                href={siteConfig.hero.cta.primary.href}
                className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
              >
                {siteConfig.hero.cta.primary.text}
              </a>
              <a
                href={siteConfig.hero.cta.secondary.href}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors duration-200"
              >
                {siteConfig.hero.cta.secondary.text}
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.4)} className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex-shrink-0 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <Image
                  src="/headshot.jpg"
                  alt="Kaya Hickin"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
