"use client";

import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "@mui/icons-material";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: ReactNode;
}

const trendStyles: Record<
  "up" | "down",
  { color: string; bg: string; Icon: typeof TrendingUp }
> = {
  up: { color: "#15803d", bg: "#f0fdf4", Icon: TrendingUp },
  down: { color: "#dc2626", bg: "#fef2f2", Icon: TrendingDown },
};

export function StatCard({
  label,
  value,
  subtext,
  trend,
  trendValue,
  icon,
}: StatCardProps) {
  const showChip = trend && trend !== "neutral" && trendValue;
  const chip = showChip ? trendStyles[trend as "up" | "down"] : null;

  return (
    <div
      className="animate-scale-in"
      style={{
        background:
          "linear-gradient(160deg, #ffffff 0%, #ffffff 70%, #fff8f8 100%)",
        border: "1.5px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient(160deg, #ffffff 0%, #ffffff 70%, #fff8f8 100%), linear-gradient(135deg, rgba(206,28,26,0.18) 0%, rgba(229,229,229,1) 35%, rgba(229,229,229,1) 100%)",
        borderRadius: "14px",
        padding: "24px",
        minHeight: "130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px -16px rgba(206,28,26,0.22), inset 0 1px 0 rgba(255,255,255,0.8)",
        position: "relative",
        overflow: "hidden",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 8px 24px rgba(0,0,0,0.08), 0 12px 32px -16px rgba(206,28,26,0.3), inset 0 1px 0 rgba(255,255,255,0.9)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px -16px rgba(206,28,26,0.22), inset 0 1px 0 rgba(255,255,255,0.8)";
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(206,28,26,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "#887b6a",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            fontWeight: 700,
          }}
        >
          {label}
        </span>

        <span
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 60%, #ffd2d2 100%)",
            color: "#ce1c1a",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            boxShadow:
              "0 6px 16px rgba(206,28,26,0.22), 0 2px 6px rgba(206,28,26,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
            transition: "transform 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          }}
        >
          {icon}
        </span>
      </div>

      <div style={{ marginTop: "14px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            className="text-gradient-primary"
            style={{
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}
          >
            {value}
          </span>

          {chip && trendValue && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "11px",
                fontWeight: 600,
                color: chip.color,
                background: chip.bg,
                padding: "3px 10px",
                borderRadius: "24px",
                border: `1px solid ${chip.color}15`,
                boxShadow: `0 2px 8px ${chip.color}20`,
              }}
            >
              <chip.Icon sx={{ fontSize: "14px" }} />
              {trendValue}
            </span>
          )}
        </div>

        {subtext && (
          <p
            style={{
              fontSize: "13px",
              color: "#887b6a",
              margin: "8px 0 0 0",
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
