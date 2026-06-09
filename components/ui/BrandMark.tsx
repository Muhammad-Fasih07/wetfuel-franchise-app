"use client";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  showSubtitle?: boolean;
}

export function BrandMark({
  size = "md",
  align = "center",
  showSubtitle = true,
}: BrandMarkProps) {
  const subtitleSize = size === "lg" ? 14 : 13;
  const badgeSize = size === "lg" ? 110 : size === "sm" ? 72 : 92;
  const logoHeight = Math.round(badgeSize * 0.66);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: "12px",
        width: "100%",
      }}
    >
      <div
        aria-hidden
        style={{
          width: `${badgeSize}px`,
          height: `${badgeSize}px`,
          borderRadius: "12px",
          background: "var(--bg-surface-hover)",
          border: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "default",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wetfeullogo.png"
          alt="WetFuel"
          style={{
            height: `${logoHeight}px`,
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {showSubtitle && (
        <p
          style={{
            fontSize: `${subtitleSize}px`,
            color: "var(--text-muted)",
            fontWeight: 500,
            margin: 0,
            lineHeight: 1.4,
            textAlign: align === "center" ? "center" : "left",
          }}
        >
          Franchise Admin Portal
        </p>
      )}
    </div>
  );
}
