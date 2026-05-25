import { FinalApproval } from "@/components/FinalApproval";
import { PortalShell } from "@/components/PortalShell";
import { Card, HumanReviewBanner, SectionHeading, StatusBadge } from "@/components/ui";
import { documentRequest, evidenceDocuments, finalResponsePackage } from "@/data/mockData";

export default function FinalResponseReviewPage() {
  return (
    <PortalShell copilotKey="finalReview" copilotTitle="Final response agent" currentStep="response">
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="rounded-2xl bg-brand px-6 py-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Response creator agent output</p>
              <h1 className="mt-2 text-2xl font-semibold">Final response review package</h1>
              <p className="mt-2 text-sm text-blue-100">{documentRequest.id} / {documentRequest.question}</p>
            </div>
            <StatusBadge status="Pending Review" />
          </div>
        </section>
        <HumanReviewBanner>
          This agent-prepared draft remains a proposal. The reviewer must check evidence, assumptions, and data lineage
          before recording approval for submission.
        </HumanReviewBanner>
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <Card>
              <SectionHeading eyebrow="Final response draft" title="Regulator-ready narrative" />
              <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{finalResponsePackage.draft}</p>
            </Card>
            <Card>
              <SectionHeading eyebrow="Data lineage and explainability" title="Traceability to selected evidence" />
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                {finalResponsePackage.lineage.map((line) => (
                  <div className="grid gap-2 border-b border-slate-100 p-4 text-sm last:border-0 md:grid-cols-[1.2fr_1fr_0.7fr]" key={line.source}>
                    <p className="font-semibold text-slate-900">{line.source}</p>
                    <p className="text-slate-600">{line.supports}</p>
                    <p className="text-slate-500">Approved: {line.approvedBy}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-5">
            <Card>
              <SectionHeading eyebrow="Evidence summary" title="Attached documents" />
              <p className="mt-3 text-sm leading-6 text-slate-600">{finalResponsePackage.evidenceSummary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {evidenceDocuments.map((document) => <li key={document.id}>✓ {document.name}</li>)}
              </ul>
            </Card>
            <Card>
              <SectionHeading eyebrow="Reviewer checks" title="Required validation" />
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {finalResponsePackage.reviewerChecks.map((check) => <li key={check}>□ {check}</li>)}
              </ul>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Open assumptions</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {finalResponsePackage.assumptions.map((assumption) => <li key={assumption}>• {assumption}</li>)}
              </ul>
            </Card>
          </div>
        </div>
        <FinalApproval />
      </div>
    </PortalShell>
  );
}

