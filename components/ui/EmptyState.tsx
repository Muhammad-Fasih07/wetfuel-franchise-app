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
      className="animate-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        textAlign: "center",
        gap: "16px",
      }}
    >
      {icon && (
        <span
          aria-hidden
          className="animate-scale-in"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "72px",
            height: "72px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, rgba(206,28,26,0.15) 0%, rgba(206,28,26,0.22) 60%, rgba(206,28,26,0.28) 100%)",
            color: "#f0797a",
            fontSize: "32px",
            border: "1.5px solid rgba(206,28,26,0.2)",
            boxShadow:
              "0 8px 20px -8px rgba(206,28,26,0.4), 0 4px 10px rgba(206,28,26,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "18px",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
            }}
          />
          {icon}
        </span>
      )}
      <p
        className="animate-slide-up"
        style={{
          fontSize: "17px",
          fontWeight: 600,
          color: "#e8e6e3",
          margin: 0,
          letterSpacing: "-0.2px",
          animationDelay: "0.1s",
        }}
      >
        {title}
      </p>
      {subtitle && (
        <p
          className="animate-fade-in"
          style={{
            fontSize: "14px",
            color: "#9a8c7a",
            margin: 0,
            maxWidth: "400px",
            lineHeight: 1.6,
            fontWeight: 400,
            animationDelay: "0.2s",
          }}
        >
          {subtitle}
        </p>
      )}
      {action && (
        <div className="animate-fade-in" style={{ marginTop: "12px", animationDelay: "0.3s" }}>
          {action}
        </div>
      )}
    </div>
  );
}
