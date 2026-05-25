import { PortalShell } from "@/components/PortalShell";
import { Card, HumanReviewBanner, SectionHeading, StatusBadge } from "@/components/ui";
import { collaborationNotes, evidenceDocuments, tasks } from "@/data/mockData";

const task = tasks[0];

export default function TaskDetailPage() {
  return (
    <PortalShell copilotKey="taskDetail" copilotTitle="Manual task collaboration" currentStep="audit-detail">
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="rounded-2xl bg-brand px-6 py-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">{task.id} / Task detail</p>
              <h1 className="mt-2 text-2xl font-semibold">{task.title}</h1>
              <p className="mt-2 text-sm text-blue-100">Supporting task for IDR-2025-018 / Income Itemization Details</p>
            </div>
            <StatusBadge status="Closed" />
          </div>
          <dl className="mt-6 grid gap-4 border-t border-white/20 pt-5 text-sm sm:grid-cols-4">
            <div><dt className="text-blue-100">Assigned to</dt><dd className="mt-1 font-semibold">{task.assignee}</dd></div>
            <div><dt className="text-blue-100">Team</dt><dd className="mt-1 font-semibold">{task.team}</dd></div>
            <div><dt className="text-blue-100">Reviewer</dt><dd className="mt-1 font-semibold">{task.reviewer}</dd></div>
            <div><dt className="text-blue-100">Due date</dt><dd className="mt-1 font-semibold">{task.dueDate}</dd></div>
          </dl>
        </section>
        <HumanReviewBanner>
          MVP1 remains manual: team members compose responses, upload evidence, and close tasks. Copilot summaries are
          contextual aids only.
        </HumanReviewBanner>
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <SectionHeading eyebrow="Notes" title="Conversation" aside={<span className="text-xs font-semibold text-brand">Documents</span>} />
            <div className="mt-5 space-y-4">
              {collaborationNotes.map((note) => (
                <div className="rounded-xl bg-slate-50 p-4" key={note.time}>
                  <div className="flex flex-wrap justify-between gap-2 text-xs">
                    <p className="font-semibold text-slate-800">{note.author} <span className="font-normal text-slate-500">/ {note.role}</span></p>
                    <p className="text-slate-500">{note.time}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{note.text}</p>
                </div>
              ))}
            </div>
          </Card>
          <div className="space-y-5">
            <Card>
              <SectionHeading eyebrow="Documents" title="Supporting uploads" />
              <div className="mt-4 space-y-2">
                {evidenceDocuments.slice(0, 2).map((document) => (
                  <div className="rounded-lg border border-slate-100 px-3 py-3 text-sm" key={document.id}>
                    <p className="font-semibold text-slate-800">{document.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{document.type} / Uploaded by {document.owner}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-5 text-center text-sm text-slate-500">
                Upload box - evidence attached manually
              </div>
            </Card>
            <Card>
              <SectionHeading eyebrow="Task response" title="Assignee response" aside={<StatusBadge status="Closed" />} />
              <textarea
                className="mt-4 min-h-[112px] w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm leading-6 text-slate-700"
                defaultValue="Monthly income itemization has been compiled by category and reconciled to the reporting summary. Separately identified adjustment and exclusion items are documented for reviewer sign-off."
              />
              <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="status">
                Status
              </label>
              <select className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" defaultValue="Closed" id="status">
                <option>In Progress</option>
                <option>Pending Review</option>
                <option>Closed</option>
              </select>
            </Card>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

