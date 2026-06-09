"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppLink } from "../navigation/AppLink";
import { useAppRouter } from "../../lib/hooks/useAppRouter";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import {
  AssessmentOutlined,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
  SettingsOutlined,
  Store as StoreIcon,
} from "@mui/icons-material";

type SidebarNavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: { value: string | number };
};

type SidebarSection = {
  label: string;
  items: SidebarNavItem[];
};

export const sidebarSections: SidebarSection[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/",
        icon: <DashboardIcon sx={{ fontSize: 18 }} />,
      },
    ],
  },
  {
    label: "Network",
    items: [
      {
        label: "Franchisees",
        href: "/franchisees",
        icon: <StoreIcon sx={{ fontSize: 18 }} />,
      },
      {
        label: "Reporting",
        href: "/reporting",
        icon: <AssessmentOutlined sx={{ fontSize: 18 }} />,
        badge: { value: 7 },
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: <SettingsOutlined sx={{ fontSize: 18 }} />,
      },
    ],
  },
];

/** @deprecated Use sidebarSections for grouped navigation */
export const sidebarNavItems: SidebarNavItem[] = sidebarSections.flatMap(
  (section) => section.items,
);

const STORAGE_KEY = "wf-sidebar-collapsed";
const EXPANDED_WIDTH = "260px";
const COLLAPSED_WIDTH = "72px";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname() ?? "/";
  const router = useAppRouter();
  const [collapsed, setCollapsed] = useState(false);

  // Rehydrate persisted state on mount (default expanded to avoid hydration mismatch).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setCollapsed(true);
    }
  }, []);

  // Keep the content column margin in sync via a CSS variable.
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
    );
  }, [collapsed]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const handleSignOut = () => {
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <aside
      style={{
        width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
        background: "var(--bg-main)",
        borderRight: "1px solid var(--border-subtle)",
        transition: "width var(--transition-base)",
        overflow: "hidden",
      }}
    >
      {/* Logo / Brand */}
      <div
        style={{
          padding: collapsed ? "20px 10px" : "20px 10px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          gap: "12px",
          maxHeight: "64px",
        }}
      >
        {!collapsed && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wetfeullogo.png"
                alt="WetFuel"
                style={{
                  height: "22px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  margin: 0,
                  color: "var(--text-primary)",
                }}
              >
                WetFuel
              </p>
              <p
                className="type-category-label"
                style={{ margin: "2px 0 0 0" }}
              >
                Franchise Admin
              </p>
            </div>
          </div>
        )}

        <Tooltip
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          placement="right"
        >
          <IconButton
            size="small"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            sx={{
              color: "var(--text-muted)",
              borderRadius: "6px",
              flexShrink: 0,
              transition: "all var(--transition-fast)",
              "&:hover": {
                color: "var(--text-primary)",
                background: "var(--bg-surface-hover)",
              },
            }}
          >
            {collapsed ? (
              <MenuIcon sx={{ fontSize: 20 }} />
            ) : (
              <MenuOpenIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Tooltip>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "8px 12px 12px",
        }}
      >
        {sidebarSections.map((section, sectionIndex) => (
          <div
            key={section.label}
            style={{
              paddingTop:
                sectionIndex === 0 ? "4px" : collapsed ? "12px" : "20px",
            }}
          >
            {!collapsed && (
              <p
                className="type-category-label"
                style={{
                  fontSize: "11px",
                  margin: "0 0 8px 8px",
                }}
              >
                {section.label}
              </p>
            )}

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {section.items.map((item) => {
                const active = isActivePath(pathname, item.href);
                const link = (
                  <AppLink
                    href={item.href}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: collapsed ? "center" : "flex-start",
                      gap: collapsed ? 0 : "10px",
                      padding: collapsed ? "10px 0" : "8px 12px",
                      borderRadius: "6px",
                      margin: "0 4px",
                      position: "relative",
                      background: active
                        ? "var(--primary-brand-muted)"
                        : "transparent",
                      color: active
                        ? "var(--primary-brand)"
                        : "var(--text-secondary)",
                      borderLeft: active
                        ? "3px solid var(--primary-brand)"
                        : "3px solid transparent",
                      fontSize: "14px",
                      fontWeight: active ? 500 : 400,
                      transition:
                        "background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast)",
                    }}
                    className="sidebar-nav-item"
                    data-active={active ? "true" : "false"}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "inherit",
                        position: "relative",
                      }}
                    >
                      {item.icon}
                      {collapsed && item.badge && (
                        <span
                          aria-hidden
                          style={{
                            position: "absolute",
                            top: "-3px",
                            right: "-4px",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--primary-brand)",
                            border: "2px solid var(--bg-main)",
                          }}
                        />
                      )}
                    </span>

                    {!collapsed && (
                      <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
                    )}

                    {!collapsed && item.badge && (
                      <span
                        className="font-mono"
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: active
                            ? "var(--primary-brand)"
                            : "var(--text-muted)",
                          background: active
                            ? "var(--primary-brand-muted)"
                            : "var(--bg-surface-hover)",
                          padding: "1px 6px",
                          borderRadius: "9999px",
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {item.badge.value}
                      </span>
                    )}
                  </AppLink>
                );

                return (
                  <li key={item.href} style={{ margin: "2px 0" }}>
                    {collapsed ? (
                      <Tooltip title={item.label} placement="right">
                        {link}
                      </Tooltip>
                    ) : (
                      link
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / User */}
      <div
        style={{
          padding: collapsed ? "12px 0" : "12px 16px",
          borderTop: "1px solid var(--border-subtle)",
          background: "var(--bg-surface)",
          display: "flex",
          flexDirection: collapsed ? "column" : "row",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: "10px",
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          {!collapsed && (
            <>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  background: "var(--primary-brand)",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#ffffff",
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
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "var(--success-text)",
                  border: "2px solid var(--bg-surface)",
                }}
              />
            </>
          )}
        </div>
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-primary)",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Super Admin
            </p>
            <p
              className="font-mono"
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                margin: "1px 0 0 0",
              }}
            >
              Online
            </p>
          </div>
        )}
        <Tooltip title="Sign out" placement={collapsed ? "right" : "top"}>
          <IconButton
            size="small"
            onClick={handleSignOut}
            sx={{
              color: "var(--text-muted)",
              borderRadius: "6px",
              transition: "all var(--transition-fast)",
              "&:hover": {
                color: "var(--text-primary)",
                background: "var(--bg-surface-hover)",
              },
            }}
          >
            <LogoutIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Tooltip>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .sidebar-nav-item[data-active="false"]:hover {
              background: var(--bg-surface-hover) !important;
              color: var(--text-primary) !important;
            }
          `,
        }}
      />
    </aside>
  );
}
