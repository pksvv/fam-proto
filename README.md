Research Assignment: Ariba and Vertex — American Express Executive Briefing

1. Objective and audience

Act as a senior enterprise technology researcher, architecture analyst, procurement transformation advisor, and executive presentation specialist.

Prepare a fact-based executive briefing for Brian K. Zerr, senior American Express leader responsible for Global Supplier Management (GSM).

Brian has extensive experience in credit risk, operational risk, governance, technology transformation, and enterprise controls. Assume he understands business risk, auditability, operational resilience, and financial discipline, but does not need implementation-level technical details.

The central question:

What are SAP Ariba and Vertex O Series doing for American Express today, how do they interact with our systems, and why should we prioritize replacement of the unsupported Ariba ITK integration while potentially deferring the Vertex Cloud migration?

The presentation must be concise, objective, visually restrained, and decision-oriented.

2. Research sources and search strategy

Search accessible internal Microsoft 365 content, including OneDrive, SharePoint, PowerPoint decks, Word documents, PDFs, Excel files, and relevant Teams or Outlook records where available and permitted.

Find the latest relevant materials using searches such as:

Ariba

* SAP Ariba, Ariba ITK, Integration Toolkit
* Ariba Oracle integration, Ariba EBS
* Ariba B2B integration, SAP Business Network
* Ariba integration modernization, Ariba upgrade
* Ariba API, SAP Integration Suite, CIG, managed gateway
* Supplier Management, P2P, procurement integration
* Ariba technical debt, end of support, remediation
* Ariba and Oracle Fusion dependencies

Vertex

* Vertex O Series, Vertex on-premises
* Vertex Cloud migration, Vertex modernization
* Vertex Oracle integration, Vertex tax engine
* Vertex application architecture
* Vertex O Series support, licensing, infrastructure
* Indirect tax determination, tax calculation
* Vertex cloud business case, Vertex upgrade costs
* Vertex and Oracle Fusion dependencies

Also search for:

* Global Supplier Management technology roadmaps
* Global Tax application portfolios
* Oracle EBS-to-Fusion transformation materials
* Business architecture and application dependency diagrams
* Risk registers, audit findings and technical debt assessments
* Vendor support notices, contracts and renewal timelines
* Existing American Express executive presentation templates

Prioritize existing Ariba and Vertex decks already stored in OneDrive, especially architecture and funding proposals presented to technology and business leadership.

Use the newest approved information, but retain older documents when they explain architecture still deployed today.

Also consult authoritative public vendor sources, particularly official SAP and Vertex documentation, to independently verify product support policies and migration options.

For each important finding, preserve the source title, document date, link, and evidence supporting it.

Do not treat a proposed architecture or an old roadmap as the current production state without validation.

3. American Express environment — starting context

Use the following as working context, to be validated against internal records.

* American Express uses SAP Ariba in its procurement and supplier ecosystem.
* Ariba supports procurement-related business processes and exchanges information with Oracle-based enterprise systems.
* Oracle E-Business Suite R12 currently supports relevant finance and procurement processes.
* American Express is executing an Oracle EBS-to-Fusion Cloud transformation.
* Existing Ariba-to-Oracle integrations use SAP Ariba Integration Toolkit (ITK) for at least some exchanges.
* SAP ended standard ITK support on December 31, 2023.
* American Express also uses Vertex O Series as part of its tax technology landscape, with an existing on-premises deployment.
* Vertex Cloud migration has been discussed or proposed, but there is currently no established requirement in this brief to treat it as a mandatory regulatory compliance upgrade.

Verify the scope, geography, applications, data flows, dependencies, support position, and dates.

Do not assume Ariba is deployed for every procurement process or market. Do not assume Vertex integrates directly with Ariba.

Distinguish current deployment, future-state architecture, and proposed investments.

4. Research track A — SAP Ariba

A1. What is Ariba?

Explain in simple business terms:

* What SAP Ariba is and what business problem it solves.
* Which capabilities American Express actually uses.
* Which business groups, geographies, and user populations it supports.
* Whether it supports sourcing, supplier onboarding, purchasing, purchase orders, invoicing, supplier collaboration, and other procurement processes.
* Its role in the wider GSM ecosystem.

