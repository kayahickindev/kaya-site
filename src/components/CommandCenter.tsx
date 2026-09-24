"use client";

import { type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { myFutureSelf, type StoreShot } from "@/data/assets";
import { siteConfig } from "@/data/content";
import {
  formatCount,
  type ContributionCalendar,
} from "@/lib/github-contributions";
import {
  parseMetricDisplay,
  type MarketingMetricsSnapshot,
} from "@/lib/marketing-metrics";
import { ContributionGraph } from "./ContributionGraph";
import { Footer } from "./Footer";
import { MetricTiles } from "./MetricTiles";
import { RevealHeadline } from "./RevealHeadline";
import { TopNav } from "./TopNav";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function SignalField() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(8,145,178,0.18),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(217,119,6,0.14),transparent_55%)] dark:bg-[radial-gradient(circle_at_85%_10%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(251,191,36,0.12),transparent_55%)]" />
      {Array.from({ length: 12 }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 9) * 0.28;
        const tint =
          i % 2 === 0
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

// The tile sparklines are a decorative ramp that lands on the current figure.
// They are not recorded history and carry no axis, scale or dates; the tile's
// number is the claim, the line only carries the shape of the number growing.
function ramp(value: number, steps = 8) {
  return Array.from({ length: steps }, (_, i) => value / 2 ** (steps - 1 - i));
}

function metricTiles(metrics: MarketingMetricsSnapshot) {
  // Every tile counts up to the number inside the published display string, so a
  // tile can never animate to a figure the site does not publish. The exact paid
  // subscriber count and ARR are private and are not in the payload.
  const subscribers = parseMetricDisplay(
    metrics.metrics.paidSubscribersEver.display,
  );
  const arr = parseMetricDisplay(metrics.metrics.arr.display);
  const downloads = parseMetricDisplay(metrics.metrics.appDownloads.display);
  const rating = parseMetricDisplay(metrics.metrics.appStoreRating.display);

  return [
    {
      ...subscribers,
      label: "active paid subscribers",
      sparkline: ramp(subscribers.value),
      accent: "rgb(34,197,94)",
    },
    {
      ...arr,
      label: "ARR",
      sparkline: ramp(arr.value),
      accent: "rgb(212,155,90)",
    },
    {
      ...downloads,
      label: "downloads",
      sparkline: ramp(downloads.value),
      accent: "rgb(34,211,238)",
    },
    {
      ...rating,
      label: "App Store rating",
      suffix: `${rating.suffix}★`,
      sparkline: [4.4, 4.44, 4.49, 4.53, 4.57, 4.61, 4.66, rating.value],
      accent: "rgb(251,191,36)",
    },
  ];
}

// Contributions for the last year, straight from GitHub's calendar. The whole
// strip links to the profile; with no calendar it renders nothing.
function GitHubStrip({ calendar }: { calendar: ContributionCalendar }) {
  const profile = `github.com/${calendar.username}`;
  const caption = `${formatCount(calendar.total)} contributions in the last year`;

  // reducedMotion="user" drops the slide and keeps the fade, and renders the
  // same markup on the server and client either way.
  return (
    <MotionConfig reducedMotion="user">
      <motion.a
        href={siteConfig.github.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${caption} on GitHub, ${profile}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease, delay: 0.6 }}
        className="group block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
      >
        <span className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-300">
            {caption}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-xs text-neutral-500 transition group-hover:text-amber-700 dark:text-neutral-400 dark:group-hover:text-amber-300">
            {profile}
            <ArrowUpRight
              size={12}
              className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </span>
        <span className="block transition group-hover:opacity-90">
          <ContributionGraph calendar={calendar} variant="compact" />
        </span>
      </motion.a>
    </MotionConfig>
  );
}

// The product story in three real App Store composites: the avatar in front,
// goals and the Future Self chat tucked behind it. Sizes come from --fan-h so
// the whole fan fits the first fold at every desktop height.
const fanShots = {
  left: myFutureSelf.store[2],
  center: myFutureSelf.store[1],
  right: myFutureSelf.store[3],
};

function FanPhone({ shot, className }: { shot: StoreShot; className: string }) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      unoptimized
      loading="eager"
      className={`block h-full w-auto rounded-xl ring-1 ring-black/10 dark:ring-white/10 ${className}`}
    />
  );
}

