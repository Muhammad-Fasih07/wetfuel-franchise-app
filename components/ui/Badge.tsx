import type { ReactNode } from "react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "accent" | "default";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { color: string; background: string }> = {
  success: { color: "var(--success-text)", background: "var(--success-bg)" },
  warning: { color: "var(--warning-text)", background: "var(--warning-bg)" },
  error:   { color: "var(--error-text)",   background: "var(--error-bg)" },
  info:    { color: "var(--info-text)",     background: "rgba(59, 130, 246, 0.1)" },
  accent:  { color: "var(--accent-purple)", background: "rgba(139, 92, 246, 0.1)" },
  default: { color: "var(--text-secondary)", background: "var(--bg-surface-hover)" },
};

export function Badge({ children, variant = "default", dot = false }: BadgeProps) {
  const { color, background } = variantStyles[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "2px 8px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color,
        background,
        whiteSpace: "nowrap",
      }}
    >
      {dot && (
        <span
          aria-hidden
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}
