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
    body: "Click New Audit Submission to start the sample IDR intake journey.",
  },
  {
    id: "sample-idr",
    path: "/intake",
    target: "sample-idr",
    title: "Sample file drop",
    body: "Click Use Sample IRS IDR. The demo will treat it as a received sample notice.",
  },
  {
    id: "run-ocr",
    path: "/intake",
    target: "run-ocr",
    title: "Extract context",
    body: "Run OCR and context extraction. The AI-populated fields will be ready for human review next.",
    waitForTarget: true,
  },
  {
    id: "review-parent",
    path: "/intake",
    target: "review-parent-audit",
    title: "New parent audit",
    body: "Continue to the new parent audit review with the extracted fields.",
    waitForTarget: true,
  },
  {
    id: "audit-fields",
    path: "/review/audit",
    target: "audit-review-fields",
    title: "HITL audit review",
    body: "Verify or update the AI-extracted title, entity, market, dates and owner.",
  },
  {
    id: "create-parent",
    path: "/review/audit",
    target: "create-parent-audit",
    title: "Create parent audit",
    body: "Create the parent audit request with the reviewed values.",
  },
  {
    id: "confirm-parent",
    path: "/review/audit",
    target: "confirm-modal-primary",
    title: "Approve creation",
    body: "This confirmation is the HITL approval. Confirm to move to document request review.",
    waitForTarget: true,
  },
  {
    id: "document-fields",
    path: "/review/document-request",
    target: "document-review-fields",
    title: "HITL document request",
    body: "Verify the IDR question, due date, owner, reviewer and required evidence list.",
  },
  {
    id: "create-document",
    path: "/review/document-request",
    target: "create-document-request",
    title: "Create document request",
    body: "Create the reviewed document request.",
  },
  {
    id: "confirm-document",
    path: "/review/document-request",
    target: "confirm-modal-primary",
    title: "Approve document request",
    body: "Confirm to continue to response strategy review.",
    waitForTarget: true,
  },
  {
    id: "strategy",
    path: "/response-strategy",
    target: "strategy-review",
    title: "Response strategy",
    body: "Inspect the recommended response strategy, data sources, risk checks and reviewer questions.",
  },
  {
    id: "save-strategy",
    path: "/response-strategy",
    target: "save-strategy",
    title: "Approve strategy",
    body: "Save the strategy so the task strategy agent can propose child tasks.",
  },
  {
    id: "confirm-strategy",
    path: "/response-strategy",
    target: "confirm-modal-primary",
    title: "Confirm strategy",
    body: "Confirm the HITL approval and move to the task review page.",
    waitForTarget: true,
  },
  {
    id: "task-list",
    path: "/task-strategy",
    target: "task-strategy-list",
    title: "Review generated tasks",
    body: "Update task titles, assignees, teams, due dates and dependencies. Remove extra tasks if you want a shorter demo, but keep at least two.",
  },
  {
    id: "create-tasks",
    path: "/task-strategy",
    target: "create-tasks",
    title: "Create tasks",
    body: "Create the reviewed task set.",
  },
  {
    id: "confirm-tasks",
    path: "/task-strategy",
    target: "confirm-modal-primary",
    title: "Approve tasks",
    body: "Confirm to open the document request task list.",
    waitForTarget: true,
  },
  {
    id: "open-task",
    path: "/document-requests/IDR-2025-018",
    target: "open-task",
    title: "Open task",
    body: "Open a task conversation. This is where response text, documents, reviewer submit and closeout happen.",
  },
  {
    id: "task-response",
    path: "/tasks/TA-201",
    target: "task-response",
    title: "Task response",
    body: "Fill or update the response description. Text is required before the submit button is enabled.",
  },
  {
    id: "task-documents",
    path: "/tasks/TA-201",
    target: "task-documents-tab",
    title: "Supporting docs",
    body: "Open the Documents tab to attach or review task evidence.",
  },
  {
    id: "submit-task",
    path: "/tasks/TA-201",
    target: "submit-task-review",
    title: "Submit to reviewer",
    body: "Send the task response to the reviewer. If it is disabled, add response text first.",
  },
  {
    id: "confirm-submit-task",
    path: "/tasks/TA-201",
    target: "confirm-modal-primary",
    title: "Confirm submit",
    body: "Confirm the reviewer submission.",
    waitForTarget: true,
  },
  {
    id: "close-task",
    path: "/tasks/TA-201",
    target: "approve-close-task",
    title: "Close task",
    body: "Close the task after reviewer approval.",
    waitForTarget: true,
  },
  {
    id: "confirm-close-task",
    path: "/tasks/TA-201",
    target: "confirm-modal-primary",
    title: "Confirm close",
    body: "Confirm the task closeout.",
    waitForTarget: true,
  },
  {
    id: "close-remaining-demo-tasks",
    path: "/tasks/TA-201",
    target: "close-remaining-demo-tasks",
    title: "Close remaining demo tasks",
    body: "For a fast walkthrough, close the remaining visible demo tasks in one click. If you already closed them manually, use Next.",
    waitForTarget: true,
  },
  {
    id: "open-final",
    path: "/tasks/TA-201",
    target: "open-final-response",
    title: "Move to final response",
    body: "Open the final response builder after task closeout.",
    waitForTarget: true,
  },
  {
    id: "load-closeout",
    path: "/final-response",
    target: "load-closeout-demo",
    title: "Close visible demo tasks",
    body: "Demo shortcut: close the visible task set, then select the task outputs and documents.",
    waitForTarget: true,
  },
  {
    id: "select-tasks",
    path: "/final-response",
    target: "closed-task-selection",
    title: "Select closed tasks",
    body: "Select or review the closed task conversations for the final response.",
    waitForTarget: true,
  },
  {
    id: "select-docs",
    path: "/final-response",
    target: "evidence-selection",
    title: "Select documents",
    body: "Select the supporting documents and datasets to include in the package.",
    waitForTarget: true,
  },
  {
    id: "submit-response-creator",
    path: "/final-response",
    target: "submit-response-creator",
    title: "Generate draft",
    body: "Send the selected tasks, documents and instructions to the Response Creator.",
    waitForTarget: true,
  },
  {
    id: "confirm-response-creator",
    path: "/final-response",
    target: "confirm-modal-primary",
    title: "Confirm generation",
    body: "Confirm to generate the draft response.",
    waitForTarget: true,
  },
  {
    id: "review-draft",
    path: "/final-response/review",
    target: "final-draft-review",
    title: "Review final draft",
    body: "Edit or review the generated response text and verify Schedules A, B and C.",
  },
  {
    id: "send-human-review",
    path: "/final-response/review",
    target: "send-human-review",
    title: "Send to HITL review",
    body: "Send the draft into the human reviewer approval workflow.",
  },
  {
    id: "confirm-human-review",
    path: "/final-response/review",
    target: "confirm-modal-primary",
    title: "Confirm routing",
    body: "Confirm the human review routing.",
    waitForTarget: true,
  },
  {
    id: "approve-final",
    path: "/final-response/review",
    target: "approve-final-response",
    title: "Final approval",
    body: "Approve the final response after checking evidence and wording.",
    waitForTarget: true,
  },
  {
    id: "confirm-final",
    path: "/final-response/review",
    target: "confirm-modal-primary",
    title: "Confirm final approval",
    body: "Confirm final HITL approval. The status will move to Ready for Submission.",
    waitForTarget: true,
  },
  {
    id: "download-package",
    path: "/final-response/review",
    target: "download-final-package",
    title: "Download package",
    body: "Download the Final Response ZIP with the PDF, selected documents, datasets and manifest.",
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
            <p>{missingWaitTarget ? "This control appears after the current screen action is complete." : step.body}</p>
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
