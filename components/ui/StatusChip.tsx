"use client";

export type StatusChipKind =
  | "active"
  | "frozen"
  | "pending"
  | "completed"
  | "flagged";

interface StatusChipProps {
  status: StatusChipKind;
  label?: string;
}

const STYLES: Record<
  StatusChipKind,
  { color: string; background: string; dot: string; label: string }
> = {
  active: {
    color: "var(--success-text)",
    background: "var(--success-bg)",
    dot: "var(--success-text)",
    label: "Active",
  },
  frozen: {
    color: "var(--error-text)",
    background: "var(--error-bg)",
    dot: "var(--error-text)",
    label: "Frozen",
  },
  pending: {
    color: "var(--warning-text)",
    background: "var(--warning-bg)",
    dot: "var(--warning-text)",
    label: "Pending",
  },
  completed: {
    color: "var(--success-text)",
    background: "var(--success-bg)",
    dot: "var(--success-text)",
    label: "Completed",
  },
  flagged: {
    color: "var(--error-text)",
    background: "var(--error-bg)",
    dot: "var(--error-text)",
    label: "Flagged",
  },
};

export function StatusChip({ status, label }: StatusChipProps) {
  const { color, background, dot, label: defaultLabel } = STYLES[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: background,
        color: color,
        fontSize: "12px",
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: "9999px",
        whiteSpace: "nowrap",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: dot,
          flexShrink: 0,
        }}
      />
      {label ?? defaultLabel}
    </span>
  );
}
