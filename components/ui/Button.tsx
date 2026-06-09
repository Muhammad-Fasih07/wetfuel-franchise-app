"use client";

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import { withGlobalLoading } from "../../lib/loading/withGlobalLoading";

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  disableGlobalLoading?: boolean;
  startIcon?: ReactNode;
}

export function Button({
  children,
  onClick,
  type = "button",
  fullWidth = true,
  variant = "primary",
  disabled = false,
  loading = false,
  disableGlobalLoading = false,
  startIcon,
}: ButtonProps) {
  const [pending, setPending] = useState(false);
  const isDisabled = disabled || loading || pending;

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    const result = onClick(event);
    if (!(result instanceof Promise)) return;
    if (loading || disableGlobalLoading) {
      setPending(true);
      try {
        await result;
      } finally {
        setPending(false);
      }
      return;
    }
    setPending(true);
    try {
      await withGlobalLoading(() => result);
    } finally {
      setPending(false);
    }
  };

  return (
    <MuiButton
      type={type}
      onClick={onClick ? handleClick : undefined}
      fullWidth={fullWidth}
      startIcon={loading || pending ? undefined : startIcon}
      disableElevation
      disabled={isDisabled}
      sx={{
        height: "40px",
        borderRadius: "6px",
        fontWeight: 600,
        fontSize: "14px",
        textTransform: "none",
        letterSpacing: "0.1px",
        boxShadow: "none",
        transition: "background-color var(--transition-fast), transform var(--transition-fast)",
        ...(variant === "primary"
          ? {
              backgroundColor: "var(--primary-brand)",
              color: "#ffffff",
              border: "none",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "var(--primary-hover)",
                boxShadow: "none",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }
          : {
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-subtle)",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "var(--bg-surface-hover)",
                boxShadow: "none",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }),
        "&.Mui-disabled": {
          opacity: 0.4,
          cursor: "not-allowed",
          color: variant === "primary" ? "#ffffff" : "var(--text-primary)",
          backgroundColor: variant === "primary" ? "var(--primary-brand)" : "var(--bg-surface)",
          transform: "none",
          boxShadow: "none",
        },
      }}
    >
      {loading || pending ? (
        <CircularProgress size={16} sx={{ color: "inherit" }} />
      ) : (
        children
      )}
    </MuiButton>
  );
}
