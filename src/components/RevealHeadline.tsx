"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const wordVariants: Variants = {
  hidden: { y: "100%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.1 + i * 0.08 },
  }),
};

export function RevealHeadline({ words, className }: { words: string[]; className?: string }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <h1 className={className}>{words.join(" ")}</h1>;
  }

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="reveal-mask">
          <motion.span
            custom={index}
            initial="hidden"
            animate="show"
            variants={wordVariants}
            className="inline-block"
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
