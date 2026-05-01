"use client";

import { Mail, ArrowUpRight, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/content";
import { FadeIn } from "@/lib/animations";
import { EmailLink } from "./EmailLink";

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

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const socials = [
  { Icon: GitHubIcon, href: siteConfig.social.github, label: "GitHub" },
  { Icon: TwitterIcon, href: siteConfig.social.twitter, label: "X / Twitter" },
  { Icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { Icon: ExternalLink, href: siteConfig.social.myfutureself, label: "MyFutureSelf" },
];

export function Contact() {
  const { eyebrow, body, primaryCta } = siteConfig.contact;

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto max-w-3xl h-[480px] opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,155,90,0.18), transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 dark:text-accent-300 mb-5 block">
            {eyebrow}
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-7 leading-[1.05]">
            Let&apos;s build{" "}
            <span className="font-serif italic font-normal">something</span>.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-10">
            {body}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <EmailLink
            ariaLabel="Send an email"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-base hover:bg-neutral-800 dark:hover:bg-neutral-100 ring-1 ring-transparent hover:ring-accent-400/50 transition-all"
          >
            <Mail size={18} />
            <span>{primaryCta.label}</span>
            <ArrowUpRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </EmailLink>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-14 flex items-center justify-center gap-2.5 flex-wrap">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-accent-500 dark:hover:text-accent-300 hover:border-accent-400/60 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
