"use client";

import Link from "next/link";
import { PortalShell } from "@/components/PortalShell";
import { useWorkflow } from "@/components/WorkflowContext";
import { StatusBadge } from "@/components/ui";

export default function AuditRequestDetailPage() {
  const { state } = useWorkflow();

  return (
    <PortalShell copilotKey="auditDetail" copilotTitle="Generated audit overview" currentStep="audit-detail">
      <div className="mx-auto max-w-[1320px] space-y-4">
        <header className="workbench-panel flex flex-wrap items-center justify-between gap-4 px-7 py-5">
          <div>
            <p className="text-xs text-slate-500">My Audits &gt;&gt; Audit {state.audit.id}</p>
            <h1 className="mt-2 text-2xl font-semibold">Audit {state.audit.id}</h1>
          </div>
          <div className="flex gap-3">
            <Link className="workbench-primary" href="/final-response">Response Management</Link>
            <button className="workbench-primary" type="button">Audit Summary</button>
          </div>
        </header>
        <section className="workbench-panel overflow-hidden">
          <div className="workbench-blue-header">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-medium">{state.audit.title}</h2>
                <p className="mt-4 text-base text-blue-100">Audit Request ID: {state.audit.id}</p>
              </div>
              <StatusBadge status={state.audit.status} />
            </div>
            <dl className="mx-auto mt-8 grid max-w-5xl gap-5 text-sm md:grid-cols-3">
              <Summary label="Audit Type / Entity" value={`${state.audit.auditType} / ${state.audit.entity}`} />
              <Summary label="Region / Market" value={`${state.audit.region} / ${state.audit.market}`} />
              <Summary label="Audit Period" value={state.audit.period} />
            </dl>
          </div>
          <div className="bg-white px-7 py-6">
            <div className="grid items-center gap-5 md:grid-cols-[2fr_1fr_0.8fr]">
              <div>
                <Link className="font-semibold text-brand underline" href="/document-requests/IDR-2025-018">
                  Document Request: {state.documentRequest.id}
                </Link>
                <p className="mt-3 text-sm"><strong>Title:</strong> {state.documentRequest.title}</p>
              </div>
              <p className="text-sm"><strong>Due Date:</strong> {state.documentRequest.dueDate}</p>
              <StatusBadge status={state.documentRequest.status} />
            </div>
          </div>
          <div className="border-t border-slate-200 px-7 py-5">
            <Link className="workbench-primary inline-block" href="/review/document-request">Add New Document Request</Link>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/20 p-4">
      <dt className="text-blue-100">{label}</dt>
      <dd className="mt-3 font-semibold text-white">{value}</dd>
    </div>
  );
}
