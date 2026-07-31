import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, "../../"),
  },
  transpilePackages: ["@wahab/ui", "@wahab/types", "@wahab/utils", "@wahab/config"],
};

export default nextConfig;
