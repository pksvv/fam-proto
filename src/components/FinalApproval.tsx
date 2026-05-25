"use client";

import { useState } from "react";
import { PrimaryButton, StatusBadge } from "./ui";

export function FinalApproval() {
  const [approved, setApproved] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Final human control</p>
          <p className="mt-2 text-sm text-slate-700">
            {approved
              ? "Reviewer approval recorded. Package is prepared for controlled submission."
              : "Confirm completeness, traceability, and response wording before approval."}
          </p>
        </div>
        <StatusBadge status={approved ? "Ready for Submission" : "Pending Review"} />
      </div>
      {!approved ? (
        <button className="mt-5" onClick={() => setApproved(true)} type="button">
          <PrimaryButton>Approve Final Response Package</PrimaryButton>
        </button>
      ) : (
        <p className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Ready for Submission - reviewer: R Ali / approval recorded Jul 01 2026
        </p>
      )}
    </div>
  );
}

