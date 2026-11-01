import { defineConfig, devices } from "@playwright/test";
import { baseURL, port } from "./scripts/e2e-settings.mjs";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "node scripts/e2e-server.mjs",
    url: baseURL,
    env: { E2E_PORT: String(port) },
    reuseExistingServer: false,
    timeout: 180000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