Separate standard product capabilities from confirmed American Express usage.

A2. Current architecture and data flow

Establish how Ariba interacts with the rest of the American Express environment.

Identify actual participating systems, such as:

* SAP Ariba applications
* SAP Business Network, if used
* Oracle EBS
* Oracle Fusion, if already connected or part of the confirmed target design
* Suppliers and internal procurement users
* Relevant integration platforms and downstream finance systems

Identify the main business information exchanged, including only verified flows:

* Supplier information
* Purchase requests and orders
* Invoice information
* Financial coding and accounting information
* Master data
* Status and acknowledgments

Create a simple, business-readable diagram showing the principal applications and arrows indicating data movement.

Clearly label existing ITK-mediated connections.

Show bidirectional flows only where confirmed.

Limit the executive diagram to approximately 4–6 major boxes. Consolidate implementation details into the appendix.

A3. Why does ITK need replacing?

Research and verify:

* SAP’s official December 31, 2023 ITK end-of-support date.
* What ended support means for fixes, maintenance, security and future compatibility.
* The exact ITK components and integrations deployed at American Express.
* Whether any separate third-party or extended support agreement exists.
* Actual incidents, operational difficulties, audit findings, vulnerabilities or risks attributable to ITK.
* Current mitigation and monitoring controls.
* Risks of continuing without remediation.
* Implications for Oracle Fusion transformation.

Important: Distinguish documented exposure from hypothetical future risks. End of support does not automatically establish an existing security vulnerability or compliance violation.

Evaluate the supported replacement mechanisms, including SAP Integration Suite, managed gateway, APIs or existing approved enterprise integration platforms, as applicable.

Do not assume a SAP-to-SAP replacement architecture works unchanged for an Oracle ERP integration. Validate compatibility, implementation scope, licensing and cost.

Clarify that this initiative is primarily about modernizing an integration mechanism, not necessarily replacing or upgrading the entire Ariba application.

A4. Business case

Explain the value in executive terms:

* Reducing unsupported technology exposure
* Improving operational resilience
* Maintaining vendor-supported connectivity
* Reducing potential integration failures
* Supporting sustainable procurement operations
* Aligning with the Oracle transformation roadmap, where relevant

Identify verified costs, effort, timelines, dependencies, and benefits.

Avoid invented ROI or quantified savings.

5. Research track B — Vertex O Series

B1. What is Vertex?

Explain Vertex O Series as an enterprise indirect-tax determination and calculation solution.

Research:

* Which tax processes American Express uses it for.
* Whether it supports purchase-side tax, sales-side tax, VAT, GST, sales and use tax, or other calculations.
* Which actual applications and markets depend on it.
* Its business relationship to Global Tax, Finance, procurement, and GSM.
* The importance of its calculations for accounting and tax operations.

Separate general Vertex capabilities from confirmed American Express usage.

B2. Current architecture and data flow

Identify the production Vertex deployment and its integration landscape.

Determine:

* Which transaction systems call Vertex.
* Whether Oracle EBS, Oracle Fusion, or other systems are involved.
* Which transactions trigger tax calculations.
* What information the requesting system sends.
* What Vertex calculates and returns.
* Where results are ultimately recorded.
* How tax rules, rates, and content are maintained.

Create one simple diagram showing the actual systems and flow of tax-relevant data into Vertex and calculated tax information back to the requesting system.

Do not invent a direct Ariba-to-Vertex interface. Show one only if the documentation confirms it.

Keep infrastructure, API, authentication, and hosting specifics out of the executive view.

B3. Is Vertex Cloud migration mandatory?

Investigate the actual business and technical rationale for migrating from the current Vertex deployment to Vertex Cloud.

Validate:

* Current Vertex version and vendor support status.
* Operating system and infrastructure support.
* Security, vulnerability and patching position.
* Licensing and contract requirements.
* Any vendor-announced product end-of-support timelines.
* Regulatory or tax compliance obligations.
* Support for new tax rules and jurisdictions.
* Compatibility with Oracle Fusion and the target architecture.
* Cloud migration cost, implementation complexity and ongoing run cost.
* Benefits of the proposed cloud model over the current supported deployment.

