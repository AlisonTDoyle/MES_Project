import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/authentication/log-in',
        permanent: true,
      }
    ]
  },
};

process.env.NEXT_DYNAMIC = 'force-dynamic';

export default nextConfig;
