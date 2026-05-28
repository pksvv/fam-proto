"use client";

import Link from "next/link";
import { FinalApproval } from "@/components/FinalApproval";
import { PortalShell } from "@/components/PortalShell";
import { useWorkflow } from "@/components/WorkflowContext";
import {
  demoAdjustmentRows,
  demoReconciliationRows,
  demoTrialBalanceRows,
  finalResponsePackage,
  taskArtifacts,
} from "@/data/mockData";
import { StatusBadge } from "@/components/ui";

export default function FinalResponseReviewPage() {
  const { state, updateResponseDraft } = useWorkflow();
  const taskSelections = state.tasks.filter((task) => state.selectedTaskIds.includes(task.id));
  const evidenceSelections = taskArtifacts.filter((document) => state.selectedEvidenceIds.includes(document.id));

  return (
    <PortalShell copilotKey="finalReview" copilotTitle="Final response agent" currentStep="response">
      <div className="mx-auto max-w-[1400px] space-y-4">
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">Response Management &gt;&gt; Response Creator &gt;&gt; Human Review</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold">{state.submitted ? "Final Response Package" : "Review Draft Response"}</h1>
            <Link className="text-sm font-semibold text-brand underline" href="/final-response">Return to document selection</Link>
          </div>
        </header>
        <p className="rounded border border-amber-300 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-900">
          DEMO DATA ONLY - NO REAL DATA. This package uses fictional entity data and synthetic working trial balance values.
        </p>
        <section className="workbench-panel overflow-hidden">
          <div className="workbench-blue-header flex items-start justify-between">
            <div>
              <h2 className="text-xl">{state.documentRequest.title}</h2>
              <p className="mt-3 text-sm text-blue-100">Document Request ID: {state.documentRequest.id} / Response Creator draft</p>
            </div>
            <StatusBadge status={state.submitted ? "Ready for Submission" : state.responseSubmittedForReview ? "Pending Review" : "Draft"} />
          </div>
          <div className="grid gap-6 p-7 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="min-w-0 space-y-5">
              <section>
                <h3 className="text-sm font-semibold">{state.submitted ? "Approved Final Response Text" : "Response Creator Draft - edit during human review*"}</h3>
                <textarea
                  className="workbench-textarea mt-3 min-h-[390px] leading-7 disabled:bg-slate-50"
                  disabled={state.submitted}
                  onChange={(event) => updateResponseDraft(event.target.value)}
                  value={state.responseDraft}
                />
                {!state.submitted ? <p className="mt-2 text-xs text-slate-500">Human reviewer may revise wording before final approval.</p> : null}
              </section>
              <section className="overflow-hidden rounded border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold">Schedule A / WTB Operating Income Itemisation</h3>
                  <p className="mt-1 text-xs font-semibold text-amber-800">DEMO DATA ONLY - Northstar Payments Services LLC / synthetic entity / USD</p>
                </div>
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr><th className="px-4 py-3">Account</th><th className="px-4 py-3">Income category</th><th className="px-4 py-3 text-right">Amount</th></tr>
                  </thead>
                  <tbody>
                    {demoTrialBalanceRows.map((row) => (
                      <tr className={`border-t border-slate-100 ${row.account ? "" : "bg-blue-50 font-semibold"}`} key={row.category}>
                        <td className="px-4 py-3">{row.account || "-"}</td>
                        <td className="px-4 py-3">{row.category}</td>
                        <td className="px-4 py-3 text-right">{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <section className="overflow-hidden rounded border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold">Schedule B / GL Control Reconciliation</h3>
                  <p className="mt-1 text-xs text-slate-500">Synthetic tie-out of the submitted operating income population</p>
                </div>
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr><th className="px-4 py-3">Description</th><th className="px-4 py-3 text-right">Amount</th><th className="px-4 py-3">Conclusion</th></tr>
                  </thead>
                  <tbody>
                    {demoReconciliationRows.map((row) => (
                      <tr className={`border-t border-slate-100 ${row.description === "Unexplained variance" ? "bg-emerald-50 font-semibold text-emerald-800" : ""}`} key={row.description}>
                        <td className="px-4 py-3">{row.description}</td>
                        <td className="px-4 py-3 text-right">{row.amount}</td>
                        <td className="px-4 py-3">{row.treatment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <section className="overflow-hidden rounded border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold">Schedule C / Adjustments and Exclusions</h3>
                  <p className="mt-1 text-xs text-slate-500">Documented scope and presentation decisions</p>
                </div>
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr><th className="px-4 py-3">Ref.</th><th className="px-4 py-3">Item</th><th className="px-4 py-3 text-right">Amount</th><th className="px-4 py-3">Conclusion</th></tr>
                  </thead>
                  <tbody>
                    {demoAdjustmentRows.map((row) => (
                      <tr className="border-t border-slate-100" key={row.reference}>
                        <td className="px-4 py-3 font-semibold text-brand">{row.reference}</td>
                        <td className="px-4 py-3">{row.item}</td>
                        <td className="px-4 py-3 text-right">{row.amount}</td>
                        <td className="px-4 py-3 text-slate-600">{row.conclusion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <section>
                <h3 className="text-sm font-semibold">Selected Task Lineage</h3>
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
              <section className="rounded border border-blue-100 bg-blue-50/50 p-4">
                <h3 className="text-sm font-semibold">Response Package Summary</h3>
                <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                  <div><dt className="text-xs text-slate-500">Entity</dt><dd className="mt-1 font-semibold">Northstar Payments Services LLC</dd></div>
                  <div><dt className="text-xs text-slate-500">Currency</dt><dd className="mt-1 font-semibold">USD</dd></div>
                  <div><dt className="text-xs text-slate-500">Response population</dt><dd className="mt-1 font-semibold">$225,839,175</dd></div>
                  <div><dt className="text-xs text-slate-500">Residual variance</dt><dd className="mt-1 font-semibold text-emerald-700">$0</dd></div>
                </dl>
              </section>
              <section className="rounded border border-slate-200 p-4">
                <h3 className="text-sm font-semibold">Included Documents and Datasets</h3>
                <ul className="mt-3 space-y-3 text-sm text-slate-600">
                  {evidenceSelections.map((item) => (
                    <li className="rounded bg-slate-50 p-3" key={item.id}>
                      <strong className="break-all text-slate-800">{item.name}</strong>
                      <span className="mt-1 block text-xs text-brand">{item.taskId} / {item.type}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded border border-slate-200 p-4">
                <h3 className="text-sm font-semibold">Response Creator Instructions</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{state.instructions}</p>
              </section>
              <section className="rounded border border-slate-200 p-4">
                <h3 className="text-sm font-semibold">Required Human Validation</h3>
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
