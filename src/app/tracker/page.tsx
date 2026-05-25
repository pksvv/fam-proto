import Link from "next/link";
import { PortalShell } from "@/components/PortalShell";
import { Card, PrimaryButton, SectionHeading, StatusBadge } from "@/components/ui";

const metrics = [
  { label: "Active audits", value: "07", note: "Direct tax portfolio" },
  { label: "Awaiting human review", value: "03", note: "AI-assisted checkpoints" },
  { label: "Due within 30 days", value: "04", note: "Reviewer prioritized" },
  { label: "Ready for submission", value: "01", note: "Approval recorded" },
];

const portfolio = [
  { title: "IRS Income Tax Audit FY2024", id: "PA-2025-IRS-104", due: "Jul 01 2026", status: "Ready for Response" as const, owner: "R Kaus" },
  { title: "State Apportionment Review FY2024", id: "PA-2025-ST-061", due: "Jul 14 2026", status: "Pending Review" as const, owner: "R Ali" },
  { title: "Federal Credit Substantiation FY2025", id: "PA-2026-FC-012", due: "Aug 02 2026", status: "In Progress" as const, owner: "R Kaus" },
];

export default function TrackerPage() {
  return (
    <PortalShell copilotKey="tracker" copilotTitle="Portfolio overview" currentStep="audit-detail">
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="rounded-2xl bg-brand px-6 py-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Audit tracker</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Portfolio overview dashboard</h1>
              <p className="mt-2 text-sm text-blue-100">Synthetic oversight view focused on due dates and human decisions.</p>
            </div>
            <Link href="/audits/PA-2025-IRS-104">
              <PrimaryButton className="!bg-white !text-brand hover:!bg-blue-50">Open highlighted audit</PrimaryButton>
            </Link>
          </div>
        </section>
        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold text-brand">{metric.value}</p>
              <p className="mt-2 text-xs text-slate-500">{metric.note}</p>
            </Card>
          ))}
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <Card>
            <SectionHeading eyebrow="My audits" title="Cases requiring oversight" />
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              {portfolio.map((audit) => (
                <div className="grid gap-3 border-b border-slate-100 p-4 last:border-0 md:grid-cols-[1.4fr_0.7fr_0.9fr_0.8fr] md:items-center" key={audit.id}>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{audit.title}</p>
                    <p className="mt-1 text-xs text-brand">{audit.id}</p>
                  </div>
                  <p className="text-sm text-slate-600">{audit.owner}</p>
                  <p className="text-sm text-slate-600">{audit.due}</p>
                  <StatusBadge status={audit.status} />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <SectionHeading eyebrow="Status distribution" title="AI-assisted cases" />
            <div className="mt-5 space-y-4 text-sm">
              {[
                ["Pending human review", "3", "w-[42%]", "bg-amber-400"],
                ["In progress", "2", "w-[29%]", "bg-blue-500"],
                ["Ready for response", "1", "w-[15%]", "bg-indigo-500"],
                ["Ready for submission", "1", "w-[15%]", "bg-emerald-500"],
              ].map(([label, count, width, color]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-slate-600"><span>{label}</span><strong>{count}</strong></div>
                  <div className="h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${width} ${color}`} /></div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-slate-700">
              AI-assisted indicates proposed extraction, strategy, or packaging. Every case still requires a human approval checkpoint.
            </div>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}

