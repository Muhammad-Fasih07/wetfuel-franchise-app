"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  FileDownloadOutlined as FileDownloadOutlinedIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { PERFORMANCE_ROWS } from "./_data";

const HEADER_CELL_SX = {
  background: "#fafafa",
  fontSize: "11px",
  fontWeight: 600,
  color: "#887b6a",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  borderBottom: "1px solid #f0f0f0",
  padding: "12px 16px",
};

const BODY_CELL_SX = {
  fontSize: "13px",
  color: "#2b2b2b",
  borderBottom: "1px solid #f5f5f5",
  padding: "14px 16px",
};

// TODO: replace with API-driven metric rows
const CUSTOMER_METRICS: Array<{ label: string; value: string; color?: string }> = [
  { label: "Total customers network-wide", value: "1,240" },
  { label: "Avg equipment per customer", value: "3.2" },
  { label: "Avg fuel per customer/mo", value: "229 gal" },
  { label: "Self-registered customers", value: "318" },
  { label: "Admin-registered customers", value: "922" },
  { label: "Pending registrations", value: "14", color: "#ce1c1a" },
];

const DRIVER_METRICS: Array<{ label: string; value: string; color?: string }> = [
  { label: "Total drivers network-wide", value: "24" },
  { label: "Avg jobs per driver/mo", value: "160" },
  { label: "Avg hours per driver/mo", value: "384 hrs" },
  { label: "Active drivers today", value: "18" },
  { label: "Pre-inspection completion", value: "96%" },
  { label: "Flagged fueling events", value: "7", color: "#f0797a" },
];

const INVENTORY_METRICS: Array<{ label: string; value: string; color?: string }> = [
  { label: "Total fuel in main storage", value: "42,000 gal" },
  { label: "Total fuel on trucks", value: "8,400 gal" },
  { label: "Low inventory alerts", value: "2", color: "#f0797a" },
  { label: "Packaged goods SKUs", value: "12" },
  { label: "3rd party fuel purchases", value: "6 this mo." },
  { label: "Avg daily consumption", value: "1,400 gal" },
];

