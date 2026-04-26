import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

const gradientBorder =
  "linear-gradient(135deg, #ce1c1a 0%, #bf2524 25%, #f0797a 60%, rgba(255,255,255,0.18) 100%)";

const cardSurface =
  "linear-gradient(165deg, #ffffff 0%, #ffffff 50%, #fbfaf9 80%, #f7f6f4 100%)";

// Same dark gradient palette used by the sidebar — radial red glows over a deep
// charcoal base.
const pageBackdrop =
  "radial-gradient(1100px 700px at 5% -5%, rgba(206,28,26,0.28) 0%, rgba(206,28,26,0) 55%)," +
  "radial-gradient(900px 600px at 100% 100%, rgba(206,28,26,0.18) 0%, rgba(206,28,26,0) 55%)," +
  "radial-gradient(800px 500px at 95% 5%, rgba(240,121,122,0.10) 0%, rgba(240,121,122,0) 55%)," +
  "linear-gradient(180deg, #1c1c1d 0%, #232324 50%, #1a1a1b 100%)";

export function AuthCard({ children }: AuthCardProps) {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: pageBackdrop,
        padding: "24px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        className="animate-fade-in"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 75%)",
          pointerEvents: "none",
        }}
      />

      <span
        aria-hidden
        className="animate-fade-in"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(206,28,26,0.7) 50%, transparent 100%)",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        className="animate-glow"
        style={{
          position: "absolute",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          left: "calc(50% - 360px)",
          top: "calc(50% - 360px)",
          background:
            "radial-gradient(closest-side, rgba(206,28,26,0.22) 0%, rgba(206,28,26,0) 70%)",
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="animate-glow"
        style={{
          position: "absolute",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          right: "calc(50% - 360px)",
          bottom: "calc(50% - 360px)",
          background:
            "radial-gradient(closest-side, rgba(240,121,122,0.22) 0%, rgba(240,121,122,0) 70%)",
          filter: "blur(24px)",
          pointerEvents: "none",
          animationDelay: "1.5s",
        }}
      />

      <div
        className="animate-scale-in"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "460px",
          padding: "1.5px",
          borderRadius: "18px",
          background: gradientBorder,
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.4), 0 30px 80px -20px rgba(206,28,26,0.5), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "16.5px",
            background: cardSurface,
            padding: "44px 40px 36px 40px",
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background:
                "linear-gradient(90deg, #ce1c1a 0%, #f0797a 50%, #bf2524 100%)",
              boxShadow: "0 2px 12px rgba(206,28,26,0.4)",
            }}
          />

          <div
            aria-hidden
            className="animate-float"
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background:
                "radial-gradient(closest-side, rgba(206,28,26,0.12) 0%, rgba(206,28,26,0) 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            aria-hidden
            className="animate-float"
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background:
                "radial-gradient(closest-side, rgba(240,121,122,0.08) 0%, rgba(240,121,122,0) 70%)",
              pointerEvents: "none",
              animationDelay: "2s",
            }}
          />

          {children}
        </div>
      </div>
    </main>
  );
}
