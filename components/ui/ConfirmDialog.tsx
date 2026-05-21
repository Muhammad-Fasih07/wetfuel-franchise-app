"use client";

import { useState } from "react";
import {
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { withGlobalLoading } from "../../lib/loading/withGlobalLoading";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmColor = "#ce1c1a",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [pending, setPending] = useState(false);
  const isBusy = loading || pending;

  const handleConfirm = async () => {
    const result = onConfirm();
    if (!(result instanceof Promise)) return;
    setPending(true);
    try {
      await withGlobalLoading(() => result);
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          borderRadius: "14px",
          maxWidth: "420px",
          width: "100%",
          padding: 0,
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0 12px 40px -12px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)",
          background:
            "linear-gradient(180deg, #1c1c1d 0%, #1e1e20 70%, #212123 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      }}
      BackdropProps={{
        sx: { background: "rgba(20,16,16,0.55)", backdropFilter: "blur(2px)" },
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
          background: `linear-gradient(90deg, transparent 0%, ${confirmColor} 50%, transparent 100%)`,
          opacity: 0.85,
        }}
      />

      <DialogTitle
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#e8e6e3",
          padding: "22px 24px 6px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          aria-hidden
          style={{
            width: "4px",
            height: "18px",
            borderRadius: "2px",
            background: `linear-gradient(180deg, ${confirmColor} 0%, ${confirmColor}cc 100%)`,
            boxShadow: `0 0 10px ${confirmColor}55`,
          }}
        />
        {title}
      </DialogTitle>

      {message && (
        <DialogContent sx={{ padding: "8px 24px 18px" }}>
          <DialogContentText
            sx={{ fontSize: "14px", color: "#9a8c7a", lineHeight: 1.55 }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions
        sx={{
          padding: "14px 20px 20px",
          gap: "8px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background:
            "linear-gradient(180deg, rgba(28,28,29,0) 0%, rgba(33,33,35,0.6) 100%)",
        }}
      >
        <Button variant="ghost" fullWidth={false} onClick={onCancel}>
          {cancelLabel}
        </Button>
        <MuiButton
          variant="contained"
          disableElevation
          disabled={isBusy}
          onClick={handleConfirm}
          sx={{
            background: `linear-gradient(135deg, ${confirmColor} 0%, ${confirmColor}d9 50%, ${confirmColor}b3 100%)`,
            color: "#ffffff",
            height: "44px",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "14px",
            padding: "0 20px",
            boxShadow: `0 4px 14px -4px ${confirmColor}80, inset 0 1px 0 rgba(255,255,255,0.18)`,
            "&:hover": {
              background: `linear-gradient(135deg, ${confirmColor} 0%, ${confirmColor} 50%, ${confirmColor}cc 100%)`,
              filter: "brightness(0.96)",
              boxShadow: `0 6px 18px -4px ${confirmColor}99, inset 0 1px 0 rgba(255,255,255,0.22)`,
            },
          }}
        >
          {isBusy ? "Working..." : confirmLabel}
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
}
