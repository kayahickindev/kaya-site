import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/proof", destination: "/credentials", permanent: true }];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
