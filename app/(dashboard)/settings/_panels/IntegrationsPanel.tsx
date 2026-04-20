"use client";

import { Settings as SettingsIcon } from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";

// TODO: replace with real integration data from lib/api
const INTEGRATIONS = [
  {
    id: "quickbooks",
    name: "QuickBooks",
    icon: "QB",
    iconBg: "#f0fdf4",
    iconColor: "#15803d",
    description: "Sync invoicing, timeclocks and inventory data.",
    connected: true,
    lastSync: "2 hours ago",
  },
  {
    id: "opis",
    name: "OPIS Pricing",
    icon: "OP",
    iconBg: "#fffbeb",
    iconColor: "#b45309",
    description: "Fetch daily fuel pricing for admin approval.",
    connected: true,
    lastSync: "6 hours ago",
  },
  {
    id: "mail",
    name: "Email Service",
    icon: "MB",
    iconBg: "#eff6ff",
    iconColor: "#1d4ed8",
    description: "Send credential emails to new drivers and customers.",
    connected: false,
    lastSync: null,
  },
];

export function IntegrationsPanel() {
  return (
    <SectionCard title="Integrations" bodyPadding="20px 28px 28px">
      <p
        style={{
          fontSize: "13px",
          color: "#887b6a",
          margin: "0 0 24px",
        }}
      >
        Connect third-party services to sync data automatically.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {INTEGRATIONS.map((i) => (
          <div
            key={i.id}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div
              aria-hidden
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: i.iconBg,
                color: i.iconColor,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                flexShrink: 0,
              }}
            >
              {i.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#2b2b2b",
                  margin: 0,
                }}
              >
                {i.name}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#887b6a",
                  margin: "2px 0 0 0",
                }}
              >
                {i.description}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: i.connected ? "#15803d" : "#f0797a",
                  margin: "6px 0 0 0",
                  fontWeight: 500,
                }}
              >
                {i.connected
                  ? `Connected · Last sync: ${i.lastSync}`
                  : "Not connected"}
              </p>
            </div>

            <div style={{ flexShrink: 0 }}>
              {i.connected ? (
                <Button
                  variant="ghost"
                  fullWidth={false}
                  startIcon={<SettingsIcon sx={{ fontSize: 16 }} />}
                >
                  Configure
                </Button>
              ) : (
                <Button fullWidth={false}>Connect</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
