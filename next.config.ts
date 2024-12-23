import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/cv-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cv-app' : '',
};

export default nextConfig;