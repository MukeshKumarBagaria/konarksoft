import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statically typed links: a typo in any `href` fails the build instead of shipping a dead link.
  typedRoutes: true,
};

export default nextConfig;