// With reduced motion the side phones appear in place (MotionConfig skips the
// transform and keeps the fade), with no server/client markup difference.
function PhoneFan() {
  const side = (direction: -1 | 1) => ({
    initial: { x: "-50%", rotate: 0, opacity: 0 },
    animate: {
      x: direction === -1 ? "-131%" : "31%",
      rotate: direction * 6,
      opacity: 1,
    },
    transition: { duration: 0.7, delay: 0.25, ease },
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[var(--fan-h)] w-full [--fan-h:max(240px,min(calc(100dvh-340px),82cqw,680px))]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-8%] bg-[radial-gradient(ellipse_55%_55%_at_50%_55%,rgba(251,191,36,0.26),transparent_65%)] dark:bg-[radial-gradient(ellipse_55%_55%_at_50%_55%,rgba(251,191,36,0.20),transparent_65%)]"
        />
        <motion.div
          {...side(-1)}
          style={{ originX: 0.5, originY: 1 }}
          className="absolute bottom-[5%] left-1/2 h-[84%]"
        >
          <FanPhone
            shot={fanShots.left}
            className="brightness-[0.82] drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
        <motion.div
          {...side(1)}
          style={{ originX: 0.5, originY: 1 }}
          className="absolute bottom-[5%] left-1/2 h-[84%]"
        >
          <FanPhone
            shot={fanShots.right}
            className="brightness-[0.82] drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
        <div className="absolute bottom-0 left-1/2 z-10 h-full -translate-x-1/2">
          <FanPhone
            shot={fanShots.center}
            className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </MotionConfig>
  );
}

export function CommandCenter({
  metrics,
  contributions,
}: {
  metrics: MarketingMetricsSnapshot;
  contributions: ContributionCalendar | null;
}) {
  const featured = siteConfig.projects.find((project) => project.featured);
  const liveMetricTiles = metricTiles(metrics);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#f4f1ea] text-neutral-950 dark:bg-[#050505] dark:text-white">
      <SignalField />
      <div className="relative z-10 grid min-h-dvh grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] gap-4 px-4 py-3 sm:px-5 sm:py-4 lg:px-7">
        <TopNav />

        <section className="grid grid-cols-1 content-center gap-10 pb-4 lg:grid-cols-[minmax(0,45rem)_minmax(22rem,1fr)] lg:items-center lg:gap-6 lg:pb-6 2xl:grid-cols-[minmax(0,52rem)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease }}
            className="flex flex-col gap-4 lg:gap-5 2xl:gap-6"
          >
            <div className="group flex w-fit items-center gap-3">
              <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-black/10 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.4)] ring-1 ring-amber-400/25 dark:border-white/15">
                <Image
                  src="/headshot.jpg"
                  alt="Kaya Hickin"
                  width={56}
                  height={56}
                  priority
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-neutral-950 dark:text-white">
                  Kaya Hickin
                </span>
                <span className="block text-[11px] text-neutral-500 dark:text-neutral-300">
                  Co-founder &amp; CTO · Cleveland, OH
                </span>
              </span>
            </div>

            <div className="relative max-w-5xl">
              <div aria-hidden className="aurora" />
              <div className="relative">
                <RevealHeadline
                  words={[
                    "I",
                    "build",
                    "consumer",
                    "AI",
                    "that",
                    "changes",
                    "behavior.",
                  ]}
                  className="text-4xl font-semibold leading-[0.95] text-neutral-950 sm:text-5xl sm:leading-[0.92] xl:text-6xl 2xl:text-7xl dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:gap-6 2xl:gap-7">
              <div>
                <p className="mb-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-300">
                  Live traction · MyFutureSelf
                </p>
                <MetricTiles metrics={liveMetricTiles} accent="amber" />
              </div>

              {contributions ? <GitHubStrip calendar={contributions} /> : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/work"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-amber-400/40 bg-amber-400/15 px-4 text-sm font-medium text-amber-800 backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-amber-400/25 dark:text-amber-200 dark:hover:bg-amber-400/20"
              >
                See work
                <ArrowRight size={16} />
              </Link>
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
              className="@container relative flex flex-col items-center gap-4"
            >
              <Link
                href={`/work/${featured.slug}`}
                aria-label={`Open ${featured.name} case study`}
                className="group relative z-10 flex flex-col items-center gap-1.5 rounded-md text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="inline-flex items-center gap-2">
                  <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
                    {featured.name}
                  </h2>
                  <ArrowUpRight
                    size={20}
                    className="text-neutral-500 dark:text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-300"
                  />
                </div>
              </Link>

              <Link
                href={`/work/${featured.slug}`}
                aria-label={`Open ${featured.name} case study`}
                className="relative block w-full rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                <PhoneFan />
              </Link>
            </motion.div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
