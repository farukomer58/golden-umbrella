# Golden Umbrella

A multilingual foundation website built with Next.js 16, React 19, TypeScript
and Tailwind CSS. It exports static HTML; no database or runtime backend is
required.

Use Node from `.node-version`, then:

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The root page is Turkish; localized
home and About pages live under `/tr/`, `/nl/` and `/en/`. Content is an initial
draft, pending organizational approval.

```bash
npx playwright install --with-deps chromium
npm run qa
```

See [testing and QA](docs/testing.md) for commands, isolation, CI and limitations.
Read [AGENTS.md](AGENTS.md) and the linked project documentation before changes.
`npm run build` creates the static site in `out/`; serve that folder with a
static host instead of `next start`.
