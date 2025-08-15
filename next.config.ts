import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://img4.idealista.it/**')],
  },
};

export default nextConfig;
