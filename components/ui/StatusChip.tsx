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
  {
    bg: string;
    color: string;
    dot: string;
    border: string;
    label: string;
  }
> = {
  active: {
    bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    color: "#15803d",
    dot: "#22c55e",
    border: "rgba(34,197,94,0.3)",
    label: "Active",
  },
  frozen: {
    bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
    color: "#dc2626",
    dot: "#ef4444",
    border: "rgba(239,68,68,0.3)",
    label: "Frozen",
  },
  pending: {
    bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
    color: "#b45309",
    dot: "#f59e0b",
    border: "rgba(245,158,11,0.3)",
    label: "Pending",
  },
  completed: {
    bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    color: "#15803d",
    dot: "#22c55e",
    border: "rgba(34,197,94,0.3)",
    label: "Completed",
  },
  flagged: {
    bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
    color: "#dc2626",
    dot: "#ef4444",
    border: "rgba(239,68,68,0.3)",
    label: "Flagged",
  },
};

export function StatusChip({ status, label }: StatusChipProps) {
  const { bg, color, dot, border, label: defaultLabel } = STYLES[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: bg,
        color: color,
        fontSize: "11px",
        fontWeight: 600,
        padding: "3px 10px 3px 8px",
        borderRadius: "20px",
        whiteSpace: "nowrap",
        border: `1px solid ${border}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
        letterSpacing: "0.2px",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: dot,
          boxShadow: `0 0 0 2px ${dot}22`,
          flexShrink: 0,
        }}
      />
      {label ?? defaultLabel}
    </span>
  );
}
