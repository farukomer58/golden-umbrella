import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // The isolated E2E source copy shares the checkout's installed dependencies.
    root: process.env.E2E_CHECKOUT_ROOT ?? process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
