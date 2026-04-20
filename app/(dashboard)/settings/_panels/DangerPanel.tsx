"use client";

import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const DANGER_BTN_SX: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f0797a",
  color: "#dc2626",
  height: "34px",
  borderRadius: "8px",
  padding: "0 14px",
  fontSize: "13px",
  fontWeight: 500,
  textTransform: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background 150ms ease",
};

type ConfirmKind = "reset" | "delete" | null;

export function DangerPanel() {
  const [confirm, setConfirm] = useState<ConfirmKind>(null);
  const [exportToast, setExportToast] = useState(false);

  const closeConfirm = () => setConfirm(null);

  const rows: Array<{
    label: string;
    sub: string;
    button: string;
    onClick: () => void;
  }> = [
    {
      label: "Reset all notification preferences",
      sub: "Resets to default notification settings.",
      button: "Reset",
      onClick: () => setConfirm("reset"),
    },
    {
      label: "Export all franchise data",
      sub: "Download a full data export for compliance purposes.",
      button: "Export",
      onClick: () => {
        // TODO: hook up real export endpoint
        setExportToast(true);
      },
    },
    {
      label: "Delete admin account",
      sub: "Permanently removes your admin access. Cannot be undone.",
      button: "Delete Account",
      onClick: () => setConfirm("delete"),
    },
  ];

  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #e5e5e5",
        borderLeft: "4px solid #f0797a",
        borderRadius: "0 12px 12px 0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          padding: "18px 24px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#dc2626",
            margin: 0,
          }}
        >
          Danger Zone
        </h2>
      </header>

      <div style={{ padding: "20px 28px 24px" }}>
        <p
          style={{
            fontSize: "13px",
            color: "#887b6a",
            margin: "0 0 24px",
          }}
        >
          These actions are irreversible. Please proceed with caution.
        </p>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {rows.map((r, idx) => (
            <li
              key={r.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                borderBottom:
                  idx === rows.length - 1 ? "none" : "1px solid #fef2f2",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#2b2b2b",
                    margin: 0,
                  }}
                >
                  {r.label}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#887b6a",
                    margin: "2px 0 0 0",
                  }}
                >
                  {r.sub}
                </p>
              </div>
              <button
                type="button"
                style={DANGER_BTN_SX}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#fff5f5")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#ffffff")
                }
                onClick={r.onClick}
              >
                {r.button}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ConfirmDialog
        open={confirm === "reset"}
        title="Reset notifications?"
        message="This will reset all notification preferences to their default values."
        confirmLabel="Reset"
        confirmColor="#f0797a"
        onConfirm={() => {
          // TODO: call reset preferences endpoint
          closeConfirm();
        }}
        onCancel={closeConfirm}
      />

      <ConfirmDialog
        open={confirm === "delete"}
        title="Delete your account?"
        message="This will permanently remove your admin access and cannot be reversed. All session data will be cleared."
        confirmLabel="Yes, delete my account"
        confirmColor="#dc2626"
        onConfirm={() => {
          // TODO: call delete account endpoint
          closeConfirm();
        }}
        onCancel={closeConfirm}
      />

      <Snackbar
        open={exportToast}
        autoHideDuration={2500}
        onClose={() => setExportToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          onClose={() => setExportToast(false)}
          sx={{
            background: "#f0fdf4",
            color: "#15803d",
            border: "1px solid #bbf7d0",
            fontSize: "13px",
            "& .MuiAlert-icon": { color: "#15803d" },
          }}
        >
          Export started. We will email you when it's ready.
        </Alert>
      </Snackbar>
    </section>
  );
}
