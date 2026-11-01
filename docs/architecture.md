# Architecture

## Purpose and scope

This document records the application's technical decisions and module boundaries. Product behavior belongs in `product.md`; agent workflow belongs in `../AGENTS.md`; visual rules belong in `../DESIGN.md`; detailed tests and locale rules belong in `testing.md` and `i18n.md`.

The defaults below target a small, multilingual, SEO-friendly Next.js website. Revisit them if the product requires authentication, personalized server responses, runtime database access, or other server-dependent features.

## Technology decisions

| Concern | Default | Notes |
| --- | --- | --- |
| Framework | Next.js App Router | Use the installed stable version and its documentation. |
| Language | TypeScript, strict | Runtime validation remains necessary at trust boundaries. |
| Package manager | npm | Commit `package-lock.json`; use `npm ci` in CI. |
| Styling | Tailwind CSS | Follow the installed version and `DESIGN.md`. |
| UI | Small reusable components | Add a library only when it solves a demonstrated need. |
| Rendering | Static export | Project choice, not a universal Next.js rule. |
| i18n | Locale-prefixed routes and dictionaries | See `i18n.md`. |
| Client state | React state; Zustand when needed | URL is the source of truth for route/locale state. |
| Forms | Native forms first; Zod/React Hook Form when useful | Add only for real complexity. |
| Quality | Biome, TypeScript, Vitest, Playwright | See `testing.md`; tools must be installed/configured. |

## Rendering and deployment

For this project, use `output: 'export'` in `next.config.ts`. A production build emits static assets in `out/`, deployable to a static host with appropriate routing, cache, and fallback configuration.

- Prefer Server Components for content that can render at build time. They do **not** imply a production Node.js server.
- Use Client Components for event handlers, browser APIs, and interactive state. Keep client boundaries narrow.
- Generate all dynamic route parameters at build time with `generateStaticParams()`.
- Do not rely on request-time rendering, Server Actions, Proxy/middleware, request-dependent cookies/headers, or runtime server sessions.
- Do not assume all Route Handlers are prohibited: only build-time-compatible handlers can be exported; do not use them for runtime APIs.
- Browser calls to an external API are possible, but require deliberate API hosting, CORS, security, and failure handling.
- Static hosting cannot protect server secrets or execute trusted business logic. Use an external backend or change the deployment model when needed.
- For `next/image`, configure `unoptimized: true` or a supported image strategy compatible with static hosting.
- Check hosting behavior for trailing slashes, direct navigation, 404 pages, and cache headers.

## Folder structure

This is an illustrative structure, not a requirement to create every directory upfront:

```text
my-site/
├── public/
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── about/page.tsx
│   │   ├── globals.css
│   │   └── page.tsx                 # Optional root landing/redirect strategy
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── features/                   # Only when features warrant boundaries
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── dictionaries/
│   │   │   ├── tr.json
│   │   │   ├── nl.json
│   │   │   └── en.json
│   │   └── get-dictionary.ts
│   ├── lib/
│   ├── stores/                     # Only when shared client state exists
│   └── types/                      # Only for genuinely shared types
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── product.md
│   ├── architecture.md
│   ├── testing.md
│   └── i18n.md
├── AGENTS.md
├── DESIGN.md
├── next.config.ts
├── biome.json
├── package.json
└── tsconfig.json
```

The root layout must be placed where the selected routing approach requires it. With a root `src/app/page.tsx` and a `[lang]/layout.tsx`, verify that a valid root layout exists for the root route; alternatively use separate root layouts with route groups where supported. Do not copy the example tree without verifying this requirement against the installed Next.js version.

## Ownership and placement

| Location | Responsibility | Avoid |
| --- | --- | --- |
| `app/` | Routes, layouts, route metadata, loading/error boundaries | Large shared business logic |
| `components/ui/` | Generic buttons, inputs, dialogs, etc. | Domain-specific dependencies |
| `components/layout/` | Header, footer, navigation, shell | Unrelated feature logic |
| `features/<feature>/` | Cohesive domain UI and logic when complexity justifies it | Creating a feature folder for every tiny component |
| `i18n/` | Locale config, dictionaries, translation helpers | Independent duplicated locale state |
| `lib/` | Small cross-cutting utilities and integrations | Catch-all files or speculative frameworks |
| `stores/` | Necessary shared client stores | Mirroring URL or build-time content |
| `types/` | Types used across boundaries | Moving local types away from their owners |
| `tests/` | Unit, integration, and browser tests | Colocated source tests if project policy forbids them |

Keep code near its primary consumer. Extract shared modules only after reuse or a clear separation-of-concerns need emerges. Do not force every feature into hooks/services/repositories.

## Data and state flow

1. **Static content:** render from local data, typed dictionaries, or build-time sources in Server Components.
2. **Route and locale:** derive from the URL, not a parallel Zustand store.
3. **Local interaction:** use React state.
4. **Shared browser state:** use small Zustand stores with selectors; persist only appropriate preferences.
5. **Remote data:** introduce a clearly defined API client only when an external backend is required; handle loading, errors, and validation.

Browser storage and persisted Zustand values are unavailable during build-time rendering. Prevent hydration mismatches by using stable initial output and reading persisted preferences after hydration where appropriate.

## Localization

Use Turkish (`tr`) as the primary language and Dutch (`nl`) and English (`en`) as supported locales. Generate locale-prefixed pages at build time. The active URL locale determines the rendered language; a manual language switcher navigates to the equivalent localized page. Follow `i18n.md` for dictionary typing, missing keys, metadata, and root-route behavior.

## SEO, accessibility, and performance

- Use page-specific Next.js metadata, canonical URLs, and locale alternates.
- Generate sitemap and robots resources compatible with static export.
- Use semantic HTML, descriptive headings, accessible controls, and mobile-first layouts.
- Optimize images, fonts, and bundle size; avoid unnecessary client components and layout shifts.
- See `DESIGN.md` for accessibility and responsive implementation; use `seo.md` if the project needs detailed SEO policy.

## Testing and delivery

Use `npm run qa` as the canonical quality gate. Its actual script and CI configuration must agree; do not assume scripts exist because they are documented. Testing conventions and determinism requirements belong in `testing.md`.

## Architecture decision policy

Record consequential decisions here or in a short decision record when they affect deployment, routing, data ownership, security, or long-term maintenance. Each decision should state **context**, **decision**, **reason**, **tradeoffs**, and **when to revisit**. Avoid documenting trivial implementation choices.

## Explicit non-goals for the initial static website

Unless product requirements change, do not add a database, CMS, authentication provider, microservices, generic repository layers, Kubernetes, or a runtime backend. Static export is a constraint, not a promise that these features can be implemented without infrastructure.
