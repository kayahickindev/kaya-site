"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { useMemo, useRef, type ReactNode } from "react";

type CubicBezier = [number, number, number, number];
export type FadeDirection = "up" | "down" | "left" | "right" | "none";

export const motionTokens = {
  distance: {
    fade: 30,
    stagger: 20,
  },
  duration: {
    fade: 0.6,
    staggerChild: 0.5,
    reduced: 0,
  },
  ease: {
    standard: [0.21, 0.47, 0.32, 0.98] as CubicBezier,
  },
  viewport: {
    margin: "-80px",
  },
} as const;

const fadeOffsets: Record<FadeDirection, { x?: number; y?: number }> = {
  up: { y: motionTokens.distance.fade },
  down: { y: -motionTokens.distance.fade },
  left: { x: motionTokens.distance.fade },
  right: { x: -motionTokens.distance.fade },
  none: {},
};

function getMotionTransition(
  duration: number,
  delay: number,
  shouldReduceMotion: boolean
): Transition {
  if (shouldReduceMotion) {
    return {
      duration: motionTokens.duration.reduced,
      delay: 0,
    };
  }

  return {
    duration,
    delay,
    ease: motionTokens.ease.standard,
  };
}

export function fadeInVariants(
  direction: FadeDirection = "up",
  shouldReduceMotion = false
): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }

  return {
    hidden: { opacity: 0, ...fadeOffsets[direction] },
    visible: { opacity: 1, x: 0, y: 0 },
  };
}

export interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: FadeDirection;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = motionTokens.duration.fade,
  className,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: motionTokens.viewport.margin,
  });
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);
  const variants = useMemo(
    () => fadeInVariants(direction, reducedMotion),
    [direction, reducedMotion]
  );

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? "visible" : "hidden"}
      animate={reducedMotion || isInView ? "visible" : "hidden"}
      variants={variants}
      transition={getMotionTransition(duration, delay, reducedMotion)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function staggerContainer(staggerDelay = 0.1): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: motionTokens.viewport.margin,
  });
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);
  const variants = useMemo(
    () => staggerContainer(reducedMotion ? 0 : staggerDelay),
    [reducedMotion, staggerDelay]
  );

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? "visible" : "hidden"}
      animate={reducedMotion || isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: motionTokens.distance.stagger },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.staggerChild,
      ease: motionTokens.ease.standard,
    },
  },
};
