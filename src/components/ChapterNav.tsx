"use client";
import { useEffect, useState } from "react";

export type Chapter = { label: string; href: string };

// Floating pill navigation. On the home page it follows the visible chapter
// and stays hidden until the hero has scrolled past; without JavaScript it is
// simply always visible.
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
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
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
