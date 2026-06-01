"use client";

import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/PortalShell";
import { SuccessMessage } from "@/components/WorkbenchControls";
import { useWorkflow } from "@/components/WorkflowContext";
import { StatusBadge } from "@/components/ui";

export default function DocumentRequestDetailPage() {
  const router = useRouter();
  const { state, selectTask, deleteTask } = useWorkflow();
  const canRemoveTasks = state.tasks.length > 2;

  function openTask(id: string) {
    selectTask(id);
    router.push("/tasks/TA-201");
  }

  return (
    <PortalShell copilotKey="documentDetail" copilotTitle="IDR task oversight" currentStep="audit-detail">
      <div className="mx-auto max-w-[1320px] space-y-4">
        {state.tasksCreated ? <SuccessMessage>Tasks created successfully. Select a task to complete the response and supporting documents.</SuccessMessage> : null}
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">My Audits &gt;&gt; Audit {state.audit.id} &gt;&gt; Document Request {state.documentRequest.id}</p>
          <h1 className="mt-2 text-2xl font-semibold">Document Request {state.documentRequest.id}</h1>
        </header>
        <section className="workbench-panel overflow-hidden">
          <div className="workbench-blue-header flex items-start justify-between">
            <div>
              <h2 className="text-xl">{state.documentRequest.title}</h2>
              <p className="mt-3 text-sm text-blue-100">Document Request ID: {state.documentRequest.id}</p>
            </div>
            <StatusBadge status={state.documentRequest.status} />
          </div>
          <div className="divide-y divide-slate-200 bg-white">
            {state.tasks.map((task) => (
              <div className="grid items-center gap-4 px-7 py-5 lg:grid-cols-[2.2fr_1fr_1fr_0.8fr_0.7fr]" key={task.id}>
                <div>
                  <button className="font-semibold text-brand underline" onClick={() => openTask(task.id)} type="button">{task.id}</button>
                  <p className="mt-2 text-sm"><strong>Title:</strong> {task.title}</p>
                </div>
                <p className="text-sm"><strong>Due Date:</strong> {task.dueDate}</p>
                <p className="text-sm"><strong>Assignee:</strong> {task.assignee}</p>
                <StatusBadge status={task.status} />
                <button
                  className="rounded border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!canRemoveTasks}
                  onClick={() => deleteTask(task.id)}
                  title={canRemoveTasks ? "Remove this task from the demo flow" : "Keep at least two tasks in the demo"}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 px-7 py-5">
            <button className="workbench-primary" data-tour-id="open-task" onClick={() => openTask(state.tasks[0].id)} type="button">Open Task Response</button>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
