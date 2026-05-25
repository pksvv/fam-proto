export type Status =
  | "Draft"
  | "Pending Review"
  | "Pending"
  | "In Progress"
  | "Closed"
  | "Ready for Response"
  | "Ready for Submission";

export type Persona =
  | "Audit Owner"
  | "Task Reviewer"
  | "Task Assignee"
  | "DR Reviewer"
  | "Viewer";

export interface AuditRequest {
  id: string;
  title: string;
  noticeType: string;
  issuer: string;
  entity: string;
  auditType: string;
  region: string;
  market: string;
  period: string;
  status: Status;
  owner: string;
}

export interface DocumentRequest {
  id: string;
  title: string;
  question: string;
  dueDate: string;
  status: Status;
  owner: string;
  reviewer: string;
  requiredEvidence: string[];
}

export interface AuditTask {
  id: string;
  title: string;
  assignee: string;
  team: string;
  reviewer: string;
  dueDate: string;
  dependency: string;
  confidence: number;
  rationale: string;
  status: Status;
}

export interface EvidenceDocument {
  id: string;
  name: string;
  owner: string;
  type: string;
  included: boolean;
  traceability: string;
}

export interface ResponseStrategy {
  recommendation: string;
  explanation: string;
  historicalMatch: string;
  classification: string;
  dataSources: string[];
  riskConsiderations: string[];
  gaps: string[];
}

export const auditRequest: AuditRequest = {
  id: "PA-2025-IRS-104",
  title: "IRS Income Tax Audit FY2024",
  noticeType: "IDR - Individual Document Request",
  issuer: "Internal Revenue Service",
  entity: "American Express Services Corp.",
  auditType: "Direct Tax",
  region: "US",
  market: "United States of America",
  period: "Jan 01 2024 to Jan 31 2025",
  status: "Pending Review",
  owner: "R Kaus",
};

export const documentRequest: DocumentRequest = {
  id: "IDR-2025-018",
  title: "Income Itemization Details",
  question: "Provide income itemization details.",
  dueDate: "Jul 01 2026",
  status: "Draft",
  owner: "R Kaus",
  reviewer: "R Ali",
  requiredEvidence: [
    "Income itemization schedule by category",
    "General ledger reconciliation summary",
    "Adjustments and exclusions support",
  ],
};

export const tasks: AuditTask[] = [
  {
    id: "TA-201",
    title: "Extract revenue ledger by income category",
    assignee: "R Kaus",
    team: "Revenue Systems",
    reviewer: "R Ali",
    dueDate: "Jun 12 2026",
    dependency: "IDR context confirmed",
    confidence: 96,
    rationale: "Provides the underlying category-level income population.",
    status: "Closed",
  },
  {
    id: "TA-202",
    title: "Reconcile GL income accounts to tax reporting summary",
    assignee: "R Ali",
    team: "GL Reporting",
    reviewer: "R Kaus",
    dueDate: "Jun 18 2026",
    dependency: "TA-201",
    confidence: 94,
    rationale: "Supports completeness and ties source data to reported totals.",
    status: "Closed",
  },
  {
    id: "TA-203",
    title: "Validate adjustments and exclusions",
    assignee: "R Ali",
    team: "Federal Tax Compliance",
    reviewer: "R Kaus",
    dueDate: "Jun 21 2026",
    dependency: "TA-202",
    confidence: 91,
    rationale: "Surfaces items needing clear regulatory explanation.",
    status: "Closed",
  },
  {
    id: "TA-204",
    title: "Compile supporting invoices/contracts if applicable",
    assignee: "R Kaus",
    team: "Tax Accounting",
    reviewer: "R Ali",
    dueDate: "Jun 24 2026",
    dependency: "TA-203",
    confidence: 84,
    rationale: "Collects corroboration only where selected items require it.",
    status: "Closed",
  },
  {
    id: "TA-205",
    title: "Prepare reviewer summary and sign-off",
    assignee: "R Ali",
    team: "Federal Tax Compliance",
    reviewer: "R Kaus",
    dueDate: "Jun 26 2026",
    dependency: "TA-201 to TA-204",
    confidence: 97,
    rationale: "Records human approval before a response package is prepared.",
    status: "Closed",
  },
];

export const evidenceDocuments: EvidenceDocument[] = [
  {
    id: "EV-101",
    name: "FY2024_Income_Itemization_Schedule.xlsx",
    owner: "Revenue Systems",
    type: "Workpaper",
    included: true,
    traceability: "Supports itemization by income category.",
  },
  {
    id: "EV-102",
    name: "GL_to_Tax_Reconciliation_Summary.pdf",
    owner: "GL Reporting",
    type: "Reconciliation",
    included: true,
    traceability: "Reconciles itemized values to tax reporting summary.",
  },
  {
    id: "EV-103",
    name: "Adjustments_and_Exclusions_Memo.pdf",
    owner: "Federal Tax Compliance",
    type: "Reviewer memo",
    included: true,
    traceability: "Documents exclusions and reviewer reasoning.",
  },
];

export const responseStrategy: ResponseStrategy = {
  recommendation:
    "Provide a category-level income schedule, tie it to the GL summary, and separately explain adjustments and exclusions.",
  explanation:
    "This sequence answers the request directly while preserving an inspectable tie-out from source data to the final narrative.",
  historicalMatch:
    "High-level pattern match: prior synthetic income-itemization response workflow (88% relevance).",
  classification: "Income substantiation / reconciliation",
  dataSources: [
    "Revenue ledger extracts",
    "GL reporting summary",
    "Tax adjustment workpapers",
  ],
  riskConsiderations: [
    "Confirm audit period boundaries before approval.",
    "Reviewer must verify any exclusions before inclusion in final draft.",
  ],
  gaps: [
    "Confirm named response approver.",
    "Determine whether supporting contracts are needed for sampled entries.",
  ],
};

