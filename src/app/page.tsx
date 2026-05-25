import Link from "next/link";
import { PortalShell } from "@/components/PortalShell";
import { Card, PrimaryButton, SectionHeading, StatusBadge } from "@/components/ui";
import { auditRequest, documentRequest } from "@/data/mockData";

const homeCards = [
  {
    title: "New Audit Submission",
    description: "Start from a new notice or supporting request.",
    value: "Create",
  },
  {
    title: "My Actions",
    description: "Human approvals requiring your review.",
    value: "03",
  },
  {
    title: "My Audits",
    description: "Active direct tax audit requests.",
    value: "07",
  },
  {
    title: "Audit Tracker",
    description: "Upcoming response due dates.",
    value: "04",
  },
  {
    title: "Notifications",
    description: "Evidence and reviewer updates.",
    value: "12",
  },
];

export default function HomePage() {
  return (
    <PortalShell copilotKey="home" copilotTitle="Start an IDR review" currentStep="home">
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="rounded-2xl bg-brand px-6 py-6 text-white shadow-sm md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">Audit owner home</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">Welcome to Audit management</h1>
              <p className="mt-2 max-w-2xl text-sm text-blue-100">
                Review AI-assisted intake, organize evidence, and keep regulatory responses human-approved.
              </p>
            </div>
            <Link href="/intake">
              <PrimaryButton className="!bg-white !text-brand hover:!bg-blue-50">Use Sample IRS IDR</PrimaryButton>
            </Link>
          </div>
        </section>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {homeCards.map((card) => (
            <Card className="min-h-[144px]" key={card.title}>
              <p className="text-sm font-semibold text-slate-900">{card.title}</p>
              <p className="mt-3 text-3xl font-semibold text-brand">{card.value}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{card.description}</p>
            </Card>
          ))}
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
          <Card>
            <SectionHeading eyebrow="Recent audit" title={auditRequest.title} aside={<StatusBadge status="Pending Review" />} />
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-slate-500">Audit ID</dt>
                <dd className="mt-1 font-semibold">{auditRequest.id}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Entity</dt>
                <dd className="mt-1 font-semibold">{auditRequest.entity}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Period</dt>
                <dd className="mt-1 font-semibold">{auditRequest.period}</dd>
              </div>
            </dl>
          </Card>
          <Card>
            <SectionHeading eyebrow="New IDR" title={documentRequest.title} aside={<StatusBadge status="Draft" />} />
            <p className="mt-4 text-sm text-slate-600">{documentRequest.question}</p>
            <Link className="mt-5 inline-block" href="/intake">
              <PrimaryButton>Open AI Intake</PrimaryButton>
            </Link>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}
