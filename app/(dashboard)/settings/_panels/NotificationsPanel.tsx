"use client";

import { useState } from "react";
import { Alert, Snackbar, Switch } from "@mui/material";

import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";

interface NotifRow {
  key: string;
  label: string;
  sub: string;
  defaultOn: boolean;
}

const EMAIL_ROWS: NotifRow[] = [
  { key: "new_franchisee", label: "New franchisee registered", sub: "When a new partner is added", defaultOn: true },
  { key: "frozen", label: "Franchisee frozen", sub: "Account suspension events", defaultOn: true },
  { key: "new_customer", label: "New customer request", sub: "Self-registration alerts", defaultOn: true },
  { key: "job_completed", label: "Job completed", sub: "Delivery completion", defaultOn: false },
  { key: "low_inventory", label: "Low inventory alert", sub: "Storage below threshold", defaultOn: true },
  { key: "data_sync", label: "Data sync failure", sub: "QuickBooks / OPIS sync issues", defaultOn: true },
];

const SWITCH_SX = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#ce1c1a" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#ce1c1a",
    opacity: 0.5,
  },
};

function ToggleColumn({
  title,
  rows,
  state,
  onToggle,
}: {
  title: string;
  rows: NotifRow[];
  state: Record<string, boolean>;
  onToggle: (key: string, next: boolean) => void;
}) {
  return (
    <div>
      <p
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#2b2b2b",
          margin: "0 0 16px",
        }}
      >
        {title}
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {rows.map((r, idx) => (
          <li
            key={r.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom:
                idx === rows.length - 1 ? "none" : "1px solid #f5f5f5",
              gap: "16px",
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
            <Switch
              checked={state[r.key] ?? r.defaultOn}
              onChange={(e) => onToggle(r.key, e.target.checked)}
              sx={SWITCH_SX}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NotificationsPanel() {
  const [toastOpen, setToastOpen] = useState(false);

  const initialEmail = Object.fromEntries(
    EMAIL_ROWS.map((r) => [r.key, r.defaultOn]),
  );

  const [emailState, setEmailState] = useState<Record<string, boolean>>(initialEmail);

  return (
    <SectionCard
      title="Notification Preferences"
      action={
        <Button
          fullWidth={false}
          onClick={() => {
            // TODO: persist preferences to lib/api/auth or settings endpoint
            setToastOpen(true);
          }}
        >
          Save Preferences
        </Button>
      }
      bodyPadding="20px 28px 28px"
    >
      <p
        style={{
          fontSize: "13px",
          color: "#887b6a",
          margin: "0 0 24px",
        }}
      >
        Choose which events trigger email notifications for your account.
      </p>

      <ToggleColumn
        title="Email Notifications"
        rows={EMAIL_ROWS}
        state={emailState}
        onToggle={(key, next) =>
          setEmailState((prev) => ({ ...prev, [key]: next }))
        }
      />

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          onClose={() => setToastOpen(false)}
          sx={{
            background: "#f0fdf4",
            color: "#15803d",
            border: "1px solid #bbf7d0",
            fontSize: "13px",
            "& .MuiAlert-icon": { color: "#15803d" },
          }}
        >
          Preferences saved.
        </Alert>
      </Snackbar>
    </SectionCard>
  );
}
