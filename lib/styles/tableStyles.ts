/** Shared MUI table cell styles aligned with v.2 design system */

export const HEADER_CELL_SX = {
  background: "transparent",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--text-muted)",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  borderBottom: "1px solid var(--border-subtle)",
  padding: "10px 16px",
} as const;

export const BODY_CELL_SX = {
  fontFamily: "var(--font-display)",
  fontSize: "14px",
  color: "var(--text-primary)",
  borderBottom: "1px solid var(--border-subtle)",
  padding: "12px 16px",
  verticalAlign: "middle",
} as const;

/** IDs, dates, metrics, and other tabular technical data */
export const MONO_DATA_CELL_SX = {
  ...BODY_CELL_SX,
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  letterSpacing: "0.02em",
} as const;
