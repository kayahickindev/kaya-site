"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { siteConfig } from "@/data/content";
import { LiveShipped } from "./LiveShipped";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const navItems = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Proof", href: "/proof" },
  { label: "Stack", href: "/stack" },
  { label: "Contact", href: "/contact" },
];

type Action = {
  label: string;
  href?: string;
  detail: string;
  external?: boolean;
  email?: boolean;
};

function openEmail() {
  const { user, domain } = siteConfig.emailParts;
  window.location.assign(`mailto:${user}@${domain}`);
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
                    <span className="block text-sm font-medium text-white">{action.label}</span>
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
                <div className="px-3 py-8 text-center text-sm text-neutral-500">No matches.</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TopNav() {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const actions = useMemo<Action[]>(
    () => [
      ...navItems.map((route) => ({
        label: route.label,
        href: route.href,
        detail: `Open ${route.label.toLowerCase()}`,
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
    <>
      <motion.header
        aria-label="Primary"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease }}
        className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-black/10 bg-white/45 p-1.5 text-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.028]"
      >
        <div className="flex min-w-0 items-center gap-1">
          <Link
            href="/"
            aria-label="Kaya Hickin home"
            className="flex h-9 shrink-0 items-center gap-2 rounded-md px-2 transition hover:bg-neutral-950/[0.055] dark:hover:bg-white/[0.07]"
          >
            <span className="grid h-7 w-7 place-items-center rounded bg-neutral-950 font-serif text-sm leading-none text-white dark:bg-white dark:text-neutral-950">
              KH
            </span>
            <span className="hidden font-serif text-[17px] tracking-tight text-neutral-950 sm:inline dark:text-white">
              {siteConfig.name}
            </span>
          </Link>
          <span aria-hidden className="mx-1 hidden h-5 w-px bg-black/10 dark:bg-white/10 md:block" />
          <nav className="flex min-w-0 flex-wrap items-center gap-0.5">
            {navItems.map((item) => {
              const active =
                item.href === pathname ||
                (item.href === "/work" && pathname?.startsWith("/work"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-md px-2.5 py-2 transition ${
                    active
                      ? "font-medium text-neutral-950 dark:text-white"
                      : "text-neutral-700 hover:bg-neutral-950/[0.055] dark:text-neutral-300 dark:hover:bg-white/[0.07]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="topnav-active"
                      className="absolute inset-0 -z-10 rounded-md bg-neutral-950/[0.07] dark:bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <LiveShipped />
          </div>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command menu (Cmd+K)"
            className="hidden h-10 items-center gap-2 rounded-md border border-black/10 bg-white/45 px-3 text-xs text-neutral-600 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-400 dark:hover:bg-white/[0.08] sm:flex"
          >
            <Search size={14} />
            <span>Search</span>
          </button>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command menu"
            className="grid h-10 w-10 place-items-center rounded-md border border-black/10 bg-white/45 backdrop-blur sm:hidden dark:border-white/10 dark:bg-white/[0.035]"
          >
            <Search size={16} />
          </button>
        </div>
      </motion.header>

      <CommandPalette
        key={paletteOpen ? "open" : "closed"}
        open={paletteOpen}
        actions={actions}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  );
}
