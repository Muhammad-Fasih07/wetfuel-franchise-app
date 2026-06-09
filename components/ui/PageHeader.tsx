import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  /** Monospace breadcrumb path displayed above the title */
  breadcrumb?: string;
  /** @deprecated Use breadcrumb instead */
  eyebrow?: string;
  /** Large icon wrapped in a red-tinted bounding box */
  icon?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  action,
  breadcrumb,
  eyebrow,
  icon,
}: PageHeaderProps) {
  const pathLabel = breadcrumb ?? eyebrow;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: icon ? "16px" : 0,
          minWidth: 0,
        }}
      >
        {icon && (
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              flexShrink: 0,
              borderRadius: "8px",
              background: "var(--primary-brand-muted)",
              border: "1px solid rgba(220, 38, 38, 0.25)",
              color: "var(--primary-brand)",
              fontSize: "24px",
            }}
          >
            {icon}
          </span>
        )}

        <div style={{ minWidth: 0 }}>
          {pathLabel && (
            <p className="type-breadcrumb" style={{ margin: "0 0 6px 0" }}>
              {pathLabel}
            </p>
          )}
          <h1 className="type-h1" style={{ margin: 0 }}>
            {title}
          </h1>
          {subtitle && (
            <p className="type-body" style={{ margin: "6px 0 0 0" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}