Separate three different decisions:

1. Maintaining or patching the current Vertex environment.
2. Upgrading the current Vertex software version where required.
3. Migrating the Vertex deployment from on-premises to cloud.

These must not be presented as the same decision.

B4. Assess whether cloud migration can be deferred

Start with this hypothesis, but test it against evidence:

If the existing Vertex environment remains supported, secure, compliant, functional and compatible with required business processes, a move to Vertex Cloud may be a modernization opportunity rather than an immediate mandatory remediation.

Identify what could invalidate that hypothesis.

Consider:

* Future operational savings
* Infrastructure simplification
* Vendor-managed maintenance
* Scalability and resilience
* Roadmap alignment
* Competing investments and implementation capacity
* Business disruption and migration risk

Recommend a reasonable planning horizon or future decision checkpoint only where evidence supports it.

Do not assert that Vertex has no compliance role. Distinguish tax compliance supported by the application from a legal requirement to change its hosting model.

6. Comparative executive assessment

Compare the two initiatives using the same criteria.

Criterion	Ariba ITK replacement	Vertex Cloud migration
Current business purpose	Research	Research
Existing deployment	Verify	Verify
Vendor support	Verify	Verify
Security or control concerns	Verify	Verify
Regulatory requirement	Verify	Verify
Operational risk if deferred	Assess	Assess
Oracle Fusion dependency	Assess	Assess
Business benefit	Quantify where possible	Quantify where possible
Cost and effort	Verify	Verify
Recommended priority	Evidence-based	Evidence-based
Recommended timing	Evidence-based	Evidence-based

The intended executive distinction is:

* Ariba: A confirmed vendor-support issue requiring a credible integration modernization plan.
* Vertex: A potential optimization and modernization opportunity whose urgency depends on actual support, control, compliance and dependency evidence.

Challenge this distinction if internal or vendor evidence contradicts it.

7. Presentation deliverable

Develop a concise six-slide American Express executive presentation.

Slide 1 — Executive summary and recommended direction

Title suggestion: “Ariba & Vertex: Current Role and Technology Priorities”

Show what each platform supports, the key issue and the proposed priority.

Present the immediate Ariba recommendation and conditional Vertex recommendation.

Slide 2 — Ariba: Business role and current data flow

Explain what Ariba does for Amex in two or three short points.

Include one high-level current-state diagram, clearly showing Ariba, ITK, Oracle and other confirmed major participating systems.

Slide 3 — Ariba ITK: Why modernization matters

Show the vendor support position, risk of inaction, supported future direction and recommended next step.

Separate confirmed facts from assessed risks.

Explain the business impact without unnecessary technical jargon.

Slide 4 — Vertex: Business role and current data flow

Explain Vertex’s purpose, key business dependencies and major transaction flows.

Show one high-level architecture diagram with the current tax determination mechanism.

Slide 5 — Vertex Cloud: Why migration may not be urgent

Explain the benefits of cloud migration alongside the reasons it may be deferred.

Present the conditions under which the current deployment can continue safely.

Identify any support, control or compatibility gaps that would require earlier investment.

Slide 6 — Prioritization and leadership decisions

Provide a side-by-side assessment:

* Why Ariba integration replacement may need near-term prioritization.
* Why Vertex Cloud migration may be sequenced later.
* Risks and dependencies.
* Ownership, next steps and any approvals required.

Use one clear, actionable recommendation.

Include an appendix only for technical architecture, detailed interface inventories, vendor documentation, costs and unresolved questions.

8. American Express design standards

Use the latest approved American Express PowerPoint template and the actual American Express internal Design Language System or corporate brand standards accessible in Microsoft 365.

Preserve:

* Approved corporate colors
* PowerPoint theme fonts and typography
* Standard header and footer treatments
* Appropriate confidentiality markings
* Approved diagram conventions
* Corporate slide dimensions and layouts

Do not guess at brand fonts, colors or templates. If an approved template cannot be located, report the limitation and use a restrained, neutral temporary design rather than claiming brand compliance.

Presentation styling:

