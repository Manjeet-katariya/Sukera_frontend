import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Set the root to the parent directory (where the main package-lock.json is)
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;