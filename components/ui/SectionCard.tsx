import type { CSSProperties, ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  bodyPadding?: string | number;
  className?: string;
  style?: CSSProperties;
  headerBorder?: boolean;
  /**
   * Decorative top accent line. Defaults to a thin red gradient.
   * Pass `false` to disable.
   */
  accent?: boolean;
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  bodyPadding,
  className,
  style,
  headerBorder = true,
  accent = true,
}: SectionCardProps) {
  return (
    <section
      className={className}
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #ffffff 60%, #fdfcfb 100%)",
        border: "1px solid #ececec",
        borderRadius: "12px",
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -16px rgba(43,43,43,0.18)",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {accent && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(206,28,26,0.55) 50%, transparent 100%)",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
      )}

      {(title || action) && (
        <header
          style={{
            padding: "18px 24px",
            borderBottom: headerBorder ? "1px solid #f0f0f0" : "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            background:
              "linear-gradient(180deg, rgba(255,245,245,0.35) 0%, rgba(255,255,255,0) 100%)",
          }}
        >
          {title && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#2b2b2b",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: "4px",
                    height: "16px",
                    borderRadius: "2px",
                    background:
                      "linear-gradient(180deg, #f0797a 0%, #ce1c1a 50%, #8b1816 100%)",
                    boxShadow: "0 0 8px rgba(206,28,26,0.35)",
                  }}
                />
                {title}
              </h2>
              {subtitle && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#887b6a",
                    margin: 0,
                    paddingLeft: "14px",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {action && <div>{action}</div>}
        </header>
      )}

      <div style={{ padding: bodyPadding, position: "relative" }}>{children}</div>
    </section>
  );
}
