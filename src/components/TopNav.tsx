"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { siteConfig } from "@/data/content";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const navItems = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Stack", href: "/stack" },
  { label: "Contact", href: "/contact" },
];

function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-end">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle color theme"
        className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/45 text-neutral-700 backdrop-blur transition hover:bg-neutral-950/[0.055] hover:text-neutral-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300 dark:hover:bg-white/[0.07] dark:hover:text-white"
      >
        {/* Icon driven by the .dark class so there is no hydration mismatch. */}
        <Sun size={16} className="hidden dark:block" />
        <Moon size={16} className="block dark:hidden" />
      </button>
    </div>
  );
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <motion.header
      aria-label="Primary"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease }}
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm"
    >
      <Link
        href="/"
        aria-label="Kaya Hickin home"
        className="flex h-10 w-fit shrink-0 items-center gap-2 rounded-md px-2 transition hover:bg-neutral-950/[0.055] dark:hover:bg-white/[0.07]"
      >
        <span className="grid h-7 w-7 place-items-center rounded bg-neutral-950 font-serif text-sm leading-none text-white dark:bg-white dark:text-neutral-950">
          KH
        </span>
        <span className="hidden font-serif text-[17px] tracking-tight text-neutral-950 sm:inline dark:text-white">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex items-center gap-0.5 rounded-full border border-black/10 bg-white/45 px-1 py-1 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
        {navItems.map((item) => {
          const active =
            item.href === pathname ||
            (item.href === "/work" && pathname?.startsWith("/work"));
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                active
                  ? "text-neutral-950 dark:text-white"
                  : "text-neutral-700 hover:bg-neutral-950/[0.055] hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/[0.07] dark:hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="topnav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-neutral-950/[0.08] dark:bg-white/[0.10]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <ThemeToggle />
    </motion.header>
  );
}
