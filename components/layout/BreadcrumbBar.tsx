"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AppLink } from "../navigation/AppLink";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";

const PATH_LABELS: Record<string, string> = {
  "": "Dashboard",
  franchisees: "Franchisees",
  new: "New",
  edit: "Edit",
  reporting: "Reporting",
  settings: "Settings",
  "qr-codes": "QR Codes",
  notifications: "Notifications",
};

function labelFor(segment: string): string {
  if (PATH_LABELS[segment]) return PATH_LABELS[segment];
  if (/^[a-zA-Z0-9-]{6,}$/.test(segment)) return "Details";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function BreadcrumbBar() {
  const pathname = usePathname() ?? "/";

  const crumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return [{ label: "Dashboard", href: "/" }];
    }
    const built: Array<{ label: string; href: string }> = [];
    segments.forEach((segment, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      built.push({ label: labelFor(segment), href });
    });
    return built;
  }, [pathname]);

  return (
    <div
      style={{
        height: "40px",
        background: "var(--bg-main)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "8px",
        position: "sticky",
        top: "64px",
        zIndex: 40,
        minWidth: 0,
      }}
    >
      <ol
        style={{
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: "8px",
          margin: 0,
          padding: 0,
          minWidth: 0,
        }}
      >
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <li
              key={c.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minWidth: 0,
              }}
            >
              {idx > 0 && (
                <ChevronRightIcon
                  sx={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    flexShrink: 0,
                  }}
                />
              )}
              {isLast ? (
                <span
                  className="type-breadcrumb"
                  style={{
                    color: "var(--text-secondary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.label}
                </span>
              ) : (
                <AppLink
                  href={c.href}
                  className="type-breadcrumb"
                  style={{
                    textDecoration: "none",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.label}
                </AppLink>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
