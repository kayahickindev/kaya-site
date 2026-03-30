"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

function GitHubIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
import { siteConfig } from "@/data/content";
import { FadeIn } from "@/lib/animations";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubData {
  contributions: ContributionDay[];
  total: number;
}

function ContributionGrid({ data }: { data: GitHubData | null }) {
  if (!data) {
    return <ContributionSkeleton />;
  }

  // Take the last 20 weeks (140 days) for a compact view
  const recent = data.contributions.slice(-140);

  // Group into weeks (7 days each)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < recent.length; i += 7) {
    weeks.push(recent.slice(i, i + 7));
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div
        className="inline-grid gap-[3px]"
        style={{
          gridTemplateRows: "repeat(7, 1fr)",
          gridAutoFlow: "column",
        }}
      >
        {weeks.flatMap((week, wi) =>
          week.map((day, di) => (
            <div
              key={`${wi}-${di}`}
              className="w-[11px] h-[11px] rounded-[2px] transition-colors duration-200"
              style={{
                backgroundColor: `var(--gh-${day.level})`,
              }}
              title={
                day.date
                  ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`
                  : ""
              }
            />
          ))
        )}
      </div>
    </div>
  );
}

function ContributionSkeleton() {
  return (
    <div className="overflow-x-auto pb-2">
      <div
        className="inline-grid gap-[3px]"
        style={{
          gridTemplateRows: "repeat(7, 1fr)",
          gridAutoFlow: "column",
        }}
      >
        {Array.from({ length: 140 }).map((_, i) => (
          <div
            key={i}
            className="w-[11px] h-[11px] rounded-[2px] bg-neutral-100 dark:bg-neutral-800/50 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export function GitHub() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [profileStats, setProfileStats] = useState<{
    public_repos: number;
  } | null>(null);

  useEffect(() => {
    // Fetch contribution data
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${siteConfig.github.username}?y=last`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) {
          const totalObj = json.total as Record<string, number>;
          const total = Object.values(totalObj).reduce(
            (a: number, b: number) => a + b,
            0
          );
          setData({ contributions: json.contributions, total });
        }
      })
      .catch(() => {});

    // Fetch profile stats
    fetch(`https://api.github.com/users/${siteConfig.github.username}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) {
          setProfileStats({ public_repos: json.public_repos });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="github" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <GitHubIcon size={28} />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {siteConfig.github.heading}
            </h2>
          </div>
          <p className="text-neutral-500 dark:text-neutral-500 mb-10 max-w-2xl">
            {siteConfig.github.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/20 p-6 sm:p-8">
            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              {data && (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {data.total.toLocaleString()}
                  </span>
                  <span className="text-sm text-neutral-500">
                    contributions last year
                  </span>
                </div>
              )}
              {profileStats && (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {profileStats.public_repos}
                  </span>
                  <span className="text-sm text-neutral-500">
                    public repos
                  </span>
                </div>
              )}
            </div>

            {/* Contribution grid */}
            <ContributionGrid data={data} />

            {/* Profile link */}
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800/50">
              <a
                href={siteConfig.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
              >
                <span>View on GitHub</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
