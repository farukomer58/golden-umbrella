// This script is used to set the E2E port and dist directory.
import { createHash } from "node:crypto";
import { realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const checkout = realpathSync(
  fileURLToPath(new URL("../", import.meta.url)),
);
const hash = createHash("sha256").update(checkout).digest().readUInt32BE(0);
export const port = Number(process.env.E2E_PORT ?? 20000 + (hash % 20000));
if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error("E2E_PORT must be an integer between 1024 and 65535.");
}
export const distDir = process.env.E2E_DIST_DIR ?? ".next-e2e";
// Reserve a dedicated top-level namespace: never overwrite source or normal builds.
if (!/^\.next-e2e(?:-[a-zA-Z0-9_-]+)?$/.test(distDir)) {
  throw new Error("E2E_DIST_DIR must be .next-e2e or .next-e2e-<suffix>.");
}
export const buildDirectory = path.join(checkout, distDir);
export const baseURL = `http://127.0.0.1:${port}`;
