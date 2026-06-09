"use client";

import { Grid } from "@mui/material";
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  Dashboard as DashboardIcon,
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
  { label: "Active Drivers",   value: "89", icon: <DirectionsCarIcon />,        color: "var(--info-text)" },
  { label: "Trucks Enrolled",  value: "64", icon: <LocalShippingIcon />,         color: "var(--accent-purple)" },
  { label: "Jobs Today",       value: "34", icon: <CheckCircleOutlineIcon />,    color: "var(--success-text)" },
  { label: "Pending Reviews",  value: "7",  icon: <AssessmentIcon />,            color: "var(--warning-text)" },
  { label: "Low Stock Alerts", value: "2",  icon: <WarningIcon />,               color: "var(--error-text)" },
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
  background: "var(--bg-surface)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "8px",
  padding: "24px",
};

const CARD_TITLE: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 600,
  color: "var(--text-primary)",
  margin: 0,
  lineHeight: 1.5,
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
        breadcrumb="Overview / Dashboard"
        icon={<DashboardIcon sx={{ fontSize: 24 }} />}
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
            href="/franchisees"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="ACTIVE"
            value="21"
            subtext="3 currently frozen"
            trend="neutral"
            icon={<CheckCircleOutlineIcon sx={{ fontSize: 20 }} />}
            href="/reporting"
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
            href="/reporting"
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
            href="/reporting"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <FranchiseeTable />
        </Grid>

        <Grid item xs={12} lg={4}>
          <section style={CARD_BASE}>
            <h2 style={{ ...CARD_TITLE, marginBottom: "16px" }}>Network Health</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {NETWORK_HEALTH_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    transition: "background-color var(--transition-fast)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--bg-surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: metric.color, display: "inline-flex", fontSize: "18px" }}>
                      {metric.icon}
                    </span>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                      {metric.label}
                    </span>
                  </div>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <section style={CARD_BASE}>
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
              <div>
                <h2 style={{ ...CARD_TITLE, marginBottom: "4px" }}>
                  Top Franchisees by Fuel Volume
                </h2>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
                  Monthly performance comparison across network
                </p>
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  background: "var(--bg-surface-hover)",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  border: "1px solid var(--border-subtle)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
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
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                <XAxis
                  dataKey="name"
                  angle={-15}
                  textAnchor="end"
                  height={80}
                  tick={{ fill: "#71717A", fontSize: 12 }}
                  stroke="#27272A"
                />
                <YAxis
                  tick={{ fill: "#71717A", fontSize: 12 }}
                  stroke="#27272A"
                  label={{
                    value: "Fuel Volume (gallons)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#71717A", fontSize: 12 },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#18181B",
                    border: "1px solid #27272A",
                    borderRadius: "6px",
                    padding: "10px 14px",
                  }}
                  labelStyle={{ color: "#ffffff", fontWeight: 500, marginBottom: "4px" }}
                  itemStyle={{ color: "#A1A1AA" }}
                  formatter={(value: number, name: string, props: any) => [
                    props.payload.displayVolume,
                    "Fuel Volume",
                  ]}
                />
                <Bar
                  dataKey="volume"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={80}
                >
                  {TOP_FRANCHISEES_CHART_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#DC2626" : index < 3 ? "#EF4444" : "#3F3F46"}
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
