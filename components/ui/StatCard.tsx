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
      style={{
        background:
          "linear-gradient(160deg, #ffffff 0%, #ffffff 70%, #fff8f8 100%)",
        border: "1px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient(160deg, #ffffff 0%, #ffffff 70%, #fff8f8 100%), linear-gradient(135deg, rgba(206,28,26,0.18) 0%, rgba(229,229,229,1) 35%, rgba(229,229,229,1) 100%)",
        borderRadius: "12px",
        padding: "24px",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow:
          "0 1px 4px rgba(0,0,0,0.06), 0 8px 24px -16px rgba(206,28,26,0.18)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "#887b6a",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontWeight: 600,
          }}
        >
          {label}
        </span>

        <span
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background:
              "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 60%, #ffd2d2 100%)",
            color: "#ce1c1a",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            boxShadow:
              "0 4px 10px rgba(206,28,26,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {icon}
        </span>
      </div>

      <div style={{ marginTop: "12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#2b2b2b",
              lineHeight: 1.1,
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
                fontWeight: 500,
                color: chip.color,
                background: chip.bg,
                padding: "2px 8px",
                borderRadius: "20px",
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
              fontSize: "12px",
              color: "#887b6a",
              margin: "6px 0 0 0",
            }}
          >
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
