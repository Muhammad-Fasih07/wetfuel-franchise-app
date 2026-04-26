import type { ReactNode } from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
}

const primaryGradient =
  "linear-gradient(135deg, #cd171a 0%, #ce1c1a 35%, #bf2524 100%)";
const primaryGradientHover =
  "linear-gradient(135deg, #ce1c1a 0%, #bf2524 45%, #a61e1c 100%)";
const primaryGradientActive =
  "linear-gradient(135deg, #a61e1c 0%, #cd171a 50%, #8b1816 100%)";

export function Button({
  children,
  onClick,
  type = "button",
  fullWidth = true,
  variant = "primary",
  disabled = false,
  loading = false,
  startIcon,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <MuiButton
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      startIcon={loading ? undefined : startIcon}
      disableElevation
      disabled={isDisabled}
      sx={{
        height: "44px",
        borderRadius: "10px",
        fontWeight: 600,
        fontSize: "14px",
        textTransform: "none",
        letterSpacing: "0.2px",
        boxShadow: "none",
        position: "relative",
        overflow: "hidden",
        transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        ...(variant === "primary"
          ? {
              background: primaryGradient,
              backgroundSize: "120% 120%",
              backgroundPosition: "40% 50%",
              color: "#ffffff",
              border: "none",
              boxShadow: "0 4px 14px rgba(206,28,26,0.35), 0 2px 6px rgba(206,28,26,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "left 0.6s ease",
              },
              "&:hover": {
                background: primaryGradientHover,
                backgroundSize: "120% 120%",
                backgroundPosition: "60% 50%",
                boxShadow: "0 6px 20px rgba(206,28,26,0.45), 0 3px 8px rgba(206,28,26,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                transform: "translateY(-1px)",
                "&::before": {
                  left: "100%",
                },
              },
              "&:active": {
                background: primaryGradientActive,
                transform: "translateY(0px) scale(0.98)",
                boxShadow: "0 2px 8px rgba(206,28,26,0.4), inset 0 2px 4px rgba(0,0,0,0.1)",
              },
            }
          : {
              color: "#ce1c1a",
              backgroundColor: "#ffffff",
              border: "1px solid transparent",
              backgroundImage:
                "linear-gradient(#ffffff, #ffffff), linear-gradient(135deg, #ce1c1a 0%, #f0797a 45%, #bf2524 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              "&:hover": {
                backgroundImage:
                  "linear-gradient(#fff5f5, #fff5f5), linear-gradient(135deg, #ce1c1a 0%, #f0797a 45%, #bf2524 100%)",
                boxShadow: "0 4px 12px rgba(206,28,26,0.15)",
                transform: "translateY(-1px)",
              },
              "&:active": {
                backgroundImage:
                  "linear-gradient(#fff0f0, #fff0f0), linear-gradient(135deg, #bf2524 0%, #ce1c1a 50%, #cd171a 100%)",
                transform: "translateY(0px)",
              },
            }),
        "&.Mui-disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
          color: variant === "primary" ? "#ffffff" : "#ce1c1a",
          background: variant === "primary" ? "#ce1c1a" : "transparent",
          backgroundImage: variant === "ghost" ? "none" : undefined,
          transform: "none",
          boxShadow: "none",
        },
      }}
    >
      {loading ? <CircularProgress size={18} sx={{ color: "inherit" }} /> : children}
    </MuiButton>
  );
}
