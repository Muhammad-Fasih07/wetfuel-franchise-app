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
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 55%, #000000 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 8px 20px rgba(23, 20, 11, 0.32), inset 0 1px 0 rgba(255,255,255,0.10)",
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
            color: "#887b6a",
            fontWeight: 500,
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: "0.2px",
            textAlign: align === "center" ? "center" : "left",
          }}
        >
          Franchise Admin Portal
        </p>
      )}
    </div>
  );
}
