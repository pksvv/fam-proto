import type { ReactNode } from "react";

type EvidenceNotice = {
  name: string;
  size: string;
  uploadedAt: string;
};

export function EvidenceViewer({
  notice,
  extracted,
  preview,
}: {
  notice: EvidenceNotice | null;
  extracted: boolean;
  preview?: ReactNode;
}) {
  return (
    <section className="workbench-panel overflow-hidden bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Evidence viewer</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">Source IDR notice</h2>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand">
          {extracted ? "OCR mapped" : "Source document"}
        </span>
      </div>
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="truncate text-sm font-semibold text-slate-800">
          {notice?.name ?? "IRS_IDR_Income_Itemization_Sample.pdf"}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span>{notice?.size ?? "184.0 KB"}</span>
          <span>Page 1 of 1</span>
          <span>{notice ? "Selected evidence" : "Demo evidence preview"}</span>
        </div>
      </div>
      <div className="bg-slate-100 p-4">
        <div className="flex min-h-[540px] flex-col border border-slate-200 bg-white shadow-sm">
          {preview ?? <SyntheticEvidencePage extracted={extracted} />}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-slate-200 bg-white p-4 text-xs">
        <EvidenceFact label="Document type" value="IDR Notice" />
        <EvidenceFact label="Extraction confidence" value={extracted ? "93% verified" : "Pending OCR"} />
        <EvidenceFact label="Linked request" value="IDR-2025-018" />
        <EvidenceFact label="Retention" value="Local demo only" />
      </div>
    </section>
  );
}

function SyntheticEvidencePage({ extracted }: { extracted: boolean }) {
  return (
    <article className="mx-auto w-full max-w-[510px] px-8 py-9 text-sm leading-6 text-slate-700">
      <div className="flex items-start justify-between border-b-2 border-slate-800 pb-5">
        <div>
          <p className="text-base font-bold uppercase tracking-[0.12em] text-slate-900">Internal Revenue Service</p>
          <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-500">Information Document Request</p>
        </div>
        <p className="text-right text-xs text-slate-500">Form IDR<br />Synthetic demo</p>
      </div>
      <p className="mt-6 text-xs text-slate-500">Document Request ID</p>
      <EvidenceHighlight active={extracted}>IDR-2025-018</EvidenceHighlight>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-slate-500">Entity</p>
          <EvidenceHighlight active={extracted}>American Express Services Corp.</EvidenceHighlight>
        </div>
        <div>
          <p className="text-xs text-slate-500">Audit period</p>
          <EvidenceHighlight active={extracted}>Jan 01 2024 - Jan 31 2025</EvidenceHighlight>
        </div>
      </div>
      <div className="mt-7 border-t border-slate-200 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Requested information</p>
        <EvidenceHighlight active={extracted}>
          Provide income itemization details, including supporting schedules and reconciliation to the general ledger.
        </EvidenceHighlight>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-slate-500">Response due date</p>
          <EvidenceHighlight active={extracted}>Jul 01 2026</EvidenceHighlight>
        </div>
        <div>
          <p className="text-xs text-slate-500">Issuer</p>
          <p className="mt-1 font-medium text-slate-800">Internal Revenue Service</p>
        </div>
      </div>
      {extracted ? (
        <p className="mt-8 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
          Highlighted values mapped into the draft audit record.
        </p>
      ) : null}
    </article>
  );
}

function EvidenceHighlight({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <p className={`mt-1 rounded px-2 py-1 font-medium text-slate-800 ${active ? "bg-amber-100 ring-1 ring-amber-200" : ""}`}>
      {children}
    </p>
  );
}

function EvidenceFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-700">{value}</p>
    </div>
  );
}
