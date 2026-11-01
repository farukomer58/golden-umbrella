import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    // Next Link normally receives this from the Next.js compiler.
    env: { __NEXT_TRAILING_SLASH: "true" },
    include: ["tests/{unit,integration}/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
    clearMocks: true,
    allowOnly: !process.env.CI,
  },
});
