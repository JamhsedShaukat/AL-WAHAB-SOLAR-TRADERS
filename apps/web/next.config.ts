import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@wahab/ui",
    "@wahab/types",
    "@wahab/utils",
    "@wahab/config",
  ],
};

export default nextConfig;
