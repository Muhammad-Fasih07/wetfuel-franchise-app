"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";

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
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void;
  onClick?: () => void;
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
  onMouseEnter,
  onMouseLeave,
  onClick,
}: SectionCardProps) {
  const defaultMouseEnter = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow =
      "0 4px 16px rgba(0,0,0,0.4), 0 12px 32px -16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)";
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const defaultMouseLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow =
      "0 2px 8px rgba(0,0,0,0.3), 0 8px 24px -16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)";
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <section
      className={className}
      style={{
        background:
          "linear-gradient(180deg, #1c1c1d 0%, #1e1e20 60%, #212123 100%)",
        border: "1.5px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.3), 0 8px 24px -16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        overflow: "hidden",
        position: "relative",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        ...style,
      }}
      onMouseEnter={onMouseEnter || defaultMouseEnter}
      onMouseLeave={onMouseLeave || defaultMouseLeave}
      onClick={onClick}
    >
      {accent && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(206,28,26,0.6) 50%, transparent 100%)",
            opacity: 0.8,
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(206,28,26,0.2)",
          }}
        />
      )}

      {(title || action) && (
        <header
          style={{
            padding: "20px 26px",
            borderBottom: headerBorder ? "1.5px solid rgba(255,255,255,0.06)" : "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            background:
              "linear-gradient(180deg, rgba(206,28,26,0.06) 0%, rgba(28,28,29,0) 100%)",
          }}
        >
          {title && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#e8e6e3",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  letterSpacing: "-0.2px",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: "5px",
                    height: "18px",
                    borderRadius: "3px",
                    background:
                      "linear-gradient(180deg, #f0797a 0%, #ce1c1a 50%, #8b1816 100%)",
                    boxShadow: "0 0 10px rgba(206,28,26,0.4), 0 2px 6px rgba(206,28,26,0.3)",
                  }}
                />
                {title}
              </h2>
              {subtitle && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#9a8c7a",
                    margin: 0,
                    paddingLeft: "17px",
                    fontWeight: 400,
                    lineHeight: 1.4,
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
