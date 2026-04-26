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
  DirectionsCar as DirectionsCarIcon,
  FileDownloadOutlined as FileDownloadOutlinedIcon,
  Inventory as InventoryIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { DriverDataTable } from "@/components/reporting/DriverDataTable";
import { CustomerDataTable } from "@/components/reporting/CustomerDataTable";
import { PERFORMANCE_ROWS } from "./_data";

const HEADER_CELL_SX = {
  background: "linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)",
  fontSize: "11px",
  fontWeight: 700,
  color: "#887b6a",
  letterSpacing: "0.7px",
  textTransform: "uppercase",
  borderBottom: "1.5px solid #ececec",
  padding: "14px 18px",
};

const BODY_CELL_SX = {
  fontSize: "13px",
  color: "#2b2b2b",
  borderBottom: "1px solid #f8f8f8",
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
              : "#f9f9f9";
            e.currentTarget.style.borderColor = m.color 
              ? "rgba(206,28,26,0.15)"
              : "#f0f0f0";
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
          <span style={{ fontSize: "13px", color: "#887b6a", fontWeight: 500 }}>
            {m.label}
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: m.color ?? "#2b2b2b",
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

const RANK_COLORS = ["#ce1c1a", "#e05555", "#e5e5e5", "#e5e5e5", "#e5e5e5"];

export default function ReportingPage() {
  const router = useRouter();
  const [range, setRange] = useState("30d");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "frozen">(
    "all",
  );
  const [expandedSection, setExpandedSection] = useState<"drivers" | "customers" | "inventory" | null>(null);

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
            title="Franchisee Performance"
            subtitle="Detailed performance metrics and analytics for all franchisees"
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
                    border: "1.5px solid #ececec",
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
                        transition: "all 200ms ease",
                        "&:hover": {
                          background: "linear-gradient(90deg, rgba(206,28,26,0.02) 0%, rgba(255,255,255,0) 100%)",
                          transform: "scale(1.005)",
                        },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 600, color: "#2b2b2b" }}>
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
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#15803d" }}>
                          {r.jobs}
                        </span>
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX}>
                        <span style={{ fontSize: "13px", color: "#887b6a", fontWeight: 500 }}>
                          {r.avgJobTime}
                        </span>
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX} align="right">
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "#2b2b2b" }}>
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
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <SectionCard
            bodyPadding="24px 26px 26px"
            style={{
              background: "linear-gradient(165deg, #ffffff 0%, #ffffff 70%, #fffbeb 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
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
                <h2
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#2b2b2b",
                    margin: "0 0 2px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Top Performers
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
                  By fuel volume
                </p>
              </div>
            </div>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {top5.map((r, idx) => {
                const percent = Math.round((r.fuelGal / topMax) * 100);
                const isTop = idx === 0;
                return (
                  <li
                    key={r.id}
                    style={{
                      marginBottom: idx === top5.length - 1 ? 0 : "18px",
                      padding: "12px",
                      borderRadius: "10px",
                      background: isTop 
                        ? "linear-gradient(90deg, rgba(206,28,26,0.04) 0%, rgba(255,255,255,0) 100%)"
                        : "transparent",
                      border: isTop ? "1.5px solid rgba(206,28,26,0.15)" : "1.5px solid transparent",
                      transition: "all 200ms ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 
                        "linear-gradient(90deg, rgba(206,28,26,0.06) 0%, rgba(255,255,255,0.5) 100%)";
                      e.currentTarget.style.borderColor = "rgba(206,28,26,0.2)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isTop
                        ? "linear-gradient(90deg, rgba(206,28,26,0.04) 0%, rgba(255,255,255,0) 100%)"
                        : "transparent";
                      e.currentTarget.style.borderColor = isTop 
                        ? "rgba(206,28,26,0.15)"
                        : "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        gap: "12px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                        <span
                          style={{
                            minWidth: "28px",
                            height: "28px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: isTop ? "#ffffff" : idx < 3 ? "#ce1c1a" : "#887b6a",
                            background: isTop
                              ? "linear-gradient(135deg, #ce1c1a 0%, #8b1816 100%)"
                              : idx < 3
                                ? "linear-gradient(135deg, rgba(206,28,26,0.15) 0%, rgba(206,28,26,0.08) 100%)"
                                : "#f5f5f5",
                            borderRadius: "8px",
                            flexShrink: 0,
                            boxShadow: isTop
                              ? "0 3px 8px rgba(206,28,26,0.3)"
                              : "none",
                            border: idx < 3 ? "1px solid rgba(206,28,26,0.2)" : "none",
                          }}
                        >
                          {idx + 1}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: idx < 3 ? 600 : 500,
                            color: "#2b2b2b",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            letterSpacing: "-0.1px",
                          }}
                        >
                          {r.name}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: idx < 3 ? "#ce1c1a" : "#887b6a",
                          flexShrink: 0,
                        }}
                      >
                        {r.fuel}
                      </span>
                    </div>
                    <div style={{ position: "relative" }}>
                      <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{
                          height: 8,
                          borderRadius: 6,
                          backgroundColor: "#f5f5f5",
                          border: "1px solid #ececec",
                          overflow: "hidden",
                          "& .MuiLinearProgress-bar": {
                            background: isTop
                              ? "linear-gradient(90deg, #f0797a 0%, #ce1c1a 60%, #8b1816 100%)"
                              : idx < 3
                                ? "linear-gradient(90deg, #fca5a5 0%, #f87171 50%, #dc2626 100%)"
                                : "linear-gradient(90deg, #d4d4d4 0%, #a3a3a3 100%)",
                            borderRadius: 6,
                            boxShadow: idx < 3 ? "inset 0 1px 2px rgba(0,0,0,0.1)" : "none",
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
                          color: percent > 50 ? "#ffffff" : "#887b6a",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {percent}%
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <SectionCard
            bodyPadding="24px 26px 26px"
            style={{
              background: "linear-gradient(165deg, #ffffff 0%, #ffffff 70%, #fdfcfb 100%)",
              cursor: "pointer",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(59,130,246,0.15), 0 12px 32px -16px rgba(59,130,246,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px -16px rgba(43,43,43,0.2), inset 0 1px 0 rgba(255,255,255,0.8)";
            }}
            onClick={() => setExpandedSection(expandedSection === "customers" ? null : "customers")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #eff6ff 0%, #dbeafe 60%, #bfdbfe 100%)",
                  color: "#3b82f6",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 6px 16px rgba(59,130,246,0.22), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                <PeopleAltOutlinedIcon sx={{ fontSize: 26 }} />
              </span>
              <div>
                <h2
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#2b2b2b",
                    margin: "0 0 2px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Customer Analytics
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
                  Click to view all customers
                </p>
              </div>
            </div>
            <MetricList rows={CUSTOMER_METRICS} />
          </SectionCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionCard
            bodyPadding="24px 26px 26px"
            style={{
              background: "linear-gradient(165deg, #ffffff 0%, #ffffff 70%, #fdfcfb 100%)",
              cursor: "pointer",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(245,158,11,0.15), 0 12px 32px -16px rgba(245,158,11,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px -16px rgba(43,43,43,0.2), inset 0 1px 0 rgba(255,255,255,0.8)";
            }}
            onClick={() => setExpandedSection(expandedSection === "drivers" ? null : "drivers")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #fef3c7 0%, #fde68a 60%, #fcd34d 100%)",
                  color: "#f59e0b",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 6px 16px rgba(245,158,11,0.22), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                <DirectionsCarIcon sx={{ fontSize: 26 }} />
              </span>
              <div>
                <h2
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#2b2b2b",
                    margin: "0 0 2px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Driver Analytics
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
                  Click to view all drivers
                </p>
              </div>
            </div>
            <MetricList rows={DRIVER_METRICS} />
          </SectionCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionCard
            bodyPadding="24px 26px 26px"
            style={{
              background: "linear-gradient(165deg, #ffffff 0%, #ffffff 70%, #fdfcfb 100%)",
              cursor: "pointer",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(21,128,61,0.15), 0 12px 32px -16px rgba(21,128,61,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px -16px rgba(43,43,43,0.2), inset 0 1px 0 rgba(255,255,255,0.8)";
            }}
            onClick={() => setExpandedSection(expandedSection === "inventory" ? null : "inventory")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)",
                  color: "#15803d",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 6px 16px rgba(21,128,61,0.22), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                <InventoryIcon sx={{ fontSize: 26 }} />
              </span>
              <div>
                <h2
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#2b2b2b",
                    margin: "0 0 2px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Inventory Analytics
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
                  <WarningIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
                  Click to view details
                </p>
              </div>
            </div>
            <MetricList rows={INVENTORY_METRICS} />
          </SectionCard>
        </Grid>
      </Grid>

      {expandedSection === "drivers" && (
        <Grid container spacing={3} className="animate-slide-up">
          <Grid item xs={12}>
            <SectionCard
              title="All Network Drivers"
              subtitle="Comprehensive driver list with performance metrics"
              bodyPadding={0}
            >
              <DriverDataTable />
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {expandedSection === "customers" && (
        <Grid container spacing={3} className="animate-slide-up">
          <Grid item xs={12}>
            <SectionCard
              title="All Network Customers"
              subtitle="Complete customer database across all franchisees"
              bodyPadding={0}
            >
              <CustomerDataTable />
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {expandedSection === "inventory" && (
        <Grid container spacing={3} className="animate-slide-up">
          <Grid item xs={12}>
            <SectionCard
              title="Inventory Details"
              subtitle="Detailed inventory breakdown and analytics"
              bodyPadding="28px 32px"
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <div
                    style={{
                      padding: "20px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                      border: "1.5px solid rgba(21,128,61,0.2)",
                    }}
                  >
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#15803d", margin: "0 0 16px" }}>
                      Fuel Storage Overview
                    </h3>
                    <MetricList rows={INVENTORY_METRICS.slice(0, 3)} />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div
                    style={{
                      padding: "20px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
                      border: "1.5px solid rgba(245,158,11,0.2)",
                    }}
                  >
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f59e0b", margin: "0 0 16px" }}>
                      Supplies & Consumption
                    </h3>
                    <MetricList rows={INVENTORY_METRICS.slice(3)} />
                  </div>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
