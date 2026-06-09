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
  AssessmentOutlined as AssessmentOutlinedIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  FileDownloadOutlined as FileDownloadOutlinedIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { UnderDevelopmentModal } from "@/components/ui/UnderDevelopmentModal";
import { StatusChip } from "@/components/ui/StatusChip";
import { PERFORMANCE_ROWS } from "./_data";
import { BODY_CELL_SX, HEADER_CELL_SX, MONO_DATA_CELL_SX } from "@/lib/styles/tableStyles";

// TODO: replace with API-driven metric rows
const CUSTOMER_METRICS: Array<{ label: string; value: string; highlight?: boolean }> = [
  { label: "Total customers network-wide", value: "1,240" },
  { label: "Avg equipment per customer", value: "3.2" },
  { label: "Avg fuel per customer/mo", value: "229 gal" },
  { label: "Self-registered customers", value: "318" },
  { label: "Admin-registered customers", value: "922" },
  { label: "Pending registrations", value: "14", highlight: true },
];

const DRIVER_METRICS: Array<{ label: string; value: string; highlight?: boolean }> = [
  { label: "Total drivers network-wide", value: "24" },
  { label: "Avg jobs per driver/mo", value: "160" },
  { label: "Avg hours per driver/mo", value: "384 hrs" },
  { label: "Active drivers today", value: "18" },
  { label: "Pre-inspection completion", value: "96%" },
  { label: "Flagged fueling events", value: "7", highlight: true },
];

const INVENTORY_METRICS: Array<{ label: string; value: string; highlight?: boolean }> = [
  { label: "Total fuel in main storage", value: "42,000 gal" },
  { label: "Total fuel on trucks", value: "8,400 gal" },
  { label: "Low inventory alerts", value: "2", highlight: true },
  { label: "Packaged goods SKUs", value: "12" },
  { label: "3rd party fuel purchases", value: "6 this mo." },
  { label: "Avg daily consumption", value: "1,400 gal" },
];

function MetricList({
  rows,
}: {
  rows: Array<{ label: string; value: string; highlight?: boolean }>;
}) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {rows.map((m) => (
        <li
          key={m.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            {m.label}
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: m.highlight ? "var(--warning-text)" : "var(--text-primary)",
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
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const filteredPerformance = useMemo(() => {
    if (statusFilter === "all") return PERFORMANCE_ROWS;
    return PERFORMANCE_ROWS.filter((r) => r.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <PageHeader
        breadcrumb="Network / Reporting"
        icon={<AssessmentOutlinedIcon sx={{ fontSize: 24 }} />}
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
                    borderRadius: "6px",
                    fontSize: "13px",
                    height: "36px",
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-surface)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-subtle)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-focus)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary-brand)", borderWidth: "1px" },
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
              onClick={() => setExportModalOpen(true)}
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
                    borderRadius: "6px",
                    fontSize: "13px",
                    height: "34px",
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-surface-hover)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-subtle)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-focus)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary-brand)", borderWidth: "1px" },
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
                        transition: "background-color var(--transition-fast)",
                        "&:hover": { background: "var(--bg-surface-hover)" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>{r.name}</TableCell>
                      <TableCell sx={MONO_DATA_CELL_SX} align="center">
                        {r.customers}
                      </TableCell>
                      <TableCell sx={MONO_DATA_CELL_SX} align="center">
                        {r.drivers}
                      </TableCell>
                      <TableCell sx={{ ...MONO_DATA_CELL_SX, color: "var(--primary-brand)" }} align="right">
                        {r.fuel}
                      </TableCell>
                      <TableCell sx={{ ...MONO_DATA_CELL_SX, color: "var(--success-text)" }} align="center">
                        {r.jobs}
                      </TableCell>
                      <TableCell sx={MONO_DATA_CELL_SX}>
                        {r.avgJobTime}
                      </TableCell>
                      <TableCell sx={MONO_DATA_CELL_SX} align="right">
                        {r.driverHrs}
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
                          color: "var(--text-muted)",
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
          <SectionCard title="Customer Analytics" bodyPadding="0 24px 24px">
            <div style={{ paddingTop: "16px" }}>
              <MetricList rows={CUSTOMER_METRICS} />
            </div>
          </SectionCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionCard title="Driver Analytics" bodyPadding="0 24px 24px">
            <div style={{ paddingTop: "16px" }}>
              <MetricList rows={DRIVER_METRICS} />
            </div>
          </SectionCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionCard title="Inventory Analytics" bodyPadding="0 24px 24px">
            <div style={{ paddingTop: "16px" }}>
              <MetricList rows={INVENTORY_METRICS} />
            </div>
          </SectionCard>
        </Grid>
      </Grid>

      <UnderDevelopmentModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        title="Export Report"
        message="Report exports are currently under development. You'll be able to download network-wide analytics here soon."
      />
    </div>
  );
}
