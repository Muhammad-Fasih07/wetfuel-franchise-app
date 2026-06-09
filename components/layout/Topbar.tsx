"use client";

import { useState } from "react";
import { Avatar, Divider } from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { NotificationButton } from "./NotificationButton";

export function Topbar() {
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <header
      style={{
        height: "64px",
        background: "var(--bg-main)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        gap: "16px",
      }}
    >
      {/* Left: search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          minWidth: 0,
          flex: "1 1 auto",
        }}
      >
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--bg-surface)",
            border: `1px solid ${searchFocus ? "var(--primary-brand)" : "var(--border-subtle)"}`,
            borderRadius: "6px",
            padding: "0 10px",
            height: "36px",
            width: "320px",
            maxWidth: "38vw",
            transition: "border-color var(--transition-fast)",
          }}
        >
          <SearchIcon
            sx={{
              fontSize: 17,
              color: searchFocus ? "var(--primary-brand)" : "var(--text-muted)",
              transition: "color var(--transition-fast)",
              flexShrink: 0,
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
              color: "var(--text-primary)",
              fontFamily: "inherit",
              fontWeight: 400,
            }}
          />
          {/* <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--text-muted)",
              background: "var(--bg-surface-hover)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "4px",
              padding: "2px 6px",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
          >
            ⌘K
          </span> */}
        </div>
      </div>

      {/* Right: notifications + user */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <NotificationButton />

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: 24,
            alignSelf: "center",
            borderColor: "var(--border-subtle)",
            mx: "4px",
          }}
        />

        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            background: "transparent",
            border: "1px solid transparent",
            borderRadius: "6px",
            padding: "4px 8px 4px 4px",
            fontFamily: "inherit",
            transition:
              "background-color var(--transition-fast), border-color var(--transition-fast)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--bg-surface-hover)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "var(--border-subtle)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "transparent";
          }}
        >
          <div style={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
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
                border: "2px solid var(--bg-main)",
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
                color: "var(--text-primary)",
              }}
            >
              Super Admin
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                fontWeight: 400,
              }}
            >
              admin@wetfuel.com
            </span>
          </div>
          <KeyboardArrowDownIcon
            sx={{ fontSize: 16, color: "var(--text-muted)", ml: "2px" }}
          />
        </button>
      </div>
    </header>
  );
}
