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

export interface CollaborationNote {
  author: string;
  role: Persona;
  time: string;
  text: string;
}

export interface FinalResponsePackage {
  draft: string;
  evidenceSummary: string;
  reviewerChecks: string[];
  assumptions: string[];
  lineage: { source: string; supports: string; approvedBy: string }[];
}

export interface CopilotMessage {
  agent: string;
  text: string;
  state: "complete" | "active" | "review" | "info";
  time?: string;
}

export interface AgentEvent {
  agent: string;
  status: string;
  confidence?: number;
}

export const personas: Persona[] = [
  "Audit Owner",
  "Task Reviewer",
  "Task Assignee",
  "DR Reviewer",
  "Viewer",
];

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

export const progressingTasks: AuditTask[] = tasks.map((task, index) => ({
  ...task,
  status: index < 2 ? "Closed" : index < 4 ? "In Progress" : "Pending Review",
}));

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

export const collaborationNotes: CollaborationNote[] = [
  {
    author: "R Ali",
    role: "Task Reviewer",
    time: "Jun 13 2026, 10:12 AM",
    text: "Please clarify whether the itemization includes adjustment categories separately from reported income.",
  },
  {
    author: "R Kaus",
    role: "Task Assignee",
    time: "Jun 13 2026, 2:46 PM",
    text: "Monthly income itemization details have been provided by category. Adjustments and exclusions are separated in the supporting memo.",
  },
  {
    author: "R Ali",
    role: "Task Reviewer",
    time: "Jun 14 2026, 9:03 AM",
    text: "Reviewed against the GL reconciliation summary. Supporting documents are uploaded and the task may be closed.",
  },
];

export const finalResponsePackage: FinalResponsePackage = {
  draft:
    "In response to IDR-2025-018, American Express Services Corp. provides the requested income itemization for the audit period Jan 01 2024 to Jan 31 2025. Income is organized by category in the attached schedule and reconciled to the general ledger reporting summary. Identified adjustments and exclusions are stated separately in the reviewer memorandum with supporting rationale.",
  evidenceSummary:
    "Three selected supporting artifacts establish category-level itemization, GL reconciliation, and documented treatment of exclusions.",
  reviewerChecks: [
    "Audit period agrees to the IDR request.",
    "Itemized category total reconciles to the GL summary.",
    "Adjustments and exclusions receive separate reviewer confirmation.",
  ],
  assumptions: [
    "No additional sampled contracts are requested unless the regulator follows up.",
    "Named reviewer approval is required before submission outside this prototype.",
  ],
  lineage: [
    {
      source: "TA-201 / FY2024_Income_Itemization_Schedule.xlsx",
      supports: "Income itemization by category",
      approvedBy: "R Ali",
    },
    {
      source: "TA-202 / GL_to_Tax_Reconciliation_Summary.pdf",
      supports: "Reconciliation to GL reporting summary",
      approvedBy: "R Kaus",
    },
    {
      source: "TA-203 / Adjustments_and_Exclusions_Memo.pdf",
      supports: "Separate exclusion rationale",
      approvedBy: "R Ali",
    },
  ],
};

