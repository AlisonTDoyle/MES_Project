import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone'
};

process.env.NEXT_DYNAMIC = 'force-dynamic';

export default nextConfig;
