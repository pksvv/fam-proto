import { PortalShell } from "@/components/PortalShell";
import { TaskList } from "@/components/TaskList";
import { Card, PrimaryButton, SecondaryButton, SectionHeading, StatusBadge } from "@/components/ui";
import { documentRequest, progressingTasks } from "@/data/mockData";

export default function DocumentRequestDetailPage() {
  return (
    <PortalShell copilotKey="documentDetail" copilotTitle="IDR task oversight" currentStep="audit-detail">
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="rounded-2xl bg-brand px-6 py-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Document request details</p>
              <h1 className="mt-2 text-2xl font-semibold">{documentRequest.title}</h1>
              <p className="mt-2 text-sm text-blue-100">{documentRequest.id} / Due {documentRequest.dueDate}</p>
            </div>
            <StatusBadge status="Ready for Response" />
          </div>
        </section>
        <Card>
          <SectionHeading eyebrow="IDR question" title={documentRequest.question} />
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-700">
            <p><span className="text-slate-500">Owner:</span> {documentRequest.owner}</p>
            <p><span className="text-slate-500">DR Reviewer:</span> {documentRequest.reviewer}</p>
            <p><span className="text-slate-500">Tasks closed:</span> 2 of 5</p>
          </div>
        </Card>
        <Card>
          <SectionHeading eyebrow="Child tasks" title="Task response collection" aside={<StatusBadge status="Ready for Response" />} />
          <TaskList tasks={progressingTasks} />
          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton>View Responses</PrimaryButton>
            <SecondaryButton>Create Task Response</SecondaryButton>
          </div>
        </Card>
      </div>
    </PortalShell>
  );
}
