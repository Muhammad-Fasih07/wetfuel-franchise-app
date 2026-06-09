"use client";

import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import { UnderDevelopmentModal } from "@/components/ui/UnderDevelopmentModal";

export function NotificationButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Notifications" placement="bottom">
        <IconButton
          size="small"
          onClick={() => setOpen(true)}
          aria-label="Open notifications"
          sx={{
            color: "var(--text-muted)",
            borderRadius: "6px",
            width: "34px",
            height: "34px",
            border: "1px solid transparent",
            transition: "background-color var(--transition-fast), color var(--transition-fast)",
            "&:hover": {
              color: "var(--text-primary)",
              background: "var(--bg-surface-hover)",
            },
            position: "relative",
          }}
        >
          <NotificationsOutlined sx={{ fontSize: 20 }} />
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "7px",
              right: "7px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--primary-brand)",
              border: "2px solid var(--bg-main)",
            }}
          />
        </IconButton>
      </Tooltip>

      <UnderDevelopmentModal
        open={open}
        onClose={() => setOpen(false)}
        title="Notifications"
        message="Notifications are currently under development. You'll be able to view alerts and updates here soon."
      />

    </>
  );
}