* Clean, predominantly white slides
* Simple rectangular system boxes
* Consistent arrows and readable labels
* Minimal decorative graphics
* No unnecessary gradients, illustrations or animations
* No overly elaborate infographics
* One main message per slide
* Brief titles and compact text
* No crowded architecture diagrams

Prefer simple tables, diagrams and short statements over paragraphs.

Use high-level business labels such as “Supplier data,” “Purchase orders,” “Invoices,” “Tax calculation” and “Financial posting” rather than technical payload names.

Keep slide content sufficiently readable in an executive meeting.

9. Quality and evidence requirements

Before finalizing:

1. Confirm whether each flow is production, planned or proposed.
2. Cite the exact source for significant factual and vendor-support claims.
3. Distinguish SAP Ariba ITK from the Ariba application itself.
4. Distinguish Vertex software maintenance from Vertex Cloud migration.
5. Confirm the existing integration technologies before recommending a successor.
6. Identify relevant Oracle EBS-to-Fusion dependencies.
7. Avoid presenting estimates, projected savings or unknown support dates as facts.
8. Highlight conflicting internal information and unresolved material questions.
9. Ensure all diagrams match the evidence.
10. Check every slide against American Express’s actual presentation standards.

If evidence is insufficient, mark the claim “Requires validation” rather than inventing details.

10. Required output sequence

First: Research findings

Provide a concise research document containing:

* Confirmed current-state Ariba architecture and business functions
* Confirmed current-state Vertex architecture and business functions
* Vendor support and migration evidence
* Comparative prioritization recommendation
* Source links and document dates
* Important unanswered questions

Second: Executive presentation

Generate an editable PowerPoint presentation with six core slides and relevant appendix slides if supported.

If presentation generation is unavailable, provide complete PowerPoint-ready slide content and diagram specifications for use in Microsoft Copilot for PowerPoint.

Third: Leadership briefing notes

Provide a brief presenter narrative for each slide in plain English, designed for a 10–15-minute executive discussion.

Final requirement: The result must clearly explain both systems to a nontechnical leader and support a defensible decision on where American Express should invest now versus later. It should be suitable for Brian K. Zerr without requiring him to understand integration implementation details.

Use only information accessible under existing American Express permissions. Keep internal evidence and generated content within approved enterprise Microsoft 365 locations.




# AI-enabled Tax Audit Management Portal Prototype

This repository contains a static, leadership-demo prototype for an AI-assisted tax audit workbench. It demonstrates a synthetic IRS income-itemization IDR journey for American Express Services Corp. while making human review, evidence traceability, and approval controls explicit.

All application data is synthetic. The local `screens/` and `original idr/` folders are design/reference material only and are excluded from source control.

The interactive prototype supports local document selection and preview, editable extracted fields, reviewer confirmation modals, editable task assignment, notes, supporting-document selection, task response submission/closure, response packaging, and DR Reviewer approval. The final response builder is unlocked only after all child tasks are reviewed and closed. Files selected in the browser remain local; the static prototype does not transmit or extract confidential source content.

## Technology Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- Typed local mock data only
- Static export output in `out/`

There is no backend authentication, database, API route, middleware, server action, or runtime external service.

## Demo Login

This is a frontend-only static prototype login for demo purposes. It does not call a backend, create a session on a server, read environment variables, or perform real authentication.

- Username: `fam-copilot`
- Password: `welcome@12345`

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

For **Deploy from branch** in GitHub Pages, generate the committed `/docs` export:

```bash
npm run export:docs
```

By default this builds for `/fam-prototype-guided`, so Pages should be configured as:

- Source: **Deploy from a branch**
- Branch: `main`
- Folder: `/docs`

If the internal Pages URL truly serves below `/vagur4/fam-prototype-guided`, override the base path before exporting:

```bash
NEXT_PUBLIC_BASE_PATH=/vagur4/fam-prototype-guided npm run export:docs
```

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
4. Keep the application static: do not introduce confidential data, runtime secrets, backend calls, real authentication assumptions, or server-only Next.js features.
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
- No API routes, server actions, middleware, SSR, real authentication, database, secret, or server runtime is required.
