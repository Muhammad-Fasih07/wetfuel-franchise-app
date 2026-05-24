"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  ConstructionOutlined,
} from "@mui/icons-material";
import { Button } from "./Button";

interface UnderDevelopmentModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function UnderDevelopmentModal({
  open,
  onClose,
  title = "Under Development",
  message = "This feature is currently under development. Check back soon!",
}: UnderDevelopmentModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxWidth: "440px",
          width: "calc(100% - 32px)",
          padding: 0,
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0 24px 48px -12px rgba(0,0,0,0.65), 0 8px 24px rgba(206,28,26,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
          background:
            "linear-gradient(180deg, #1c1c1d 0%, #1e1e20 65%, #212123 100%)",
          border: "1.5px solid rgba(255,255,255,0.09)",
        },
      }}
      BackdropProps={{
        sx: {
          background: "rgba(10,8,8,0.62)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(90deg, transparent 0%, #ce1c1a 35%, #f0797a 50%, #ce1c1a 65%, transparent 100%)",
          opacity: 0.9,
          zIndex: 2,
        }}
      />

      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(206,28,26,0.14) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-40px",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(206,28,26,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <IconButton
        onClick={onClose}
        aria-label="Close"
        size="small"
        sx={{
          position: "absolute",
          top: "14px",
          right: "14px",
          zIndex: 3,
          color: "#9a8c7a",
          borderRadius: "8px",
          border: "1px solid transparent",
          transition: "all 140ms ease",
          "&:hover": {
            color: "#e8e6e3",
            background: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>

      <DialogContent
        sx={{
          padding: "36px 28px 8px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: "#f0797a",
              background:
                "linear-gradient(135deg, rgba(206,28,26,0.14) 0%, rgba(240,121,122,0.1) 100%)",
              padding: "5px 12px",
              borderRadius: "24px",
              border: "1.5px solid rgba(206,28,26,0.28)",
              boxShadow: "0 4px 12px rgba(206,28,26,0.15)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#ce1c1a",
                boxShadow: "0 0 8px rgba(206,28,26,0.7)",
                animation: "wf-dev-pulse 2s ease-in-out infinite",
              }}
            />
            Coming Soon
          </span>

          <span
            aria-hidden
            className="animate-scale-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(206,28,26,0.16) 0%, rgba(206,28,26,0.24) 55%, rgba(206,28,26,0.3) 100%)",
              color: "#f0797a",
              border: "1.5px solid rgba(206,28,26,0.25)",
              boxShadow:
                "0 10px 28px -8px rgba(206,28,26,0.45), 0 4px 12px rgba(206,28,26,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
              position: "relative",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08) 0%, transparent 55%)",
              }}
            />
            <ConstructionOutlined sx={{ fontSize: 38, position: "relative", zIndex: 1 }} />
          </span>

          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h2
              className="text-gradient-primary"
              style={{
                fontSize: "20px",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "-0.3px",
                lineHeight: 1.25,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#9a8c7a",
                margin: "10px 0 0",
                lineHeight: 1.65,
                maxWidth: "320px",
                fontWeight: 400,
              }}
            >
              {message}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginTop: "4px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ce1c1a 0%, #f0797a 100%)",
                  opacity: 0.5,
                  animation: `wf-dev-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "20px 28px 28px",
          justifyContent: "center",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background:
            "linear-gradient(180deg, rgba(28,28,29,0) 0%, rgba(33,33,35,0.55) 100%)",
        }}
      >
        <Button variant="primary" fullWidth onClick={onClose}>
          Got it
        </Button>
      </DialogActions>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes wf-dev-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes wf-dev-dot {
          0%, 80%, 100% { opacity: 0.35; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1); }
        }
      `,
        }}
      />
    </Dialog>
  );
}
