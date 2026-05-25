"use client";

import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/PortalShell";
import { SuccessMessage } from "@/components/WorkbenchControls";
import { useWorkflow } from "@/components/WorkflowContext";
import { StatusBadge } from "@/components/ui";

export default function DocumentRequestDetailPage() {
  const router = useRouter();
  const { state, selectTask } = useWorkflow();

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
              <div className="grid items-center gap-4 px-7 py-5 lg:grid-cols-[2.2fr_1fr_1fr_0.8fr]" key={task.id}>
                <div>
                  <button className="font-semibold text-brand underline" onClick={() => openTask(task.id)} type="button">{task.id}</button>
                  <p className="mt-2 text-sm"><strong>Title:</strong> {task.title}</p>
                </div>
                <p className="text-sm"><strong>Due Date:</strong> {task.dueDate}</p>
                <p className="text-sm"><strong>Assignee:</strong> {task.assignee}</p>
                <StatusBadge status={task.status} />
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 px-7 py-5">
            <button className="workbench-primary" onClick={() => openTask(state.tasks[0].id)} type="button">Open Task Response</button>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
