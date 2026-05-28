"use client";

import { useState } from "react";
import { ConfirmationModal, SuccessMessage } from "./WorkbenchControls";
import { ResponsePackageDownload } from "./ResponsePackageDownload";
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
            Send the Response Creator draft to human review, edit as needed, then approve the final response after checking evidence and wording.
          </p>
        </div>
        <StatusBadge status={state.submitted ? "Ready for Submission" : state.responseSubmittedForReview ? "Pending Review" : "Draft"} />
      </div>
      {state.submitted ? (
        <div className="mt-5">
          <SuccessMessage>Final response approved by R Ali after human review. Status updated to Ready for Submission.</SuccessMessage>
          <ResponsePackageDownload />
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {state.responseSubmittedForReview ? (
            <SuccessMessage>Response Creator draft sent to the human reviewer. Edit the draft above, then record final approval.</SuccessMessage>
          ) : null}
          {!state.responseSubmittedForReview ? (
            <button className="workbench-primary" onClick={() => setAction("send")} type="button">Send Draft to Human Review</button>
          ) : (
            <button className="workbench-primary" onClick={() => setAction("approve")} type="button">Approve Final Response</button>
          )}
        </div>
      )}
      <ConfirmationModal
        confirmLabel="Confirm"
        message={action === "send" ? "The Response Creator draft will be submitted to the human reviewer for editing and approval." : "Approve the reviewed final response and mark it Ready for Submission?"}
        onClose={() => setAction(null)}
        onConfirm={() => {
          if (action === "send") sendPackageForReview();
          if (action === "approve") submitPackage();
          setAction(null);
        }}
        open={action !== null}
        title={action === "send" ? "Send to Human Review" : "Final Response Approval"}
      />
    </div>
  );
}
