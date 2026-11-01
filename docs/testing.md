# Testing and QA

## Setup and commands

Use Node from `.node-version` (24.21.0) and npm with the committed lockfile.
Run commands from the repository root. On Windows, use Git Bash with Node on
PATH; WSL requires its own Linux Node installation and dependencies.

```bash
npm ci
npx playwright install --with-deps chromium
npm run qa
```

| Command | Purpose |
| --- | --- |
| `npm run lint` | Biome formatting, import organization and lint; warnings fail |
| `npm run typecheck` | Generate current Next route types, then check TypeScript |
| `npm run build` | Production static export to `out/` |
| `npm test` | Vitest unit and integration tests, once without watch mode |
| `npm run test:e2e` | Chromium tests against an isolated production export |
| `npm run qa` | Canonical full quality gate |
| `npm run qa -- --no-e2e` | Iteration only; prints `playwright: SKIP` |

The gate runs lint, typecheck, build, Vitest and Playwright in that order. It
continues after failures, prints each PASS/FAIL status and a final summary, and
returns 1 if any section fails. A skipped browser run does not satisfy task
completion. `qa-results/*.log` contains each section's output. Shell scripts are
Bash, with LF enforced by `.gitattributes`.

There is one package and no npm workspaces. Typecheck covers application code,
tests and TypeScript configurations. If workspaces are introduced, extend the
root typecheck command to check every relevant package.

## Structure and strategy

- `tests/unit/`: synchronous component rendering and focused behavior.
- `tests/integration/`: components with real dictionaries and navigation links.
- `tests/e2e/`: actual exported pages, navigation, language attributes and 404s.
- `tests/setup.ts`: jest-dom matchers and cleanup after every DOM test.
- `scripts/e2e-settings.mjs`: shared port and directory validation.
- `scripts/e2e-server.mjs`: isolated build and loopback-only static server.

Prefer role-based queries and observable behavior. Keep tests deterministic and
avoid snapshots of implementation details. Do not weaken assertions, suppress
lint/type errors, skip tests or introduce type escapes merely to pass QA.
Future implementation tasks must run the full gate before completion.

The starter site has a Turkish root landing page and home/About pages for
Turkish, Dutch and English. Content is explicitly marked as a draft; it contains
no invented events, donation details or contact claims. Extend these pages and
their tests as approved content becomes available.

## E2E isolation and environment

| Variable | Behavior |
| --- | --- |
| `E2E_PORT` | Optional integer 1024–65535; default 20000–39999 derived from SHA-256 of the real absolute checkout path |
| `E2E_DIST_DIR` | Default `.next-e2e`; overrides must use `.next-e2e-<suffix>` |
| `E2E_DATABASE_URL` | Reserved for a dedicated disposable E2E database if a database is added |
| `CI` | Forbids focused Playwright tests and limits browser workers |
| `PLAYWRIGHT_BROWSERS_PATH` | Optional standard Playwright browser-install location |
| `NEXT_TELEMETRY_DISABLED` | Set to 1 in CI |

Example: `E2E_PORT=32123 E2E_DIST_DIR=.next-e2e-local npm run test:e2e`.

Playwright always uses `reuseExistingServer: false`. An occupied port fails;
choose a free override instead of reusing any normal development server.
Hash collisions are possible, so port availability is checked by binding the
server before the build. Parallel runs of one checkout require different ports
and directories. A PID lock prevents overlapping builds. Locks belonging to dead processes are
reclaimed automatically, including after forced Windows termination. Inspect a
malformed `.lock` before manually removing it.
Source inputs are refreshed on each run; Next build cache is retained.

This version of Next.js uses a custom `distDir` as the **export destination**
when `output: "export"`; build intermediates still use `.next`. Therefore E2E
copies only `src/`, `public/`, `next.config.ts`, `tsconfig.json` and
`package.json` into its dedicated directory. Next builds there and the server
serves that directory's `out/`. Dependencies are shared via the checkout's
Turbopack root. If new build inputs are added, add them to the copy list.

Neither tracked config nor the original `next-env.d.ts`, `.next/` or `out/`
is modified by E2E. Generated config changes stay inside the disposable copy.
No `.env*` files are copied. No credentials or dummy secrets are currently
needed: this static application has no database or runtime backend.
The E2E child removes inherited `DATABASE_URL` and uses only an explicit
`E2E_DATABASE_URL` if supplied. Before adding database-backed features, require
and validate a dedicated E2E database, refuse development/production URLs,
and implement fixture creation and cleanup against that database only.

## Next.js gotchas

- Consult installed guides under `node_modules/next/dist/docs/01-app/02-guides/testing/`.
- Vitest supports synchronous Server Components and Client Components; it does
  not support async Server Components. Test async locale layouts/pages in
  Playwright. Do not turn them into client components just to test them.
- jsdom does not implement the Next router or browser navigation. Tests inspect
  real Next Link output; Playwright verifies actual navigation.
- Vitest does not run the Next compiler, so its test environment explicitly
  matches `trailingSlash: true` for Next Link. Keep that setting synchronized.
- Vite resolves the existing TypeScript alias natively; no alias plugin is needed.
- `next typegen` generates current production route types before `tsc`.
  Typecheck excludes stale `.next/dev` output from copied checkouts; application
  sources and current `.next/types` remain checked.
- Static export cannot use `next start`. E2E serves real exported HTML using
  Sirv and does not provide an SPA fallback that could hide missing routes.
- Locale layouts await `params` and generate all supported locale paths.
- Starter pages use system font fallbacks, so builds do not fetch Google fonts.

## CI and debugging

`.github/workflows/qa.yml` runs on every push and pull request. It uses SHA-pinned
actions, the Node version file, npm download caching, `npm ci`, and
`npx playwright install --with-deps chromium`. It runs exactly
`bash scripts/qa.sh`; there is no deployment or credential dependency.

On failure, download `qa-failure-logs` from the Actions run. It contains section
logs plus Playwright HTML reports, traces and screenshots when produced.
Locally, use `npx playwright show-report` or
`npx playwright show-trace <trace.zip>`. Retries are disabled so failures remain
visible. Build, coverage, browser report, test-result and QA artifacts are ignored.

## Verifying the gate itself

Temporarily add an unused variable and a mismatched typed assignment in a
`src/**/*.tsx` file, then run full QA. Verify lint and typecheck diagnostics,
continued execution of later sections, and a nonzero exit. Restore only the
temporary edits and run full QA again; all five sections must pass with exit 0.
Do not commit the deliberate errors.

If Bash, browsers or other tools are blocked by the execution environment,
report the exact failure and distinguish individual checks from an unverified
full gate. Do not claim CI success without observing the corresponding run.
