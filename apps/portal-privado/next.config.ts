import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Monorepo: permite resolver packages/shared y data/ fuera de este app.
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
};

export default nextConfig;
