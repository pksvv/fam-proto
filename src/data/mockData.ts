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

export interface TaskArtifact extends EvidenceDocument {
  taskId: string;
  stage: string;
  recommended: boolean;
  description: string;
}

export interface TaskCloseoutRecord {
  taskId: string;
  subject: string;
  participants: string[];
  messages: CollaborationNote[];
  response: string;
}

export interface TrialBalanceRow {
  account: string;
  category: string;
  amount: string;
}

export interface ReconciliationRow {
  description: string;
  amount: string;
  treatment: string;
}

export interface AdjustmentRow {
  reference: string;
  item: string;
  amount: string;
  conclusion: string;
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
  owner: "AI.Tax.Copilot",
};

export const documentRequest: DocumentRequest = {
  id: "IDR-2025-018",
  title: "Income Itemization Details",
  question: "Provide income itemization details.",
  dueDate: "Jul 01 2026",
  status: "Draft",
  owner: "AI.Tax.Copilot",
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
    assignee: "AI.Tax.Copilot",
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
    reviewer: "AI.Tax.Copilot",
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
    reviewer: "AI.Tax.Copilot",
    dueDate: "Jun 21 2026",
    dependency: "TA-202",
    confidence: 91,
    rationale: "Surfaces items needing clear regulatory explanation.",
    status: "Closed",
  },
  {
    id: "TA-204",
    title: "Compile supporting invoices/contracts if applicable",
    assignee: "AI.Tax.Copilot",
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
    reviewer: "AI.Tax.Copilot",
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

export const taskCloseoutRecords: TaskCloseoutRecord[] = [
  {
    taskId: "TA-201",
    subject: "Revenue ledger extraction / income category mapping",
    participants: ["AI.Tax.Copilot", "R Ali", "Revenue Systems"],
    response: "Completed the FY2024 income account extraction for Northstar Payments Services LLC (demo entity) from synthetic ledger company code US42. Six revenue and contra-revenue accounts total USD 225,839,175.",
    messages: [
      { author: "R Ali", role: "Task Reviewer", time: "Jun 12 2026, 9:04 AM", text: "Please provide category-level income detail, including contra-revenue, and identify the extract version used for the response." },
      { author: "AI.Tax.Copilot", role: "Task Assignee", time: "Jun 12 2026, 3:40 PM", text: "Uploaded DEMO_WTB_Income_Itemisation_Northstar_Payments_v3.csv from synthetic ledger extract US42_FY24_CLOSE_v3. Volume incentive rebates are shown as contra-revenue rather than netted into merchant discount revenue." },
      { author: "R Ali", role: "Task Reviewer", time: "Jun 13 2026, 10:11 AM", text: "Reviewed account mapping and footing to USD 225,839,175. Approved the itemisation tab for final-response selection." },
    ],
  },
  {
    taskId: "TA-202",
    subject: "WTB to GL reconciliation",
    participants: ["R Ali", "AI.Tax.Copilot", "GL Reporting"],
    response: "Reconciled the selected WTB income population of USD 225,839,175 to the synthetic GL control total. Two presentation reclasses were evaluated; no unexplained variance remains.",
    messages: [
      { author: "R Ali", role: "Task Assignee", time: "Jun 16 2026, 11:22 AM", text: "Prepared tie-out using DEMO_GL_Control_Summary_US42_FY24.pdf. The schedule separately identifies a rebate presentation reclass and excluded FX income." },
      { author: "AI.Tax.Copilot", role: "Task Reviewer", time: "Jun 18 2026, 4:15 PM", text: "Tie-out reviewed against the synthetic control total. Residual variance is USD 0; close task." },
    ],
  },
  {
    taskId: "TA-203",
    subject: "Adjustment and exclusion review",
    participants: ["R Ali", "Federal Tax Compliance"],
    response: "Validated presentation treatment for volume rebates and excluded non-operating foreign exchange income of USD 612,480 from the requested operating income itemisation.",
    messages: [
      { author: "R Ali", role: "Task Assignee", time: "Jun 20 2026, 2:08 PM", text: "Added memo AJ-01 documenting volume incentive rebates as contra-revenue and AJ-02 excluding synthetic FX gain of USD 612,480 as outside the requested operating income population." },
      { author: "AI.Tax.Copilot", role: "Task Reviewer", time: "Jun 21 2026, 9:30 AM", text: "Treatments agree to the itemisation and reconciliation schedules. Suitable for inclusion in the draft response." },
    ],
  },
  {
    taskId: "TA-204",
    subject: "Supporting document sampling",
    participants: ["AI.Tax.Copilot", "Tax Accounting"],
    response: "Prepared sample support index for three illustrative revenue streams and retained it as an optional workpaper should transaction-level support be requested.",
    messages: [
      { author: "AI.Tax.Copilot", role: "Task Assignee", time: "Jun 23 2026, 1:42 PM", text: "Prepared internal sample index covering merchant discount, processing fee and implementation fee streams. The IDR asks for itemisation, so invoice support remains optional." },
      { author: "R Ali", role: "Task Reviewer", time: "Jun 24 2026, 9:20 AM", text: "Accepted. Retain the sampling index in the response workpapers unless transaction support is subsequently requested." },
    ],
  },
  {
    taskId: "TA-205",
    subject: "Reviewer summary and sign-off",
    participants: ["R Ali", "AI.Tax.Copilot"],
    response: "Recorded closeout review, confirmed WTB-to-GL footing and designated three schedules for inclusion in the draft IDR response.",
    messages: [
      { author: "R Ali", role: "Task Assignee", time: "Jun 26 2026, 10:05 AM", text: "All tasks are closed. Proposed package includes the WTB itemisation v3, GL reconciliation summary and adjustments/exclusions memo." },
      { author: "AI.Tax.Copilot", role: "Task Reviewer", time: "Jun 26 2026, 11:14 AM", text: "Closeout approved after checking total income of USD 225,839,175 and residual reconciliation variance of USD 0. Final package selection can begin." },
    ],
  },
];

export const taskArtifacts: TaskArtifact[] = [
  {
    id: "EV-WTB",
    taskId: "TA-201",
    name: "DEMO_WTB_Income_Itemisation_Northstar_Payments_v3.csv",
    owner: "Revenue Systems",
    type: "Dataset / CSV",
    stage: "Assignee submission",
    included: true,
    recommended: true,
    traceability: "Selected demo entity income lines from a synthetic working trial balance.",
    description: "Synthetic ledger extract US42_FY24_CLOSE_v3 with account-level income and contra-revenue detail.",
  },
  {
    id: "EV-GL",
    taskId: "TA-202",
    name: "DEMO_GL_Control_to_WTB_Reconciliation_US42_FY24.pdf",
    owner: "GL Reporting",
    type: "Reconciliation",
    stage: "Reviewer-approved",
    included: true,
    recommended: true,
    traceability: "Ties selected synthetic WTB income lines to the demo GL total.",
    description: "Control-total tie-out, presentation reclasses and zero residual variance conclusion.",
  },
  {
    id: "EV-ADJ",
    taskId: "TA-203",
    name: "DEMO_Adjustments_and_Exclusions_Memo.pdf",
    owner: "Federal Tax Compliance",
    type: "Reviewer memo",
    stage: "Reviewer-approved",
    included: true,
    recommended: true,
    traceability: "Explains synthetic exclusions outside the income total.",
    description: "AJ-01 rebate presentation and AJ-02 excluded non-operating FX income analysis.",
  },
  {
    id: "EV-SCOPE",
    taskId: "TA-204",
    name: "DEMO_Revenue_Sampling_Index_Internal_Only.csv",
    owner: "Tax Accounting",
    type: "Dataset / CSV",
    stage: "Assignee submission",
    included: false,
    recommended: false,
    traceability: "Documents why underlying contracts were not selected.",
    description: "Optional internal index of sampled revenue streams; not required for the initial IDR response.",
  },
  {
    id: "EV-SIGN",
    taskId: "TA-205",
    name: "DEMO_IDR_Closeout_Signoff.pdf",
    owner: "Federal Tax Compliance",
    type: "Approval record",
    stage: "Final sign-off",
    included: false,
    recommended: false,
    traceability: "Records the completed human closeout.",
    description: "Retained as internal approval evidence.",
  },
];

export const demoTrialBalanceRows: TrialBalanceRow[] = [
  { account: "402010", category: "Merchant discount revenue", amount: "$184,726,381" },
  { account: "402020", category: "Network assessment reimbursement revenue", amount: "$28,194,550" },
  { account: "402030", category: "Gateway and processing fee revenue", amount: "$17,806,922" },
  { account: "402040", category: "Chargeback administration fees", amount: "$3,479,610" },
  { account: "402090", category: "Implementation and other service fees", amount: "$1,248,940" },
  { account: "402950", category: "Volume incentive rebates (contra-revenue)", amount: "($9,617,228)" },
  { account: "", category: "Total operating income itemised", amount: "$225,839,175" },
];

export const demoReconciliationRows: ReconciliationRow[] = [
  { description: "WTB operating income itemisation total", amount: "$225,839,175", treatment: "Per Schedule A" },
  { description: "GL operating income control total", amount: "$225,839,175", treatment: "Per Schedule B" },
  { description: "Unexplained variance", amount: "$0", treatment: "Reconciled" },
];

export const demoAdjustmentRows: AdjustmentRow[] = [
  { reference: "AJ-01", item: "Volume incentive rebates", amount: "($9,617,228)", conclusion: "Presented as contra-revenue in Schedule A; included in total." },
  { reference: "AJ-02", item: "Foreign exchange gain - non-operating", amount: "$612,480", conclusion: "Excluded from operating income population; outside request scope." },
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
    author: "AI.Tax.Copilot",
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
    "DEMO DATA ONLY - NO REAL DATA\n\nRe: IDR-2025-018 - Income Itemisation Details\nEntity: Northstar Payments Services LLC (fictional demo entity)\nPeriod under review: January 1, 2024 through January 31, 2025\nCurrency: USD\n\nIn response to the request for income itemisation details, we provide Schedule A, a synthetic working trial balance (WTB) extract identifying the operating income accounts included in the response population. The schedule reports total itemised operating income of $225,839,175, comprising merchant discount revenue, network assessment reimbursement revenue, gateway and processing fees, chargeback administration fees, implementation and other service fees, less volume incentive rebates recorded as contra-revenue.\n\nSchedule B reconciles the Schedule A itemisation total to the synthetic general ledger operating income control total of $225,839,175. The reconciliation results in an unexplained variance of $0.\n\nSchedule C documents the principal presentation and scope considerations. Volume incentive rebates of ($9,617,228) are presented as contra-revenue within the operating income population. A synthetic non-operating foreign exchange gain of $612,480 was evaluated and excluded from the itemisation because it falls outside the operating income population responsive to this request.\n\nEnclosures submitted with this response:\n1. DEMO_WTB_Income_Itemisation_Northstar_Payments_v3.csv (Schedule A)\n2. DEMO_GL_Control_to_WTB_Reconciliation_US42_FY24.pdf (Schedule B)\n3. DEMO_Adjustments_and_Exclusions_Memo.pdf (Schedule C)\n\nBased on the review procedures documented in the enclosed schedules, the submitted income itemisation is complete for the defined synthetic response population and agrees to the corresponding demo GL control total.",
  evidenceSummary:
    "Three selected supporting schedules establish account-level income itemisation, reconciliation to a GL control total, and documented treatment of contra-revenue and excluded non-operating income.",
  reviewerChecks: [
    "Entity, currency and period agree to the response cover text and Schedule A.",
    "Schedule A itemised total of USD 225,839,175 agrees to Schedule B GL control total.",
    "Schedule C treatment of rebate contra-revenue and excluded FX income is appropriate for the response population.",
    "Every submitted enclosure is marked as synthetic demo material before external presentation.",
  ],
  assumptions: [
    "No additional sampled contracts are requested unless the regulator follows up.",
    "Named reviewer approval is required before submission outside this prototype.",
  ],
  lineage: [
    {
      source: "TA-201 / DEMO_WTB_Income_Itemisation_Northstar_Payments_v3.csv",
      supports: "Income itemization by category",
      approvedBy: "R Ali",
    },
    {
      source: "TA-202 / DEMO_GL_Control_to_WTB_Reconciliation_US42_FY24.pdf",
      supports: "Reconciliation to GL reporting summary",
      approvedBy: "AI.Tax.Copilot",
    },
    {
      source: "TA-203 / DEMO_Adjustments_and_Exclusions_Memo.pdf",
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
      text: "Select closed, human-approved task responses and supporting evidence for the package.",
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
