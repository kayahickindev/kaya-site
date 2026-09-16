"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { siteConfig } from "@/data/content";

const email = `${siteConfig.emailParts.user}@${siteConfig.emailParts.domain}`;

export function TopNav({ overlay = false }: { overlay?: boolean }) {
  const { setTheme } = useTheme();
  return (
    <header className={`site-header${overlay ? " on-photo" : ""}`}>
      <Link href="/" className="wordmark">
        Kaya Hickin<span>.</span>
      </Link>
      <div className="header-right">
        <a className="btn btn-small" href={`mailto:${email}`}>
          Email me
        </a>
        <button
          type="button"
          className="theme-toggle"
          aria-label="Toggle color theme"
          onClick={() =>
            setTheme(
              document.documentElement.classList.contains("dark")
                ? "light"
                : "dark",
            )
          }
        >
          <Sun size={18} className="hidden dark:block" aria-hidden />
          <Moon size={18} className="block dark:hidden" aria-hidden />
        </button>
      </div>
    </header>
  );
}
