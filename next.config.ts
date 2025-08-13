import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://pwm.im-cdn.it/**')],
  },
};

export default nextConfig;
