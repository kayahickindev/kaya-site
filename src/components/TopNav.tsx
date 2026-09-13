"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
const items = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Stack", href: "/stack" },
  { label: "Credentials", href: "/proof" },
  { label: "Contact", href: "/contact" },
];
export function TopNav() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  return (
    <header className="site-nav">
      <Link href="/" aria-label="Kaya Hickin home" className="wordmark">
        kh<span>.</span>
      </Link>
      <nav aria-label="Primary navigation">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={
              pathname === item.href ||
              (item.href === "/work" && pathname.startsWith("/work/"))
                ? "page"
                : undefined
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
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
        <Sun size={18} className="hidden dark:block" />
        <Moon size={18} className="block dark:hidden" />
      </button>
    </header>
  );
}
