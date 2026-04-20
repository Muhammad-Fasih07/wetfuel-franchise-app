"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import {
  AssessmentOutlined,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  HelpOutline as HelpOutlineIcon,
  Logout as LogoutIcon,
  SettingsOutlined,
  Store as StoreIcon,
} from "@mui/icons-material";

type SidebarNavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: { value: string | number; color: string };
};

export const sidebarNavItems: SidebarNavItem[] = [
  { label: "Dashboard", href: "/", icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
  { label: "Franchisees", href: "/franchisees", icon: <StoreIcon sx={{ fontSize: 20 }} /> },
  {
    label: "Reporting",
    href: "/reporting",
    icon: <AssessmentOutlined sx={{ fontSize: 20 }} />,
    badge: { value: 7, color: "#ce1c1a" },
  },
  { label: "Settings", href: "/settings", icon: <SettingsOutlined sx={{ fontSize: 20 }} /> },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  const handleSignOut = () => {
    // TODO: call signOut() from next-auth and clear authStore before redirecting
    router.push("/login");
  };

  return (
    <aside
      style={{
        width: "240px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        padding: 0,
        zIndex: 100,
        background:
          "radial-gradient(120% 60% at 0% 0%, rgba(206,28,26,0.18) 0%, transparent 55%), radial-gradient(120% 60% at 100% 100%, rgba(206,28,26,0.10) 0%, transparent 50%), linear-gradient(180deg, #1c1c1d 0%, #232324 50%, #1a1a1b 100%)",
        borderRight: "1px solid rgba(206,28,26,0.18)",
        boxShadow:
          "1px 0 0 rgba(255,255,255,0.04) inset, 12px 0 32px -24px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          padding: "20px 18px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "relative",
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
              "linear-gradient(90deg, transparent 0%, #ce1c1a 50%, transparent 100%)",
            opacity: 0.7,
          }}
        />
        <div
          aria-hidden
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 55%, #000000 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 6px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 16px -2px rgba(206,28,26,0.4)",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/wetfeullogo.png"
            alt="WetFuel"
            style={{
              height: "28px",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.3px",
              background:
                "linear-gradient(135deg, #ffffff 0%, #f0797a 60%, #ce1c1a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            WetFuel
          </p>
          <p
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.45)",
              margin: "2px 0 0 0",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Franchise Admin
          </p>
        </div>
      </div>

      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "16px 20px 8px",
          }}
        >
          <span
            aria-hidden
            style={{
              width: "10px",
              height: "1px",
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <p
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "1.4px",
              margin: 0,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Main Menu
          </p>
        </div>

        <ul style={{ listStyle: "none", padding: "0 10px", margin: 0 }}>
          {sidebarNavItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href} style={{ margin: "2px 0" }}>
                <Link
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: active
                      ? "linear-gradient(90deg, rgba(206,28,26,0.28) 0%, rgba(206,28,26,0.10) 50%, rgba(206,28,26,0.04) 100%)"
                      : "transparent",
                    color: active ? "#ffffff" : "rgba(255,255,255,0.65)",
                    fontSize: "14px",
                    fontWeight: active ? 500 : 400,
                    transition: "all 140ms ease",
                    position: "relative",
                    border: active
                      ? "1px solid rgba(206,28,26,0.35)"
                      : "1px solid transparent",
                    boxShadow: active
                      ? "0 6px 18px -10px rgba(206,28,26,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
                      : "none",
                  }}
                  className="sidebar-nav-item"
                  data-active={active ? "true" : "false"}
                >
                  {active && (
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
                        background:
                          "linear-gradient(180deg, #f0797a 0%, #ce1c1a 50%, #8b1816 100%)",
                        boxShadow: "0 0 12px rgba(206,28,26,0.6)",
                      }}
                    />
                  )}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: active
                        ? "linear-gradient(135deg, rgba(206,28,26,0.25) 0%, rgba(206,28,26,0.10) 100%)"
                        : "transparent",
                      color: active ? "#f0797a" : "rgba(255,255,255,0.55)",
                      transition: "all 140ms ease",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>

                  {item.badge && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#ffffff",
                        background: item.badge.color,
                        padding: "2px 7px",
                        borderRadius: "20px",
                        minWidth: "20px",
                        textAlign: "center",
                        boxShadow: `0 0 0 2px rgba(206,28,26,0.15), 0 4px 10px -2px ${item.badge.color}66`,
                      }}
                    >
                      {item.badge.value}
                    </span>
                  )}

                  {active && (
                    <ChevronRightIcon
                      sx={{
                        fontSize: 16,
                        color: "rgba(255,255,255,0.4)",
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div style={{ padding: "20px 16px 0" }}>
          <div
            style={{
              borderRadius: "12px",
              padding: "14px",
              background:
                "linear-gradient(135deg, rgba(206,28,26,0.18) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(206,28,26,0.22)",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(206,28,26,0.4) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(135deg, #ce1c1a 0%, #8b1816 100%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 4px 10px rgba(206,28,26,0.4)",
                  flexShrink: 0,
                }}
              >
                <HelpOutlineIcon sx={{ fontSize: 16 }} />
              </span>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Need help?
              </p>
            </div>
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.55)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Reach our team for onboarding & data migration.
            </p>
            <a
              href="mailto:support@wetfuel.com"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#f0797a",
                textDecoration: "none",
                marginTop: "2px",
              }}
            >
              Contact support →
            </a>
          </div>
        </div>
      </nav>

      <div
        style={{
          padding: "14px 16px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background:
                "linear-gradient(135deg, #cd171a 0%, #ce1c1a 45%, #8b1816 100%)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ffffff",
              boxShadow:
                "0 4px 10px rgba(206,28,26,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          >
            SA
          </Avatar>
          <span
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#22c55e",
              border: "2px solid #1a1a1b",
              boxShadow: "0 0 8px rgba(34,197,94,0.6)",
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#ffffff",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Super Admin
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              margin: "2px 0 0 0",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            Online
          </p>
        </div>
        <Tooltip title="Sign out" placement="top">
          <IconButton
            size="small"
            onClick={handleSignOut}
            sx={{
              color: "rgba(255,255,255,0.4)",
              borderRadius: "8px",
              transition: "all 140ms ease",
              "&:hover": {
                color: "#f0797a",
                background: "rgba(206,28,26,0.12)",
              },
            }}
          >
            <LogoutIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .sidebar-nav-item[data-active="false"]:hover {
          background: rgba(255,255,255,0.04) !important;
          color: rgba(255,255,255,0.95) !important;
          border-color: rgba(255,255,255,0.06) !important;
        }
        .sidebar-nav-item[data-active="false"]:hover > span:first-of-type {
          color: #ffffff !important;
          background: rgba(255,255,255,0.06) !important;
        }
      `,
        }}
      />
    </aside>
  );
}
