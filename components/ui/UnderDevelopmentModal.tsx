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
          borderRadius: "8px",
          maxWidth: "420px",
          width: "calc(100% - 32px)",
          padding: 0,
          overflow: "hidden",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
        },
      }}
      BackdropProps={{
        sx: {
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Close"
        size="small"
        sx={{
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: 3,
          color: "var(--text-muted)",
          borderRadius: "6px",
          transition: "background-color var(--transition-fast)",
          "&:hover": {
            color: "var(--text-primary)",
            background: "var(--bg-surface-hover)",
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>

      <DialogContent
        sx={{
          padding: "32px 28px 12px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "8px",
              background: "var(--bg-surface-hover)",
              color: "var(--text-muted)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <ConstructionOutlined sx={{ fontSize: 32 }} />
          </span>

          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                margin: 0,
                lineHeight: 1.3,
                color: "var(--text-primary)",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                margin: "8px 0 0",
                lineHeight: 1.5,
                maxWidth: "320px",
                fontWeight: 400,
              }}
            >
              {message}
            </p>
          </div>
        </div>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 28px 24px",
          justifyContent: "center",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <Button variant="primary" fullWidth onClick={onClose}>
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
}
