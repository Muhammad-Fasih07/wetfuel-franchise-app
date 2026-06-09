"use client";

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
}: SectionCardProps) {
  return (
    <section
      className={className}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "8px",
        overflow: "hidden",
        ...style,
      }}
    >
      {(title || action) && (
        <header
          style={{
            padding: "16px 24px",
            borderBottom: headerBorder ? "1px solid var(--border-subtle)" : "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {title && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    margin: 0,
                    fontWeight: 400,
                    lineHeight: 1.5,
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
