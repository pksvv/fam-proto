import { IntakeWorkflow } from "@/components/IntakeWorkflow";
import { PortalShell } from "@/components/PortalShell";
import { Card, SectionHeading, StatusBadge } from "@/components/ui";
import { auditRequest, documentRequest } from "@/data/mockData";

export default function IntakePage() {
  return (
    <PortalShell copilotKey="intake" copilotTitle="IDR intake analysis" currentStep="intake">
      <div className="mx-auto max-w-6xl space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">New Audit Submission</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">AI IDR Intake</h1>
          <p className="mt-2 text-sm text-slate-600">
            A synthetic notice is shown below. Extracted fields require human verification before record creation.
          </p>
        </div>
        <div className="grid gap-5 xl:grid-cols-[1fr_0.88fr]">
          <Card className="p-0">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <SectionHeading eyebrow="Document preview" title="Synthetic_IDR_2025_018.pdf" />
              <StatusBadge status="Pending Review" />
            </div>
            <div className="m-5 rounded-lg border border-slate-200 bg-white p-7 shadow-inner">
              <div className="border-b-2 border-slate-800 pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                  Internal Revenue Service
                </p>
                <p className="mt-2 text-xs text-slate-500">Synthetic demonstration notice - not an actual filing</p>
              </div>
              <div className="mt-5 space-y-4 text-sm text-slate-700">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Document Request ID</span>
                  <strong>{documentRequest.id}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Entity</span>
                  <strong>{auditRequest.entity}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Period</span>
                  <strong>{auditRequest.period}</strong>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Request</p>
                  <p className="mt-2 font-medium">{documentRequest.question}</p>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Response due date</p>
                  <p className="mt-2 font-medium">{documentRequest.dueDate}</p>
                </div>
              </div>
            </div>
          </Card>
          <div className="space-y-5">
            <Card>
              <SectionHeading eyebrow="Extracted context" title={auditRequest.title} aside={<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand">93% confidence</span>} />
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Issuer</dt>
                  <dd className="font-semibold">{auditRequest.issuer}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Audit type</dt>
                  <dd className="font-semibold">{auditRequest.auditType}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Market</dt>
                  <dd className="font-semibold">{auditRequest.market}</dd>
                </div>
              </dl>
            </Card>
            <IntakeWorkflow />
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

