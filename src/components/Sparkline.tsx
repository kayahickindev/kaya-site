"use client";

import { motion } from "framer-motion";

type Props = {
  points: number[];
  accent: string;
  animate?: boolean;
  width?: number;
  height?: number;
  strokeWidth?: number;
};

export function Sparkline({
  points,
  accent,
  animate = true,
  width = 80,
  height = 22,
  strokeWidth = 1.5,
}: Props) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const lastX = (points.length - 1) * step;
  const lastY = height - ((points[points.length - 1] - min) / range) * height;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      <motion.path
        d={path}
        fill="none"
        stroke={accent}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
      <motion.circle
        cx={lastX}
        cy={lastY}
        r={Math.max(1.5, strokeWidth + 0.5)}
        fill={accent}
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.3 }}
      />
    </svg>
  );
}
