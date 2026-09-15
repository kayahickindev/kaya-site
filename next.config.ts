import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    qualities: [75, 85],
    formats: ["image/webp"],
  },
};

export default nextConfig;
