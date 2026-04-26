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
        gap: "7px",
        background: bg,
        color: color,
        fontSize: "11px",
        fontWeight: 600,
        padding: "4px 12px 4px 10px",
        borderRadius: "24px",
        whiteSpace: "nowrap",
        border: `1.5px solid ${border}`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 6px ${border}30`,
        letterSpacing: "0.3px",
        transition: "all 200ms ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 10px ${border}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 6px ${border}30`;
      }}
    >
      <span
        aria-hidden
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: dot,
          boxShadow: `0 0 0 2px ${dot}25, 0 0 6px ${dot}40`,
          flexShrink: 0,
          animation: status === "active" || status === "completed" ? "pulse 2s ease-in-out infinite" : "none",
        }}
      />
      {label ?? defaultLabel}
    </span>
  );
}
