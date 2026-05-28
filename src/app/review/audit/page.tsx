"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EvidenceViewer } from "@/components/EvidenceViewer";
import { PortalShell } from "@/components/PortalShell";
import { ConfirmationModal, InputField, SelectField } from "@/components/WorkbenchControls";
import { useWorkflow } from "@/components/WorkflowContext";
import { StatusBadge } from "@/components/ui";

export default function ParentAuditReviewPage() {
  const router = useRouter();
  const { state, updateAudit, updateAuditDates, createParentAudit } = useWorkflow();
  const [confirming, setConfirming] = useState(false);

  return (
    <PortalShell copilotKey="auditReview" copilotTitle="Parent audit creation" currentStep="audit-review">
      <div className="mx-auto max-w-[1320px] space-y-4">
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">New Audit Submission &gt;&gt; Basic Details</p>
          <h1 className="mt-2 text-2xl font-semibold">Basic Details</h1>
        </header>
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(320px,0.9fr)_minmax(460px,1.1fr)]">
          <EvidenceViewer extracted={state.extracted} notice={state.notice} />
          <section className="workbench-panel overflow-hidden">
            <div className="workbench-blue-header flex items-start justify-between">
              <div>
                <h2 className="text-xl font-medium">{state.audit.title}</h2>
                <p className="mt-3 text-sm text-blue-100">Audit Request ID: {state.audit.id}</p>
              </div>
              <StatusBadge status={state.parentCreated ? "In Progress" : "Pending Review"} />
            </div>
            <div className="bg-white p-7">
              <div className="mb-6 border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-slate-700">
                AI extracted these draft values from the uploaded notice. Review and correct them before creation.
              </div>
              <div className="grid gap-x-5 gap-y-5 md:grid-cols-2 2xl:grid-cols-4">
                <InputField label="Audit Title" onChange={(value) => updateAudit("title", value)} required value={state.audit.title} />
                <SelectField label="Audit Type" onChange={(value) => updateAudit("auditType", value)} options={["Direct Tax", "Indirect Tax"]} value={state.audit.auditType} />
                <InputField label="Entity" onChange={(value) => updateAudit("entity", value)} required value={state.audit.entity} />
                <SelectField label="Region" onChange={(value) => updateAudit("region", value)} options={["US", "EMEA", "APAC"]} value={state.audit.region} />
                <InputField label="Market" onChange={(value) => updateAudit("market", value)} required value={state.audit.market} />
                <InputField label="Period Under Audit (From)" onChange={(value) => updateAuditDates(value, state.auditEndDate)} type="date" value={state.auditStartDate} />
                <InputField label="Period Under Audit (To)" onChange={(value) => updateAuditDates(state.auditStartDate, value)} type="date" value={state.auditEndDate} />
                <SelectField label="Owner" onChange={(value) => updateAudit("owner", value)} options={["R Kaus", "R Ali"]} value={state.audit.owner} />
              </div>
              <div className="mt-7 flex gap-3">
                <button className="workbench-primary disabled:opacity-50" disabled={!state.extracted} onClick={() => setConfirming(true)} type="button">
                  Create Parent Audit Request
                </button>
                <button className="workbench-secondary" onClick={() => router.push("/intake")} type="button">Back</button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ConfirmationModal
        message={`Your audit ID ${state.audit.id} will be created using the reviewed values. Proceed to document request review?`}
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          createParentAudit();
          setConfirming(false);
          router.push("/review/document-request");
        }}
        open={confirming}
        title="Confirm Parent Audit"
      />
    </PortalShell>
  );
}
