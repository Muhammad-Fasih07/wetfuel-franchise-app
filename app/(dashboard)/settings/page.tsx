"use client";

import { useState } from "react";

import { SettingsOutlined as SettingsOutlinedIcon } from "@mui/icons-material";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProfilePanel } from "./_panels/ProfilePanel";
import { SecurityPanel } from "./_panels/SecurityPanel";
import { NotificationsPanel } from "./_panels/NotificationsPanel";
import { DangerPanel } from "./_panels/DangerPanel";

type SettingsSection =
  | "profile"
  | "security"
  | "notifications"
  | "danger";

interface NavSection {
  label: string;
  items: Array<{ id: SettingsSection; label: string }>;
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: "ACCOUNT",
    items: [
      { id: "profile", label: "Profile" },
      { id: "security", label: "Password & Security" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { id: "notifications", label: "Notifications" },
    ],
  },
  {
    label: "DANGER",
    items: [{ id: "danger", label: "Danger Zone" }],
  },
];

export default function SettingsPage() {
  const [active, setActive] = useState<SettingsSection>("profile");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader
        breadcrumb="System / Settings"
        icon={<SettingsOutlinedIcon sx={{ fontSize: 24 }} />}
        title="Settings"
        subtitle="Manage your franchise admin account and preferences."
      />

      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <aside
          style={{
            width: "220px",
            flexShrink: 0,
            position: "sticky",
            top: "32px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          {NAV_SECTIONS.map((section, sIdx) => (
            <div key={section.label}>
              <p
                className="type-category-label"
                style={{
                  color: section.label === "DANGER" ? "var(--error-text)" : undefined,
                  margin: sIdx === 0 ? "4px 0 4px 10px" : "12px 0 4px 10px",
                }}
              >
                {section.label}
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {section.items.map((item) => {
                  const isActive = active === item.id;
                  const isDanger = item.id === "danger";
                  return (
                    <li key={item.id} style={{ margin: "2px 0" }}>
                      <button
                        type="button"
                        onClick={() => setActive(item.id)}
                        className="settings-nav-item"
                        data-active={isActive ? "true" : "false"}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 12px",
                          margin: "0 4px",
                          background: isActive
                            ? isDanger ? "var(--error-bg)" : "var(--primary-brand-muted)"
                            : "transparent",
                          color: isActive
                            ? isDanger ? "var(--error-text)" : "var(--primary-brand)"
                            : "var(--text-secondary)",
                          borderLeft: isActive
                            ? `3px solid ${isDanger ? "var(--error-text)" : "var(--primary-brand)"}`
                            : "3px solid transparent",
                          fontSize: "14px",
                          fontWeight: isActive ? 500 : 400,
                          borderTop: "none",
                          borderRight: "none",
                          borderBottom: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: "inherit",
                          transition: "background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast)",
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          {active === "profile" && <ProfilePanel />}
          {active === "security" && <SecurityPanel />}
          {active === "notifications" && <NotificationsPanel />}
          {active === "danger" && <DangerPanel />}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .settings-nav-item[data-active="false"]:hover {
          background: var(--bg-surface-hover) !important;
          color: var(--text-primary) !important;
        }
      `,
        }}
      />
    </div>
  );
}
