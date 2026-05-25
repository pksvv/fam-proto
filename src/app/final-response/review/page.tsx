"use client";

import { FinalApproval } from "@/components/FinalApproval";
import { PortalShell } from "@/components/PortalShell";
import { useWorkflow } from "@/components/WorkflowContext";
import { evidenceDocuments, finalResponsePackage } from "@/data/mockData";
import { StatusBadge } from "@/components/ui";

export default function FinalResponseReviewPage() {
  const { state } = useWorkflow();
  const taskSelections = state.tasks.filter((task) => state.selectedTaskIds.includes(task.id));
  const evidenceSelections = evidenceDocuments.filter((document) => state.selectedEvidenceIds.includes(document.id));

  return (
    <PortalShell copilotKey="finalReview" copilotTitle="Final response agent" currentStep="response">
      <div className="mx-auto max-w-[1320px] space-y-4">
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">Response Management &gt;&gt; Create DR Response &gt;&gt; Review Package</p>
          <h1 className="mt-2 text-2xl font-semibold">Final Response Review Package</h1>
        </header>
        <section className="workbench-panel overflow-hidden">
          <div className="workbench-blue-header flex items-start justify-between">
            <div>
              <h2 className="text-xl">{state.documentRequest.title}</h2>
              <p className="mt-3 text-sm text-blue-100">Document Request ID: {state.documentRequest.id}</p>
            </div>
            <StatusBadge status={state.submitted ? "Ready for Submission" : state.responseSubmittedForReview ? "Pending Review" : "Draft"} />
          </div>
          <div className="grid gap-6 p-7 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="min-w-0 space-y-5">
              <section>
                <h3 className="text-sm font-semibold">Final Response Text*</h3>
                <div className="mt-3 rounded border border-slate-300 bg-white p-5 text-sm leading-7 text-slate-700">
                  {finalResponsePackage.draft}
                </div>
              </section>
              <section>
                <h3 className="text-sm font-semibold">Response Lineage</h3>
                <div className="mt-3 divide-y rounded border border-slate-200">
                  {taskSelections.map((task) => (
                    <div className="grid gap-2 p-4 text-sm md:grid-cols-[1fr_1.6fr]" key={task.id}>
                      <p className="break-words font-semibold text-brand">{task.id} / {task.title}</p>
                      <p className="break-words text-slate-600">{task.response || "Approved supporting response."}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="min-w-0 space-y-5">
              <section className="rounded border border-slate-200 p-4">
                <h3 className="text-sm font-semibold">Attached Documents</h3>
                <ul className="mt-3 space-y-2 break-all text-sm text-slate-600">
                  {evidenceSelections.map((item) => <li key={item.id}>- {item.name}</li>)}
                </ul>
              </section>
              <section className="rounded border border-slate-200 p-4">
                <h3 className="text-sm font-semibold">Reviewer Instructions</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{state.instructions}</p>
              </section>
              <section className="rounded border border-slate-200 p-4">
                <h3 className="text-sm font-semibold">Required Validation</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {finalResponsePackage.reviewerChecks.map((check) => <li key={check}>- {check}</li>)}
                </ul>
              </section>
            </div>
          </div>
        </section>
        <FinalApproval />
      </div>
    </PortalShell>
  );
}
