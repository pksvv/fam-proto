import Link from "next/link";
import { PortalShell } from "@/components/PortalShell";
import { TaskList } from "@/components/TaskList";
import { Card, HumanReviewBanner, PrimaryButton, SectionHeading, StatusBadge } from "@/components/ui";
import { documentRequest, tasks } from "@/data/mockData";

export default function TaskStrategyPage() {
  return (
    <PortalShell copilotKey="tasks" copilotTitle="Task strategy agent" currentStep="tasks">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          Response strategy saved. Recommended child tasks are ready for human approval.
        </div>
        <section className="rounded-2xl bg-brand px-6 py-5 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Task strategy review</p>
              <h1 className="mt-2 text-2xl font-semibold">{documentRequest.title}</h1>
              <p className="mt-2 text-sm text-blue-100">Recommended work breakdown for {documentRequest.id}</p>
            </div>
            <StatusBadge status="Pending Review" />
          </div>
        </section>
        <HumanReviewBanner>
          The Task Reviewer approves task scope, ownership, timing, and dependencies before work items are created.
          Agent confidence supports review; it does not replace assignment decisions.
        </HumanReviewBanner>
        <Card>
          <SectionHeading
            eyebrow="Recommended child tasks"
            title="Five proposed work items"
            aside={<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand">Average confidence 92%</span>}
          />
          <TaskList detailed tasks={tasks.map((task) => ({ ...task, status: "Draft" }))} />
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <p className="max-w-xl text-sm text-slate-600">
              Creation records the approved task strategy beneath the IDR and opens the generated audit dashboard.
            </p>
            <Link href="/audits/PA-2025-IRS-104">
              <PrimaryButton>Create Tasks</PrimaryButton>
            </Link>
          </div>
        </Card>
      </div>
    </PortalShell>
  );
}

