"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/content";
import { useScrolled } from "@/lib/hooks";

export function Header() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/75 dark:bg-[#070605]/80 backdrop-blur-xl border-b border-neutral-200/70 dark:border-neutral-800/50"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-neutral-900 dark:text-white flex items-center gap-1"
        >
          Kaya Hickin
          <span className="text-accent-500 dark:text-accent-300">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition-colors duration-200 ${
                  active
                    ? "text-neutral-950 dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-neutral-500 hover:text-accent-500 dark:hover:text-accent-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200"
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="md:hidden p-2 rounded-lg text-neutral-500 hover:text-accent-500 dark:hover:text-accent-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden md:hidden bg-white/95 dark:bg-[#070605]/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800/50"
          >
            <div className="px-6 py-4 space-y-1">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base text-neutral-600 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-300 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
