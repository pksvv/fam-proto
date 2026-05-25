"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/PortalShell";
import { ConfirmationModal } from "@/components/WorkbenchControls";
import { useWorkflow } from "@/components/WorkflowContext";
import { evidenceDocuments } from "@/data/mockData";
import { StatusBadge } from "@/components/ui";

export default function FinalResponseBuilderPage() {
  const router = useRouter();
  const { state, setPackageSelection, generatePackage } = useWorkflow();
  const eligibleTasks = state.tasks.filter((task) => task.status === "Closed");
  const allTasksClosed = state.tasks.length > 0 && eligibleTasks.length === state.tasks.length;
  const [selectedTasks, setSelectedTasks] = useState<string[]>(state.selectedTaskIds.length ? state.selectedTaskIds : eligibleTasks.map((task) => task.id));
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>(state.selectedEvidenceIds.length ? state.selectedEvidenceIds : evidenceDocuments.map((item) => item.id));
  const [instructions, setInstructions] = useState(state.instructions);
  const [confirming, setConfirming] = useState(false);

  function toggle(list: string[], item: string, setList: (items: string[]) => void) {
    setList(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  }

  return (
    <PortalShell copilotKey="finalResponse" copilotTitle="Evidence packaging" currentStep="response">
      <div className="mx-auto max-w-[1320px] space-y-4">
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">Response Management &gt;&gt; Create DR Response</p>
          <h1 className="mt-2 text-2xl font-semibold">Create Document Request Response</h1>
        </header>
        <section className="workbench-panel overflow-hidden">
          <div className="workbench-blue-header flex items-start justify-between">
            <div className="min-w-0">
              <h2 className="text-xl">{state.documentRequest.title}</h2>
              <p className="mt-3 text-sm text-blue-100">{state.documentRequest.id} / {state.documentRequest.question}</p>
            </div>
            <StatusBadge status="Ready for Response" />
          </div>
          <div className="grid gap-7 p-7 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="min-w-0">
              <h3 className="text-base font-semibold">Select Closed Task Responses</h3>
              {!allTasksClosed ? (
                <p className="mt-4 rounded border border-amber-200 bg-amber-50 p-4 text-sm">All child tasks must be reviewed and closed before creating the final response package.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {eligibleTasks.map((task) => (
                    <label className="flex gap-3 rounded border border-slate-200 p-4 text-sm" key={task.id}>
                      <input checked={selectedTasks.includes(task.id)} onChange={() => toggle(selectedTasks, task.id, setSelectedTasks)} type="checkbox" />
                      <span className="min-w-0 break-words"><strong>{task.id}: {task.title}</strong><br /><span className="text-slate-500">{task.response || "Reviewer-approved task response"}</span></span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-base font-semibold">Supporting Documents</h3>
              <div className="mt-4 space-y-3">
                {evidenceDocuments.map((document) => (
                  <label className="flex gap-3 rounded border border-slate-200 p-4 text-sm" key={document.id}>
                    <input checked={selectedEvidence.includes(document.id)} onChange={() => toggle(selectedEvidence, document.id, setSelectedEvidence)} type="checkbox" />
                    <span className="min-w-0 break-words"><strong className="break-all">{document.name}</strong><br /><span className="text-slate-500">{document.traceability}</span></span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 px-7 py-6">
            <label className="workbench-field">
              <span>Final Drafting Instructions*</span>
              <textarea className="workbench-textarea min-h-[100px]" onChange={(event) => setInstructions(event.target.value)} value={instructions} />
            </label>
            <button className="workbench-primary mt-5 disabled:opacity-40" disabled={!allTasksClosed || !selectedTasks.length || !selectedEvidence.length} onClick={() => setConfirming(true)} type="button">
              Generate Final Response Package
            </button>
          </div>
        </section>
      </div>
      <ConfirmationModal
        message="Generate a response draft from the task responses and evidence you selected? A DR Reviewer must still approve it."
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          setPackageSelection(selectedTasks, selectedEvidence, instructions);
          generatePackage();
          setConfirming(false);
          router.push("/final-response/review");
        }}
        open={confirming}
        title="Generate Response Draft"
      />
    </PortalShell>
  );
}
