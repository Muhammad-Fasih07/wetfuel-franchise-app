import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        gap: "14px",
      }}
    >
      {icon && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 60%, #ffd0d0 100%)",
            color: "#ce1c1a",
            fontSize: "28px",
            border: "1px solid rgba(206,28,26,0.18)",
            boxShadow:
              "0 6px 16px -8px rgba(206,28,26,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {icon}
        </span>
      )}
      <p
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: "#2b2b2b",
          margin: 0,
        }}
      >
        {title}
      </p>
      {subtitle && (
        <p
          style={{
            fontSize: "13px",
            color: "#887b6a",
            margin: 0,
            maxWidth: "360px",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      )}
      {action && <div style={{ marginTop: "8px" }}>{action}</div>}
    </div>
  );
}
