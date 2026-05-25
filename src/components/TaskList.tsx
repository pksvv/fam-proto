import Link from "next/link";
import type { AuditTask } from "@/data/mockData";
import { StatusBadge } from "./ui";

export function TaskList({
  tasks,
  detailed = false,
  linked = false,
}: {
  tasks: AuditTask[];
  detailed?: boolean;
  linked?: boolean;
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
      <div className="hidden grid-cols-[1.8fr_0.9fr_1fr_0.8fr] gap-3 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
        <span>Task</span>
        <span>Assignee / Team</span>
        <span>Due date</span>
        <span>Status</span>
      </div>
      {tasks.map((task) => (
        <article className="border-t border-slate-100 px-4 py-4 first:border-t-0" key={task.id}>
          <div className="grid gap-3 md:grid-cols-[1.8fr_0.9fr_1fr_0.8fr] md:items-center">
            <div>
              <p className="text-xs font-semibold text-brand">{task.id}</p>
              {linked && task.id === "TA-201" ? (
                <Link className="mt-1 block text-sm font-semibold text-slate-900 hover:text-brand" href={`/tasks/${task.id}`}>
                  {task.title}
                  <span className="ml-2 text-xs font-normal text-brand">(open collaboration example)</span>
                </Link>
              ) : (
                <p className="mt-1 text-sm font-semibold text-slate-900">{task.title}</p>
              )}
            </div>
            <div className="text-sm text-slate-700">
              <p className="font-medium">{task.assignee}</p>
              <p className="text-xs text-slate-500">{task.team}</p>
            </div>
            <p className="text-sm text-slate-700">{task.dueDate}</p>
            <StatusBadge status={task.status} />
          </div>
          {detailed ? (
            <div className="mt-3 grid gap-3 rounded-lg bg-slate-50 px-3 py-3 text-xs text-slate-600 md:grid-cols-3">
              <p><strong className="text-slate-700">Dependency:</strong> {task.dependency}</p>
              <p><strong className="text-slate-700">Confidence:</strong> {task.confidence}%</p>
              <p><strong className="text-slate-700">Rationale:</strong> {task.rationale}</p>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
