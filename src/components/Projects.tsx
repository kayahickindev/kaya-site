"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Apple, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/content";
import { FadeIn, Stagger, staggerChild } from "@/lib/animations";

type ProjectLinks = {
  website?: string;
  appStore?: string;
};

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const isActive = /active|scaling|live/i.test(status);
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-accent-400" : "bg-neutral-400 dark:bg-neutral-600"
        }`}
      />
      {status}
    </span>
  );
}

function FeaturedProject({
  name,
  tagline,
  description,
  highlights,
  links,
  tags,
  image,
  status,
}: {
  name: string;
  tagline?: string;
  description: string;
  highlights?: string[];
  links: ProjectLinks;
  tags: string[];
  image?: string;
  status?: string;
}) {
  return (
    <FadeIn>
      <div className="relative group rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800/60 bg-white dark:bg-[#0a0807] transition-all duration-500 hover:border-accent-400/40">
        {/* Decorative hover glow */}
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,155,90,0.18), transparent 65%)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-[1.7fr_1fr] items-stretch gap-0">
          {/* Text side */}
          <div className="p-7 sm:p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 dark:text-accent-300">
                Featured
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <StatusBadge status={status} />
            </div>

            <h3 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white mb-1.5 tracking-tight">
              {name}
            </h3>
            {tagline && (
              <p className="font-serif italic text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300 mb-4 leading-snug">
                {tagline}
              </p>
            )}

            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5 max-w-prose">
              {description}
            </p>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <ul className="space-y-1.5 mb-5">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent-400 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2.5">
              {links.website && (
                <a
                  href={links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                  <ExternalLink size={14} />
                  Visit site
                </a>
              )}
              {links.appStore && (
                <a
                  href={links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:border-accent-400/60 hover:text-accent-500 dark:hover:text-accent-300 transition-colors"
                >
                  <Apple size={14} />
                  App Store
                </a>
              )}
            </div>
          </div>

          {/* Visual side — phones bleed close to edges, dark solid bg */}
          {image && (
            <div className="relative overflow-hidden bg-neutral-100/40 dark:bg-[#070605] border-t sm:border-t-0 sm:border-l border-neutral-200/60 dark:border-neutral-800/40 min-h-[280px] sm:min-h-0 flex items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,155,90,0.18), transparent 70%)",
                }}
              />
              <div className="relative gentle-float w-full max-w-[300px] py-3 px-2">
                <Image
                  src={image}
                  alt={`${name} app screenshots`}
                  width={781}
                  height={1250}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

function ProjectCard({
  name,
  tagline,
  description,
  links,
  tags,
  status,
}: {
  name: string;
  tagline?: string;
  description: string;
  links: ProjectLinks;
  tags: string[];
  status?: string;
}) {
  const primaryHref = links.website || links.appStore;
  return (
    <motion.a
      variants={staggerChild}
      href={primaryHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/30 hover:border-accent-400/50 hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-0.5 truncate">
            {name}
          </h3>
          {tagline && (
            <p className="font-serif italic text-base text-neutral-500 dark:text-neutral-400">
              {tagline}
            </p>
          )}
        </div>
        <ArrowUpRight
          size={18}
          className="text-neutral-400 group-hover:text-accent-500 dark:group-hover:text-accent-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
        />
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 flex-1">
        {description}
      </p>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <StatusBadge status={status} />
      </div>
    </motion.a>
  );
}

export function Projects() {
  const featured = siteConfig.projects.find((p) => p.featured);
  const others = siteConfig.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-14">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 dark:text-accent-300 mb-3 block">
                Selected work
              </span>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                Things I&apos;ve <span className="font-serif italic font-normal">built</span>.
              </h2>
            </div>
            <p className="text-neutral-500 dark:text-neutral-500 max-w-xs">
              All shipped.
            </p>
          </div>
        </FadeIn>

        {featured && (
          <div className="mb-6">
            <FeaturedProject {...featured} />
          </div>
        )}

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
