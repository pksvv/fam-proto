"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/PortalShell";
import { ConfirmationModal, SuccessMessage } from "@/components/WorkbenchControls";
import { useWorkflow } from "@/components/WorkflowContext";
import { responseStrategy } from "@/data/mockData";
import { StatusBadge } from "@/components/ui";

export default function ResponseStrategyPage() {
  const router = useRouter();
  const { state, updateStrategy, saveStrategy } = useWorkflow();
  const [confirming, setConfirming] = useState(false);

  return (
    <PortalShell copilotKey="strategy" copilotTitle="Response strategy agent" currentStep="strategy">
      <div className="mx-auto max-w-[1320px] space-y-4">
        {state.documentRequestCreated ? <SuccessMessage>Document request {state.documentRequest.id} was created successfully.</SuccessMessage> : null}
        <header className="workbench-panel px-7 py-5">
          <p className="text-xs text-slate-500">Audit {state.audit.id} &gt;&gt; Document Request {state.documentRequest.id} &gt;&gt; Response Strategy</p>
          <h1 className="mt-2 text-2xl font-semibold">Response Strategy Review</h1>
        </header>
        <section className="workbench-panel overflow-hidden">
          <div className="workbench-blue-header flex justify-between">
            <div>
              <h2 className="text-xl">{state.documentRequest.title}</h2>
              <p className="mt-3 text-sm text-blue-100">{state.documentRequest.question}</p>
            </div>
            <StatusBadge status={state.strategySaved ? "Ready for Response" : "Pending Review"} />
          </div>
          <div className="grid gap-6 p-7 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="mb-3 text-sm font-semibold">Recommended Response Strategy*</p>
              <textarea
                className="workbench-textarea min-h-[160px]"
                onChange={(event) => updateStrategy(event.target.value)}
                value={state.strategy}
              />
              <div className="mt-5 rounded border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-brand">Why this recommendation was generated</p>
                <p className="mt-2 leading-6">{responseStrategy.explanation}</p>
                <p className="mt-3"><strong>Pattern reference:</strong> {responseStrategy.historicalMatch}</p>
              </div>
            </div>
            <div className="space-y-5">
              <InfoList title="Data sources needed" items={responseStrategy.dataSources} />
              <InfoList title="Risk and compliance checks" items={responseStrategy.riskConsiderations} />
              <InfoList title="Questions for reviewer" items={responseStrategy.gaps} />
            </div>
          </div>
          <div className="flex gap-3 border-t border-slate-200 bg-white px-7 py-5">
            <button className="workbench-primary" onClick={() => setConfirming(true)} type="button">Save Strategy</button>
            <button className="workbench-secondary" onClick={() => router.push("/review/document-request")} type="button">Back</button>
          </div>
        </section>
      </div>
      <ConfirmationModal
        message="Save the reviewed response strategy and allow the Task Strategy Agent to propose child tasks?"
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          saveStrategy();
          setConfirming(false);
          router.push("/task-strategy");
        }}
        open={confirming}
        title="Confirm Strategy"
      />
    </PortalShell>
  );
}
function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded border border-slate-200 p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {items.map((item) => <li key={item}>- {item}</li>)}
      </ul>
    </section>
  );
}
