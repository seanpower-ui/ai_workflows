import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jllt/alize-ui"],
  devIndicators: false,
};

export default nextConfig;
