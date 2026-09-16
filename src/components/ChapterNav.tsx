"use client";
import { useEffect, useState } from "react";

export type Chapter = { label: string; href: string };

/** How long the pill waits before it arrives in the hero. Long enough that the
 *  name, the line, the numbers and the button have all landed first. */
const SETTLE_MS = 2200;

// Floating pill navigation. On the home page it follows the visible chapter and
// arrives once the hero's own intro has settled, so a visitor has navigation
// from the first screen rather than after scrolling past it; without JavaScript
// it is simply always visible.
export function ChapterNav({
  items,
  spy = false,
  current,
}: {
  items: Chapter[];
  spy?: boolean;
  current?: string;
}) {
  const [active, setActive] = useState(current ?? "");
  const [shown, setShown] = useState(!spy);
  useEffect(() => {
    if (!spy) return;
    const sections = items
      .map((i) => document.getElementById(i.href.replace("#", "")))
      .filter((s): s is HTMLElement => Boolean(s));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    // A deep link lands past the hero with no intro to wait for.
    const late = window.scrollY > window.innerHeight * 0.55;
    const settle = window.setTimeout(() => setShown(true), late ? 0 : SETTLE_MS);
    return () => {
      io.disconnect();
      window.clearTimeout(settle);
    };
  }, [items, spy]);
  return (
    <nav className={`chapters${shown ? " is-shown" : ""}`} aria-label="Sections">
      <ul>
        {items.map((i) => (
          <li key={i.href}>
            <a
              href={i.href}
              aria-current={active === i.href ? (spy ? "location" : "page") : undefined}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
