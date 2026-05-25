# AI-enabled Tax Audit Management Portal Prototype

This repository contains a static, leadership-demo prototype for an AI-assisted tax audit workbench. It demonstrates a synthetic IRS income-itemization IDR journey for American Express Services Corp. while making human review, evidence traceability, and approval controls explicit.

All application data is synthetic. The local `screens/` and `original idr/` folders are design/reference material only and are excluded from source control.

## Technology Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- Typed local mock data only
- Static export output in `out/`

There is no backend, authentication, database, API route, middleware, server action, or runtime external service.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Static Build

```bash
npm run build
```

`next.config.ts` sets `output: "export"`, `trailingSlash: true`, and disables server-dependent image optimization. A successful build writes a portable static site to `out/`.

## GitHub Pages Deployment

For a project site served at `https://<org>.github.io/<repository>/`, build with the repository path:

```bash
NEXT_PUBLIC_BASE_PATH=/fam-proto npm run build
```

Publish the contents of `out/` to GitHub Pages, commonly through a GitHub Actions workflow or a `gh-pages` branch. `NEXT_PUBLIC_BASE_PATH` configures both Next.js `basePath` and `assetPrefix`, so JavaScript, CSS, and in-app links resolve below the project repository path.

For a user/organization Pages repository (`<org>.github.io`) or a custom domain served at `/`, omit `NEXT_PUBLIC_BASE_PATH`:

```bash
npm run build
```

## Migration to an Internal Repository

When moving this prototype into the office/internal repository:

1. Bring across source files and synthetic fixtures, not local reference screenshots or original IDR material.
2. If that repository deploys as a GitHub Pages project site, replace `/fam-proto` with its repository name at build time, for example `NEXT_PUBLIC_BASE_PATH=/internal-audit-portal npm run build`.
3. If the deployment uses a custom domain at its root, build without a base path.
4. Keep the application static: do not introduce confidential data, runtime secrets, backend calls, authentication assumptions, or server-only Next.js features.

## Synthetic Scenario

- Audit: `IRS Income Tax Audit FY2024` (`PA-2025-IRS-104`)
- IDR: `Income Itemization Details` (`IDR-2025-018`)
- Issuer: Internal Revenue Service
- Entity: American Express Services Corp.
- Period: Jan 01 2024 to Jan 31 2025
- Due date: Jul 01 2026

## Human-in-the-loop Principles

The prototype will show AI extracting context, proposing strategies and tasks, and assembling a response draft. A human reviews the parent audit request, document request, strategy, tasks, evidence selection, and final response before the package reaches `Ready for Submission`.

## Demo Journey

The navigable workflow screens are delivered incrementally and tracked in [PROGRESS.md](./PROGRESS.md). Planned journey:

`Home` -> `AI IDR Intake` -> `Parent Audit Review` -> `Document Request Review` -> `Response Strategy` -> `Task Strategy` -> `Audit Detail` -> `Document Request Detail` -> `Task Detail` -> `Final Response Builder` -> `Final Response Review` -> `Audit Tracker`

