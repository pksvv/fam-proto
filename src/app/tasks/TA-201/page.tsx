"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalShell } from "@/components/PortalShell";
import { ConfirmationModal, Tabs } from "@/components/WorkbenchControls";
import { useWorkflow } from "@/components/WorkflowContext";
import { StatusBadge } from "@/components/ui";

export default function TaskDetailPage() {
  const { state, updateTask, addTaskFiles, addTaskNote } = useWorkflow();
  const task = state.tasks.find((item) => item.id === state.activeTaskId) ?? state.tasks[0];
  const [tab, setTab] = useState("Notes");
  const [note, setNote] = useState("");
  const [confirmAction, setConfirmAction] = useState<"submit" | "close" | null>(null);
  const isClosed = task.status === "Closed";
  const allTasksClosed = state.tasks.every((item) => item.status === "Closed");

  function handleFiles(files: FileList | null) {
    if (!files) return;
    addTaskFiles(task.id, Array.from(files).map((file) => file.name));
  }

  return (
    <PortalShell copilotKey="taskDetail" copilotTitle="Manual task collaboration" currentStep="audit-detail">
      <div className="mx-auto max-w-[1320px] space-y-4">
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">My Audits &gt;&gt; Audit {state.audit.id} &gt;&gt; Response Management &gt;&gt; Task {task.id}</p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Task {task.id}</h1>
            <Link className="text-sm font-semibold text-brand underline" href="/document-requests/IDR-2025-018">Back to Document Request</Link>
          </div>
        </header>
        <section className="workbench-panel overflow-hidden">
          <div className="workbench-blue-header flex items-start justify-between">
            <div>
              <h2 className="text-xl">{task.title}</h2>
              <p className="mt-3 text-sm text-blue-100">Task ID: {task.id}</p>
            </div>
            <StatusBadge status={task.status} />
          </div>
          <div className="grid gap-5 border-b border-slate-200 bg-white px-7 py-5 text-sm md:grid-cols-4">
            <p><span className="text-slate-500">Assigned To:</span><br /><strong>{task.assignee}</strong></p>
            <p><span className="text-slate-500">Team:</span><br /><strong>{task.team}</strong></p>
            <p><span className="text-slate-500">Reviewer:</span><br /><strong>{task.reviewer}</strong></p>
            <p><span className="text-slate-500">Due Date:</span><br /><strong>{task.dueDate}</strong></p>
          </div>
          <div className="p-7">
            <label className="workbench-field">
              <span>Task Response Description*</span>
              <textarea
                className="workbench-textarea min-h-[140px]"
                disabled={isClosed}
                onChange={(event) => updateTask(task.id, { response: event.target.value })}
                placeholder="Add your response..."
                value={task.response}
              />
            </label>
            {isClosed ? (
              <p className="mt-4 rounded bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Reviewer approved this task response. It is locked for the final response package.
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="workbench-primary" onClick={() => updateTask(task.id, { status: "In Progress" })} type="button">Save Draft</button>
                <button className="workbench-secondary disabled:opacity-40" disabled={!task.response.trim()} onClick={() => setConfirmAction("submit")} type="button">Submit to Reviewer</button>
                {task.status === "Pending Review" ? (
                  <button className="workbench-primary" onClick={() => setConfirmAction("close")} type="button">Approve and Close Task</button>
                ) : null}
              </div>
            )}
            <div className="mt-8">
              <Tabs active={tab} items={["Notes", "Documents"]} onChange={setTab} />
              {tab === "Notes" ? (
                <div className="pt-5">
                  <div className="space-y-3">
                    {task.notes.map((item, index) => (
                      <article className="max-w-4xl rounded-lg bg-slate-100 px-5 py-4 text-sm" key={`${item.time}-${index}`}>
                        <p className="font-semibold">{item.author} <span className="font-normal text-slate-500">/ {item.role}</span></p>
                        <p className="mt-2 leading-6 text-slate-700">{item.text}</p>
                        <p className="mt-2 text-xs text-slate-500">{item.time}</p>
                      </article>
                    ))}
                  </div>
                  {!isClosed ? (
                    <div className="mt-5 flex max-w-4xl gap-3">
                      <input className="flex-1 rounded border border-slate-300 px-4 py-3 text-sm" onChange={(event) => setNote(event.target.value)} placeholder="Write a note to reviewer or assignee..." value={note} />
                      <button className="workbench-secondary" disabled={!note.trim()} onClick={() => {
                        addTaskNote(task.id, note);
                        setNote("");
                      }} type="button">Add Note</button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="pt-5">
                  {!isClosed ? (
                    <label className="flex max-w-4xl cursor-pointer flex-col items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-sm text-slate-600">
                      <span className="font-semibold text-brand">Upload Supporting Documents</span>
                      <span className="mt-2">Drag files here or click to browse</span>
                      <input className="sr-only" multiple onChange={(event) => handleFiles(event.target.files)} type="file" />
                    </label>
                  ) : null}
                  <ul className="mt-4 max-w-4xl space-y-2">
                    {task.files.map((file) => (
                      <li className="rounded border border-slate-200 bg-white px-4 py-3 text-sm" key={file}>{file} <span className="float-right text-emerald-700">Uploaded</span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
        {isClosed ? (
          <div className="flex justify-end gap-3">
            <Link className="workbench-secondary inline-block" href="/document-requests/IDR-2025-018">Complete Other Tasks</Link>
            {allTasksClosed ? (
              <Link className="workbench-primary inline-block" href="/final-response">Build Final DR Response</Link>
            ) : (
              <span className="rounded border border-amber-300 bg-amber-50 px-5 py-3 text-sm text-amber-800">
                Close all IDR tasks to build the final response.
              </span>
            )}
          </div>
        ) : null}
      </div>
      <ConfirmationModal
        message={confirmAction === "close" ? "Confirm that the task response and evidence are complete. This action closes the task." : "Submit your response and uploaded documents to the Task Reviewer?"}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          updateTask(task.id, { status: confirmAction === "close" ? "Closed" : "Pending Review" });
          setConfirmAction(null);
        }}
        open={confirmAction !== null}
        title={confirmAction === "close" ? "Reviewer Approval" : "Submit Response"}
      />
    </PortalShell>
  );
}
