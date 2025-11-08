import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
};

export default nextConfig;
