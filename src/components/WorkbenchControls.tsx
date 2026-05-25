"use client";

import type { ReactNode } from "react";

export function InputField({
  label,
  value,
  onChange,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="workbench-field">
      <span>
        {label}
        {required ? <strong>*</strong> : null}
      </span>
      <input onChange={(event) => onChange(event.target.value)} type={type} value={value} />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="workbench-field">
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function ConfirmationModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="workbench-modal-backdrop" role="presentation">
      <section aria-modal="true" className="workbench-modal" role="dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="workbench-primary w-full" onClick={onConfirm} type="button">
          {confirmLabel}
        </button>
        <button className="mt-2 text-sm text-slate-500" onClick={onClose} type="button">
          Cancel
        </button>
      </section>
    </div>
  );
}

export function Tabs({
  active,
  onChange,
  items,
}: {
  active: string;
  onChange: (item: string) => void;
  items: string[];
}) {
  return (
    <div className="workbench-tabs">
      {items.map((item) => (
        <button className={active === item ? "active" : ""} key={item} onClick={() => onChange(item)} type="button">
          {item}
        </button>
      ))}
    </div>
  );
}

export function SuccessMessage({ children }: { children: ReactNode }) {
  return <p className="workbench-success">{children}</p>;
}

