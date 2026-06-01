"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type TourStep = {
  id: string;
  path: string;
  target: string;
  title: string;
  body: string;
  waitForTarget?: boolean;
};

const STORAGE_KEY = "audit-management-guided-demo-step";

const tourSteps: TourStep[] = [
  {
    id: "start-new-audit",
    path: "/",
    target: "new-audit-submission",
    title: "Start guided demo",
    body: "New Audit Submission click karo. Yahin se sample IDR intake journey start hogi.",
  },
  {
    id: "sample-idr",
    path: "/intake",
    target: "sample-idr",
    title: "Sample file drop",
    body: "Use Sample IRS IDR click karo. Demo yeh assume karega ki sample notice receive hua hai.",
  },
  {
    id: "run-ocr",
    path: "/intake",
    target: "run-ocr",
    title: "Extract context",
    body: "OCR aur context extraction run karo. Iske baad AI populated fields human review ke liye ready honge.",
    waitForTarget: true,
  },
  {
    id: "review-parent",
    path: "/intake",
    target: "review-parent-audit",
    title: "New parent audit",
    body: "Extracted fields ke saath new parent audit review par jao.",
    waitForTarget: true,
  },
  {
    id: "audit-fields",
    path: "/review/audit",
    target: "audit-review-fields",
    title: "HITL audit review",
    body: "AI extracted title, entity, market, dates aur owner verify/update karo.",
  },
  {
    id: "create-parent",
    path: "/review/audit",
    target: "create-parent-audit",
    title: "Create parent audit",
    body: "Reviewed values ke saath parent audit request create karo.",
  },
  {
    id: "confirm-parent",
    path: "/review/audit",
    target: "confirm-modal-primary",
    title: "Approve creation",
    body: "Confirmation HITL approval hai. Confirm karke document request review par jao.",
    waitForTarget: true,
  },
  {
    id: "document-fields",
    path: "/review/document-request",
    target: "document-review-fields",
    title: "HITL document request",
    body: "IDR question, due date, owner, reviewer aur evidence list verify karo.",
  },
  {
    id: "create-document",
    path: "/review/document-request",
    target: "create-document-request",
    title: "Create document request",
    body: "Reviewed document request create karo.",
  },
  {
    id: "confirm-document",
    path: "/review/document-request",
    target: "confirm-modal-primary",
    title: "Approve document request",
    body: "Confirm karke response strategy review par jao.",
    waitForTarget: true,
  },
  {
    id: "strategy",
    path: "/response-strategy",
    target: "strategy-review",
    title: "Response strategy",
    body: "Recommended response strategy, data sources, risk checks aur reviewer questions inspect karo.",
  },
  {
    id: "save-strategy",
    path: "/response-strategy",
    target: "save-strategy",
    title: "Approve strategy",
    body: "Strategy save karo taaki task strategy agent child tasks propose kare.",
  },
  {
    id: "confirm-strategy",
    path: "/response-strategy",
    target: "confirm-modal-primary",
    title: "Confirm strategy",
    body: "HITL approval confirm karo aur task review page par jao.",
    waitForTarget: true,
  },
  {
    id: "task-list",
    path: "/task-strategy",
    target: "task-strategy-list",
    title: "Review generated tasks",
    body: "Task title, assignee, team, due date aur dependencies update kar sakte ho.",
  },
  {
    id: "create-tasks",
    path: "/task-strategy",
    target: "create-tasks",
    title: "Create tasks",
    body: "Reviewed task set create karo.",
  },
  {
    id: "confirm-tasks",
    path: "/task-strategy",
    target: "confirm-modal-primary",
    title: "Approve tasks",
    body: "Confirm karke document request task list par jao.",
    waitForTarget: true,
  },
  {
    id: "open-task",
    path: "/document-requests/IDR-2025-018",
    target: "open-task",
    title: "Open task",
    body: "Task conversation open karo. Yahan response, docs, reviewer submit aur closeout hoga.",
  },
  {
    id: "task-response",
    path: "/tasks/TA-201",
    target: "task-response",
    title: "Task response",
    body: "Response description fill/update karo. Submit button enable karne ke liye text required hai.",
  },
  {
    id: "task-documents",
    path: "/tasks/TA-201",
    target: "task-documents-tab",
    title: "Supporting docs",
    body: "Documents tab open karke task evidence attach/review karo.",
  },
  {
    id: "submit-task",
    path: "/tasks/TA-201",
    target: "submit-task-review",
    title: "Submit to reviewer",
    body: "Task response reviewer ko bhejo. Agar disabled hai to response text add karo.",
  },
  {
    id: "confirm-submit-task",
    path: "/tasks/TA-201",
    target: "confirm-modal-primary",
    title: "Confirm submit",
    body: "Reviewer submission confirm karo.",
    waitForTarget: true,
  },
  {
    id: "close-task",
    path: "/tasks/TA-201",
    target: "approve-close-task",
    title: "Close task",
    body: "Reviewer approval ke baad task close karo.",
    waitForTarget: true,
  },
  {
    id: "confirm-close-task",
    path: "/tasks/TA-201",
    target: "confirm-modal-primary",
    title: "Confirm close",
    body: "Task closeout confirm karo.",
    waitForTarget: true,
  },
  {
    id: "open-final",
    path: "/tasks/TA-201",
    target: "open-final-response",
    title: "Move to final response",
    body: "Tasks closeout ke baad final response builder open karo.",
    waitForTarget: true,
  },
  {
    id: "load-closeout",
    path: "/final-response",
    target: "load-closeout-demo",
    title: "Close all demo tasks",
    body: "Demo shortcut: all five tasks closed state load karo, phir tasks aur docs select honge.",
    waitForTarget: true,
  },
  {
    id: "select-tasks",
    path: "/final-response",
    target: "closed-task-selection",
    title: "Select closed tasks",
    body: "Final response ke liye closed task conversations select/review karo.",
    waitForTarget: true,
  },
  {
    id: "select-docs",
    path: "/final-response",
    target: "evidence-selection",
    title: "Select documents",
    body: "Supporting documents aur datasets select karo jo package mein include honge.",
    waitForTarget: true,
  },
  {
    id: "submit-response-creator",
    path: "/final-response",
    target: "submit-response-creator",
    title: "Generate draft",
    body: "Selected tasks/docs aur instructions Response Creator ko bhejo.",
    waitForTarget: true,
  },
  {
    id: "confirm-response-creator",
    path: "/final-response",
    target: "confirm-modal-primary",
    title: "Confirm generation",
    body: "Draft response generate karne ke liye confirm karo.",
    waitForTarget: true,
  },
  {
    id: "review-draft",
    path: "/final-response/review",
    target: "final-draft-review",
    title: "Review final draft",
    body: "Generated response text edit/review karo aur schedules A/B/C verify karo.",
  },
  {
    id: "send-human-review",
    path: "/final-response/review",
    target: "send-human-review",
    title: "Send to HITL review",
    body: "Draft ko human reviewer ke approval workflow mein bhejo.",
  },
  {
    id: "confirm-human-review",
    path: "/final-response/review",
    target: "confirm-modal-primary",
    title: "Confirm routing",
    body: "Human review routing confirm karo.",
    waitForTarget: true,
  },
  {
    id: "approve-final",
    path: "/final-response/review",
    target: "approve-final-response",
    title: "Final approval",
    body: "Evidence aur wording check ke baad final response approve karo.",
    waitForTarget: true,
  },
  {
    id: "confirm-final",
    path: "/final-response/review",
    target: "confirm-modal-primary",
    title: "Confirm final approval",
    body: "Final HITL approval confirm karo. Status Ready for Submission ho jayega.",
    waitForTarget: true,
  },
  {
    id: "download-package",
    path: "/final-response/review",
    target: "download-final-package",
    title: "Download package",
    body: "Final Response ZIP download karo. Ismein PDF, selected docs/datasets aur manifest included hai.",
    waitForTarget: true,
  },
];

