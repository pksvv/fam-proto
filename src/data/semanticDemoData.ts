export interface SemanticAudit {
  entity: string;
  title: string;
  idrId: string;
  idrTitle: string;
  question: string;
}

export interface SemanticConnection {
  title: string;
  description: string;
}

export interface EvidenceObject {
  id: string;
  supportedClaim: string;
  source: string;
  validation: string;
  residualVariance: string;
  status: "Approved";
  confidence: number;
  owner: string;
}

export interface PriorAudit {
  id: string;
  similarity: number;
  matchReasons: string[];
  outcome: "Accepted";
}

export interface ResponseClaim {
  text: string;
  evidenceId: string;
  sources: string[];
  validations: string[];
}

export interface SupportingItem {
  name: string;
  type: string;
  description: string;
  status: "Prepared" | "Reviewed" | "Approved";
  connection: string;
}

export const audit: SemanticAudit = {
  entity: "Northstar Payments Services LLC",
  title: "IRS Income Tax Audit FY2024",
  idrId: "IDR-2025-018",
  idrTitle: "Income Itemisation Details",
  question:
    "Provide income itemisation details and reconcile the submitted population to the general ledger.",
};

export const journeySteps = [
  {
    title: "IDR received",
    description: "The IRS request is captured in the existing audit workflow.",
  },
  {
    title: "Audit context extracted",
    description: "Entity, period, return line and audit issue are connected.",
  },
  {
    title: "Similar prior audit identified",
    description: "Accepted prior logic provides a reusable starting point.",
  },
  {
    title: "Response strategy proposed",
    description: "AI recommends an approach grounded in connected context.",
  },
  {
    title: "Evidence gathered and reviewed",
    description: "Curated support is validated and approved by reviewers.",
  },
  {
    title: "Grounded response prepared",
    description: "Each final claim remains traceable to evidence and controls.",
  },
];

export const semanticConnections: SemanticConnection[] = [
  {
    title: "Form 1120 Return Line",
    description: "The canonical point used to connect the audit information.",
  },
  {
    title: "Tax Issue",
    description: "The issue or question being examined by the IRS.",
  },
  {
    title: "Workpaper",
    description: "A navigation artifact showing where analysis was prepared.",
  },
  {
    title: "Evidence Object",
    description: "Curated and approved support for a specific audit claim.",
  },
  {
    title: "Reconciliation / Control",
    description: "Validation such as a reconciliation, tie-out or reviewer check.",
  },
  {
    title: "Response Claim",
    description: "A sentence or conclusion included in the final response.",
  },
];

export const practicalExample = {
  idrQuestion: "Provide income itemisation details.",
  proposedApproach:
    "Provide a category-level income schedule, reconcile it to the general ledger and separately explain adjustments and exclusions.",
  rationale: [
    "Similar approach was used in a previous audit.",
    "Required income categories are available.",
    "GL reconciliation is complete.",
    "Adjustments have been reviewed.",
    "Human approval is still required.",
  ],
  supportingItems: [
    "Income Itemisation Workpaper",
    "GL Reconciliation",
    "Adjustments and Exclusions Memo",
    "Reviewer Approval",
  ],
};

export const supportingItems: SupportingItem[] = [
  {
    name: "Income Itemisation Workpaper",
    type: "Workpaper",
    description: "Shows where the category-level income analysis was prepared and reviewed.",
    status: "Prepared",
    connection: "Navigates to the curated evidence; it is not evidence by itself.",
  },
  {
    name: "GL Reconciliation",
    type: "Reconciliation / Control",
    description: "Ties the submitted population to the general ledger with USD 0 residual variance.",
    status: "Approved",
    connection: "Validates EO-INCOME-001 and the operating-income response claim.",
  },
  {
    name: "Adjustments and Exclusions Memo",
    type: "Evidence Source",
    description: "Explains reviewed adjustments and exclusions included in the response package.",
    status: "Reviewed",
    connection: "Provides supporting context for the final response wording.",
  },
  {
    name: "Reviewer Approval",
    type: "Human Control",
    description: "Records the accountable human review before the response is approved.",
    status: "Approved",
    connection: "Confirms that AI proposed the draft and a human owns the decision.",
  },
];

export const evidenceObject: EvidenceObject = {
  id: "EO-INCOME-001",
  supportedClaim: "Operating income totals USD 225,839,175.",
  source: "Income Itemisation Schedule",
  validation: "Reconciled to GL",
  residualVariance: "USD 0",
  status: "Approved",
  confidence: 97,
  owner: "Federal Tax Compliance",
};

export const priorAudit: PriorAudit = {
  id: "IDR-2023-041",
  similarity: 88,
  matchReasons: [
    "Same Form 1120 income line",
    "Same income-itemisation request",
    "Same GL reconciliation approach",
  ],
  outcome: "Accepted",
};

export const responseClaim: ResponseClaim = {
  text:
    "The submitted operating income population totals USD 225,839,175 and reconciles to the general ledger with no unexplained variance.",
  evidenceId: evidenceObject.id,
  sources: [
    "Income Itemisation Schedule",
    "GL Reconciliation",
    "Adjustments Memo",
  ],
  validations: [
    "Arithmetic check",
    "Entity and period check",
    "GL tie-out",
    "Human reviewer approval",
  ],
};

export const responseVersions = {
  ai: {
    label: "AI Proposed Draft",
    status: "Review Required",
    text: "Based on the connected schedules and reconciliation, the submitted operating income population totals USD 225,839,175 and appears to reconcile to the general ledger with no unexplained variance.",
  },
  human: {
    label: "Human Reviewed Response",
    status: "Approved",
    text: responseClaim.text,
  },
};
