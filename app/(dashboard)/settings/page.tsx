"use client";

import { useState } from "react";

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
            width: "240px",
            flexShrink: 0,
            position: "sticky",
            top: "32px",
            background:
              "linear-gradient(180deg, #ffffff 0%, #ffffff 60%, #fdfcfb 100%)",
            border: "1px solid #ececec",
            borderRadius: "12px",
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -16px rgba(43,43,43,0.18)",
            padding: "10px",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(206,28,26,0.55) 50%, transparent 100%)",
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />
          {NAV_SECTIONS.map((section, sIdx) => (
            <div key={section.label}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 12px 6px",
                  marginTop: sIdx === 0 ? 0 : "8px",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: "10px",
                    height: "1px",
                    background: "rgba(43,43,43,0.15)",
                  }}
                />
                <p
                  style={{
                    fontSize: "10px",
                    color: section.label === "DANGER" ? "#dc2626" : "#887b6a",
                    textTransform: "uppercase",
                    letterSpacing: "1.4px",
                    margin: 0,
                    fontWeight: 700,
                  }}
                >
                  {section.label}
                </p>
              </div>
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
                        data-danger={isDanger ? "true" : "false"}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 12px",
                          background: isActive
                            ? isDanger
                              ? "linear-gradient(90deg, rgba(220,38,38,0.14) 0%, rgba(220,38,38,0.04) 60%, transparent 100%)"
                              : "linear-gradient(90deg, rgba(206,28,26,0.16) 0%, rgba(206,28,26,0.04) 60%, transparent 100%)"
                            : "transparent",
                          color: isActive
                            ? isDanger
                              ? "#dc2626"
                              : "#ce1c1a"
                            : "#887b6a",
                          fontSize: "13px",
                          fontWeight: isActive ? 600 : 500,
                          border: isActive
                            ? `1px solid ${isDanger ? "rgba(220,38,38,0.25)" : "rgba(206,28,26,0.25)"}`
                            : "1px solid transparent",
                          borderRadius: "10px",
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: "inherit",
                          position: "relative",
                          transition: "all 140ms ease",
                          boxShadow: isActive
                            ? `0 4px 14px -8px ${isDanger ? "rgba(220,38,38,0.5)" : "rgba(206,28,26,0.5)"}, inset 0 1px 0 rgba(255,255,255,0.6)`
                            : "none",
                        }}
                      >
                        {isActive && (
                          <span
                            aria-hidden
                            style={{
                              position: "absolute",
                              left: "-10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              width: "3px",
                              height: "20px",
                              borderRadius: "0 3px 3px 0",
                              background: isDanger
                                ? "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)"
                                : "linear-gradient(180deg, #f0797a 0%, #ce1c1a 50%, #8b1816 100%)",
                              boxShadow: `0 0 12px ${isDanger ? "rgba(220,38,38,0.6)" : "rgba(206,28,26,0.6)"}`,
                            }}
                          />
                        )}
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {isActive && (
                          <span
                            aria-hidden
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: isDanger ? "#dc2626" : "#ce1c1a",
                              boxShadow: `0 0 8px ${isDanger ? "rgba(220,38,38,0.6)" : "rgba(206,28,26,0.6)"}`,
                            }}
                          />
                        )}
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
          background: #fafafa !important;
          color: #2b2b2b !important;
          border-color: #ececec !important;
        }
      `,
        }}
      />
    </div>
  );
}