function getStepIndex(id: string | null) {
  if (!id) return 0;
  const index = tourSteps.findIndex((step) => step.id === id);
  return index >= 0 ? index : 0;
}

export function GuidedDemo() {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = tourSteps[stepIndex];
  const selector = useMemo(() => `[data-tour-id="${step.target}"]`, [step.target]);

  useEffect(() => {
    const restoreTour = window.setTimeout(() => {
      const savedStep = window.localStorage.getItem(STORAGE_KEY);
      if (savedStep) {
        setStepIndex(getStepIndex(savedStep));
        setActive(true);
      }
    }, 0);
    return () => window.clearTimeout(restoreTour);
  }, []);

  useEffect(() => {
    if (active) {
      window.localStorage.setItem(STORAGE_KEY, step.id);
    }
  }, [active, step.id]);

  useEffect(() => {
    if (!active || pathname === step.path) return;
    router.push(step.path);
  }, [active, pathname, router, step.path]);

  useEffect(() => {
    if (!active || pathname !== step.path) return;
    window.setTimeout(() => {
      document.querySelector(selector)?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 120);
  }, [active, pathname, selector, step.id, step.path]);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    function updateRect() {
      const target = document.querySelector(selector);
      if (target) {
        setTargetRect(target.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    }

    updateRect();
    frame = window.setInterval(updateRect, 250);
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      window.clearInterval(frame);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [active, selector]);

  useEffect(() => {
    if (!active) return;

    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest(selector) : null;
      if (!target) return;
      window.setTimeout(() => {
        setStepIndex((current) => Math.min(current + 1, tourSteps.length - 1));
      }, 180);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [active, selector]);

  function startTour() {
    setStepIndex(0);
    setActive(true);
  }

  function stopTour() {
    window.localStorage.removeItem(STORAGE_KEY);
    setActive(false);
  }

  function move(delta: number) {
    setStepIndex((current) => Math.max(0, Math.min(tourSteps.length - 1, current + delta)));
  }

  const missingWaitTarget = active && step.waitForTarget && pathname === step.path && !targetRect;
  const visibleTarget = targetRect
    ? {
        bottom: Math.min(window.innerHeight - 18, Math.max(18, targetRect.bottom)),
        left: Math.min(window.innerWidth - 380, Math.max(18, targetRect.left)),
        top: Math.min(window.innerHeight - 18, Math.max(18, targetRect.top)),
      }
    : null;
  const bubbleStyle = visibleTarget
    ? {
        top:
          visibleTarget.bottom + 278 > window.innerHeight && visibleTarget.top > 278
            ? Math.max(18, visibleTarget.top - 244)
            : Math.min(window.innerHeight - 260, Math.max(18, visibleTarget.bottom + 14)),
        left: visibleTarget.left,
      }
    : { top: 86, right: 24 };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[95] flex gap-2">
        {active ? (
          <button className="guided-demo-control secondary" onClick={stopTour} type="button">
            Pause Demo
          </button>
        ) : null}
        <button className="guided-demo-control" onClick={startTour} type="button">
          {active ? "Restart Demo" : "Start Guided Demo"}
        </button>
      </div>

      {active ? (
        <>
          {targetRect ? (
            <div
              className="guided-demo-highlight"
              style={{
                height: targetRect.height + 14,
                left: targetRect.left - 7,
                top: targetRect.top - 7,
                width: targetRect.width + 14,
              }}
            />
          ) : null}
          <section className="guided-demo-bubble" style={bubbleStyle}>
            <p className="guided-demo-kicker">
              Step {stepIndex + 1} of {tourSteps.length}
            </p>
            <h2>{step.title}</h2>
            <p>{missingWaitTarget ? "Is step ka button action ke baad appear hoga. Current screen action complete karo." : step.body}</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <button className="guided-demo-link" disabled={stepIndex === 0} onClick={() => move(-1)} type="button">
                Back
              </button>
              <div className="flex gap-2">
                <button className="guided-demo-link" onClick={stopTour} type="button">
                  Skip
                </button>
                <button
                  className="guided-demo-next"
                  disabled={stepIndex === tourSteps.length - 1}
                  onClick={() => move(1)}
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}
