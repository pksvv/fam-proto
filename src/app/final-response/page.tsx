"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/PortalShell";
import { ConfirmationModal, SuccessMessage } from "@/components/WorkbenchControls";
import { useWorkflow } from "@/components/WorkflowContext";
import { taskArtifacts, taskCloseoutRecords } from "@/data/mockData";
import { StatusBadge } from "@/components/ui";

export default function FinalResponseBuilderPage() {
  const router = useRouter();
  const { state, prepareCloseoutDemo, setPackageSelection, generatePackage } = useWorkflow();
  const allTasksClosed = state.tasks.length > 0 && state.tasks.every((task) => task.status === "Closed");
  const [selectedTasks, setSelectedTasks] = useState<string[]>(
    state.selectedTaskIds.length ? state.selectedTaskIds : state.tasks.filter((task) => task.status === "Closed").map((task) => task.id),
  );
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>(
    state.selectedEvidenceIds.length ? state.selectedEvidenceIds : taskArtifacts.filter((item) => item.recommended).map((item) => item.id),
  );
  const [instructions, setInstructions] = useState(state.instructions);
  const [confirming, setConfirming] = useState(false);

  function toggle(list: string[], item: string, setList: (items: string[]) => void) {
    setList(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  }

  function loadCloseout() {
    prepareCloseoutDemo();
    setSelectedTasks(state.tasks.map((task) => task.id));
    setSelectedEvidence(taskArtifacts.filter((item) => item.recommended).map((item) => item.id));
  }

  return (
    <PortalShell copilotKey="finalResponse" copilotTitle="Evidence packaging" currentStep="response">
      <div className="mx-auto max-w-[1400px] space-y-4">
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">Response Management &gt;&gt; IDR Closeout &gt;&gt; Response Creator</p>
          <h1 className="mt-2 text-2xl font-semibold">Build Final IDR Response</h1>
        </header>
        <p className="rounded border border-amber-300 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-900">
          DEMO DATA ONLY - NO REAL DATA. All entities, conversations, balances and attached materials below are illustrative.
        </p>
        {!allTasksClosed ? (
          <section className="workbench-panel p-6">
            <h2 className="text-lg font-semibold">Closed IDR task package required</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              The final response starts after every task conversation has been reviewed and closed. Load the completed
              synthetic closeout to demonstrate document selection and drafting without manually progressing five tasks.
            </p>
            <button className="workbench-primary mt-5" onClick={loadCloseout} type="button">Load Completed IDR Closeout Demo</button>
          </section>
        ) : (
          <SuccessMessage>All five IDR task conversations are closed. Select task outputs and attachments to send to Response Creator.</SuccessMessage>
        )}
        <section className="workbench-panel overflow-hidden">
          <div className="workbench-blue-header flex items-start justify-between">
            <div>
              <h2 className="text-xl">{state.documentRequest.title}</h2>
              <p className="mt-3 text-sm text-blue-100">{state.documentRequest.id} / Select from all closed task chains and documents</p>
            </div>
            <StatusBadge status={allTasksClosed ? "Ready for Response" : "In Progress"} />
          </div>
          <div className="grid gap-6 p-7 2xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Closed Task Conversations</h3>
              {state.tasks.map((task) => {
                const record = taskCloseoutRecords.find((item) => item.taskId === task.id);
                return (
                  <article className="rounded border border-slate-200 bg-white p-4" key={task.id}>
                    <label className="flex items-start gap-3 text-sm">
                      <input checked={selectedTasks.includes(task.id)} disabled={!allTasksClosed} onChange={() => toggle(selectedTasks, task.id, setSelectedTasks)} type="checkbox" />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center justify-between gap-2">
                          <strong className="text-brand">{task.id} / {record?.subject ?? task.title}</strong>
                          <StatusBadge status={task.status} />
                        </span>
                        <span className="mt-2 block text-slate-600">{task.response || "Awaiting completed task response."}</span>
                      </span>
                    </label>
                    {allTasksClosed && record ? (
                      <div className="ml-7 mt-4 border-l-2 border-slate-200 pl-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Thread / {record.participants.join(", ")}
                        </p>
                        {record.messages.map((message) => (
                          <p className="mb-2 text-xs leading-5 text-slate-600" key={`${task.id}-${message.time}`}>
                            <strong className="text-slate-800">{message.author}</strong> ({message.time}): {message.text}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Documents and Datasets to Include</h3>
              {taskArtifacts.map((document) => (
                <label className="flex gap-3 rounded border border-slate-200 p-4 text-sm" key={document.id}>
                  <input
                    checked={selectedEvidence.includes(document.id)}
                    disabled={!allTasksClosed}
                    onChange={() => toggle(selectedEvidence, document.id, setSelectedEvidence)}
                    type="checkbox"
                  />
                  <span className="min-w-0 break-words">
                    <strong className="break-all">{document.name}</strong>
                    <span className="mt-1 block text-xs font-semibold text-brand">{document.taskId} / {document.type} / {document.stage}</span>
                    <span className="mt-2 block text-slate-500">{document.description}</span>
                    {document.recommended ? <span className="mt-2 inline-block rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-brand">Recommended for response</span> : null}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-200 px-7 py-6">
            <label className="workbench-field">
              <span>Instructions for Response Creator*</span>
              <textarea className="workbench-textarea min-h-[100px]" onChange={(event) => setInstructions(event.target.value)} value={instructions} />
            </label>
            <button
              className="workbench-primary mt-5 disabled:opacity-40"
              disabled={!allTasksClosed || !selectedTasks.length || !selectedEvidence.length}
              onClick={() => setConfirming(true)}
              type="button"
            >
              Submit Selection to Response Creator
            </button>
          </div>
        </section>
      </div>
      <ConfirmationModal
        message="Create a draft response from the selected closed conversations, documents and datasets? It will be routed to human review before finalisation."
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          const artifactTaskIds = taskArtifacts
            .filter((artifact) => selectedEvidence.includes(artifact.id))
            .map((artifact) => artifact.taskId);
          setPackageSelection(Array.from(new Set([...selectedTasks, ...artifactTaskIds])), selectedEvidence, instructions);
          generatePackage();
          setConfirming(false);
          router.push("/final-response/review");
        }}
        open={confirming}
        title="Send to Response Creator"
      />
    </PortalShell>
  );
}
