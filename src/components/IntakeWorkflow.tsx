"use client";

import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "./ui";

const stages = [
  { title: "Upload received", text: "Synthetic IDR notice available for intake." },
  { title: "OCR complete", text: "Text blocks and headings digitised with 98% confidence." },
  { title: "Context extracted", text: "Issuer, entity, period and IDR question identified." },
];

export function IntakeWorkflow() {
  const [selected, setSelected] = useState<"new" | "existing" | null>(null);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Agent activity</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {stages.map((stage, index) => (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3" key={stage.title}>
            <p className="text-xs font-semibold text-emerald-700">0{index + 1} / Complete</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{stage.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{stage.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-slate-900">Human decision required</p>
        <p className="mt-1 text-sm text-slate-600">
          Does this extracted notice belong to an existing audit or should a new parent audit be drafted?
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={() => setSelected("new")} type="button">
            <PrimaryButton>New Audit</PrimaryButton>
          </button>
          <button onClick={() => setSelected("existing")} type="button">
            <SecondaryButton>Existing Audit</SecondaryButton>
          </button>
        </div>
      </div>
      {selected === "new" ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm font-medium text-brand">
            New Audit selected. A parent audit request can now be reviewed before creation.
          </p>
          <span className="rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand">
            Next: Parent Audit Review
          </span>
        </div>
      ) : null}
      {selected === "existing" ? (
        <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Existing-audit matching is displayed for context only in this demo. Choose <strong>New Audit</strong> to
          continue the leadership journey.
        </p>
      ) : null}
    </section>
  );
}
