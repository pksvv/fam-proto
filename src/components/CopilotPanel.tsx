import type { AgentEvent, CopilotMessage } from "@/data/mockData";

export function CopilotPanel({
  title,
}: {
  copilotKey: string;
  title: string;
  messages: CopilotMessage[];
  events: AgentEvent[];
}) {
  return (
    <aside
      aria-label={`AI copilot collapsed: ${title}`}
      className="hidden w-16 shrink-0 border-l border-slate-200 bg-white lg:flex lg:flex-col lg:items-center"
    >
      <div
        aria-hidden="true"
        className="mt-5 flex h-11 w-11 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-sm font-bold text-brand"
        title="AI copilot stays collapsed during the guided flow"
      >
        AI
      </div>
    </aside>
  );
}
