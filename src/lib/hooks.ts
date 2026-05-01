"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";

export function useCountUp(
  end: number,
  duration = 2000,
  format = false,
  decimals = 0
) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  let formatted: string;
  if (decimals > 0) {
    formatted = count.toFixed(decimals);
  } else {
    const rounded = Math.floor(count);
    formatted = format ? rounded.toLocaleString() : rounded.toString();
  }

  return { count: formatted, ref };
}

export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scrolled;
}