function MetricList({
  rows,
}: {
  rows: Array<{ label: string; value: string; color?: string }>;
}) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {rows.map((m, idx) => (
        <li
          key={m.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom:
              idx === rows.length - 1 ? "none" : "1px solid #f5f5f5",
          }}
        >
          <span style={{ fontSize: "13px", color: "#887b6a" }}>{m.label}</span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: m.color ?? "#2b2b2b",
            }}
          >
            {m.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

const RANK_COLORS = ["#ce1c1a", "#e05555", "#e5e5e5", "#e5e5e5", "#e5e5e5"];

export default function ReportingPage() {
  const router = useRouter();
  const [range, setRange] = useState("30d");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "frozen">(
    "all",
  );

  const filteredPerformance = useMemo(() => {
    if (statusFilter === "all") return PERFORMANCE_ROWS;
    return PERFORMANCE_ROWS.filter((r) => r.status === statusFilter);
  }, [statusFilter]);

  const top5 = useMemo(() => {
    return [...PERFORMANCE_ROWS]
      .sort((a, b) => b.fuelGal - a.fuelGal)
      .slice(0, 5);
  }, []);

  const topMax = top5[0]?.fuelGal ?? 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader
        title="Reporting"
        subtitle="Network-wide performance data across all franchisees."
        action={
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <TextField
              select
              size="small"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              SelectProps={{ native: true }}
              sx={{
                width: 160,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "13px",
                  height: "36px",
                },
              }}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="3m">Last 3 months</option>
              <option value="all">All time</option>
            </TextField>
            <Button
              variant="ghost"
              fullWidth={false}
              startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
            >
              Export Report
            </Button>
          </div>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="TOTAL FUEL DELIVERED"
            value="284,600 gal"
            subtext="Across all franchisees"
            trend="up"
            trendValue="+11%"
            icon={<LocalGasStationOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="CUSTOMERS SERVED"
            value="1,240"
            trend="up"
            trendValue="+8%"
            icon={<PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="JOBS COMPLETED"
            value="3,842"
            trend="up"
            trendValue="+14%"
            icon={<CheckCircleOutlineIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="DRIVER HOURS"
            value="9,210 hrs"
            trend="down"
            trendValue="-3%"
            icon={<AccessTimeOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <SectionCard
            title="Franchisee Performance"
            action={
              <TextField
                select
                size="small"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | "active" | "frozen")
                }
                SelectProps={{ native: true }}
                sx={{
                  width: 140,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontSize: "13px",
                    height: "36px",
                  },
                }}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="frozen">Frozen</option>
              </TextField>
            }
            bodyPadding={0}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={HEADER_CELL_SX}>Franchisee</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="center">Customers</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="center">Drivers</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="right">Fuel Delivered</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="center">Jobs Done</TableCell>
                    <TableCell sx={HEADER_CELL_SX}>Avg Job Time</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="right">Driver Hrs</TableCell>
                    <TableCell sx={HEADER_CELL_SX}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPerformance.map((r) => (
                    <TableRow
                      key={r.id}
                      hover
                      onClick={() => router.push(`/reporting/${r.id}`)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { background: "#fafafa" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>
                        {r.name}
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX} align="center">{r.customers}</TableCell>
                      <TableCell sx={BODY_CELL_SX} align="center">{r.drivers}</TableCell>
                      <TableCell sx={BODY_CELL_SX} align="right">{r.fuel}</TableCell>
                      <TableCell sx={BODY_CELL_SX} align="center">{r.jobs}</TableCell>
                      <TableCell sx={BODY_CELL_SX}>{r.avgJobTime}</TableCell>
                      <TableCell sx={BODY_CELL_SX} align="right">{r.driverHrs}</TableCell>
                      <TableCell sx={BODY_CELL_SX}>
                        <StatusChip status={r.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPerformance.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        sx={{
                          ...BODY_CELL_SX,
                          textAlign: "center",
                          color: "#887b6a",
                          padding: "24px 16px",
                        }}
                      >
                        No franchisees match this filter.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </SectionCard>
        </Grid>

        <Grid item xs={12} lg={4}>
          <SectionCard bodyPadding="20px 24px 24px">
            <h2
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#2b2b2b",
                margin: 0,
              }}
            >
              Fuel Volume Ranking
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#887b6a",
                margin: "4px 0 20px",
              }}
            >
              Top performers this period
            </p>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {top5.map((r, idx) => {
                const percent = Math.round((r.fuelGal / topMax) * 100);
                const barColor = RANK_COLORS[idx] ?? "#e5e5e5";
                return (
                  <li
                    key={r.id}
                    style={{
                      marginBottom: idx === top5.length - 1 ? 0 : "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "#2b2b2b" }}>
                        {r.name}
                      </span>
                      <span style={{ fontSize: "13px", color: "#887b6a" }}>
                        {r.fuel}
                      </span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={percent}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#f5f5f5",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: barColor,
                          borderRadius: 4,
                        },
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </SectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <SectionCard bodyPadding="20px 24px 24px">
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#2b2b2b", margin: "0 0 16px" }}>
              Customer Overview
            </h2>
            <MetricList rows={CUSTOMER_METRICS} />
          </SectionCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionCard bodyPadding="20px 24px 24px">
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#2b2b2b", margin: "0 0 16px" }}>
              Driver Overview
            </h2>
            <MetricList rows={DRIVER_METRICS} />
          </SectionCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionCard bodyPadding="20px 24px 24px">
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#2b2b2b", margin: "0 0 16px" }}>
              Inventory Overview
            </h2>
            <MetricList rows={INVENTORY_METRICS} />
          </SectionCard>
        </Grid>
      </Grid>
    </div>
  );
}
