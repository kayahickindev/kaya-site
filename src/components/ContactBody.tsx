"use client";

import type { ComponentType } from "react";
import { Calendar, Mail } from "lucide-react";
import { siteConfig } from "@/data/content";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
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

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

function openEmail() {
  const { user, domain } = siteConfig.emailParts;
  window.location.assign(`mailto:${user}@${domain}`);
}

function copyEmail() {
  const { user, domain } = siteConfig.emailParts;
  navigator.clipboard?.writeText(`${user}@${domain}`).catch(() => {});
}

type Social = {
  href: string;
  label: string;
  handle: string;
  icon: ComponentType<{ size?: number }>;
};

const socials: Social[] = [
  { href: siteConfig.social.github, label: "GitHub", handle: "@kayahickindev", icon: GitHubIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", handle: "kayahickin", icon: LinkedInIcon },
  { href: siteConfig.social.twitter, label: "X / Twitter", handle: "@KayaHickin", icon: TwitterIcon },
  { href: siteConfig.social.instagram, label: "Instagram", handle: "@kayahickin", icon: InstagramIcon },
];

export function ContactBody() {
  return (
    <div className="flex min-h-0 flex-col gap-3 lg:col-span-5">
      <div className="relative flex flex-col gap-3 overflow-hidden rounded-md border border-black/10 bg-neutral-950 p-5 text-white shadow-2xl shadow-black/10 dark:border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(212,155,90,0.22),transparent_38%),linear-gradient(150deg,rgba(34,211,238,0.08),transparent_38%,rgba(244,114,182,0.10)_76%,rgba(251,191,36,0.08))]"
        />
        <div className="relative">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-200/80">
            Direct line
          </p>
          <p className="mt-2 text-2xl font-semibold leading-tight">
            kaya<span className="text-neutral-500">@</span>successai.app
          </p>
        </div>
        <div className="relative grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={openEmail}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white text-sm font-medium text-neutral-950 transition hover:-translate-y-0.5 hover:bg-neutral-100"
          >
            <Mail size={15} />
            Email me
          </button>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 text-sm font-medium text-neutral-100 transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            Copy address
          </button>
        </div>
        <a
          href={siteConfig.social.myfutureself}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-neutral-200 transition hover:bg-white/[0.08]"
        >
          <span className="flex items-center gap-2">
            <Calendar size={15} className="text-amber-200/80" />
            See MyFutureSelf live
          </span>
          <span className="text-neutral-500">myfutureselfapp.com</span>
        </a>
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-md border border-black/10 bg-white/55 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]">
        <p className="px-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
          Elsewhere
        </p>
        <ul className="mt-2 grid flex-1 grid-cols-2 gap-2">
          {socials.map(({ href, label, handle, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full items-center gap-3 rounded-md border border-black/10 bg-white/45 p-3 text-sm transition hover:-translate-y-0.5 hover:bg-white/70 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
              >
                <span className="text-neutral-600 dark:text-neutral-300">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-neutral-950 dark:text-white">
                    {label}
                  </span>
                  <span className="block truncate text-xs text-neutral-500">
                    {handle}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
