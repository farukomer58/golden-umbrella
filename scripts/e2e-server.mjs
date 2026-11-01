import { spawn } from "node:child_process";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { cp, lstat, mkdir, rm } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import sirv from "sirv";
import { baseURL, buildDirectory, checkout, port } from "./e2e-settings.mjs";

let ready = false;
const serve = sirv(path.join(buildDirectory, "out"), { dev: true });
const server = createServer((request, response) => {
  if (!ready) {
    response.writeHead(503).end("E2E build in progress");
    return;
  }
  serve(request, response, () => response.writeHead(404).end("Not found"));
});

// Reserve the port before building; never silently select a different port.
server.on("error", (error) => {
  console.error(
    `Cannot start E2E server on ${baseURL}. Set a free E2E_PORT.`,
    error,
  );
  process.exit(1);
});
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
console.log(`E2E: ${baseURL}, isolated build: ${buildDirectory}`);

try {
  // Reject a symlink/junction before cleaning this reserved, validated directory.
  const existing = await lstat(buildDirectory).catch((error) => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
  if (existing?.isSymbolicLink())
    throw new Error("E2E_DIST_DIR cannot be a symlink.");
  await mkdir(buildDirectory, { recursive: true });
  const lock = path.join(buildDirectory, ".lock");
  try {
    writeFileSync(lock, String(process.pid), { flag: "wx" });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    const owner = Number(readFileSync(lock, "utf8"));
    if (!Number.isInteger(owner) || owner <= 0)
      throw new Error("Invalid E2E lock; inspect .lock before removing it.");
    try {
      process.kill(owner, 0);
      throw new Error(
        "E2E build directory is in use. Choose a different E2E_DIST_DIR.",
      );
    } catch (ownerError) {
      if (ownerError.code !== "ESRCH") throw ownerError;
    }
    // Windows Playwright uses forced termination; reclaim a dead process's lock.
    unlinkSync(lock);
    writeFileSync(lock, String(process.pid), { flag: "wx" });
  }
  process.on("exit", () => unlinkSync(lock));
  process.on("SIGTERM", () => process.exit(143));
  process.on("SIGINT", () => process.exit(130));
  for (const entry of [
    "src",
    "public",
    "next.config.ts",
    "tsconfig.json",
    "package.json",
  ]) {
    // Refresh inputs, retaining only Next build cache for subsequent runs.
    await rm(path.join(buildDirectory, entry), {
      recursive: true,
      force: true,
    });
    await cp(path.join(checkout, entry), path.join(buildDirectory, entry), {
      recursive: true,
    });
  }
  // No .env files are copied. This static app has no database or credentials.
  // The explicit E2E URL is the only database value a future E2E build may inherit.
  const env = { ...process.env, E2E_CHECKOUT_ROOT: checkout };
  delete env.DATABASE_URL;
  if (env.E2E_DATABASE_URL) env.DATABASE_URL = env.E2E_DATABASE_URL;
  const child = spawn(
    process.execPath,
    [path.join(checkout, "node_modules/next/dist/bin/next"), "build"],
    { cwd: buildDirectory, env, stdio: "inherit" },
  );
  const code = await new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", resolve);
  });
  if (code !== 0)
    throw new Error(`E2E production build failed (exit ${code}).`);
  ready = true;
} catch (error) {
  console.error(error);
  server.close();
  process.exitCode = 1;
}
