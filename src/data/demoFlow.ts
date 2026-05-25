export interface DemoStep {
  key: string;
  label: string;
  href: string;
}

export const demoFlow: DemoStep[] = [
  { key: "home", label: "Start", href: "/" },
  { key: "intake", label: "IDR Intake", href: "/intake" },
  { key: "audit-review", label: "Audit Review", href: "/review/audit" },
  { key: "document-review", label: "IDR Review", href: "/review/document-request" },
  { key: "strategy", label: "Strategy", href: "/response-strategy" },
  { key: "tasks", label: "Tasks", href: "/task-strategy" },
  { key: "audit-detail", label: "Generated Audit", href: "/audits/PA-2025-IRS-104" },
  { key: "response", label: "Response", href: "/final-response" },
];

