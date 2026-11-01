// @vitest-environment node
import { execFileSync } from "node:child_process";
import { expect, test } from "vitest";

function readSettings(overrides: Record<string, string | undefined> = {}) {
  const env = {
    ...process.env,
    E2E_PORT: undefined,
    E2E_DIST_DIR: undefined,
    ...overrides,
  };
  return execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      'import { port, distDir } from "./scripts/e2e-settings.mjs"; console.log(JSON.stringify({ port, distDir }));',
    ],
    { env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
}

test("defaults are stable for this checkout and use the dedicated range", () => {
  const first = readSettings();
  expect(readSettings()).toBe(first);
  const settings = JSON.parse(first);
  expect(settings.distDir).toBe(".next-e2e");
  expect(settings.port).toBeGreaterThanOrEqual(20000);
  expect(settings.port).toBeLessThan(40000);
});

test("explicit port and directory overrides are respected", () => {
  expect(
    JSON.parse(
      readSettings({ E2E_PORT: "32123", E2E_DIST_DIR: ".next-e2e-second" }),
    ),
  ).toEqual({ port: 32123, distDir: ".next-e2e-second" });
});

test("rejects invalid ports", () => {
  for (const value of ["", "0", "65536", "3000.5", "not-a-port"]) {
    expect(() => readSettings({ E2E_PORT: value })).toThrow("E2E_PORT must be");
  }
});

test("rejects build paths that could overwrite source or normal builds", () => {
  for (const value of [".", "..", ".next", "src", "../.next-e2e", "C:/temp"]) {
    expect(() => readSettings({ E2E_DIST_DIR: value })).toThrow(
      "E2E_DIST_DIR must be",
    );
  }
});
