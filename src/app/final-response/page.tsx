import Link from "next/link";
import { PortalShell } from "@/components/PortalShell";
import { Card, HumanReviewBanner, PrimaryButton, SectionHeading, StatusBadge } from "@/components/ui";
import { documentRequest, evidenceDocuments, tasks } from "@/data/mockData";

export default function FinalResponseBuilderPage() {
  return (
    <PortalShell copilotKey="finalResponse" copilotTitle="Evidence packaging" currentStep="response">
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="rounded-2xl bg-brand px-6 py-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Final response builder</p>
              <h1 className="mt-2 text-2xl font-semibold">{documentRequest.title}</h1>
              <p className="mt-2 text-sm text-blue-100">All supporting tasks are closed and eligible for evidence selection.</p>
            </div>
            <StatusBadge status="Ready for Response" />
          </div>
        </section>
        <HumanReviewBanner>
          The human reviewer determines which approved task responses and documents belong in the package and supplies
          final drafting instructions before generation.
        </HumanReviewBanner>
        <div className="grid gap-5 xl:grid-cols-2">
          <Card>
            <SectionHeading eyebrow="Task responses" title="Select responses to include" />
            <div className="mt-4 space-y-3">
              {tasks.map((task) => (
                <label className="flex gap-3 rounded-xl border border-slate-200 p-3 text-sm" key={task.id}>
                  <input className="mt-1 accent-blue-700" defaultChecked={task.id !== "TA-204"} type="checkbox" />
                  <span>
                    <strong className="block text-slate-900">{task.title}</strong>
                    <span className="text-xs text-slate-500">{task.id} / Closed / Reviewer-approved response</span>
                  </span>
                </label>
              ))}
            </div>
          </Card>
          <Card>
            <SectionHeading eyebrow="Supporting evidence" title="Select documents to attach" />
            <div className="mt-4 space-y-3">
              {evidenceDocuments.map((document) => (
                <label className="flex gap-3 rounded-xl border border-slate-200 p-3 text-sm" key={document.id}>
                  <input className="mt-1 accent-blue-700" defaultChecked={document.included} type="checkbox" />
                  <span>
                    <strong className="block text-slate-900">{document.name}</strong>
                    <span className="text-xs text-slate-500">{document.traceability}</span>
                  </span>
                </label>
              ))}
            </div>
            <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="instructions">
              Final drafting instructions
            </label>
            <textarea
              className="mt-2 min-h-[106px] w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm leading-6 text-slate-700"
              defaultValue="Prepare a concise, regulator-ready response. Include income itemization by category, reconcile to GL summary, and call out exclusions separately."
              id="instructions"
            />
            <Link className="mt-5 inline-block" href="/final-response/review">
              <PrimaryButton>Generate Final Response Package</PrimaryButton>
            </Link>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}

