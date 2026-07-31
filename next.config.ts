import type { NextConfig } from "next";
import { redirectRules } from "./app/lib/route-contract";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  images: {
    disableStaticImages: true,
  },
  async redirects() {
    return redirectRules;
  },
};

export default nextConfig;
