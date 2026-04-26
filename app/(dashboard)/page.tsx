"use client";

import { Grid, LinearProgress } from "@mui/material";
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  EmojiEvents as TrophyIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  Refresh as RefreshIcon,
  Store as StoreIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { FranchiseeTable } from "@/components/franchisees/FranchiseeTable";

// TODO: replace with real API data from lib/api/reporting.ts
const NETWORK_HEALTH_ROWS: Array<{
  label: string;
  value: string;
  valueColor?: string;
}> = [
  { label: "Total active drivers", value: "89" },
  { label: "Total trucks enrolled", value: "64" },
  { label: "Jobs completed today", value: "34" },
  { label: "Pending job reviews", value: "7", valueColor: "#ce1c1a" },
  { label: "Low inventory alerts", value: "2", valueColor: "#f0797a" },
];

// TODO: replace with real activity feed
const ACTIVITY_ITEMS: Array<{
  color: string;
  text: string;
  time: string;
}> = [
  { color: "#ce1c1a", text: "AlphaFuel Co. registered", time: "2 hours ago" },
  { color: "#15803d", text: "34 jobs completed — PrimeFuel LLC", time: "4 hours ago" },
  { color: "#f0797a", text: "NorthFuel Ltd. account frozen", time: "Yesterday, 3:40 PM" },
  { color: "#3b82f6", text: "12 new customers — SouthFuel Inc.", time: "Yesterday, 11:00 AM" },
  { color: "#f59e0b", text: "Low fuel inventory — WestEnd Fuel", time: "2 days ago" },
];

// TODO: replace with real fuel volume rankings
const TOP_FRANCHISEES: Array<{
  rank: number;
  name: string;
  volume: string;
  percent: number;
}> = [
  { rank: 1, name: "AlphaFuel Co.", volume: "8,200 gal", percent: 100 },
  { rank: 2, name: "PrimeFuel LLC", volume: "6,100 gal", percent: 74 },
  { rank: 3, name: "SouthFuel Inc.", volume: "4,800 gal", percent: 59 },
  { rank: 4, name: "NorthFuel Ltd.", volume: "3,900 gal", percent: 48 },
  { rank: 5, name: "WestEnd Fuel", volume: "2,600 gal", percent: 32 },
];


const CARD_BASE: React.CSSProperties = {
  background: "linear-gradient(180deg, #ffffff 0%, #ffffff 90%, #fafafa 100%)",
  border: "1.5px solid #ececec",
  borderRadius: "14px",
  padding: "26px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px -16px rgba(43,43,43,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
  transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
};

const CARD_TITLE: React.CSSProperties = {
  fontSize: "17px",
  fontWeight: 600,
  color: "#2b2b2b",
  margin: 0,
  letterSpacing: "-0.2px",
};

