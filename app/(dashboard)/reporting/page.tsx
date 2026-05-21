"use client";

import { useMemo, useState } from "react";
import { useAppRouter } from "@/lib/hooks/useAppRouter";
import {
  Grid,
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
  DirectionsCar as DirectionsCarIcon,
  FileDownloadOutlined as FileDownloadOutlinedIcon,
  Inventory as InventoryIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { PERFORMANCE_ROWS } from "./_data";

const HEADER_CELL_SX = {
  background: "linear-gradient(180deg, #1a1a1c 0%, #1c1c1e 100%)",
  fontSize: "11px",
  fontWeight: 700,
  color: "#9a8c7a",
  letterSpacing: "0.7px",
  textTransform: "uppercase",
  borderBottom: "1.5px solid rgba(255,255,255,0.08)",
  padding: "14px 18px",
};

const BODY_CELL_SX = {
  fontSize: "13px",
  color: "#e8e6e3",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  padding: "16px 18px",
  transition: "all 200ms ease",
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
            padding: "12px 14px",
            marginBottom: idx === rows.length - 1 ? 0 : "6px",
            borderRadius: "8px",
            background: m.color ? "rgba(206,28,26,0.03)" : "transparent",
            border: m.color ? "1px solid rgba(206,28,26,0.1)" : "1px solid transparent",
            transition: "all 200ms ease",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = m.color 
              ? "rgba(206,28,26,0.06)"
              : "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = m.color 
              ? "rgba(206,28,26,0.15)"
              : "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = m.color 
              ? "rgba(206,28,26,0.03)"
              : "transparent";
            e.currentTarget.style.borderColor = m.color 
              ? "rgba(206,28,26,0.1)"
              : "transparent";
          }}
        >
          <span style={{ fontSize: "13px", color: "#9a8c7a", fontWeight: 500 }}>
            {m.label}
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: m.color ?? "#e8e6e3",
              letterSpacing: "-0.1px",
            }}
          >
            {m.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ReportingPage() {
  const router = useAppRouter();
  const [range, setRange] = useState("30d");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "frozen">(
    "all",
  );
  const filteredPerformance = useMemo(() => {
    if (statusFilter === "all") return PERFORMANCE_ROWS;
    return PERFORMANCE_ROWS.filter((r) => r.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <PageHeader
        title="Reporting"
        subtitle="Comprehensive network-wide performance analytics and insights across all franchisees."
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
        <Grid item xs={12}>
          <SectionCard
            title="Franchisee Information & Performance"
            subtitle="Comprehensive overview of all franchisees with detailed performance metrics"
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
                  width: 150,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    fontSize: "13px",
                    height: "38px",
                    border: "1.5px solid rgba(255,255,255,0.1)",
                    transition: "all 200ms ease",
                    "&:hover": {
                      borderColor: "#d0d0d0",
                    },
                    "&.Mui-focused": {
                      borderColor: "#ce1c1a",
                      boxShadow: "0 0 0 3px rgba(206,28,26,0.1)",
                    },
                  },
                }}
              >
                <option value="all">All Franchisees</option>
                <option value="active">Active Only</option>
                <option value="frozen">Frozen Only</option>
              </TextField>
            }
            bodyPadding={0}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ ...HEADER_CELL_SX, minWidth: "180px" }}>Franchisee</TableCell>
                    <TableCell sx={{ ...HEADER_CELL_SX, minWidth: "100px" }} align="center">Customers</TableCell>
                    <TableCell sx={{ ...HEADER_CELL_SX, minWidth: "90px" }} align="center">Drivers</TableCell>
                    <TableCell sx={{ ...HEADER_CELL_SX, minWidth: "130px" }} align="right">Fuel Delivered</TableCell>
                    <TableCell sx={{ ...HEADER_CELL_SX, minWidth: "100px" }} align="center">Jobs Done</TableCell>
                    <TableCell sx={{ ...HEADER_CELL_SX, minWidth: "110px" }}>Avg Job Time</TableCell>
                    <TableCell sx={{ ...HEADER_CELL_SX, minWidth: "110px" }} align="right">Driver Hrs</TableCell>
                    <TableCell sx={{ ...HEADER_CELL_SX, minWidth: "100px" }}>Status</TableCell>
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
                        "&:hover": { background: "rgba(255,255,255,0.03)" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 600, color: "#e8e6e3" }}>
                        {r.name}
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX} align="center">
                        <span style={{ 
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "40px",
                          height: "32px",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#3b82f6",
                          background: "rgba(59,130,246,0.1)",
                          borderRadius: "8px",
                          padding: "0 10px"
                        }}>
                          {r.customers}
                        </span>
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX} align="center">
                        <span style={{ 
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "40px",
                          height: "32px",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#f59e0b",
                          background: "rgba(245,158,11,0.1)",
                          borderRadius: "8px",
                          padding: "0 10px"
                        }}>
                          {r.drivers}
                        </span>
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX} align="right">
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#ce1c1a" }}>
                          {r.fuel}
                        </span>
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX} align="center">
                        <span style={{ fontSize: "14px", fontWeight: 600,                           color: "#34d399" }}>
                          {r.jobs}
                        </span>
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX}>
                        <span style={{ fontSize: "13px", color: "#9a8c7a", fontWeight: 500 }}>
                          {r.avgJobTime}
                        </span>
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX} align="right">
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "#e8e6e3" }}>
                          {r.driverHrs}
                        </span>
                      </TableCell>
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
                          color: "#9a8c7a",
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
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <SectionCard
            bodyPadding="24px 26px 26px"
            style={{
              background: "linear-gradient(165deg, #1c1c1d 0%, #1e1e20 70%, #212123 100%)",
              cursor: "default",
            }}
            onMouseEnter={() => undefined}
            onMouseLeave={() => undefined}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #0f1520 0%, #152035 60%, #1a2845 100%)",
                  color: "#60a5fa",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 6px 16px rgba(59,130,246,0.22), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <PeopleAltOutlinedIcon sx={{ fontSize: 26 }} />
              </span>
              <div>
                <h2
                  style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#e8e6e3",
                  margin: 0,
                  letterSpacing: "-0.2px",
                }}
              >
                  Customer Analytics
                </h2>
              </div>
            </div>
            <MetricList rows={CUSTOMER_METRICS} />
          </SectionCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionCard
            bodyPadding="24px 26px 26px"
            style={{
              background: "linear-gradient(165deg, #1c1c1d 0%, #1e1e20 70%, #212123 100%)",
              cursor: "default",
            }}
            onMouseEnter={() => undefined}
            onMouseLeave={() => undefined}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #1c1508 0%, #22190b 60%, #2a2010 100%)",
                  color: "#fbbf24",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 6px 16px rgba(245,158,11,0.22), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <DirectionsCarIcon sx={{ fontSize: 26 }} />
              </span>
              <div>
                <h2
                  style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#e8e6e3",
                  margin: 0,
                  letterSpacing: "-0.2px",
                }}
              >
                  Driver Analytics
                </h2>
              </div>
            </div>
            <MetricList rows={DRIVER_METRICS} />
          </SectionCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionCard
            bodyPadding="24px 26px 26px"
            style={{
              background: "linear-gradient(165deg, #1c1c1d 0%, #1e1e20 70%, #212123 100%)",
              cursor: "default",
            }}
            onMouseEnter={() => undefined}
            onMouseLeave={() => undefined}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #0a1c10 0%, #0f2a18 60%, #142e1d 100%)",
                  color: "#34d399",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 6px 16px rgba(52,211,153,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <InventoryIcon sx={{ fontSize: 26 }} />
              </span>
              <div>
                <h2
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#e8e6e3",
                    margin: 0,
                    letterSpacing: "-0.2px",
                  }}
                >
                  Inventory Analytics
                </h2>
              </div>
            </div>
            <MetricList rows={INVENTORY_METRICS} />
          </SectionCard>
        </Grid>
      </Grid>
    </div>
  );
}
