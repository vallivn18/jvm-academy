/**
 * @file next.config.ts
 * @description Next.js configuration for JVM Academy.
 *
 * `images.remotePatterns` whitelists external domains that next/image
 * is allowed to optimise. We've added PlanetSpark's CDN because the
 * seed gallery photos are hosted there (real photos of JVM Academy).
 *
 * If you later host your own photos in /public, you don't need this —
 * local images are always allowed.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn5.planetspark.in",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
