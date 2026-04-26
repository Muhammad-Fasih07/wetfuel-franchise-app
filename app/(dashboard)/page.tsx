"use client";

import { Grid } from "@mui/material";
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  DirectionsCar as DirectionsCarIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  LocalShipping as LocalShippingIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  Refresh as RefreshIcon,
  Store as StoreIcon,
  Warning as WarningIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { FranchiseeTable } from "@/components/franchisees/FranchiseeTable";

// TODO: replace with real API data from lib/api/reporting.ts
const NETWORK_HEALTH_METRICS = [
  { 
    label: "Active Drivers", 
    value: "89", 
    icon: <DirectionsCarIcon />,
    color: "#3b82f6",
    bgColor: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
  },
  { 
    label: "Trucks Enrolled", 
    value: "64", 
    icon: <LocalShippingIcon />,
    color: "#8b5cf6",
    bgColor: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
  },
  { 
    label: "Jobs Today", 
    value: "34", 
    icon: <CheckCircleOutlineIcon />,
    color: "#10b981",
    bgColor: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
  },
  { 
    label: "Pending Reviews", 
    value: "7", 
    icon: <AssessmentIcon />,
    color: "#f59e0b",
    bgColor: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
  },
  { 
    label: "Low Stock Alerts", 
    value: "2", 
    icon: <WarningIcon />,
    color: "#ef4444",
    bgColor: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
  },
];

// TODO: replace with real fuel volume rankings
const TOP_FRANCHISEES_CHART_DATA = [
  { name: "AlphaFuel Co.", volume: 8200, displayVolume: "8,200 gal" },
  { name: "PrimeFuel LLC", volume: 6100, displayVolume: "6,100 gal" },
  { name: "SouthFuel Inc.", volume: 4800, displayVolume: "4,800 gal" },
  { name: "NorthFuel Ltd.", volume: 3900, displayVolume: "3,900 gal" },
  { name: "WestEnd Fuel", volume: 2600, displayVolume: "2,600 gal" },
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
          <section style={CARD_BASE}>
            <h2 style={{ ...CARD_TITLE, marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "4px",
                  height: "18px",
                  borderRadius: "2px",
                  background: "linear-gradient(180deg, #f0797a 0%, #ce1c1a 50%, #8b1816 100%)",
                  boxShadow: "0 0 8px rgba(206,28,26,0.4)",
                }}
              />
              Network Health
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {NETWORK_HEALTH_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px",
                    borderRadius: "10px",
                    background: metric.bgColor,
                    border: `1.5px solid ${metric.color}20`,
                    transition: "all 200ms ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(4px)";
                    e.currentTarget.style.boxShadow = `0 4px 12px ${metric.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: `${metric.color}15`,
                      color: metric.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: `1.5px solid ${metric.color}30`,
                    }}
                  >
                    {metric.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", color: "#887b6a", fontWeight: 500 }}>
                      {metric.label}
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: metric.color, marginTop: "2px" }}>
                      {metric.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
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
                marginBottom: "32px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
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
                  <LocalGasStationOutlinedIcon sx={{ fontSize: 26 }} />
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
                    }}
                  >
                    Monthly performance comparison across network
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
                  padding: "6px 14px",
                  borderRadius: "24px",
                  border: "1.5px solid rgba(206,28,26,0.25)",
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                }}
              >
                This Month
              </span>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={TOP_FRANCHISEES_CHART_DATA}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f0797a" stopOpacity={1} />
                    <stop offset="50%" stopColor="#ce1c1a" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8b1816" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  angle={-15}
                  textAnchor="end"
                  height={80}
                  tick={{ fill: "#887b6a", fontSize: 12, fontWeight: 500 }}
                  stroke="#e5e5e5"
                />
                <YAxis
                  tick={{ fill: "#887b6a", fontSize: 12 }}
                  stroke="#e5e5e5"
                  label={{
                    value: "Fuel Volume (gallons)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#887b6a", fontSize: 12, fontWeight: 600 },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.98)",
                    border: "1.5px solid #ececec",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "12px 14px",
                  }}
                  labelStyle={{ color: "#2b2b2b", fontWeight: 600, marginBottom: "6px" }}
                  itemStyle={{ color: "#ce1c1a", fontWeight: 500 }}
                  formatter={(value: number, name: string, props: any) => [
                    props.payload.displayVolume,
                    "Fuel Volume",
                  ]}
                />
                <Bar
                  dataKey="volume"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={80}
                >
                  {TOP_FRANCHISEES_CHART_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "url(#barGradient)" : index < 3 ? "#f87171" : "#d4d4d4"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </section>
        </Grid>
      </Grid>
    </div>
  );
}
