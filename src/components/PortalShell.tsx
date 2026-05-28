import Link from "next/link";
import type { ReactNode } from "react";
import { agentEvents, copilotMessages } from "@/data/mockData";
import { CopilotPanel } from "./CopilotPanel";

const railItems = [
  { icon: "+", label: "New audit", href: "/" },
  { icon: "A", label: "My audits", href: "/audits/PA-2025-IRS-104" },
  { icon: "D", label: "Document requests", href: "/intake" },
  { icon: "T", label: "Tracker", href: "/tracker" },
  { icon: "?", label: "Help", href: "/" },
];

export function PortalShell({
  children,
  copilotKey,
  copilotTitle,
}: {
  children: ReactNode;
  currentStep: string;
  copilotKey: string;
  copilotTitle: string;
}) {
  const messages = copilotMessages[copilotKey] ?? copilotMessages.home;
  const events = agentEvents[copilotKey] ?? agentEvents.home;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="workbench-pattern hidden w-[68px] shrink-0 border-r border-slate-200 lg:flex lg:flex-col lg:items-center">
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
        <header className="workbench-pattern border-b border-slate-200 px-5 py-4 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xl font-semibold text-brand">Audit management</p>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span>R Kaus</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">R</span>
            </div>
          </div>
        </header>
        <div className="flex min-h-0 flex-1">
          <main className="workbench-canvas min-w-0 flex-1 p-5 md:p-7">{children}</main>
          <CopilotPanel copilotKey={copilotKey} events={events} messages={messages} title={copilotTitle} />
        </div>
      </div>
    </div>
  );
}
