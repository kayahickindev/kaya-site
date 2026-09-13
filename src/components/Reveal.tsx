"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Adds `.in` once the block scrolls into view. The CSS only hides the
// pre-reveal state when scripting is enabled, so content is never missing.
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}${on ? " in" : ""}`.trim()}>
      {children}
    </div>
  );
}
