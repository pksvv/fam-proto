import Link from "next/link";
import type { ReactNode } from "react";
import { demoFlow } from "@/data/demoFlow";
import { agentEvents, copilotMessages } from "@/data/mockData";
import { CopilotPanel } from "./CopilotPanel";

const railItems = [
  { icon: "+", label: "New audit", href: "/" },
  { icon: "A", label: "My audits", href: "/" },
  { icon: "D", label: "Document requests", href: "/intake" },
  { icon: "T", label: "Tracker", href: "/" },
  { icon: "?", label: "Help", href: "/" },
];
const availableSteps = new Set(["home", "intake"]);

export function PortalShell({
  children,
  currentStep,
  copilotKey,
  copilotTitle,
}: {
  children: ReactNode;
  currentStep: string;
  copilotKey: string;
  copilotTitle: string;
}) {
  const currentIndex = demoFlow.findIndex((step) => step.key === currentStep);
  const messages = copilotMessages[copilotKey] ?? copilotMessages.home;
  const events = agentEvents[copilotKey] ?? agentEvents.home;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="workbench-pattern hidden w-[74px] shrink-0 border-r border-slate-200 lg:flex lg:flex-col lg:items-center">
        <Link className="my-5 text-lg font-bold tracking-[0.2em] text-slate-500" href="/" aria-label="Home">
          III
        </Link>
        <nav aria-label="Primary" className="flex flex-col gap-3">
          {railItems.map((item, index) => (
            <Link
              aria-label={item.label}
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold ${
                index === 0 ? "bg-brand text-white" : "bg-white/80 text-slate-600"
              }`}
              href={item.href}
              key={item.label}
            >
              {item.icon}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-slate-200 bg-white px-5 py-4 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Audit management</p>
              <p className="mt-1 text-sm text-slate-500">AI-enabled tax audit workbench prototype</p>
            </div>
            <div className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-brand">
              Synthetic demo data only
            </div>
          </div>
        </header>
        <div className="border-b border-slate-200 bg-white px-5 py-3 md:px-8">
          <nav aria-label="Demo flow" className="flex items-center gap-2 overflow-x-auto">
            <span className="mr-2 shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Demo flow
            </span>
            {demoFlow.map((step, index) => (
              <span className="flex shrink-0 items-center gap-2" key={step.key}>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    index <= currentIndex ? "bg-brand text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {index + 1}
                </span>
                <span className={`text-xs ${step.key === currentStep ? "font-semibold text-brand" : "text-slate-500"}`}>
                  {availableSteps.has(step.key) ? <Link href={step.href}>{step.label}</Link> : step.label}
                </span>
                {index < demoFlow.length - 1 ? <span className="mx-1 text-slate-300">/</span> : null}
              </span>
            ))}
          </nav>
        </div>
        <div className="flex min-h-0 flex-1">
          <main className="workbench-canvas min-w-0 flex-1 p-5 md:p-8">{children}</main>
          <CopilotPanel events={events} messages={messages} title={copilotTitle} />
        </div>
      </div>
    </div>
  );
}
