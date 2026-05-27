"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Apple,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Layers3,
  Mail,
  Search,
  Sparkles,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/data/content";

type Action = {
  label: string;
  href?: string;
  detail: string;
  external?: boolean;
  email?: boolean;
};

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const routeIcons: Record<string, LucideIcon> = {
  About: Target,
  Proof: Sparkles,
  Stack: Code2,
  Contact: Mail,
};

function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function TwitterIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ size = 17 }: { size?: number }) {
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

function SignalField() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,145,178,0.08),transparent_36%,rgba(217,119,6,0.08)_68%,transparent)] dark:bg-[linear-gradient(120deg,rgba(34,211,238,0.07),transparent_36%,rgba(251,191,36,0.08)_68%,transparent)]" />
      {Array.from({ length: 28 }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 9) * 0.28;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-neutral-900/18 shadow-[0_0_10px_rgba(0,0,0,0.12)] dark:bg-white/28 dark:shadow-[0_0_12px_rgba(255,255,255,0.18)]"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={
              reducedMotion
                ? undefined
                : { opacity: [0.16, 0.55, 0.16], scale: [0.8, 1, 0.8] }
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

function ProofStrip() {
  return (
    <Link
      href="/proof"
      className="group flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-black/10 bg-white/52 px-4 py-3 text-sm backdrop-blur transition hover:bg-white/78 dark:border-white/10 dark:bg-white/[0.035] dark:hover:bg-white/[0.06]"
    >
      {siteConfig.commandCenter.proof.map((item, index) => (
        <motion.span
          key={item.label}
          whileHover={{ y: -1 }}
          className="inline-flex min-w-0 items-baseline gap-1.5"
        >
          {index > 0 ? (
            <span className="mr-2 hidden text-neutral-300 dark:text-neutral-700 sm:inline">
              /
            </span>
          ) : null}
          <span className="font-semibold text-neutral-950 dark:text-white">
            {item.value}
          </span>
          <span className="truncate text-xs text-neutral-600 dark:text-neutral-400">
            {item.label}
          </span>
        </motion.span>
      ))}
    </Link>
  );
}

function RouteDockLink({
  route,
  index,
}: {
  route: (typeof siteConfig.commandCenter.routes)[number];
  index: number;
}) {
  const Icon = routeIcons[route.label] ?? ArrowRight;

  return (
    <Link
      href={route.href}
      className="group flex min-w-0 items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-950/[0.055] dark:text-neutral-200 dark:hover:bg-white/[0.07]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <Icon size={15} className="shrink-0 text-neutral-500 dark:text-neutral-400" />
      <span className="truncate">{route.label}</span>
    </Link>
  );
}

function ProjectDockLink({
  project,
  icon: Icon,
  href,
  index,
}: {
  project: (typeof siteConfig.projects)[number];
  icon: LucideIcon;
  href: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 items-center gap-2 rounded-md px-2.5 py-2 text-sm text-neutral-700 transition hover:bg-neutral-950/[0.055] dark:text-neutral-300 dark:hover:bg-white/[0.07]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <Icon size={15} className="shrink-0 text-neutral-500 dark:text-neutral-500" />
      <span className="truncate">{project.name}</span>
    </Link>
  );
}

function StackRail() {
  const items = siteConfig.commandCenter.rails.slice(0, 3);

  return (
    <div className="hidden min-w-0 items-center gap-1.5 overflow-hidden 2xl:flex">
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="shrink-0 rounded-md bg-neutral-950/[0.045] px-2.5 py-1.5 text-[11px] text-neutral-600 dark:bg-white/[0.06] dark:text-neutral-400"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function AppVisual({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return (
      <div className="relative mx-auto flex h-full max-h-[340px] min-h-0 w-full max-w-sm items-center justify-center">
        <div className="aspect-[9/18] h-full max-h-[330px] rounded-[2rem] border border-white/15 bg-neutral-950 p-3 shadow-2xl">
          <div className="h-full rounded-[1.35rem] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5">
            <div className="mb-6 h-1.5 w-16 rounded-full bg-white/25" />
            <div className="text-[10px] font-mono uppercase text-cyan-200/80">
              MyFutureSelf
            </div>
            <div className="mt-3 text-3xl font-semibold leading-none">90 days</div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              Roadmap, voice mentor, daily action.
            </p>
            <div className="mt-7 space-y-2">
              {["Future self call", "Daily task", "Roadmap check-in"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-neutral-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-full min-h-0 items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt={`${name} app screens`}
        width={781}
        height={1250}
        unoptimized
        loading="eager"
        onError={() => setFailed(true)}
        className="h-full max-h-[520px] w-auto max-w-full translate-y-2 scale-[1.18] object-contain drop-shadow-2xl xl:translate-y-3 xl:scale-[1.34]"
      />
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-md text-neutral-600 transition hover:-translate-y-0.5 hover:bg-neutral-950/[0.055] hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-white/[0.07] dark:hover:text-white"
    >
      <Icon size={17} />
    </a>
  );
}

function projectIcon(projectName: string) {
  if (projectName === "Dog AI") return Apple;
  if (projectName === "Appointra") return BriefcaseBusiness;
  return Layers3;
}

function CommandPalette({
  open,
  actions,
  onClose,
}: {
  open: boolean;
  actions: Action[];
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = actions.filter((action) => {
    const haystack = `${action.label} ${action.detail}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const activate = (action: Action) => {
    onClose();
    if (action.email) {
      openEmail();
      return;
    }
    if (!action.href) return;
    if (action.external) {
      window.open(action.href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.assign(action.href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-neutral-950/55 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-xl overflow-hidden rounded-lg border border-white/15 bg-neutral-950 text-white shadow-2xl"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search size={18} className="text-neutral-500" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pages, projects, links"
                className="h-14 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command menu"
                className="grid h-8 w-8 place-items-center rounded-md text-neutral-500 transition hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <div className="max-h-[420px] overflow-y-auto p-2">
              {filtered.map((action) => (
                <button
                  key={`${action.label}-${action.href ?? "email"}`}
                  type="button"
                  onClick={() => activate(action)}
                  className="group flex w-full items-center justify-between gap-3 rounded-md px-3 py-3 text-left transition hover:bg-white/[0.075]"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white">
                      {action.label}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-neutral-500">
                      {action.detail}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-neutral-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-300"
                  />
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-neutral-500">
                  No matches.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandCenter() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const featured = siteConfig.projects.find((project) => project.featured);
  const supporting = siteConfig.projects.filter((project) => !project.featured);

  const actions = useMemo<Action[]>(
    () => [
      ...siteConfig.commandCenter.routes.map((route) => ({
        label: route.label,
        href: route.href,
        detail: route.description,
      })),
      ...siteConfig.projects.map((project) => ({
        label: project.name,
        href: `/work/${project.slug}`,
        detail: project.tagline ?? project.description,
      })),
      { label: "GitHub", href: siteConfig.social.github, detail: "Open source and shipping log", external: true },
      { label: "LinkedIn", href: siteConfig.social.linkedin, detail: "Professional profile", external: true },
      { label: "Email Kaya", detail: "Start a direct conversation", email: true },
    ],
    []
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="relative h-dvh overflow-hidden bg-[#f4f1ea] text-neutral-950 dark:bg-[#050505] dark:text-white max-lg:h-auto max-lg:min-h-dvh max-lg:overflow-y-auto">
      <SignalField />
      <div className="relative z-10 grid h-full min-h-0 grid-rows-[44px_minmax(0,1fr)_auto] gap-4 px-4 py-3 sm:px-5 lg:px-7">
        <header className="flex h-11 min-w-0 items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="Kaya Hickin home"
            className="flex h-10 shrink-0 items-center gap-3 rounded-md border border-black/10 bg-white/52 px-3 text-sm font-semibold backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.075]"
          >
            <span className="grid h-6 w-6 place-items-center rounded bg-neutral-950 text-xs text-white dark:bg-white dark:text-neutral-950">
              KH
            </span>
            <span>{siteConfig.name}</span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="flex max-w-full items-center gap-2 overflow-hidden rounded-md border border-black/10 bg-white/42 px-3 py-2 text-xs text-neutral-600 backdrop-blur dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-400">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span className="truncate">{siteConfig.commandCenter.status}</span>
              <span className="text-neutral-300 dark:text-neutral-700">/</span>
              <span className="truncate">{siteConfig.commandCenter.availability}</span>
            </div>
          </div>

          <div className="h-10 w-10 shrink-0" aria-hidden />
        </header>

        <section className="grid min-h-0 grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease }}
            className="flex min-h-[520px] flex-col justify-center overflow-hidden py-4 lg:col-span-7 lg:min-h-0 lg:pr-7"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-md border border-black/10 bg-neutral-200 dark:border-white/10 dark:bg-neutral-900">
                <Image
                  src="/headshot.jpg"
                  alt="Kaya Hickin"
                  fill
                  sizes="56px"
                  className="object-cover grayscale"
                  priority
                />
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-mono uppercase text-neutral-500 dark:text-neutral-500">
                  {siteConfig.commandCenter.eyebrow}
                </div>
                <div className="mt-1 truncate text-sm text-neutral-700 dark:text-neutral-300">
                  {siteConfig.status.pill}
                </div>
              </div>
            </div>

            <div className="my-8 max-w-5xl lg:my-9 2xl:my-12">
              <h1 className="text-5xl font-semibold leading-[0.92] text-neutral-950 sm:text-6xl xl:text-7xl 2xl:text-8xl dark:text-white">
                I build consumer AI that changes behavior.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-700 xl:text-lg dark:text-neutral-300">
                {siteConfig.commandCenter.description}
              </p>
            </div>

            <div className="max-w-4xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
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
              <ProofStrip />
            </div>
          </motion.div>

          {featured && (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="relative flex min-h-[520px] flex-col overflow-hidden rounded-md border border-black/10 bg-neutral-950 text-white shadow-2xl shadow-black/10 lg:col-span-5 lg:min-h-0 dark:border-white/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(150deg,rgba(34,211,238,0.08),transparent_38%,rgba(244,114,182,0.11)_76%,rgba(251,191,36,0.08))]" />
              <div className="relative z-10 flex min-h-0 flex-1 flex-col p-5 xl:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-cyan-200/80">
                      Active company
                    </div>
                    <h2 className="mt-1 truncate text-3xl font-semibold xl:text-4xl">
                      {featured.name}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 xl:text-base">
                      {featured.description}
                    </p>
                  </div>
                  <Link
                    href={`/work/${featured.slug}`}
                    aria-label={`Open ${featured.name} case study`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/15 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[0.07] px-2.5 py-1.5 text-[11px] text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="min-h-0 flex-1">
                  <AppVisual image={featured.image} name={featured.name} />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                  <span className="truncate text-xs text-neutral-400">
                    Live iOS product · revenue-backed behavior change
                  </span>
                  <Link
                    href={`/work/${featured.slug}`}
                    className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-white px-3 text-sm font-medium text-neutral-950 transition hover:-translate-y-0.5 hover:bg-neutral-200"
                  >
                    Case study
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        <motion.nav
          aria-label="Primary links"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.18, ease }}
          className="grid min-h-0 gap-1 rounded-md border border-black/10 bg-white/45 p-1.5 text-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.028] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_auto]"
        >
          <div className="flex min-w-0 flex-wrap items-center gap-1">
            {siteConfig.commandCenter.routes.map((route, index) => (
              <RouteDockLink key={route.href} route={route} index={index} />
            ))}
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-1 border-black/10 pt-2 dark:border-white/10 sm:border-t lg:border-l lg:border-t-0 lg:pl-2 lg:pt-0">
            <span className="px-2 text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-500">
              Work
            </span>
            {supporting.map((project, index) => (
              <ProjectDockLink
                key={project.name}
                project={project}
                href={`/work/${project.slug}`}
                index={index}
                icon={projectIcon(project.name)}
              />
            ))}
          </div>

          <div className="flex min-w-0 items-center justify-between gap-2 border-black/10 pt-2 dark:border-white/10 sm:border-t lg:border-l lg:border-t-0 lg:pl-2 lg:pt-0">
            <StackRail />
            <div className="flex shrink-0 items-center gap-1">
              <SocialLink href={siteConfig.social.github} label="GitHub" icon={GitHubIcon} />
              <SocialLink href={siteConfig.social.linkedin} label="LinkedIn" icon={LinkedInIcon} />
              <SocialLink href={siteConfig.social.twitter} label="X / Twitter" icon={TwitterIcon} />
              <SocialLink href={siteConfig.social.instagram} label="Instagram" icon={InstagramIcon} />
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Open command menu"
                className="grid h-9 w-9 place-items-center rounded-md text-neutral-600 transition hover:-translate-y-0.5 hover:bg-neutral-950/[0.055] hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-white/[0.07] dark:hover:text-white"
              >
                <Search size={17} />
              </button>
            </div>
          </div>
        </motion.nav>
      </div>
      <CommandPalette
        key={paletteOpen ? "open" : "closed"}
        open={paletteOpen}
        actions={actions}
        onClose={() => setPaletteOpen(false)}
      />
    </main>
  );
}
