import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  /**
   * Optional eyebrow tag rendered above the title (e.g. "OVERVIEW").
   */
  eyebrow?: string;
}

export function PageHeader({ title, subtitle, action, eyebrow }: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        position: "relative",
        paddingLeft: "16px",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: "4px",
          width: "4px",
          height: "44px",
          borderRadius: "3px",
          background:
            "linear-gradient(180deg, #f0797a 0%, #ce1c1a 50%, #8b1816 100%)",
          boxShadow: "0 0 14px rgba(206,28,26,0.45)",
        }}
      />

      <div style={{ minWidth: 0 }}>
        {eyebrow && (
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#ce1c1a",
              textTransform: "uppercase",
              letterSpacing: "1.4px",
              margin: "0 0 6px 0",
            }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.4px",
            background:
              "linear-gradient(135deg, #2b2b2b 0%, #2b2b2b 60%, #5a5a5a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: "14px",
              color: "#887b6a",
              margin: "4px 0 0 0",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}
