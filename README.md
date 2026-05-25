# AI-enabled Tax Audit Management Portal Prototype

This repository contains a static, leadership-demo prototype for an AI-assisted tax audit workbench. It demonstrates a synthetic IRS income-itemization IDR journey for American Express Services Corp. while making human review, evidence traceability, and approval controls explicit.

All application data is synthetic. The local `screens/` and `original idr/` folders are design/reference material only and are excluded from source control.

The interactive prototype supports local document selection and preview, editable extracted fields, reviewer confirmation modals, editable task assignment, notes, supporting-document selection, task response submission/closure, response packaging, and DR Reviewer approval. The final response builder is unlocked only after all child tasks are reviewed and closed. Files selected in the browser remain local; the static prototype does not transmit or extract confidential source content.

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

This prototype includes `.github/workflows/deploy-pages.yml`. On a push to `main`, it builds with `NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }}` and publishes `out/` through GitHub Pages Actions. In GitHub repository settings, choose **GitHub Actions** as the Pages source before running it.

For a user/organization Pages repository (`<org>.github.io`) or a custom domain served at `/`, omit `NEXT_PUBLIC_BASE_PATH`:

```bash
npm run build
```

For that root-hosted case, remove the `NEXT_PUBLIC_BASE_PATH` environment value from the included Pages workflow.

## Migration to an Internal Repository

When moving this prototype into the office/internal repository:

1. Bring across source files and synthetic fixtures, not local reference screenshots or original IDR material.
2. If that repository deploys as a GitHub Pages project site, replace `/fam-proto` with its repository name at build time, for example `NEXT_PUBLIC_BASE_PATH=/internal-audit-portal npm run build`.
3. If the deployment uses a custom domain at its root, build without a base path.
4. Keep the application static: do not introduce confidential data, runtime secrets, backend calls, authentication assumptions, or server-only Next.js features.
5. Update the included Pages workflow if the internal site is root-hosted behind a custom domain; project-site repositories need no hard-coded repo-name change because the workflow reads the target repository name.

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

The core navigable workflow is tracked in [PROGRESS.md](./PROGRESS.md). Routes:

| Screen | Route |
| --- | --- |
| Home / landing | `/` |
| AI IDR intake | `/intake/` |
| Parent audit request review | `/review/audit/` |
| Document request review | `/review/document-request/` |
| Response strategy review | `/response-strategy/` |
| Task strategy review | `/task-strategy/` |
| Audit request dashboard | `/audits/PA-2025-IRS-104/` |
| Document request / task list | `/document-requests/IDR-2025-018/` |
| Manual collaboration task example | `/tasks/TA-201/` |
| Final response builder | `/final-response/` |
| Final response package review | `/final-response/review/` |
| Audit tracker overview | `/tracker/` |

The final screen demonstrates reviewer approval changing a draft package to `Ready for Submission`; it never submits data externally.

## Static-hosting Safety

- Route content is prerendered during `npm run build` and emitted under `out/`.
- Navigation uses static App Router links and trailing-slash paths suitable for GitHub Pages directories.
- Mock data is bundled locally; there are no requests to business systems or external APIs.
- The copilot interactions are deterministic UI demonstrations, not live AI calls.
- No API routes, server actions, middleware, SSR, authentication, database, secret, or server runtime is required.
