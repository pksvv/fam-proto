"use client";

import { useState } from "react";
import { ConfirmationModal, SuccessMessage } from "./WorkbenchControls";
import { useWorkflow } from "./WorkflowContext";
import { StatusBadge } from "./ui";

export function FinalApproval() {
  const { state, sendPackageForReview, submitPackage } = useWorkflow();
  const [action, setAction] = useState<"send" | "approve" | null>(null);

  return (
    <div className="workbench-panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">DR Reviewer Actions</p>
          <p className="mt-2 text-sm text-slate-600">
            Submit the draft for review, then record the reviewer approval after checking evidence and wording.
          </p>
        </div>
        <StatusBadge status={state.submitted ? "Ready for Submission" : state.responseSubmittedForReview ? "Pending Review" : "Draft"} />
      </div>
      {state.submitted ? (
        <div className="mt-5">
          <SuccessMessage>Final package approved by R Ali. Status updated to Ready for Submission.</SuccessMessage>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {state.responseSubmittedForReview ? (
            <SuccessMessage>DR response submitted successfully to DR Reviewer. Reviewer approval is still required.</SuccessMessage>
          ) : null}
          {!state.responseSubmittedForReview ? (
            <button className="workbench-primary" onClick={() => setAction("send")} type="button">Submit to DR Reviewer</button>
          ) : (
            <button className="workbench-primary" onClick={() => setAction("approve")} type="button">Approve Response Package</button>
          )}
        </div>
      )}
      <ConfirmationModal
        confirmLabel="Confirm"
        message={action === "send" ? "DR response will be submitted to the DR Reviewer for approval." : "Approve the reviewed response package and mark it Ready for Submission?"}
        onClose={() => setAction(null)}
        onConfirm={() => {
          if (action === "send") sendPackageForReview();
          if (action === "approve") submitPackage();
          setAction(null);
        }}
        open={action !== null}
        title={action === "send" ? "Submit to DR Reviewer" : "Reviewer Approval"}
      />
    </div>
  );
}
