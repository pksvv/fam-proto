"use client";

import { useState } from "react";
import type { AgentEvent, CopilotMessage } from "@/data/mockData";

const stateStyle = {
  complete: "bg-emerald-500",
  active: "bg-blue-500",
  review: "bg-amber-500",
  info: "bg-slate-400",
};

export function CopilotPanel({
  title,
  messages,
  events,
}: {
  title: string;
  messages: CopilotMessage[];
  events: AgentEvent[];
}) {
  const [collapsed, setCollapsed] = useState(false);

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
    <aside className="hidden w-[296px] shrink-0 border-l border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200 px-5 py-5">
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
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
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
              <div className="rounded-xl bg-slate-50 px-3 py-3">
                <p className="flex justify-between gap-3 text-xs font-semibold text-slate-600">
                  {message.agent}
                  {message.time ? <span className="font-normal text-slate-400">{message.time}</span> : null}
                </p>
                <p className="mt-2 text-sm leading-5 text-slate-700">{message.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">Control point</p>
          <p className="mt-2 text-sm leading-5 text-slate-700">
            Suggested actions require reviewer confirmation before any audit record advances.
          </p>
        </div>
      </div>
    </aside>
  );
}
