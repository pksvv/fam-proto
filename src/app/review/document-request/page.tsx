"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EvidenceViewer } from "@/components/EvidenceViewer";
import { PortalShell } from "@/components/PortalShell";
import { ConfirmationModal, InputField, SelectField, SuccessMessage } from "@/components/WorkbenchControls";
import { useWorkflow } from "@/components/WorkflowContext";
import { StatusBadge } from "@/components/ui";

export default function DocumentRequestReviewPage() {
  const router = useRouter();
  const { state, updateDocumentRequest, createDocumentRequest } = useWorkflow();
  const [confirming, setConfirming] = useState(false);

  return (
    <PortalShell copilotKey="documentReview" copilotTitle="Document request hydration" currentStep="document-review">
      <div className="mx-auto max-w-[1320px] space-y-4">
        {state.parentCreated ? <SuccessMessage>Parent audit request {state.audit.id} was created successfully.</SuccessMessage> : null}
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">My Audits &gt;&gt; Audit {state.audit.id} &gt;&gt; Document Request Details</p>
          <h1 className="mt-2 text-2xl font-semibold">Document Request Details</h1>
        </header>
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(320px,0.9fr)_minmax(460px,1.1fr)]">
          <EvidenceViewer extracted={state.extracted} notice={state.notice} />
          <section className="workbench-panel overflow-hidden">
            <div className="workbench-blue-header flex items-start justify-between">
              <div>
                <h2 className="text-xl">{state.documentRequest.title}</h2>
                <p className="mt-3 text-sm text-blue-100">Document Request ID: {state.documentRequest.id}</p>
              </div>
              <StatusBadge status={state.documentRequestCreated ? "In Progress" : "Pending Review"} />
            </div>
            <div className="p-7">
              <p className="mb-6 border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-slate-700">
                Document request fields have been hydrated from the IDR. Review the question, due date, owners and expected evidence.
              </p>
              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
                <InputField label="Document Request ID" onChange={(value) => updateDocumentRequest("id", value)} value={state.documentRequest.id} />
                <InputField label="Title" onChange={(value) => updateDocumentRequest("title", value)} required value={state.documentRequest.title} />
                <InputField label="Due Date" onChange={(value) => updateDocumentRequest("dueDate", value)} required value={state.documentRequest.dueDate} />
                <SelectField label="Owner" onChange={(value) => updateDocumentRequest("owner", value)} options={["R Kaus", "R Ali"]} value={state.documentRequest.owner} />
                <div className="md:col-span-2 2xl:col-span-3">
                  <label className="workbench-field">
                    <span>IDR Question*</span>
                    <textarea className="workbench-textarea min-h-[88px]" onChange={(event) => updateDocumentRequest("question", event.target.value)} value={state.documentRequest.question} />
                  </label>
                </div>
                <SelectField label="DR Reviewer" onChange={(value) => updateDocumentRequest("reviewer", value)} options={["R Ali", "R Kaus"]} value={state.documentRequest.reviewer} />
              </div>
              <label className="workbench-field mt-5">
                <span>Required Evidence (one item per line)</span>
                <textarea
                  className="workbench-textarea min-h-[92px]"
                  onChange={(event) => updateDocumentRequest("requiredEvidence", event.target.value.split("\n"))}
                  value={state.documentRequest.requiredEvidence.join("\n")}
                />
              </label>
              <div className="mt-7 flex gap-3">
                <button className="workbench-primary" onClick={() => setConfirming(true)} type="button">Create Document Request</button>
                <button className="workbench-secondary" onClick={() => router.push("/review/audit")} type="button">Back</button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ConfirmationModal
        message={`Create document request ${state.documentRequest.id} and continue to response strategy review?`}
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          createDocumentRequest();
          setConfirming(false);
          router.push("/response-strategy");
        }}
        open={confirming}
        title="Confirm Document Request"
      />
    </PortalShell>
  );
}
