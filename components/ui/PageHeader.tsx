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
      className="animate-slide-up"
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap",
        position: "relative",
        paddingLeft: "20px",
      }}
    >
      <span
        aria-hidden
        className="animate-glow"
        style={{
          position: "absolute",
          left: 0,
          top: "6px",
          width: "5px",
          height: "48px",
          borderRadius: "4px",
          background:
            "linear-gradient(180deg, #f0797a 0%, #ce1c1a 50%, #8b1816 100%)",
          boxShadow: "0 0 16px rgba(206,28,26,0.5), 0 0 8px rgba(206,28,26,0.3)",
        }}
      />

      <div style={{ minWidth: 0 }}>
        {eyebrow && (
          <p
            className="animate-fade-in"
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#ce1c1a",
              textTransform: "uppercase",
              letterSpacing: "1.6px",
              margin: "0 0 8px 0",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#ce1c1a",
                boxShadow: "0 0 6px rgba(206,28,26,0.6)",
              }}
            />
            {eyebrow}
          </p>
        )}
        <h1
          className="text-gradient-primary"
          style={{
            fontSize: "28px",
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.6px",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="animate-fade-in"
            style={{
              fontSize: "14px",
              color: "#887b6a",
              margin: "6px 0 0 0",
              lineHeight: 1.6,
              fontWeight: 400,
              animationDelay: "0.1s",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="animate-fade-in" style={{ flexShrink: 0, animationDelay: "0.2s" }}>
          {action}
        </div>
      )}
    </div>
  );
}
