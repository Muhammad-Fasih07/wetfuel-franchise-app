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
  confirmColor = "var(--primary-brand)",
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
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
        },
      }}
      BackdropProps={{
        sx: { background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--text-primary)",
          padding: "20px 24px 6px",
        }}
      >
        {title}
      </DialogTitle>

      {message && (
        <DialogContent sx={{ padding: "8px 24px 16px" }}>
          <DialogContentText
            sx={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions
        sx={{
          padding: "12px 20px 20px",
          gap: "8px",
          borderTop: "1px solid var(--border-subtle)",
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
            backgroundColor: confirmColor,
            color: "#ffffff",
            height: "40px",
            borderRadius: "6px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "14px",
            padding: "0 16px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: confirmColor,
              filter: "brightness(0.9)",
              boxShadow: "none",
            },
            "&.Mui-disabled": { opacity: 0.4 },
          }}
        >
          {isBusy ? "Working..." : confirmLabel}
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
}
