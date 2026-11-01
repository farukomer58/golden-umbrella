import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: { // this configures the turbopack for the generated static site
    rules: { // this configures the rules for the turbopack for the generated static site
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  output: "export", // this configures the output to be exported for the generated static site
  trailingSlash: true, // this configures the trailing slash for the generated static site
  images: {
    unoptimized: true, // this configures the images to be unoptimized for the generated static site
  },
};

export default nextConfig;
