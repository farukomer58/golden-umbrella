# Agent Instructions

This file defines how coding agents work in this repository. Project-specific requirements live in `docs/`; do not duplicate them here.

## Framework documentation

> **Next.js version notice (maintained by Next.js tooling):** This version may differ from your training data. Before changing Next.js APIs or conventions, consult the relevant installed documentation under `node_modules/next/dist/docs/` when available. Follow installed-version guidance and deprecation notices. Preserve any Next.js-generated agent instructions rather than silently deleting them.

## Read before changing code

- `docs/product.md` — product goals, pages, requirements, and scope.
- `docs/architecture.md` — stack, rendering model, module boundaries, and folder conventions.
- `DESIGN.md` — design tokens, responsive UI, interaction, and accessibility.
- `docs/testing.md` — testing strategy, test layout, and quality gates.
- `docs/i18n.md` — locales, translation rules, and localized routes.
- `docs/seo.md` — SEO and performance conventions, if present.
- Read only the documents relevant to the task, plus this file. Inspect nearby code and existing patterns before implementing.

## Workflow

1. Identify the requested behavior and the smallest coherent change.
2. Check the installed framework version and relevant local documentation before using unfamiliar APIs.
3. Follow established patterns; prefer existing components and dependencies.
4. Do not introduce dependencies, frameworks, or abstractions without a concrete benefit. Explain consequential tradeoffs.
5. Keep unrelated files and behavior unchanged. Do not perform opportunistic refactors.
6. Update meaningful tests and documentation alongside changed behavior.
7. Run the relevant checks and report what actually passed or could not run.

## Architecture and security

- Follow `docs/architecture.md`; do not invent generic enterprise layers or empty folders.
- Keep route-specific code near its route and shared UI separate from domain-specific features.
- Prefer static/server-rendered content and use Client Components only where interaction requires them.
- Use local React state for local interactions; use Zustand only for genuinely shared client state.
- Keep secrets, credentials, and server-only code out of client bundles. Never commit secrets.
- Validate untrusted inputs at the appropriate boundary; do not assume TypeScript provides runtime validation.
- Avoid circular dependencies, unnecessary cross-feature imports, and premature abstractions.
- Respect the project's configured rendering and hosting mode. Do not add runtime server dependencies to a static-export project.

## Code and UI quality

- Use strict TypeScript and the repository's configured Biome formatter and linter.
- Do not hand-format against the formatter or introduce blanket suppressions.
- Prefer descriptive names, cohesive modules, and straightforward code over cleverness.
- Follow `DESIGN.md` and the installed Tailwind version for all UI work.
- Build mobile-first, accessible, keyboard-operable interfaces with semantic HTML.
- Use existing components and design tokens before creating new variants.
- Do not introduce another styling framework without explicit approval.

## Tests and quality gate

- Keep automated tests under the root `tests/` directory, organized as documented in `docs/testing.md`.
- Test observable behavior at the lowest effective level; add regression coverage for meaningful behavior changes.
- Do not weaken, skip, delete, or rewrite tests merely to conceal a defect.
- Make tests deterministic: control time, randomness, external network dependencies, and shared state where relevant.
- Run `npm run qa` before declaring implementation complete. This is the canonical quality gate and should match CI.
- Use `npm run qa:fast` only if that script exists, for iteration; it does not replace the full gate.
- Fix underlying problems rather than adding type escapes, lint ignores, or skipped tests solely to pass checks.
- If a check cannot run, state exactly which check and why; never claim it passed.

## Dependencies and environment

- Use the Node version specified by the repository (for example `.node-version`) and the committed npm lockfile.
- Use `npm ci` for reproducible installs in CI and clean environments.
- Respect the project's dependency version policy; do not make unrelated upgrades.
- Never add unpinned container images or external actions where the project requires immutable versions.

## Git safety

- Do not commit, push, rewrite history, change remotes, or deploy unless explicitly asked.
- Keep requested commits focused, with imperative messages.
- Do not commit generated build output, logs, test reports, or credentials.
- Do not discard the user's uncommitted changes.

## Definition of done

- The requested behavior works and unrelated behavior is preserved.
- Appropriate tests and documentation are updated.
- `npm run qa` passed, or blockers and unrun checks are explicitly reported.
- No secrets, accidental generated artifacts, or unrelated changes are included.
- Report changed files, notable decisions, verification results, and remaining limitations concisely.
- Never claim a build, test, commit, push, or deployment succeeded without observing success.

## Keep instructions current

When a change invalidates these instructions or a referenced document, update the relevant source of truth in the same change. Prefer concise rules and links over duplicating prose.
