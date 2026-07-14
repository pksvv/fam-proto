"use client";

import { useEffect, useState } from "react";
import { PortalShell } from "@/components/PortalShell";
import {
  audit,
  evidenceObject,
  journeySteps,
  practicalExample,
  priorAudit,
  responseClaim,
  responseVersions,
  semanticConnections,
  supportingItems,
} from "@/data/semanticDemoData";

const walkthroughSections = [
  "semantic-overview",
  "semantic-journey",
  "semantic-connections",
  "semantic-example",
  "semantic-trace",
];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li className="flex gap-2 text-sm leading-6 text-slate-700" key={item}>
          <span aria-hidden="true" className="mt-1 font-bold text-emerald-600">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SemanticDemoPage() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedSupport, setSelectedSupport] = useState(0);
  const [responseMode, setResponseMode] = useState<"ai" | "human">("ai");
  const [traceOpen, setTraceOpen] = useState(false);
  const [walkthroughIndex, setWalkthroughIndex] = useState<number | null>(null);
  const [walkthroughActive, setWalkthroughActive] = useState(false);

  const activeResponse = responseVersions[responseMode];
  const activeSupport = supportingItems[selectedSupport];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setSelectedStep((current) => (current + 1) % journeySteps.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!walkthroughActive || walkthroughIndex === null) return;
    const target = document.getElementById(walkthroughSections[walkthroughIndex]);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });

    const timer = window.setTimeout(() => {
      if (walkthroughIndex === walkthroughSections.length - 1) {
        setWalkthroughActive(false);
        return;
      }
      setWalkthroughIndex((current) => (current === null ? 0 : current + 1));
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [walkthroughActive, walkthroughIndex]);

  function selectJourneyStep(index: number) {
    setSelectedStep(index);
    setIsPlaying(false);
  }

  function resetDemo() {
    setSelectedStep(0);
    setIsPlaying(true);
    setSelectedSupport(0);
    setResponseMode("ai");
    setTraceOpen(false);
    setWalkthroughActive(false);
    setWalkthroughIndex(null);
    document.getElementById("semantic-overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startWalkthrough() {
    setWalkthroughIndex(0);
    setWalkthroughActive(true);
  }

  return (
    <PortalShell copilotKey="home" copilotTitle="Semantic evidence context" currentStep="semantic-demo">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <header
          className={`semantic-section workbench-panel overflow-hidden ${walkthroughIndex === 0 ? "semantic-section-focus" : ""}`}
          id="semantic-overview"
        >
          <div className="workbench-blue-header">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">
                  Tax Audit Management
                </p>
                <h1 className="mt-2 text-3xl font-semibold">Semantic Data Layer</h1>
                <p className="mt-3 text-lg leading-7 text-blue-50">
                  A connected Tax Audit Evidence Fabric linking return data, tax issues, workpapers, evidence, controls and response claims.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                {walkthroughIndex !== null ? (
                  <span className="mr-1 text-xs font-semibold text-blue-100">
                    Walkthrough {walkthroughIndex + 1} / {walkthroughSections.length}
                  </span>
                ) : null}
                <button
                  className="rounded border border-white/50 bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-blue-50"
                  onClick={startWalkthrough}
                  type="button"
                >
                  {walkthroughActive ? "Restart Walkthrough" : "Start Walkthrough"}
                </button>
                <button
                  className="rounded border border-white/50 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                  onClick={resetDemo}
                  type="button"
                >
                  Reset Demo
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-5 px-7 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-4xl text-base leading-7 text-slate-700">
              A connected evidence layer that helps AI understand the audit, reuse prior logic and generate traceable responses.
            </p>
            <p className="max-w-xl border-l-4 border-brand pl-4 text-sm font-semibold leading-6 text-slate-800">
              From IRS request to final response, every important claim remains connected to supporting evidence and human approval.
            </p>
          </div>
          <div className="grid border-t border-slate-200 bg-slate-50 md:grid-cols-3">
            {[
              ["1", "The audit portal manages the workflow."],
              ["2", "The Semantic Data Layer connects audit context, evidence, controls and prior logic."],
              ["3", "AI proposes a defensible response; humans remain responsible for review and approval."],
            ].map(([number, message], index) => (
              <div className={`flex gap-3 px-6 py-4 ${index > 0 ? "border-t border-slate-200 md:border-l md:border-t-0" : ""}`} key={number}>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">{number}</span>
                <p className="text-sm font-semibold leading-6 text-slate-700">{message}</p>
              </div>
            ))}
          </div>
        </header>

        <section
          className={`semantic-section workbench-panel p-6 ${walkthroughIndex === 1 ? "semantic-section-focus" : ""}`}
          aria-labelledby="journey-heading"
          id="semantic-journey"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Simple audit journey</p>
              <h2 className="mt-1 text-xl font-semibold" id="journey-heading">
                How the Semantic Layer Supports an Audit Response
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${isPlaying ? "semantic-live-dot bg-emerald-500" : "bg-slate-300"}`} />
              <p className="text-sm text-slate-500">{isPlaying ? "Auto-playing journey" : "Journey paused"}</p>
              <button
                aria-label={isPlaying ? "Pause journey" : "Play journey"}
                className="workbench-secondary px-3 py-2"
                onClick={() => setIsPlaying((current) => !current)}
                type="button"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-2 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] xl:items-stretch">
            {journeySteps.map((step, index) => (
              <div className="contents" key={step.title}>
                <button
                  aria-pressed={selectedStep === index}
                  className={`semantic-step-card min-h-28 rounded-lg border p-4 text-left ${
                    selectedStep === index
                      ? "is-active border-brand bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-300"
                  }`}
                  onClick={() => selectJourneyStep(index)}
                  type="button"
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    selectedStep === index ? "bg-brand text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {index + 1}
                  </span>
                  <span className="mt-3 block text-sm font-semibold leading-5 text-slate-900">{step.title}</span>
                </button>
                {index < journeySteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={`semantic-arrow hidden self-center text-xl font-semibold xl:block ${index < selectedStep ? "is-complete" : index === selectedStep ? "is-active" : ""}`}
                  >
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3" aria-live="polite">
            <p className="text-sm font-semibold text-brand">{journeySteps[selectedStep].title}</p>
            <p className="mt-1 text-sm text-slate-700">{journeySteps[selectedStep].description}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-500"
                style={{ width: `${((selectedStep + 1) / journeySteps.length) * 100}%` }}
              />
            </div>
          </div>
        </section>

        <section
          className={`semantic-section workbench-panel overflow-hidden ${walkthroughIndex === 2 ? "semantic-section-focus" : ""}`}
          aria-labelledby="connections-heading"
          id="semantic-connections"
        >
          <div className="workbench-blue-header py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Connected context</p>
            <h2 className="mt-1 text-xl font-semibold" id="connections-heading">What Gets Connected</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-2 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] xl:items-stretch">
              {semanticConnections.map((connection, index) => (
                <div className="contents" key={connection.title}>
                  <article
                    className={`semantic-connection-card rounded-lg border p-4 ${
                      index <= selectedStep ? "is-connected" : "border-slate-200 bg-white"
                    } ${index === selectedStep ? "is-active" : ""}`}
                  >
                    <span className={`mb-3 block h-1 w-9 rounded-full ${index <= selectedStep ? "bg-brand" : "bg-slate-200"}`} />
                    <p className="text-sm font-semibold text-slate-900">{connection.title}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{connection.description}</p>
                  </article>
                  {index < semanticConnections.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={`semantic-connection-arrow hidden self-center text-xl font-semibold xl:block ${index < selectedStep ? "is-connected" : index === selectedStep ? "is-active" : ""}`}
                    >
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4">
              <p className="font-semibold text-amber-900">Workpaper is not the evidence itself.</p>
              <p className="mt-1 text-sm text-slate-700">The Evidence Object is the curated support used in the response.</p>
            </div>
          </div>
        </section>

        <section
          className={`semantic-section workbench-panel p-6 ${walkthroughIndex === 3 ? "semantic-section-focus" : ""}`}
          aria-labelledby="example-heading"
          id="semantic-example"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Connected context in action</p>
              <h2 className="mt-1 text-xl font-semibold" id="example-heading">A Practical Example</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {audit.idrId} · {audit.idrTitle}
            </span>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.9fr]">
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <dl className="grid gap-4 md:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Entity</dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">{audit.entity}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Audit</dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">{audit.title}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">IDR question</p>
                <p className="mt-1 text-sm leading-6 text-slate-800">“{audit.question}”</p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">AI proposed approach</p>
                <p className="mt-2 text-base font-semibold leading-7 text-slate-900">“{practicalExample.proposedApproach}”</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-5">
                  <h3 className="text-sm font-semibold text-slate-900">Why this approach was proposed</h3>
                  <div className="mt-3"><CheckList items={practicalExample.rationale} /></div>
                </div>
                <div className="rounded-lg border border-slate-200 p-5">
                  <h3 className="text-sm font-semibold text-slate-900">Supporting items</h3>
                  <p className="mt-1 text-xs text-slate-500">Select an item to preview its role.</p>
                  <div className="mt-3 space-y-2">
                    {supportingItems.map((item, index) => (
                      <button
                        aria-pressed={selectedSupport === index}
                        className={`semantic-support-button flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-semibold ${
                          selectedSupport === index
                            ? "is-active border-brand bg-blue-50 text-brand"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                        }`}
                        key={item.name}
                        onClick={() => setSelectedSupport(index)}
                        type="button"
                      >
                        <span>{item.name}</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <details className="rounded-lg border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer text-sm font-semibold text-brand">View prior audit match · {priorAudit.similarity}% similar</summary>
                <div className="mt-4 grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prior Audit</p>
                    <p className="mt-1 font-semibold">{priorAudit.id}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why it matched</p>
                    <div className="mt-1"><CheckList items={priorAudit.matchReasons} /></div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Outcome</p>
                    <span className="mt-1 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">{priorAudit.outcome}</span>
                  </div>
                </div>
              </details>
            </div>

            <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-slate-900 px-5 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">Evidence Object</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <h3 className="semantic-key-value text-lg font-semibold">{evidenceObject.id}</h3>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">{evidenceObject.status}</span>
                </div>
              </div>
              <div className="semantic-evidence-preview border-b border-blue-100 bg-blue-50 p-5" key={activeSupport.name}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">Selected support · {activeSupport.type}</p>
                    <h4 className="mt-1 text-base font-semibold text-slate-900">{activeSupport.name}</h4>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    activeSupport.status === "Approved"
                      ? "bg-emerald-100 text-emerald-800"
                      : activeSupport.status === "Reviewed"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-200 text-slate-700"
                  }`}>
                    {activeSupport.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{activeSupport.description}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-brand">{activeSupport.connection}</p>
              </div>
              <dl className="divide-y divide-slate-200 px-5">
                {[
                  ["Supported claim", evidenceObject.supportedClaim],
                  ["Source", evidenceObject.source],
                  ["Validation", evidenceObject.validation],
                  ["Residual variance", evidenceObject.residualVariance],
                  ["Confidence", `${evidenceObject.confidence}%`],
                  ["Owner", evidenceObject.owner],
                ].map(([label, value]) => (
                  <div className="py-4" key={label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
                    <dd className={`mt-1 text-sm font-semibold leading-6 text-slate-900 ${
                      label === "Supported claim" || label === "Residual variance" ? "semantic-key-value" : ""
                    }`}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </section>

        <section
          className={`semantic-section workbench-panel overflow-hidden ${walkthroughIndex === 4 ? "semantic-section-focus" : ""}`}
          aria-labelledby="trace-heading"
          id="semantic-trace"
        >
          <div className="workbench-blue-header py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Response traceability</p>
            <h2 className="mt-1 text-xl font-semibold" id="trace-heading">Trace the Final Response to Evidence</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Response state</p>
                <p className="mt-1 text-sm text-slate-600">Compare the proposed draft with the accountable human-reviewed response.</p>
              </div>
              <div className="inline-flex rounded-lg border border-slate-300 bg-slate-100 p-1" role="group" aria-label="Response version">
                {(["ai", "human"] as const).map((mode) => (
                  <button
                    aria-pressed={responseMode === mode}
                    className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                      responseMode === mode ? "bg-white text-brand shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                    key={mode}
                    onClick={() => setResponseMode(mode)}
                    type="button"
                  >
                    {responseVersions[mode].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="semantic-response-card mt-4 rounded-lg border border-slate-200 bg-slate-50 p-5" key={responseMode}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">{activeResponse.label}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  responseMode === "human" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {activeResponse.status}
                </span>
              </div>
              <blockquote className="mt-4 border-l-4 border-brand bg-white px-5 py-4 text-lg font-semibold leading-8 text-slate-900">
                “{activeResponse.text}”
              </blockquote>
              <p className="mt-3 text-xs font-semibold text-slate-600">
                {responseMode === "human"
                  ? "Human review confirms the wording, evidence selection and final decision."
                  : "AI has proposed this wording from connected context; a human reviewer must validate and approve it."}
              </p>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
              <button
                aria-expanded={traceOpen}
                className="flex w-full items-center justify-between text-left text-sm font-semibold text-brand"
                onClick={() => setTraceOpen((current) => !current)}
                type="button"
              >
                <span>View Evidence Trace</span>
                <span aria-hidden="true" className={`text-lg transition-transform duration-300 ${traceOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>
              {traceOpen ? (
                <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
                  <div className="semantic-trace-stage trace-delay-1 rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Response claim</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">USD 225,839,175 with no unexplained variance</p>
                  </div>
                  <span aria-hidden="true" className="semantic-trace-stage trace-delay-2 hidden self-center text-xl text-brand lg:block">→</span>
                  <div className="semantic-trace-stage trace-delay-2 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence Object</p>
                    <p className="semantic-key-value mt-2 text-sm font-semibold text-brand">{responseClaim.evidenceId}</p>
                    <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">Approved</span>
                  </div>
                  <span aria-hidden="true" className="semantic-trace-stage trace-delay-3 hidden self-center text-xl text-brand lg:block">→</span>
                  <div className="semantic-trace-stage trace-delay-3 rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sources</p>
                    <div className="mt-2"><CheckList items={responseClaim.sources} /></div>
                  </div>
                  <span aria-hidden="true" className="semantic-trace-stage trace-delay-4 hidden self-center text-xl text-brand lg:block">→</span>
                  <div className="semantic-trace-stage trace-delay-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Controls</p>
                    <div className="mt-2"><CheckList items={responseClaim.validations} /></div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-5 grid gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-center sm:grid-cols-3">
              <p className="font-semibold text-slate-900">AI drafts the response.</p>
              <p className="font-semibold text-slate-900">Approved evidence supports it.</p>
              <p className="font-semibold text-slate-900">Humans review and own the final decision.</p>
            </div>
          </div>
        </section>

        <footer className="rounded-lg border border-slate-300 bg-slate-900 px-6 py-5 text-center text-base font-semibold leading-7 text-white">
          “The Semantic Data Layer does not replace the audit workflow. It gives the workflow connected, reusable and governed context so AI can produce a more defensible response.”
        </footer>
      </div>
    </PortalShell>
  );
}
