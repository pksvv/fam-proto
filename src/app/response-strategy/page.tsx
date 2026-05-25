import { PortalShell } from "@/components/PortalShell";
import { Card, HumanReviewBanner, PrimaryButton, SectionHeading, StatusBadge } from "@/components/ui";
import { documentRequest, responseStrategy } from "@/data/mockData";

export default function ResponseStrategyPage() {
  return (
    <PortalShell copilotKey="strategy" copilotTitle="Response strategy agent" currentStep="strategy">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          Document request <strong>{documentRequest.id}</strong> created successfully. Strategy review is ready.
        </div>
        <section className="rounded-2xl bg-brand px-6 py-5 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Response strategy review</p>
              <h1 className="mt-2 text-2xl font-semibold">{documentRequest.title}</h1>
            </div>
            <StatusBadge status="Ready for Response" />
          </div>
        </section>
        <HumanReviewBanner>
          The recommendation explains why each evidence source is requested. A reviewer edits and approves the
          strategy before child tasks can be proposed.
        </HumanReviewBanner>
        <div className="grid gap-5 xl:grid-cols-[1.25fr_0.85fr]">
          <div className="space-y-5">
            <Card>
              <SectionHeading eyebrow="Recommended response strategy" title="Editable reviewer draft" />
              <label className="sr-only" htmlFor="strategy-draft">Response strategy</label>
              <textarea
                className="mt-4 min-h-[122px] w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none"
                defaultValue={responseStrategy.recommendation}
                id="strategy-draft"
              />
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">Why this was proposed</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{responseStrategy.explanation}</p>
              </div>
            </Card>
            <Card>
              <SectionHeading eyebrow="Auditability" title="Classification and historical pattern" />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">QUESTION CLASSIFICATION</p>
                  <p className="mt-2 text-sm font-semibold">{responseStrategy.classification}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">HISTORICAL MATCH</p>
                  <p className="mt-2 text-sm font-semibold">{responseStrategy.historicalMatch}</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-5">
            <Card>
              <SectionHeading eyebrow="Evidence checklist" title="Data sources needed" />
              <ul className="mt-4 space-y-3">
                {responseStrategy.dataSources.map((source) => (
                  <li className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700" key={source}>
                    ✓ {source}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <SectionHeading eyebrow="Risk and compliance" title="Reviewer considerations" />
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {responseStrategy.riskConsiderations.map((risk) => <li key={risk}>• {risk}</li>)}
              </ul>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Open questions</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {responseStrategy.gaps.map((gap) => <li key={gap}>• {gap}</li>)}
              </ul>
              <span className="mt-5 inline-block">
                <PrimaryButton>Save Strategy</PrimaryButton>
              </span>
              <p className="mt-3 text-xs text-slate-500">Next: reviewer-approved child task proposal.</p>
            </Card>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
