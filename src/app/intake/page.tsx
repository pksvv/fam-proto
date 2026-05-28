"use client";

import Link from "next/link";
import { useEffect, useState, type DragEvent } from "react";
import { EvidenceViewer } from "@/components/EvidenceViewer";
import { PortalShell } from "@/components/PortalShell";
import { useWorkflow } from "@/components/WorkflowContext";

const processStages = [
  "Document received in secure local workspace",
  "OCR is digitising the IDR document...",
  "Audit context is being extracted...",
  "Draft fields are ready for human review",
];

export default function IntakePage() {
  const { state, setNotice, markExtracted } = useWorkflow();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState("");
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [stage, setStage] = useState(state.extracted ? processStages.length : 0);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function receiveFile(file: File) {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setPreviewType(file.type);
    setNotice({
      name: file.name,
      type: file.type || "Document",
      size: `${(file.size / 1024).toFixed(1)} KB`,
      uploadedAt: new Date().toLocaleString(),
    });
    setStage(1);
  }

  function loadSampleNotice() {
    setPreviewUrl(null);
    setPreviewType("sample");
    setNotice({
      name: "IRS_IDR_Income_Itemization_Sample.pdf",
      type: "application/pdf",
      size: "184.0 KB",
      uploadedAt: new Date().toLocaleString(),
    });
    setStage(1);
  }

  function dropFile(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) receiveFile(file);
  }

  function extractContext() {
    if (!state.notice || processing) return;
    setProcessing(true);
    setStage(2);
    window.setTimeout(() => setStage(3), 500);
    window.setTimeout(() => {
      setStage(4);
      setProcessing(false);
      markExtracted();
    }, 1100);
  }

  return (
    <PortalShell copilotKey="intake" copilotTitle="IDR intake analysis" currentStep="intake">
      <div className="mx-auto max-w-[1320px] space-y-4">
        <div className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">New Audit Submission &gt;&gt; Upload IDR Notice</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">New Audit Submission</h1>
        </div>
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(350px,1.12fr)_minmax(300px,0.88fr)]">
          {!state.notice ? (
            <section className="workbench-panel overflow-hidden">
              <div className="workbench-blue-header flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">IDR / Audit Notice</h2>
                  <p className="mt-2 text-sm text-blue-100">Drop a notice to begin document-assisted intake</p>
                </div>
              </div>
              <div
                className={`m-6 flex min-h-[620px] cursor-pointer flex-col items-center justify-center border-2 border-dashed px-8 text-center transition ${
                  dragging ? "border-brand bg-blue-50" : "border-slate-300 bg-slate-50/70"
                }`}
                onDragEnter={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={dropFile}
              >
                <label className="flex cursor-pointer flex-col items-center text-center">
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-3xl text-brand">+</span>
                  <strong className="text-lg text-slate-800">Drag and drop IDR document here</strong>
                  <span className="mt-2 text-sm text-slate-500">or click to browse PDF, PNG, JPG or DOCX</span>
                  <input
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) receiveFile(file);
                    }}
                    type="file"
                  />
                </label>
                <button className="workbench-secondary mt-7" onClick={loadSampleNotice} type="button">
                  Use Sample IRS IDR
                </button>
              </div>
            </section>
          ) : (
            <div>
              <EvidenceViewer
                extracted={state.extracted}
                notice={state.notice}
                preview={previewUrl && previewType.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="Uploaded document preview" className="m-auto max-h-[520px] object-contain p-5" src={previewUrl} />
                  ) : previewUrl && previewType === "application/pdf" ? (
                    <iframe className="h-[540px] w-full" src={previewUrl} title="Uploaded PDF preview" />
                  ) : undefined}
              />
              <button className="workbench-secondary mt-3" onClick={loadSampleNotice} type="button">
                Reset to sample notice
              </button>
            </div>
          )}
          <section className="workbench-panel p-6">
            <h2 className="text-lg font-semibold">Digitise and map document</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Document stays local in this static prototype. The extraction populates synthetic IDR fields for reviewer actions.
            </p>
            <ol className="mt-6 space-y-3">
              {processStages.map((item, index) => (
                <li className={`flex items-center gap-3 rounded border px-4 py-3 text-sm ${
                  stage > index ? "border-emerald-200 bg-emerald-50 text-emerald-800" : stage === index && processing ? "border-blue-200 bg-blue-50 text-brand" : "border-slate-200 text-slate-500"
                }`} key={item}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold">
                    {stage > index ? "OK" : index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            {!state.extracted ? (
              <button className="workbench-primary mt-6 w-full disabled:opacity-40" disabled={!state.notice || processing} onClick={extractContext} type="button">
                {processing ? "Processing document..." : "Run OCR and Extract Context"}
              </button>
            ) : (
              <div className="mt-6 space-y-4">
                <p className="workbench-success">Extraction complete. Human review is required before creating an audit.</p>
                <Link className="workbench-primary block text-center" href="/review/audit">
                  New Audit - Review Extracted Fields
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
