"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  auditRequest,
  collaborationNotes,
  documentRequest,
  responseStrategy,
  tasks,
  type AuditRequest,
  type AuditTask,
  type CollaborationNote,
  type DocumentRequest,
  type Status,
} from "@/data/mockData";

type UploadedNotice = {
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
};

export type InteractiveTask = AuditTask & {
  notes: CollaborationNote[];
  files: string[];
  response: string;
};

type WorkflowState = {
  notice: UploadedNotice | null;
  extracted: boolean;
  parentCreated: boolean;
  documentRequestCreated: boolean;
  strategySaved: boolean;
  tasksCreated: boolean;
  packageGenerated: boolean;
  responseSubmittedForReview: boolean;
  submitted: boolean;
  audit: AuditRequest;
  auditStartDate: string;
  auditEndDate: string;
  documentRequest: DocumentRequest;
  strategy: string;
  tasks: InteractiveTask[];
  activeTaskId: string;
  selectedTaskIds: string[];
  selectedEvidenceIds: string[];
  instructions: string;
};

type WorkflowContextValue = {
  state: WorkflowState;
  setNotice: (notice: UploadedNotice) => void;
  markExtracted: () => void;
  updateAudit: (field: keyof AuditRequest, value: string) => void;
  updateAuditDates: (start: string, end: string) => void;
  createParentAudit: () => void;
  updateDocumentRequest: (field: keyof DocumentRequest, value: string | string[]) => void;
  createDocumentRequest: () => void;
  updateStrategy: (value: string) => void;
  saveStrategy: () => void;
  updateTask: (id: string, updates: Partial<InteractiveTask>) => void;
  selectTask: (id: string) => void;
  createTasks: () => void;
  addTaskNote: (id: string, text: string) => void;
  addTaskFiles: (id: string, files: string[]) => void;
  setPackageSelection: (taskIds: string[], evidenceIds: string[], instructions: string) => void;
  generatePackage: () => void;
  sendPackageForReview: () => void;
  submitPackage: () => void;
  resetWorkflow: () => void;
};

const STORAGE_KEY = "audit-management-workflow-v2";
const defaultInstructions =
  "Prepare a concise, regulator-ready response. Include income itemization by category, reconcile to GL summary, and call out exclusions separately.";

function makeInitialState(): WorkflowState {
  return {
    notice: null,
    extracted: false,
    parentCreated: false,
    documentRequestCreated: false,
    strategySaved: false,
    tasksCreated: false,
    packageGenerated: false,
    responseSubmittedForReview: false,
    submitted: false,
    audit: { ...auditRequest },
    auditStartDate: "2024-01-01",
    auditEndDate: "2025-01-31",
    documentRequest: { ...documentRequest, requiredEvidence: [...documentRequest.requiredEvidence] },
    strategy: responseStrategy.recommendation,
    activeTaskId: "TA-201",
    tasks: tasks.map((task) => ({
      ...task,
      status: "Draft",
      notes: task.id === "TA-201" ? [...collaborationNotes] : [],
      files: [],
      response: "",
    })),
    selectedTaskIds: [],
    selectedEvidenceIds: [],
    instructions: defaultInstructions,
  };
}

const WorkflowContext = createContext<WorkflowContextValue | null>(null);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkflowState>(makeInitialState);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const saved = JSON.parse(stored) as Partial<WorkflowState>;
        const initial = makeInitialState();
        window.setTimeout(() => {
          setState({
            ...initial,
            ...saved,
            audit: { ...initial.audit, ...saved.audit },
            documentRequest: { ...initial.documentRequest, ...saved.documentRequest },
            tasks: initial.tasks.map((task, index) => ({
              ...task,
              ...(saved.tasks?.[index] ?? {}),
            })),
          });
          setRestored(true);
        }, 0);
        return;
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    window.setTimeout(() => setRestored(true), 0);
  }, []);

  useEffect(() => {
    if (restored) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [restored, state]);

  function updateAudit(field: keyof AuditRequest, value: string) {
    setState((current) => ({ ...current, audit: { ...current.audit, [field]: value } }));
  }

  function updateDocumentRequest(field: keyof DocumentRequest, value: string | string[]) {
    setState((current) => ({
      ...current,
      documentRequest: { ...current.documentRequest, [field]: value },
    }));
  }

  function updateTask(id: string, updates: Partial<InteractiveTask>) {
    setState((current) => ({
      ...current,
      tasks: current.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    }));
  }

  const value: WorkflowContextValue = {
    state,
    setNotice: (notice) => setState((current) => ({ ...current, notice, extracted: false })),
    markExtracted: () => setState((current) => ({ ...current, extracted: true })),
    updateAudit,
    updateAuditDates: (auditStartDate, auditEndDate) =>
      setState((current) => ({
        ...current,
        auditStartDate,
        auditEndDate,
        audit: { ...current.audit, period: `${auditStartDate} to ${auditEndDate}` },
      })),
    createParentAudit: () =>
      setState((current) => ({
        ...current,
        parentCreated: true,
        audit: { ...current.audit, status: "In Progress" },
      })),
    updateDocumentRequest,
    createDocumentRequest: () =>
      setState((current) => ({
        ...current,
        documentRequestCreated: true,
        documentRequest: { ...current.documentRequest, status: "In Progress" },
      })),
    updateStrategy: (strategy) => setState((current) => ({ ...current, strategy })),
    saveStrategy: () => setState((current) => ({ ...current, strategySaved: true })),
    updateTask,
    selectTask: (activeTaskId) => setState((current) => ({ ...current, activeTaskId })),
    createTasks: () =>
      setState((current) => ({
        ...current,
        tasksCreated: true,
        tasks: current.tasks.map((task) => ({ ...task, status: "Pending" as Status })),
      })),
    addTaskNote: (id, text) =>
      setState((current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                notes: [
                  ...task.notes,
                  {
                    author: "R Kaus",
                    role: "Task Assignee",
                    time: "Just now",
                    text,
                  },
                ],
              }
            : task,
        ),
      })),
    addTaskFiles: (id, files) =>
      setState((current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === id ? { ...task, files: [...task.files, ...files] } : task,
        ),
      })),
    setPackageSelection: (selectedTaskIds, selectedEvidenceIds, instructions) =>
      setState((current) => ({ ...current, selectedTaskIds, selectedEvidenceIds, instructions })),
    generatePackage: () => setState((current) => ({ ...current, packageGenerated: true })),
    sendPackageForReview: () => setState((current) => ({ ...current, responseSubmittedForReview: true })),
    submitPackage: () =>
      setState((current) => ({
        ...current,
        submitted: true,
        documentRequest: { ...current.documentRequest, status: "Ready for Submission" },
      })),
    resetWorkflow: () => {
      window.localStorage.removeItem(STORAGE_KEY);
      setState(makeInitialState());
    },
  };

  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used inside WorkflowProvider");
  }
  return context;
}
