import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://img4.idealista.it/**'),
      new URL('https://si9dados3.com.br/**'),
    ],
  },
};

export default nextConfig;
