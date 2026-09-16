"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type RefObject,
} from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function useCountUp(
  end: number,
  duration = 2000,
  format = false,
  decimals = 0
) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as RefObject<Element | null>, { once: true });
  const hasAnimated = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (shouldReduceMotion || duration <= 0) {
      let isCancelled = false;

      queueMicrotask(() => {
        if (!isCancelled) {
          setCount(end);
        }
      });

      return () => {
        isCancelled = true;
      };
    }

    const startTime = performance.now();
    let animationFrame = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration, shouldReduceMotion]);

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
    const animationFrame = window.requestAnimationFrame(handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return scrolled;
}
