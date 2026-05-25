import Link from "next/link";
import { PortalShell } from "@/components/PortalShell";
import { Card, Field, HumanReviewBanner, PrimaryButton, SectionHeading, StatusBadge } from "@/components/ui";
import { auditRequest } from "@/data/mockData";

const fields = [
  ["Audit title", auditRequest.title],
  ["Audit type", auditRequest.auditType],
  ["Entity", auditRequest.entity],
  ["Region", auditRequest.region],
  ["Market", auditRequest.market],
  ["Start date", "Jan 01 2024"],
  ["End date", "Jan 31 2025"],
  ["Source document", "Synthetic_IDR_2025_018.pdf"],
] as const;

export default function ParentAuditReviewPage() {
  return (
    <PortalShell copilotKey="auditReview" copilotTitle="Parent audit creation" currentStep="audit-review">
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="rounded-2xl bg-brand px-6 py-5 text-white shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Parent audit request draft</p>
              <h1 className="mt-2 text-2xl font-semibold">{auditRequest.title}</h1>
              <p className="mt-2 text-sm text-blue-100">{auditRequest.noticeType} / {auditRequest.issuer}</p>
            </div>
            <StatusBadge status="Pending Review" />
          </div>
        </section>
        <HumanReviewBanner>
          AI has proposed a parent record from the synthetic IDR. The Audit Owner must validate key fields and
          explicitly approve creation; nothing is submitted to a regulator.
        </HumanReviewBanner>
        <Card>
          <SectionHeading
            eyebrow="Extracted fields"
            title="Review parent audit request"
            aside={<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand">Overall confidence 93%</span>}
          />
          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {fields.map(([label, value]) => (
              <Field key={label} label={label} value={value} />
            ))}
          </dl>
        </Card>
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <Card>
            <SectionHeading eyebrow="Fields needing confirmation" title="Review flags" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field attention label="Audit period ending" value="Jan 31 2025" />
              <Field attention label="Assigned Audit Owner" value="R Kaus" />
            </div>
          </Card>
          <Card>
            <SectionHeading eyebrow="Approval action" title="Create reviewed record" />
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Approving this draft records the parent audit and advances to IDR field validation.
            </p>
            <Link className="mt-5 inline-block" href="/review/document-request">
              <PrimaryButton>Create Parent Audit Request</PrimaryButton>
            </Link>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}

