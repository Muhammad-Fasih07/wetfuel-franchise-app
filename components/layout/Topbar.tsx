"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Breadcrumbs,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ChevronRight as ChevronRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  NotificationsOutlined,
  Search as SearchIcon,
} from "@mui/icons-material";

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

export function Topbar() {
  const pathname = usePathname() ?? "/";
  const [searchFocus, setSearchFocus] = useState(false);

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
    <header
      style={{
        height: "64px",
        background:
          "linear-gradient(180deg, #ffffff 0%, #ffffff 75%, #fafafa 100%)",
        borderBottom: "1px solid #ececec",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow:
          "0 1px 0 rgba(206,28,26,0.06), 0 6px 18px -16px rgba(0,0,0,0.18)",
        gap: "20px",
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
            "linear-gradient(90deg, transparent 0%, rgba(206,28,26,0.35) 50%, transparent 100%)",
          opacity: 0.6,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          minWidth: 0,
          flex: "1 1 auto",
        }}
      >
        <Breadcrumbs
          separator={
            <ChevronRightIcon sx={{ fontSize: 16, color: "#d4d4d4" }} />
          }
          sx={{
            "& .MuiBreadcrumbs-ol": { alignItems: "center", flexWrap: "nowrap" },
            "& .MuiBreadcrumbs-li": { display: "flex", alignItems: "center" },
            minWidth: 0,
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "13px",
              color: "#887b6a",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              aria-hidden
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #ce1c1a 0%, #8b1816 100%)",
                display: "inline-block",
                boxShadow: "0 0 6px rgba(206,28,26,0.5)",
              }}
            />
            WetFuel
          </Link>
          {crumbs.map((c, idx) => {
            const isLast = idx === crumbs.length - 1;
            if (isLast) {
              return (
                <span
                  key={c.href}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#2b2b2b",
                  }}
                >
                  {c.label}
                </span>
              );
            }
            return (
              <Link
                key={c.href}
                href={c.href}
                style={{
                  fontSize: "13px",
                  color: "#887b6a",
                  textDecoration: "none",
                }}
              >
                {c.label}
              </Link>
            );
          })}
        </Breadcrumbs>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: searchFocus ? "#ffffff" : "#f7f7f7",
            border: searchFocus
              ? "1.5px solid #ce1c1a"
              : "1.5px solid #ececec",
            borderRadius: "10px",
            padding: "0 12px",
            height: "38px",
            width: "340px",
            maxWidth: "40vw",
            transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: searchFocus
              ? "0 0 0 4px rgba(206,28,26,0.1), 0 4px 12px rgba(206,28,26,0.08)"
              : "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <SearchIcon
            sx={{
              fontSize: 19,
              color: searchFocus ? "#ce1c1a" : "#887b6a",
              transition: "all 250ms ease",
            }}
          />
          <input
            type="text"
            placeholder="Search franchisees, reports..."
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            style={{
              flex: 1,
              minWidth: 0,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "14px",
              color: "#2b2b2b",
              fontFamily: "inherit",
              fontWeight: 400,
            }}
          />
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              fontSize: "10px",
              fontWeight: 600,
              color: "#887b6a",
              background: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: "6px",
              padding: "3px 7px",
              fontFamily: "inherit",
              letterSpacing: "0.4px",
              flexShrink: 0,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            ⌘K
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <Tooltip title="Notifications" placement="bottom">
          <IconButton
            size="small"
            sx={{
              color: "#887b6a",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              border: "1px solid transparent",
              transition: "all 140ms ease",
              "&:hover": {
                color: "#ce1c1a",
                background: "#fff5f5",
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
                border: "2px solid #ffffff",
                boxShadow: "0 0 0 0 rgba(206,28,26,0.6)",
                animation: "wf-pulse 2s ease-in-out infinite",
              }}
            />
          </IconButton>
        </Tooltip>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: 28,
            alignSelf: "center",
            borderColor: "#ececec",
            mx: "4px",
          }}
        />

        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            background: "transparent",
            border: "1px solid transparent",
            borderRadius: "10px",
            padding: "4px 10px 4px 4px",
            fontFamily: "inherit",
            transition: "all 140ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#fafafa";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#ececec";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
          }}
        >
          <div style={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                background:
                  "linear-gradient(135deg, #cd171a 0%, #ce1c1a 45%, #8b1816 100%)",
                fontSize: "12px",
                fontWeight: 600,
                color: "#ffffff",
                boxShadow:
                  "0 3px 8px rgba(206,28,26,0.3), inset 0 1px 0 rgba(255,255,255,0.18)",
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
                border: "2px solid #ffffff",
                boxShadow: "0 0 6px rgba(34,197,94,0.5)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: 0,
              lineHeight: 1.2,
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#2b2b2b",
              }}
            >
              Super Admin
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#887b6a",
                fontWeight: 500,
              }}
            >
              admin@wetfuel.com
            </span>
          </div>
          <KeyboardArrowDownIcon
            sx={{ fontSize: 18, color: "#887b6a", ml: "2px" }}
          />
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes wf-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(206,28,26,0.55); }
          70%  { box-shadow: 0 0 0 6px rgba(206,28,26,0); }
          100% { box-shadow: 0 0 0 0   rgba(206,28,26,0); }
        }
      `,
        }}
      />
    </header>
  );
}
