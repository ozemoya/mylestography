import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the local preview separate from the build artifacts tracked by this repository.
  distDir: process.env.NODE_ENV === "development" ? ".next-local" : ".next",
};

export default nextConfig;
