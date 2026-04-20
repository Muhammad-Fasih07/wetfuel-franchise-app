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
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "14px",
        textTransform: "none",
        boxShadow: "none",
        transition: "background 180ms ease, opacity 180ms ease, transform 150ms ease",
        ...(variant === "primary"
          ? {
              background: primaryGradient,
              backgroundSize: "120% 120%",
              backgroundPosition: "40% 50%",
              color: "#ffffff",
              border: "none",
              "&:hover": {
                background: primaryGradientHover,
                backgroundSize: "120% 120%",
                backgroundPosition: "60% 50%",
                boxShadow: "none",
              },
              "&:active": {
                background: primaryGradientActive,
                transform: "scale(0.995)",
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
                boxShadow: "none",
              },
              "&:active": {
                backgroundImage:
                  "linear-gradient(#fff0f0, #fff0f0), linear-gradient(135deg, #bf2524 0%, #ce1c1a 50%, #cd171a 100%)",
              },
            }),
        "&.Mui-disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
          color: variant === "primary" ? "#ffffff" : "#ce1c1a",
          background: variant === "primary" ? "#ce1c1a" : "transparent",
          backgroundImage: variant === "ghost" ? "none" : undefined,
        },
      }}
    >
      {loading ? <CircularProgress size={18} sx={{ color: "inherit" }} /> : children}
    </MuiButton>
  );
}
