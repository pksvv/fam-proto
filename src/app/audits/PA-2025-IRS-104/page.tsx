import Link from "next/link";
import { PortalShell } from "@/components/PortalShell";
import { TaskList } from "@/components/TaskList";
import { Card, PrimaryButton, SecondaryButton, SectionHeading, StatusBadge } from "@/components/ui";
import { auditRequest, documentRequest, progressingTasks } from "@/data/mockData";

export default function AuditRequestDetailPage() {
  return (
    <PortalShell copilotKey="auditDetail" copilotTitle="Generated audit overview" currentStep="audit-detail">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          Parent audit request, document request, and five reviewer-approved tasks generated successfully.
        </div>
        <section className="rounded-2xl bg-brand px-6 py-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Audit request details</p>
              <h1 className="mt-2 text-2xl font-semibold">{auditRequest.title}</h1>
              <p className="mt-2 text-sm text-blue-100">{auditRequest.id} / {auditRequest.entity}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs uppercase text-blue-100">Audit status</p>
              <div className="mt-2"><StatusBadge status="In Progress" /></div>
            </div>
          </div>
          <dl className="mt-6 grid gap-4 border-t border-white/20 pt-5 text-sm sm:grid-cols-4">
            <div><dt className="text-blue-100">Audit type</dt><dd className="mt-1 font-semibold">{auditRequest.auditType}</dd></div>
            <div><dt className="text-blue-100">Market</dt><dd className="mt-1 font-semibold">{auditRequest.market}</dd></div>
            <div><dt className="text-blue-100">Audit period</dt><dd className="mt-1 font-semibold">{auditRequest.period}</dd></div>
            <div><dt className="text-blue-100">Owner</dt><dd className="mt-1 font-semibold">{auditRequest.owner}</dd></div>
          </dl>
        </section>
        <Card>
          <SectionHeading eyebrow="Document requests" title={documentRequest.title} aside={<StatusBadge status="In Progress" />} />
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-4">
            <div><p className="text-slate-500">IDR</p><p className="mt-1 font-semibold">{documentRequest.id}</p></div>
            <div><p className="text-slate-500">Question</p><p className="mt-1 font-semibold">{documentRequest.question}</p></div>
            <div><p className="text-slate-500">Due date</p><p className="mt-1 font-semibold">{documentRequest.dueDate}</p></div>
            <div className="flex items-end">
              <Link className="text-sm font-semibold text-brand underline" href="/document-requests/IDR-2025-018">
                View document request
              </Link>
            </div>
          </div>
        </Card>
        <Card>
          <SectionHeading eyebrow="Generated tasks" title="Supporting work items" aside={<span className="text-sm text-slate-500">5 tasks / 2 closed</span>} />
          <TaskList tasks={progressingTasks} />
          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton>Response Management</PrimaryButton>
            <SecondaryButton>Audit Summary</SecondaryButton>
          </div>
        </Card>
      </div>
    </PortalShell>
  );
}
