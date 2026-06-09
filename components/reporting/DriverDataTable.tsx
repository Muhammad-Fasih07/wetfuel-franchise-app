"use client";

import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { StatusChip } from "@/components/ui/StatusChip";
import { BODY_CELL_SX, HEADER_CELL_SX, MONO_DATA_CELL_SX } from "@/lib/styles/tableStyles";

interface Driver {
  id: string;
  name: string;
  franchisee: string;
  phone: string;
  jobsCompleted: number;
  hoursWorked: string;
  avgJobTime: string;
  lastActive: string;
  status: "active" | "inactive";
  preInspection: boolean;
}

// TODO: Replace with real API data
const DRIVERS: Driver[] = [
  { id: "D001", name: "John Martinez", franchisee: "AlphaFuel Co.", phone: "(555) 234-5678", jobsCompleted: 156, hoursWorked: "384 hrs", avgJobTime: "1h 12m", lastActive: "2 hours ago", status: "active", preInspection: true },
  { id: "D002", name: "Sarah Johnson", franchisee: "AlphaFuel Co.", phone: "(555) 345-6789", jobsCompleted: 142, hoursWorked: "356 hrs", avgJobTime: "1h 08m", lastActive: "Active now", status: "active", preInspection: true },
  { id: "D003", name: "Michael Chen", franchisee: "PrimeFuel LLC", phone: "(555) 456-7890", jobsCompleted: 128, hoursWorked: "328 hrs", avgJobTime: "1h 15m", lastActive: "5 hours ago", status: "active", preInspection: false },
  { id: "D004", name: "Emily Rodriguez", franchisee: "PrimeFuel LLC", phone: "(555) 567-8901", jobsCompleted: 134, hoursWorked: "342 hrs", avgJobTime: "1h 10m", lastActive: "1 hour ago", status: "active", preInspection: true },
  { id: "D005", name: "David Thompson", franchisee: "SouthFuel Inc.", phone: "(555) 678-9012", jobsCompleted: 119, hoursWorked: "298 hrs", avgJobTime: "58m", lastActive: "4 hours ago", status: "active", preInspection: true },
  { id: "D006", name: "Lisa Anderson", franchisee: "SouthFuel Inc.", phone: "(555) 789-0123", jobsCompleted: 98, hoursWorked: "246 hrs", avgJobTime: "1h 02m", lastActive: "Yesterday", status: "inactive", preInspection: true },
  { id: "D007", name: "James Wilson", franchisee: "NorthFuel Ltd.", phone: "(555) 890-1234", jobsCompleted: 87, hoursWorked: "224 hrs", avgJobTime: "1h 05m", lastActive: "6 hours ago", status: "active", preInspection: true },
  { id: "D008", name: "Maria Garcia", franchisee: "WestEnd Fuel", phone: "(555) 901-2345", jobsCompleted: 76, hoursWorked: "196 hrs", avgJobTime: "55m", lastActive: "3 hours ago", status: "active", preInspection: false },
];

export function DriverDataTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={HEADER_CELL_SX}>Driver</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Franchisee</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Contact</TableCell>
            <TableCell sx={HEADER_CELL_SX} align="center">Jobs Done</TableCell>
            <TableCell sx={HEADER_CELL_SX} align="center">Hours</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Avg Job Time</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Pre-Inspection</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Last Active</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {DRIVERS.map((driver) => (
            <TableRow
              key={driver.id}
              hover
              sx={{
                cursor: "pointer",
                transition: "background-color var(--transition-fast)",
                "&:hover": { background: "var(--bg-surface-hover)" },
              }}
            >
              <TableCell sx={BODY_CELL_SX}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      background: "var(--bg-surface-hover)",
                      color: "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {driver.name.split(" ").map(n => n[0]).join("")}
                  </Avatar>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>
                      {driver.name}
                    </p>
                    <p className="type-table-data" style={{ fontSize: "11px", color: "var(--text-muted)", margin: "2px 0 0" }}>
                      {driver.id}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>
                  {driver.franchisee}
                </span>
              </TableCell>
              <TableCell sx={MONO_DATA_CELL_SX}>
                <span style={{ color: "var(--text-secondary)" }}>
                  {driver.phone}
                </span>
              </TableCell>
              <TableCell sx={MONO_DATA_CELL_SX} align="center">
                {driver.jobsCompleted}
              </TableCell>
              <TableCell sx={MONO_DATA_CELL_SX} align="center">
                {driver.hoursWorked}
              </TableCell>
              <TableCell sx={MONO_DATA_CELL_SX}>
                {driver.avgJobTime}
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                {driver.preInspection ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      color: "var(--success-text)",
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 15 }} />
                    Complete
                  </span>
                ) : (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      color: "var(--warning-text)",
                      fontWeight: 500,
                    }}
                  >
                    <WarningIcon sx={{ fontSize: 15 }} />
                    Pending
                  </span>
                )}
              </TableCell>
              <TableCell sx={MONO_DATA_CELL_SX}>
                <span style={{ color: "var(--text-muted)" }}>
                  {driver.lastActive}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <StatusChip status={driver.status === "active" ? "active" : "frozen"} label={driver.status === "active" ? "Active" : "Inactive"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
