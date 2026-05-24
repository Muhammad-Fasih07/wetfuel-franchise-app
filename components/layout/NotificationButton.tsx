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
            color: "#9a8c7a",
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            border: "1px solid transparent",
            transition: "all 140ms ease",
            "&:hover": {
              color: "#ce1c1a",
              background: "rgba(206,28,26,0.12)",
              borderColor: "rgba(206,28,26,0.25)",
            },
            position: "relative",
          }}
        >
          <NotificationsOutlined sx={{ fontSize: 20 }} />
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ce1c1a",
              border: "2px solid #1c1c1d",
              boxShadow: "0 0 0 0 rgba(206,28,26,0.6)",
              animation: "wf-notification-pulse 2s ease-in-out infinite",
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes wf-notification-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(206,28,26,0.55); }
          70%  { box-shadow: 0 0 0 6px rgba(206,28,26,0); }
          100% { box-shadow: 0 0 0 0   rgba(206,28,26,0); }
        }
      `,
        }}
      />
    </>
  );
}
