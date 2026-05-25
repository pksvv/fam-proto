"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/PortalShell";
import { useWorkflow } from "@/components/WorkflowContext";
import { StatusBadge } from "@/components/ui";

export default function HomePage() {
  const router = useRouter();
  const { state, resetWorkflow, selectTask } = useWorkflow();
  const actions = [
    { id: state.documentRequest.id, title: state.documentRequest.title, type: "Document Request", due: state.documentRequest.dueDate, status: state.documentRequest.status },
    ...state.tasks.slice(0, 3).map((task) => ({ id: task.id, title: task.title, type: "Task Response", due: task.dueDate, status: task.status })),
  ];

  return (
    <PortalShell copilotKey="home" copilotTitle="Start an IDR review" currentStep="home">
      <div className="mx-auto max-w-[1320px] space-y-4">
        <header className="workbench-panel flex flex-wrap items-center justify-between gap-4 px-7 py-5">
          <div>
            <p className="text-xs text-slate-500">Audit management &gt;&gt; My Actions</p>
            <h1 className="mt-2 text-2xl font-semibold">My Actions</h1>
          </div>
          <div className="flex gap-3">
            <Link className="workbench-primary" href="/intake">New Audit Submission</Link>
            <button className="workbench-secondary" onClick={resetWorkflow} type="button">Reset Demo</button>
          </div>
        </header>
        <section className="workbench-panel overflow-hidden bg-white">
          <div className="workbench-tabs">
            <button className="active" type="button">Pending</button>
            <button type="button">Completed</button>
            <button type="button">Cancelled</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  {["Action ID", "Title", "Parent Audit ID", "Due Date", "Action Type", "Assignor", "Status"].map((header) => (
                    <th className="px-5 py-4 font-semibold" key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {actions.map((action, index) => (
                  <tr className="border-t border-slate-200" key={action.id}>
                    <td className="px-5 py-4">
                      {index === 0 ? (
                        <Link className="font-semibold text-brand underline" href="/document-requests/IDR-2025-018">
                          {action.id}
                        </Link>
                      ) : (
                        <button
                          className="font-semibold text-brand underline"
                          onClick={() => {
                            selectTask(action.id);
                            router.push("/tasks/TA-201");
                          }}
                          type="button"
                        >
                          {action.id}
                        </button>
                      )}
                    </td>
                    <td className="px-5 py-4">{action.title}</td>
                    <td className="px-5 py-4">{state.audit.id}</td>
                    <td className="px-5 py-4">{action.due}</td>
                    <td className="px-5 py-4">{action.type}</td>
                    <td className="px-5 py-4">R Ali</td>
                    <td className="px-5 py-4"><StatusBadge status={action.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <div className="grid gap-4 md:grid-cols-3">
          <Link className="workbench-panel p-5" href="/intake">
            <p className="text-xs font-semibold uppercase text-slate-500">New Audit Submission</p>
            <p className="mt-3 text-lg font-semibold text-brand">Upload an IDR notice</p>
            <p className="mt-2 text-sm text-slate-600">Start a new human-reviewed intake.</p>
          </Link>
          <Link className="workbench-panel p-5" href="/audits/PA-2025-IRS-104">
            <p className="text-xs font-semibold uppercase text-slate-500">My Audits</p>
            <p className="mt-3 text-lg font-semibold">{state.audit.title}</p>
            <p className="mt-2 text-sm text-slate-600">{state.audit.id}</p>
          </Link>
          <Link className="workbench-panel p-5" href="/tracker">
            <p className="text-xs font-semibold uppercase text-slate-500">Audit Tracker</p>
            <p className="mt-3 text-lg font-semibold">Portfolio overview</p>
            <p className="mt-2 text-sm text-slate-600">Review due dates and actions.</p>
          </Link>
        </div>
      </div>
    </PortalShell>
  );
}
