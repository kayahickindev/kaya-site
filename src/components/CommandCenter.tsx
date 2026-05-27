"use client";

import { type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/content";
import { MetricTiles } from "./MetricTiles";
import { RevealHeadline } from "./RevealHeadline";
import { TopNav } from "./TopNav";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function SignalField() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(8,145,178,0.18),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(217,119,6,0.14),transparent_55%)] dark:bg-[radial-gradient(circle_at_85%_10%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(251,191,36,0.12),transparent_55%)]" />
      {Array.from({ length: 20 }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 9) * 0.28;
        const tint = i % 2 === 0
          ? "bg-cyan-700/35 shadow-[0_0_12px_rgba(8,145,178,0.30)] dark:bg-cyan-300/45 dark:shadow-[0_0_14px_rgba(34,211,238,0.30)]"
          : "bg-amber-700/35 shadow-[0_0_12px_rgba(217,119,6,0.30)] dark:bg-amber-300/45 dark:shadow-[0_0_14px_rgba(251,191,36,0.30)]";
        return (
          <motion.span
            key={i}
            className={`absolute h-1 w-1 rounded-full ${tint}`}
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={
              reducedMotion
                ? undefined
                : { opacity: [0.18, 0.6, 0.18], scale: [0.8, 1.05, 0.8] }
            }
            transition={{
              duration: 6.8 + (i % 5),
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

function SocialPill({
  href,
  label,
  icon: Icon,
  brandClass,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
  brandClass: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`group grid h-10 w-10 place-items-center rounded-md border border-black/10 bg-white/55 text-neutral-700 backdrop-blur transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 ${brandClass}`}
    >
      <Icon size={16} />
    </a>
  );
}

const metricTiles = [
  {
    value: 1718,
    label: "paid subscribers",
    format: true,
    sparkline: [12, 38, 90, 220, 480, 880, 1350, 1718],
    accent: "rgb(34,197,94)",
  },
  {
    value: 65,
    label: "ARR",
    prefix: "$",
    suffix: "K",
    sparkline: [2, 6, 12, 22, 35, 48, 58, 65],
    accent: "rgb(212,155,90)",
  },
  {
    value: 26,
    label: "downloads",
    suffix: "K+",
    sparkline: [0.4, 1.2, 3, 6.5, 11, 16, 21, 26],
    accent: "rgb(34,211,238)",
  },
  {
    value: 4.7,
    label: "App Store rating",
    suffix: "★",
    decimals: 1,
    sparkline: [4.4, 4.5, 4.6, 4.6, 4.7, 4.7, 4.7, 4.7],
    accent: "rgb(251,191,36)",
  },
  {
    value: 52,
    label: "avg monthly growth",
    suffix: "%",
    sparkline: [38, 44, 49, 51, 50, 53, 56, 52],
    accent: "rgb(244,114,182)",
  },
];

export function CommandCenter() {
  const featured = siteConfig.projects.find((project) => project.featured);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#f4f1ea] text-neutral-950 dark:bg-[#050505] dark:text-white">
      <SignalField />
      <div className="relative z-10 grid min-h-dvh grid-rows-[auto_1fr] gap-4 px-4 py-3 sm:px-5 sm:py-4 lg:px-7">
        <TopNav />

        <section className="grid grid-cols-1 gap-6 pb-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease }}
            className="flex flex-col justify-center gap-3 py-2 lg:col-span-7 lg:pr-7"
          >
            <div className="relative max-w-5xl">
              <div aria-hidden className="aurora" />
              <div className="relative">
                <RevealHeadline
                  words={["I", "build", "consumer", "AI", "that", "changes", "behavior."]}
                  className="text-4xl font-semibold leading-[0.95] text-neutral-950 sm:text-6xl sm:leading-[0.92] xl:text-7xl 2xl:text-8xl dark:text-white"
                />
              </div>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Link
                href="/proof"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
              >
                See proof
                <ArrowRight size={16} />
              </Link>
              <a
                href={siteConfig.social.myfutureself}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-black/10 bg-white/70 px-4 text-sm font-medium text-neutral-800 transition hover:-translate-y-0.5 hover:border-black/25 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-white/25 dark:hover:bg-white/[0.08]"
              >
                Open MyFutureSelf
                <ArrowUpRight size={15} />
              </a>
            </div>

            <Link href="/proof" className="mt-1 block" aria-label="See full proof">
              <MetricTiles metrics={metricTiles} accent="amber" />
            </Link>

            <div className="flex items-center gap-2">
              <SocialPill
                href={siteConfig.social.github}
                label="GitHub"
                icon={GitHubIcon}
                brandClass="hover:bg-[#181717] hover:text-white hover:border-[#181717] dark:hover:bg-white dark:hover:text-neutral-950"
              />
              <SocialPill
                href={siteConfig.social.linkedin}
                label="LinkedIn"
                icon={LinkedInIcon}
                brandClass="hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2]"
              />
              <SocialPill
                href={siteConfig.social.twitter}
                label="X / Twitter"
                icon={TwitterIcon}
                brandClass="hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-neutral-950"
              />
              <SocialPill
                href={siteConfig.social.instagram}
                label="Instagram"
                icon={InstagramIcon}
                brandClass="hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-600 hover:to-purple-700 hover:text-white hover:border-transparent"
              />
            </div>
          </motion.div>

          {featured && (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="relative flex min-h-[460px] flex-col items-end gap-4 lg:col-span-5 lg:min-h-0"
            >
              <div className="relative z-10 flex w-full flex-col items-end gap-2.5 text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-1 text-[11px] font-medium text-amber-800 dark:text-amber-200">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 accent-pulse" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-300" />
                  </span>
                  Current focus
                </span>
                <Link
                  href={`/work/${featured.slug}`}
                  aria-label={`Open ${featured.name} case study`}
                  className="group inline-flex items-center gap-2"
                >
                  <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl dark:text-white">
                    {featured.name}
                  </h2>
                  <ArrowUpRight
                    size={20}
                    className="text-neutral-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-300"
                  />
                </Link>
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-black/10 bg-white/50 px-2 py-0.5 text-[10px] font-medium text-neutral-700 backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/work/${featured.slug}`}
                aria-label={`Open ${featured.name} case study`}
                className="relative w-full flex-1"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[-12%] bg-[radial-gradient(ellipse_60%_55%_at_60%_55%,rgba(251,191,36,0.28),transparent_65%)] dark:bg-[radial-gradient(ellipse_60%_55%_at_60%_55%,rgba(251,191,36,0.22),transparent_65%)]"
                />
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={`${featured.name} app screenshots`}
                    width={781}
                    height={1250}
                    unoptimized
                    loading="eager"
                    className="relative ml-auto h-full max-h-[600px] w-auto translate-x-[4%] scale-[1.5] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] sm:scale-[1.65] xl:translate-x-[8%] xl:scale-[1.85]"
                  />
                ) : null}
              </Link>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