export const copilotMessages: Record<string, CopilotMessage[]> = {
  home: [
    {
      agent: "IDR Intake Agent",
      text: "Drop an IDR notice to begin.",
      state: "active",
    },
    {
      agent: "Audit Context Agent",
      text: "I can map extracted context to a new or existing audit after your review.",
      state: "info",
    },
  ],
  intake: [
    {
      agent: "IDR Intake Agent",
      text: "Synthetic IRS IDR uploaded for demonstration.",
      state: "complete",
      time: "09:41",
    },
    {
      agent: "OCR Extraction Agent",
      text: "OCR is digitising the IDR document...",
      state: "complete",
      time: "09:41",
    },
    {
      agent: "Audit Context Agent",
      text: "Audit context is being extracted...",
      state: "complete",
      time: "09:42",
    },
    {
      agent: "Audit Context Agent",
      text: "Extracted context is ready. Does this map to an existing audit or a new audit?",
      state: "review",
      time: "09:42",
    },
  ],
  auditReview: [
    {
      agent: "Audit Context Agent",
      text: "I extracted these fields from the IDR.",
      state: "complete",
    },
    {
      agent: "Audit Context Agent",
      text: "Parent audit request draft is ready for review.",
      state: "review",
    },
    {
      agent: "Audit Context Agent",
      text: "Please review and correct anything incorrect before creating the parent audit request.",
      state: "review",
    },
  ],
  documentReview: [
    {
      agent: "Audit Context Agent",
      text: "Parent audit request created after human approval.",
      state: "complete",
    },
    {
      agent: "IDR Intake Agent",
      text: "Document request fields have been hydrated from the IDR.",
      state: "review",
    },
    {
      agent: "IDR Intake Agent",
      text: "Please validate evidence requirements and ownership before creation.",
      state: "review",
    },
  ],
  strategy: [
    {
      agent: "Response Strategy Agent",
      text: "Document request created after human approval.",
      state: "complete",
    },
    {
      agent: "Response Strategy Agent",
      text: "Response strategy is being created using historical audit patterns.",
      state: "active",
    },
    {
      agent: "Response Strategy Agent",
      text: "Recommendation and rationale are ready for reviewer validation.",
      state: "review",
    },
  ],
  tasks: [
    {
      agent: "Response Strategy Agent",
      text: "Response strategy saved after reviewer confirmation.",
      state: "complete",
    },
    {
      agent: "Task Strategy Agent",
      text: "Task strategy agent is generating recommended tasks.",
      state: "active",
    },
    {
      agent: "Task Strategy Agent",
      text: "Five child tasks are recommended. Review owners, due dates, dependencies, and rationale before creation.",
      state: "review",
    },
  ],
  auditDetail: [
    {
      agent: "Task Strategy Agent",
      text: "Parent audit, IDR, and five approved tasks were generated successfully.",
      state: "complete",
    },
    {
      agent: "Evidence Packaging Agent",
      text: "Task responses remain under human ownership until each work item is closed.",
      state: "info",
    },
  ],
  documentDetail: [
    {
      agent: "Task Strategy Agent",
      text: "This IDR now has five traceable supporting tasks.",
      state: "complete",
    },
    {
      agent: "Evidence Packaging Agent",
      text: "Closed task outputs can be selected for response packaging after reviewer sign-off.",
      state: "info",
    },
  ],
  taskDetail: [
    {
      agent: "Evidence Packaging Agent",
      text: "I can summarize this task context, but the response and supporting documents remain human-authored and reviewer-approved.",
      state: "info",
    },
    {
      agent: "Evidence Packaging Agent",
      text: "Response evidence and reviewer sign-off are recorded. Task status is Closed.",
      state: "complete",
    },
  ],
  finalResponse: [
    {
      agent: "Evidence Packaging Agent",
      text: "All five IDR tasks are closed. Select human-approved responses and supporting evidence for the package.",
      state: "complete",
    },
    {
      agent: "Final Response Agent",
      text: "Final response package is being drafted.",
      state: "active",
    },
  ],
  finalReview: [
    {
      agent: "Final Response Agent",
      text: "A regulator-ready draft and evidence lineage are ready for human review.",
      state: "review",
    },
    {
      agent: "Final Response Agent",
      text: "No response will be submitted without explicit reviewer approval.",
      state: "info",
    },
  ],
  tracker: [
    {
      agent: "Audit Context Agent",
      text: "Three synthetic cases require human review across intake, strategy, and response approval stages.",
      state: "review",
    },
    {
      agent: "Evidence Packaging Agent",
      text: "Upcoming due dates are prioritized by response readiness and reviewer action needed.",
      state: "info",
    },
  ],
};

export const agentEvents: Record<string, AgentEvent[]> = {
  home: [{ agent: "IDR Intake Agent", status: "Ready" }],
  intake: [
    { agent: "OCR Extraction Agent", status: "Complete", confidence: 98 },
    { agent: "Audit Context Agent", status: "Human review needed", confidence: 93 },
  ],
  auditReview: [{ agent: "Audit Context Agent", status: "Human review needed", confidence: 93 }],
  documentReview: [
    { agent: "Audit Context Agent", status: "Parent created", confidence: 100 },
    { agent: "IDR Intake Agent", status: "Hydrated; review needed", confidence: 92 },
  ],
  strategy: [{ agent: "Response Strategy Agent", status: "Review needed", confidence: 88 }],
  tasks: [{ agent: "Task Strategy Agent", status: "Human approval needed", confidence: 92 }],
  auditDetail: [{ agent: "Audit Context Agent", status: "Records generated", confidence: 100 }],
  documentDetail: [{ agent: "Evidence Packaging Agent", status: "Monitoring completion" }],
  taskDetail: [{ agent: "Evidence Packaging Agent", status: "Human collaboration complete", confidence: 100 }],
  finalResponse: [{ agent: "Final Response Agent", status: "Drafting selection", confidence: 95 }],
  finalReview: [{ agent: "Final Response Agent", status: "Reviewer approval needed", confidence: 95 }],
  tracker: [{ agent: "Audit Context Agent", status: "Portfolio insights ready", confidence: 94 }],
};
