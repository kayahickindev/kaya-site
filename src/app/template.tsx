"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

export default function Template({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease }}
    >
      {children}
    </motion.div>
  );
}
