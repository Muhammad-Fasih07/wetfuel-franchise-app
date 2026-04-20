import Link from "next/link";
import { Grid, LinearProgress } from "@mui/material";
import {
  AddBusiness as AddBusinessIcon,
  Assessment as AssessmentIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  Notifications as NotificationsIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  QrCode as QrCodeIcon,
  Refresh as RefreshIcon,
  Store as StoreIcon,
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

const QUICK_ACTIONS = [
  {
    icon: <AddBusinessIcon sx={{ fontSize: 20 }} />,
    label: "Add Franchisee",
    sub: "Register new partner",
    href: "/franchisees/new",
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
    label: "View Reports",
    sub: "Network reporting",
    href: "/reporting",
  },
  {
    icon: <QrCodeIcon sx={{ fontSize: 20 }} />,
    label: "Generate QR",
    sub: "Bulk QR codes",
    href: "/qr-codes",
  },
  {
    icon: <NotificationsIcon sx={{ fontSize: 20 }} />,
    label: "Notifications",
    sub: "2 unread alerts",
    href: "/notifications",
  },
];

const CARD_BASE: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e5e5e5",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const CARD_TITLE: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 600,
  color: "#2b2b2b",
  margin: 0,
};

export default function DashboardOverviewPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
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
        <Grid item xs={12} lg={6}>
          <section style={CARD_BASE}>
            <h2 style={{ ...CARD_TITLE, marginBottom: "20px" }}>
              Top Franchisees by Fuel Volume
            </h2>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {TOP_FRANCHISEES.map((row) => (
                <li
                  key={row.rank}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 0",
                  }}
                >
                  <span
                    style={{
                      width: "24px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: row.rank === 1 ? "#ce1c1a" : "#887b6a",
                      flexShrink: 0,
                    }}
                  >
                    {row.rank}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#2b2b2b",
                      flex: 1,
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.name}
                  </span>
                  <div style={{ flex: 1.5 }}>
                    <LinearProgress
                      variant="determinate"
                      value={row.percent}
                      sx={{
                        height: 6,
                        borderRadius: 4,
                        backgroundColor: "#f5f5f5",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(90deg, #f0797a 0%, #ce1c1a 60%, #8b1816 100%)",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#887b6a",
                      minWidth: "80px",
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    {row.volume}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Grid>

        <Grid item xs={12} lg={6}>
          <section style={CARD_BASE}>
            <h2 style={{ ...CARD_TITLE, marginBottom: "20px" }}>
              Quick Actions
            </h2>

            <Grid container spacing={2}>
              {QUICK_ACTIONS.map((action) => (
                <Grid item xs={6} key={action.label}>
                  <Link
                    href={action.href}
                    style={{ textDecoration: "none" }}
                    className="quick-action-card"
                  >
                    <div
                      style={{
                        border: "1px solid #e5e5e5",
                        borderRadius: "8px",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        cursor: "pointer",
                        transition: "all 150ms ease",
                        background: "#ffffff",
                      }}
                    >
                      <span
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background:
                            "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 60%, #ffd2d2 100%)",
                          color: "#ce1c1a",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow:
                            "0 4px 10px rgba(206,28,26,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
                        }}
                      >
                        {action.icon}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#2b2b2b",
                        }}
                      >
                        {action.label}
                      </span>
                      <span style={{ fontSize: "11px", color: "#887b6a" }}>
                        {action.sub}
                      </span>
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </section>
        </Grid>
      </Grid>

      <style>{`
        .quick-action-card > div:hover {
          border-color: #ce1c1a !important;
          background: linear-gradient(135deg, #fff5f5 0%, #ffffff 80%) !important;
          box-shadow: 0 6px 18px -10px rgba(206,28,26,0.4) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
