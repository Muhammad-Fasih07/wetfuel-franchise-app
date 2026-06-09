"use client";

import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "@mui/icons-material";
import { AppLink } from "@/components/navigation/AppLink";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: ReactNode;
  href?: string;
}

const trendStyles: Record<
  "up" | "down",
  { color: string; bg: string; Icon: typeof TrendingUp }
> = {
  up:   { color: "var(--success-text)", bg: "var(--success-bg)", Icon: TrendingUp },
  down: { color: "var(--error-text)",   bg: "var(--error-bg)",   Icon: TrendingDown },
};

export function StatCard({
  label,
  value,
  subtext,
  trend,
  trendValue,
  icon,
  href,
}: StatCardProps) {
  const showChip = trend && trend !== "neutral" && trendValue;
  const chip = showChip ? trendStyles[trend as "up" | "down"] : null;

  const card = (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "8px",
        padding: "16px",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: href ? "pointer" : "default",
        transition: "background-color var(--transition-fast)",
      }}
      onMouseEnter={(e) => {
        if (href) e.currentTarget.style.backgroundColor = "var(--bg-surface-hover)";
      }}
      onMouseLeave={(e) => {
        if (href) e.currentTarget.style.backgroundColor = "var(--bg-surface)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <span className="type-category-label">
          {label}
        </span>

        <span
          style={{
            color: "var(--text-muted)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          {icon}
        </span>
      </div>

      <div style={{ marginTop: "12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <span className="type-kpi">
            {value}
          </span>

          {chip && trendValue && (
            <span
              className="font-mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                fontSize: "12px",
                fontWeight: 500,
                color: chip.color,
                background: chip.bg,
                padding: "2px 8px",
                borderRadius: "9999px",
              }}
            >
              <chip.Icon sx={{ fontSize: "13px" }} />
              {trendValue}
            </span>
          )}
        </div>

        {subtext && (
          <p className="type-body" style={{ margin: "4px 0 0 0" }}>
            {subtext}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <AppLink
        href={href}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        {card}
      </AppLink>
    );
  }

  return card;
}
