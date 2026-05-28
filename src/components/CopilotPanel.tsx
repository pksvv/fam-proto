"use client";

import { useEffect, useRef, useState } from "react";
import type { AgentEvent, CopilotMessage } from "@/data/mockData";

const stateStyle = {
  complete: "bg-emerald-500",
  active: "bg-blue-500",
  review: "bg-amber-500",
  info: "bg-slate-400",
};

type PromptReply = {
  prompt: string;
  response: string;
};

const suggestedPrompts: Record<string, PromptReply[]> = {
  intake: [
    {
      prompt: "What did you extract?",
      response: "I identified IDR-2025-018, American Express Services Corp., audit period Jan 01 2024 to Jan 31 2025, and the income-itemization request.",
    },
    {
      prompt: "Show evidence for the due date",
      response: "The highlighted source notice states a response due date of Jul 01 2026. Confirm this value before creating the audit.",
    },
    {
      prompt: "What is my next action?",
      response: "Run OCR if needed, inspect the highlighted fields in the evidence viewer, then continue to review the parent audit draft.",
    },
  ],
  auditReview: [
    {
      prompt: "Which fields came from evidence?",
      response: "Entity, audit period, issuer and request context were mapped from the highlighted IDR notice in the evidence viewer.",
    },
    {
      prompt: "What needs human review?",
      response: "Verify the entity, period boundaries, owner and audit classification before selecting Create Parent Audit Request.",
    },
    {
      prompt: "Summarize the notice",
      response: "Synthetic IRS IDR requesting income itemization details for FY2024, linked to IDR-2025-018 and due Jul 01 2026.",
    },
  ],
  documentReview: [
    {
      prompt: "Why these evidence items?",
      response: "The source question asks for income itemization. A category schedule, GL reconciliation, and exclusions memo create a traceable response package.",
    },
    {
      prompt: "Check the IDR question",
      response: "The notice requests income itemization details. The hydrated question is consistent with that highlighted request text.",
    },
    {
      prompt: "What should I approve?",
      response: "Validate ownership, due date, question wording and required evidence before creating the document request.",
    },
  ],
};

const fallbackPrompts: PromptReply[] = [
  {
    prompt: "What is pending review?",
    response: "This step contains AI-prepared information that must be confirmed by a reviewer before workflow status advances.",
  },
  {
    prompt: "Where is the evidence?",
    response: "Open the linked document request or response package to inspect supporting evidence and lineage for this synthetic case.",
  },
];

export function CopilotPanel({
  copilotKey,
  title,
  messages,
  events,
}: {
  copilotKey: string;
  title: string;
  messages: CopilotMessage[];
  events: AgentEvent[];
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [conversation, setConversation] = useState<PromptReply[]>([]);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const prompts = suggestedPrompts[copilotKey] ?? fallbackPrompts;

  useEffect(() => {
    if (conversation.length > 0) {
      conversationEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [conversation.length]);

  function ask(prompt: PromptReply) {
    setConversation((current) => [...current, prompt]);
  }

  if (collapsed) {
    return (
      <aside className="hidden w-16 shrink-0 border-l border-slate-200 bg-white lg:flex lg:flex-col lg:items-center">
        <button
          aria-label="Expand AI copilot panel"
          className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-3 text-brand"
          onClick={() => setCollapsed(false)}
          type="button"
        >
          AI
        </button>
      </aside>
    );
  }

  return (
    <aside className="hidden w-[340px] shrink-0 border-l border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">AI Copilot</p>
            <h2 className="mt-1 text-base font-semibold text-slate-900">{title}</h2>
          </div>
          <button
            aria-label="Collapse AI copilot panel"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
            onClick={() => setCollapsed(true)}
            type="button"
          >
            &rsaquo;
          </button>
        </div>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
        <div className="space-y-2">
          {events.map((event) => (
            <div
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
              key={event.agent}
            >
              <div>
                <p className="text-xs font-semibold text-slate-700">{event.agent}</p>
                <p className="text-xs text-slate-500">{event.status}</p>
              </div>
              {event.confidence ? (
                <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-brand">
                  {event.confidence}%
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <article className="flex gap-3" key={`${message.agent}-${index}`}>
              <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${stateStyle[message.state]}`} />
              <div className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
                <p className="flex justify-between gap-3 text-xs font-semibold text-slate-600">
                  {message.agent}
                  {message.time ? <span className="font-normal text-slate-400">{message.time}</span> : null}
                </p>
                <p className="mt-2 text-[15px] leading-6 text-slate-800">{message.text}</p>
              </div>
            </article>
          ))}
          {conversation.map((exchange, index) => (
            <div className="space-y-3" key={`${exchange.prompt}-${index}`}>
              <p className="ml-10 rounded-xl bg-brand px-4 py-3 text-sm leading-5 text-white">
                {exchange.prompt}
              </p>
              <article className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
                <div className="w-full rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">Audit Copilot</p>
                  <p className="mt-2 text-[15px] leading-6 text-slate-800">{exchange.response}</p>
                </div>
              </article>
            </div>
          ))}
          <div ref={conversationEndRef} />
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">Ask Audit Copilot</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">Prototype queries use scripted responses; no LLM connection is required.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              className="rounded-full border border-blue-200 bg-white px-3 py-2 text-left text-xs font-semibold text-brand transition hover:bg-blue-50"
              key={prompt.prompt}
              onClick={() => ask(prompt)}
              type="button"
            >
              {prompt.prompt}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-400">
          <span className="flex-1">Select a suggested question</span>
          <span className="font-semibold text-brand">Send</span>
        </div>
      </div>
    </aside>
  );
}
