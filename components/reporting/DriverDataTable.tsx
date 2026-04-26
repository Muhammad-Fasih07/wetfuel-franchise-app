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
  DirectionsCar as CarIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { StatusChip } from "@/components/ui/StatusChip";

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
};

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
                transition: "all 200ms ease",
                "&:hover": {
                  background: "linear-gradient(90deg, rgba(245,158,11,0.02) 0%, rgba(255,255,255,0) 100%)",
                  transform: "scale(1.002)",
                },
              }}
            >
              <TableCell sx={BODY_CELL_SX}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                      color: "#f59e0b",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {driver.name.split(" ").map(n => n[0]).join("")}
                  </Avatar>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#2b2b2b", margin: 0 }}>
                      {driver.name}
                    </p>
                    <p style={{ fontSize: "11px", color: "#887b6a", margin: "2px 0 0" }}>
                      ID: {driver.id}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span style={{ fontSize: "13px", color: "#2b2b2b", fontWeight: 500 }}>
                  {driver.franchisee}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span style={{ fontSize: "13px", color: "#887b6a" }}>
                  {driver.phone}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX} align="center">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#2b2b2b",
                  }}
                >
                  <CarIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
                  {driver.jobsCompleted}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX} align="center">
                <span style={{ fontSize: "13px", fontWeight: 500, color: "#2b2b2b" }}>
                  {driver.hoursWorked}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span style={{ fontSize: "13px", color: "#887b6a" }}>
                  {driver.avgJobTime}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                {driver.preInspection ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      color: "#15803d",
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                    Complete
                  </span>
                ) : (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      color: "#f59e0b",
                      fontWeight: 500,
                    }}
                  >
                    <WarningIcon sx={{ fontSize: 16 }} />
                    Pending
                  </span>
                )}
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span style={{ fontSize: "12px", color: "#887b6a" }}>
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