export default function DashboardOverviewPage() {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back. Here's what's happening across your network."
        action={
          <Button
            variant="ghost"
            fullWidth={false}
            startIcon={<RefreshIcon sx={{ fontSize: 18 }} />}
          >
            Refresh
          </Button>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="TOTAL FRANCHISEES"
            value="24"
            subtext="Registered on network"
            trend="up"
            trendValue="+3 this month"
            icon={<StoreIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="ACTIVE"
            value="21"
            subtext="3 currently frozen"
            trend="neutral"
            icon={<CheckCircleOutlineIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="NETWORK CUSTOMERS"
            value="1,240"
            subtext="Across all franchisees"
            trend="up"
            trendValue="+8%"
            icon={<PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="AVG FUEL / MONTH"
            value="48,200 gal"
            subtext="Network average"
            trend="up"
            trendValue="+5%"
            icon={<LocalGasStationOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <FranchiseeTable />
        </Grid>

        <Grid item xs={12} lg={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <section style={CARD_BASE}>
              <h2 style={{ ...CARD_TITLE, marginBottom: "20px" }}>
                Network Health
              </h2>

              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {NETWORK_HEALTH_ROWS.map((row, idx) => (
                  <li
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom:
                        idx === NETWORK_HEALTH_ROWS.length - 1
                          ? "none"
                          : "1px solid #f5f5f5",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "#887b6a" }}>
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: row.valueColor ?? "#2b2b2b",
                      }}
                    >
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section style={CARD_BASE}>
              <h2 style={{ ...CARD_TITLE, marginBottom: "16px" }}>
                Recent Activity
              </h2>

              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {ACTIVITY_ITEMS.map((item, idx) => (
                  <li
                    key={`${item.text}-${idx}`}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                      padding: "10px 0",
                      borderBottom:
                        idx === ACTIVITY_ITEMS.length - 1
                          ? "none"
                          : "1px solid #f5f5f5",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: item.color,
                        marginTop: "6px",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#2b2b2b",
                          fontWeight: 500,
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {item.text}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#887b6a",
                          margin: "2px 0 0 0",
                        }}
                      >
                        {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <section
            style={{
              ...CARD_BASE,
              position: "relative",
              overflow: "visible",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(0,0,0,0.06), 0 12px 32px -16px rgba(206,28,26,0.25), inset 0 1px 0 rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px -16px rgba(43,43,43,0.2), inset 0 1px 0 rgba(255,255,255,0.8)";
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(206,28,26,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 60%, #ffd2d2 100%)",
                    color: "#ce1c1a",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 6px 16px rgba(206,28,26,0.22), inset 0 1px 0 rgba(255,255,255,0.7)",
                  }}
                >
                  <TrophyIcon sx={{ fontSize: 24 }} />
                </span>
                <div>
                  <h2 style={{ ...CARD_TITLE, marginBottom: "4px" }}>
                    Top Franchisees by Fuel Volume
                  </h2>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#887b6a",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: 14, color: "#15803d" }} />
                    Monthly performance leaders
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#ce1c1a",
                  background:
                    "linear-gradient(135deg, rgba(206,28,26,0.12) 0%, rgba(240,121,122,0.12) 100%)",
                  padding: "6px 12px",
                  borderRadius: "24px",
                  border: "1px solid rgba(206,28,26,0.25)",
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                }}
              >
                This Month
              </span>
            </div>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {TOP_FRANCHISEES.map((row, idx) => {
                const isTop3 = row.rank <= 3;
                const isFirst = row.rank === 1;
                return (
                  <li
                    key={row.rank}
                    className="franchisee-rank-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px 18px",
                      marginBottom: idx === TOP_FRANCHISEES.length - 1 ? 0 : "8px",
                      borderRadius: "12px",
                      border: isFirst
                        ? "1.5px solid rgba(206,28,26,0.2)"
                        : "1.5px solid transparent",
                      background: isFirst
                        ? "linear-gradient(90deg, rgba(206,28,26,0.04) 0%, rgba(255,255,255,0) 100%)"
                        : "transparent",
                      transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {isFirst && (
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: "-26px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "4px",
                          height: "50%",
                          borderRadius: "0 4px 4px 0",
                          background:
                            "linear-gradient(180deg, #f0797a 0%, #ce1c1a 50%, #8b1816 100%)",
                          boxShadow: "0 0 12px rgba(206,28,26,0.6)",
                        }}
                      />
                    )}

                    <span
                      style={{
                        minWidth: "36px",
                        height: "36px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: isFirst ? "#ffffff" : isTop3 ? "#ce1c1a" : "#887b6a",
                        background: isFirst
                          ? "linear-gradient(135deg, #ce1c1a 0%, #8b1816 100%)"
                          : isTop3
                            ? "linear-gradient(135deg, rgba(206,28,26,0.15) 0%, rgba(206,28,26,0.08) 100%)"
                            : "#f5f5f5",
                        borderRadius: "10px",
                        flexShrink: 0,
                        boxShadow: isFirst
                          ? "0 4px 12px rgba(206,28,26,0.35), inset 0 1px 0 rgba(255,255,255,0.2)"
                          : isTop3
                            ? "0 2px 6px rgba(206,28,26,0.15)"
                            : "none",
                        border: isTop3 ? "1.5px solid rgba(206,28,26,0.2)" : "none",
                      }}
                    >
                      {row.rank}
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: isTop3 ? 600 : 500,
                            color: "#2b2b2b",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            letterSpacing: "-0.1px",
                          }}
                        >
                          {row.name}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: isTop3 ? "#ce1c1a" : "#887b6a",
                            marginLeft: "16px",
                            flexShrink: 0,
                          }}
                        >
                          {row.volume}
                        </span>
                      </div>

                      <div style={{ position: "relative" }}>
                        <LinearProgress
                          variant="determinate"
                          value={row.percent}
                          sx={{
                            height: 8,
                            borderRadius: 6,
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #ececec",
                            overflow: "hidden",
                            "& .MuiLinearProgress-bar": {
                              background: isFirst
                                ? "linear-gradient(90deg, #f0797a 0%, #ce1c1a 60%, #8b1816 100%)"
                                : isTop3
                                  ? "linear-gradient(90deg, #fca5a5 0%, #f87171 50%, #dc2626 100%)"
                                  : "linear-gradient(90deg, #d4d4d4 0%, #a3a3a3 100%)",
                              borderRadius: 6,
                              boxShadow: isTop3
                                ? "inset 0 1px 2px rgba(0,0,0,0.1)"
                                : "none",
                              transition: "transform 300ms ease",
                            },
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            right: "6px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: row.percent > 50 ? "#ffffff" : "#887b6a",
                            letterSpacing: "0.3px",
                          }}
                        >
                          {row.percent}%
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </Grid>
      </Grid>

      <style>{`
        .franchisee-rank-row:hover {
          background: linear-gradient(90deg, rgba(206,28,26,0.06) 0%, rgba(255,255,255,0.5) 100%) !important;
          border-color: rgba(206,28,26,0.25) !important;
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(206,28,26,0.12) !important;
        }
      `}</style>
    </div>
  );
}
