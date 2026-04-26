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
      className="animate-slide-up"
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
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 55%, #000000 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 12px 28px rgba(23, 20, 11, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.3)",
          position: "relative",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05) rotate(2deg)";
          e.currentTarget.style.boxShadow =
            "0 16px 36px rgba(23, 20, 11, 0.5), 0 6px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          e.currentTarget.style.boxShadow =
            "0 12px 28px rgba(23, 20, 11, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.3)";
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "18px",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wetfeullogo.png"
          alt="WetFuel"
          style={{
            height: `${logoHeight}px`,
            width: "auto",
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
          }}
        />
      </div>

      {showSubtitle && (
        <p
          className="animate-fade-in"
          style={{
            fontSize: `${subtitleSize}px`,
            color: "#887b6a",
            fontWeight: 500,
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: "0.3px",
            textAlign: align === "center" ? "center" : "left",
            animationDelay: "0.2s",
          }}
        >
          Franchise Admin Portal
        </p>
      )}
    </div>
  );
}
