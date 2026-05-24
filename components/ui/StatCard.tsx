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
  up: { color: "#4ade80", bg: "rgba(21,128,61,0.2)", Icon: TrendingUp },
  down: { color: "#f87171", bg: "rgba(239,68,68,0.2)", Icon: TrendingDown },
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

  const cardBgImage =
    "linear-gradient(160deg, #1c1c1d 0%, #1e1e20 70%, #212022 100%), linear-gradient(135deg, rgba(206,28,26,0.35) 0%, rgba(50,50,52,1) 35%, rgba(40,40,42,1) 100%)";
  const cardBgImageHover = href
    ? "linear-gradient(160deg, #1f1a1a 0%, #211c1c 70%, #241e1e 100%), linear-gradient(135deg, rgba(206,28,26,0.95) 0%, rgba(240,121,122,0.75) 45%, rgba(206,28,26,0.95) 100%)"
    : cardBgImage;
  const defaultShadow =
    "0 2px 8px rgba(0,0,0,0.3), 0 8px 24px -16px rgba(206,28,26,0.22), inset 0 1px 0 rgba(255,255,255,0.05)";
  const hoverShadow = href
    ? "0 0 0 1px rgba(206,28,26,0.35), 0 0 32px rgba(206,28,26,0.28), 0 12px 36px -12px rgba(206,28,26,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
    : "0 8px 24px rgba(0,0,0,0.4), 0 12px 32px -16px rgba(206,28,26,0.3), inset 0 1px 0 rgba(255,255,255,0.07)";

  const card = (
    <div
      className="animate-scale-in"
      style={{
        background:
          "linear-gradient(160deg, #1c1c1d 0%, #1e1e20 70%, #212022 100%)",
        border: "1.5px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage: cardBgImage,
        borderRadius: "14px",
        padding: "24px",
        minHeight: "130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: defaultShadow,
        position: "relative",
        overflow: "hidden",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: href ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = hoverShadow;
        if (href) {
          e.currentTarget.style.backgroundImage = cardBgImageHover;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = defaultShadow;
        if (href) {
          e.currentTarget.style.backgroundImage = cardBgImage;
        }
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
            color: "#9a8c7a",
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
              "linear-gradient(135deg, rgba(206,28,26,0.18) 0%, rgba(206,28,26,0.25) 60%, rgba(206,28,26,0.30) 100%)",
            color: "#f0797a",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            boxShadow:
              "0 6px 16px rgba(206,28,26,0.22), 0 2px 6px rgba(206,28,26,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
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
              color: "#9a8c7a",
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
