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
    bg: "linear-gradient(135deg, #0a1c10 0%, #0f2a18 100%)",
    color: "#34d399",
    dot: "#22c55e",
    border: "rgba(34,197,94,0.3)",
    label: "Active",
  },
  frozen: {
    bg: "linear-gradient(135deg, #1c0a0a 0%, #280e0e 100%)",
    color: "#f87171",
    dot: "#ef4444",
    border: "rgba(239,68,68,0.3)",
    label: "Frozen",
  },
  pending: {
    bg: "linear-gradient(135deg, #1c1508 0%, #25190a 100%)",
    color: "#fbbf24",
    dot: "#f59e0b",
    border: "rgba(245,158,11,0.3)",
    label: "Pending",
  },
  completed: {
    bg: "linear-gradient(135deg, #0a1c10 0%, #0f2a18 100%)",
    color: "#34d399",
    dot: "#22c55e",
    border: "rgba(34,197,94,0.3)",
    label: "Completed",
  },
  flagged: {
    bg: "linear-gradient(135deg, #1c0a0a 0%, #280e0e 100%)",
    color: "#f87171",
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
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px ${border}30`,
        letterSpacing: "0.3px",
        transition: "all 200ms ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.07), 0 4px 10px ${border}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px ${border}30`;
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
