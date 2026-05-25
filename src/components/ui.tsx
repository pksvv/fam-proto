import type { ReactNode } from "react";
import type { Status } from "@/data/mockData";

const statusStyle: Record<Status, string> = {
  Draft: "bg-slate-100 text-slate-700",
  "Pending Review": "bg-amber-100 text-amber-800",
  Pending: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-brand",
  Closed: "bg-emerald-100 text-emerald-700",
  "Ready for Response": "bg-indigo-100 text-indigo-700",
  "Ready for Submission": "bg-emerald-100 text-emerald-800",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}>
      {status}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  aside,
}: {
  eyebrow?: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      {aside}
    </div>
  );
}

export function PrimaryButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark ${className}`}
    >
      {children}
    </span>
  );
}

export function SecondaryButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
      {children}
    </span>
  );
}

export function Field({
  label,
  value,
  attention = false,
}: {
  label: string;
  value: string;
  attention?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-3 ${attention ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}>
      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</dt>
      <dd className="mt-2 text-sm font-medium text-slate-900">{value}</dd>
      {attention ? <p className="mt-2 text-xs font-semibold text-amber-700">Human confirmation needed</p> : null}
    </div>
  );
}

export function HumanReviewBanner({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-800">Human-in-the-loop review</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{children}</p>
    </div>
  );
}
