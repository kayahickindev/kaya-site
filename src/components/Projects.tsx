"use client";

import { motion } from "framer-motion";
import { ExternalLink, Apple } from "lucide-react";
import { siteConfig } from "@/data/content";
import { FadeIn, Stagger, staggerChild } from "@/lib/animations";

type ProjectLinks = {
  website?: string;
  appStore?: string;
};

function ProjectCard({
  name,
  description,
  links,
  tags,
  featured,
}: {
  name: string;
  description: string;
  links: ProjectLinks;
  tags: string[];
  featured: boolean;
}) {
  return (
    <motion.div
      variants={staggerChild}
      className={`group relative rounded-2xl border transition-all duration-300 ${
        featured
          ? "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50"
          : "border-neutral-200 dark:border-neutral-800/50 bg-white dark:bg-neutral-900/20"
      } hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-0.5`}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
              {name}
            </h3>
            {featured && (
              <span className="inline-block text-xs font-medium tracking-wide uppercase text-neutral-500 dark:text-neutral-500">
                Featured
              </span>
            )}
          </div>

          <div className="flex gap-2 ml-4">
            {links.website && (
              <a
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                aria-label={`Visit ${name} website`}
              >
                <ExternalLink size={16} />
              </a>
            )}
            {links.appStore && (
              <a
                href={links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                aria-label={`${name} on App Store`}
              >
                <Apple size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
            Things I&apos;ve Built
          </h2>
          <p className="text-neutral-500 dark:text-neutral-500 mb-12 max-w-xl">
            Products, businesses, and tools — all shipped and generating revenue.
          </p>
        </FadeIn>

        <Stagger className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {siteConfig.projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
