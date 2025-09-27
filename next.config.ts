import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.cache = {
      type: "filesystem",
    };
    return config;
  },
};

export default nextConfig;

