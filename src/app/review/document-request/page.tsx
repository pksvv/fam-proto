import Link from "next/link";
import { PortalShell } from "@/components/PortalShell";
import { Card, Field, HumanReviewBanner, PrimaryButton, SectionHeading, StatusBadge } from "@/components/ui";
import { documentRequest } from "@/data/mockData";

export default function DocumentRequestReviewPage() {
  return (
    <PortalShell copilotKey="documentReview" copilotTitle="Document request hydration" currentStep="document-review">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          Parent audit request <strong>PA-2025-IRS-104</strong> created successfully after reviewer confirmation.
        </div>
        <section className="rounded-2xl bg-brand px-6 py-5 text-white shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Document request draft</p>
              <h1 className="mt-2 text-2xl font-semibold">{documentRequest.title}</h1>
              <p className="mt-2 text-sm text-blue-100">{documentRequest.id} / IDR - Individual Document Request</p>
            </div>
            <StatusBadge status="Pending Review" />
          </div>
        </section>
        <HumanReviewBanner>
          Document request fields have been hydrated from the IDR. The DR Reviewer verifies ownership, evidence scope,
          and due date before the record is created.
        </HumanReviewBanner>
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <SectionHeading eyebrow="Hydrated request fields" title="IDR details" />
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field label="Document Request ID" value={documentRequest.id} />
              <Field label="Title" value={documentRequest.title} />
              <Field label="Due date" value={documentRequest.dueDate} attention />
              <Field label="Owner / Reviewer" value={`${documentRequest.owner} / ${documentRequest.reviewer}`} attention />
            </dl>
            <div className="mt-4 rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">IDR question</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{documentRequest.question}</p>
            </div>
          </Card>
          <div className="space-y-5">
            <Card>
              <SectionHeading eyebrow="Evidence requested" title="Required support" />
              <ul className="mt-4 space-y-3">
                {documentRequest.requiredEvidence.map((evidence) => (
                  <li className="flex gap-3 text-sm text-slate-700" key={evidence}>
                    <span className="mt-0.5 text-emerald-600">✓</span>
                    {evidence}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <SectionHeading eyebrow="Suggested task groups" title="Potential owners" />
              <div className="mt-4 flex flex-wrap gap-2">
                {["Tax Accounting", "Revenue Systems", "GL Reporting", "Federal Tax Compliance"].map((team) => (
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-brand" key={team}>
                    {team}
                  </span>
                ))}
              </div>
              <Link className="mt-5 inline-block" href="/response-strategy">
                <PrimaryButton>Create Document Request</PrimaryButton>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

