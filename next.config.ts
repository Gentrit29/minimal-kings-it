import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "shscxhdhumwyvmjqvcfa.supabase.co" },
    ],
  },
};

export default nextConfig;
