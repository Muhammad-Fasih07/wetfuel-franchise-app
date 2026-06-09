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
        padding: "64px 24px",
        textAlign: "center",
        gap: "12px",
      }}
    >
      {icon && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "8px",
            background: "var(--bg-surface-hover)",
            color: "var(--text-muted)",
            fontSize: "28px",
            marginBottom: "4px",
          }}
        >
          {icon}
        </span>
      )}
      <p
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--text-primary)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {title}
      </p>
      {subtitle && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            margin: 0,
            maxWidth: "400px",
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      )}
      {action && <div style={{ marginTop: "16px" }}>{action}</div>}
    </div>
  );
}
