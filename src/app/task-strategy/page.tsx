"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/PortalShell";
import { ConfirmationModal, SuccessMessage } from "@/components/WorkbenchControls";
import { useWorkflow } from "@/components/WorkflowContext";
import { StatusBadge } from "@/components/ui";

export default function TaskStrategyPage() {
  const router = useRouter();
  const { state, updateTask, createTasks } = useWorkflow();
  const [confirming, setConfirming] = useState(false);

  return (
    <PortalShell copilotKey="tasks" copilotTitle="Task strategy agent" currentStep="tasks">
      <div className="mx-auto max-w-[1320px] space-y-4">
        {state.strategySaved ? <SuccessMessage>Response strategy saved. Review task assignments before creating work items.</SuccessMessage> : null}
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">Document Request {state.documentRequest.id} &gt;&gt; Tasks Details</p>
          <h1 className="mt-2 text-2xl font-semibold">Tasks Details</h1>
        </header>
        <section className="workbench-panel overflow-hidden">
          <div className="workbench-blue-header flex items-start justify-between">
            <div>
              <h2 className="text-xl">{state.documentRequest.title}</h2>
              <p className="mt-3 text-sm text-blue-100">Document Request ID: {state.documentRequest.id}</p>
            </div>
            <StatusBadge status={state.tasksCreated ? "In Progress" : "Pending Review"} />
          </div>
          <div className="p-6">
            <p className="mb-5 border-l-4 border-amber-400 bg-amber-50 p-4 text-sm">
              Task strategy agent generated recommended tasks. You can change titles, owners, teams, dates and dependencies before creation.
            </p>
            <div className="space-y-4">
              {state.tasks.map((task) => (
                <article className="rounded border border-slate-200 bg-slate-50/40 p-4" key={task.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-brand">{task.id}</p>
                    <span className="text-xs text-slate-500">{task.confidence}% recommendation confidence</span>
                  </div>
                  <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1.15fr_1fr_1.1fr]">
                    <TableInput label="Title" onChange={(value) => updateTask(task.id, { title: value })} value={task.title} />
                    <TableSelect label="Assignee" onChange={(value) => updateTask(task.id, { assignee: value })} options={["R Kaus", "R Ali"]} value={task.assignee} />
                    <TableSelect label="Team" onChange={(value) => updateTask(task.id, { team: value })} options={["Revenue Systems", "GL Reporting", "Tax Accounting", "Federal Tax Compliance"]} value={task.team} />
                    <TableInput label="Due Date" onChange={(value) => updateTask(task.id, { dueDate: value })} value={task.dueDate} />
                    <TableInput label="Dependency" onChange={(value) => updateTask(task.id, { dependency: value })} value={task.dependency} />
                  </div>
                  <p className="mt-3 text-xs text-slate-500"><strong>Rationale:</strong> {task.rationale}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button className="workbench-primary" onClick={() => setConfirming(true)} type="button">Create Tasks</button>
              <button className="workbench-secondary" onClick={() => router.push("/response-strategy")} type="button">Back</button>
            </div>
          </div>
        </section>
      </div>
      <ConfirmationModal
        message="Create these five reviewer-edited tasks beneath the document request?"
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          createTasks();
          setConfirming(false);
          router.push("/document-requests/IDR-2025-018");
        }}
        open={confirming}
        title="Confirm Tasks"
      />
    </PortalShell>
  );
}

function TableInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-xs font-semibold text-slate-500">
      {label}
      <input className="mt-1 block w-full rounded border border-slate-300 bg-white px-2 py-2 text-sm font-normal text-slate-800" onChange={(event) => onChange(event.target.value)} value={value} />
    </label>
  );
}

function TableSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="text-xs font-semibold text-slate-500">
      {label}
      <select className="mt-1 block w-full rounded border border-slate-300 bg-white px-2 py-2 text-sm font-normal text-slate-800" onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

