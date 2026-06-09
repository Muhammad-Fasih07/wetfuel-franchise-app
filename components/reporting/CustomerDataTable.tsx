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
  Business as BusinessIcon,
  LocalGasStation as FuelIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { StatusChip } from "@/components/ui/StatusChip";
import { BODY_CELL_SX, HEADER_CELL_SX, MONO_DATA_CELL_SX } from "@/lib/styles/tableStyles";

interface Customer {
  id: string;
  name: string;
  franchisee: string;
  contact: string;
  email: string;
  equipment: number;
  avgFuelPerMonth: string;
  totalDeliveries: number;
  registrationType: "self" | "admin";
  status: "active" | "pending";
}

// TODO: Replace with real API data
const CUSTOMERS: Customer[] = [
  { id: "C001", name: "ABC Construction Co.", franchisee: "AlphaFuel Co.", contact: "(555) 111-2222", email: "contact@abcconstruction.com", equipment: 5, avgFuelPerMonth: "450 gal", totalDeliveries: 24, registrationType: "admin", status: "active" },
  { id: "C002", name: "XYZ Logistics Inc.", franchisee: "AlphaFuel Co.", contact: "(555) 222-3333", email: "admin@xyzlogistics.com", equipment: 8, avgFuelPerMonth: "680 gal", totalDeliveries: 36, registrationType: "self", status: "active" },
  { id: "C003", name: "Prime Trucking LLC", franchisee: "PrimeFuel LLC", contact: "(555) 333-4444", email: "info@primetrucking.com", equipment: 12, avgFuelPerMonth: "920 gal", totalDeliveries: 48, registrationType: "admin", status: "active" },
  { id: "C004", name: "Green Energy Corp", franchisee: "PrimeFuel LLC", contact: "(555) 444-5555", email: "fleet@greenenergy.com", equipment: 4, avgFuelPerMonth: "340 gal", totalDeliveries: 18, registrationType: "self", status: "active" },
  { id: "C005", name: "Metro Equipment Rental", franchisee: "SouthFuel Inc.", contact: "(555) 555-6666", email: "operations@metroequip.com", equipment: 15, avgFuelPerMonth: "1,200 gal", totalDeliveries: 52, registrationType: "admin", status: "active" },
  { id: "C006", name: "Coastal Transport", franchisee: "SouthFuel Inc.", contact: "(555) 666-7777", email: "dispatch@coastaltrans.com", equipment: 6, avgFuelPerMonth: "520 gal", totalDeliveries: 28, registrationType: "self", status: "active" },
  { id: "C007", name: "Industrial Mining Co.", franchisee: "NorthFuel Ltd.", contact: "(555) 777-8888", email: "fuel@industrialmining.com", equipment: 20, avgFuelPerMonth: "1,800 gal", totalDeliveries: 64, registrationType: "admin", status: "active" },
  { id: "C008", name: "Skyline Construction", franchisee: "WestEnd Fuel", contact: "(555) 888-9999", email: "admin@skylineconstruct.com", equipment: 3, avgFuelPerMonth: "280 gal", totalDeliveries: 14, registrationType: "self", status: "pending" },
];

export function CustomerDataTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={HEADER_CELL_SX}>Customer</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Franchisee</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Contact</TableCell>
            <TableCell sx={HEADER_CELL_SX} align="center">Equipment</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Avg Fuel/Mo</TableCell>
            <TableCell sx={HEADER_CELL_SX} align="center">Deliveries</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Registration</TableCell>
            <TableCell sx={HEADER_CELL_SX}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {CUSTOMERS.map((customer) => (
            <TableRow
              key={customer.id}
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
                      background: "var(--info-text)",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    <BusinessIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {customer.name}
                    </p>
                    <p className="type-table-data" style={{ fontSize: "11px", color: "var(--text-muted)", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {customer.id} · {customer.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 400 }}>
                  {customer.franchisee}
                </span>
              </TableCell>
              <TableCell sx={MONO_DATA_CELL_SX}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 14 }} />
                  {customer.contact}
                </span>
              </TableCell>
              <TableCell sx={MONO_DATA_CELL_SX} align="center">
                {customer.equipment}
              </TableCell>
              <TableCell sx={MONO_DATA_CELL_SX}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <FuelIcon sx={{ fontSize: 15, color: "var(--text-muted)" }} />
                  {customer.avgFuelPerMonth}
                </span>
              </TableCell>
              <TableCell sx={MONO_DATA_CELL_SX} align="center">
                {customer.totalDeliveries}
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: customer.registrationType === "admin" ? "var(--accent-purple)" : "var(--info-text)",
                    background: customer.registrationType === "admin"
                      ? "rgba(139,92,246,0.1)"
                      : "rgba(59,130,246,0.1)",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {customer.registrationType}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <StatusChip 
                  status={customer.status === "active" ? "active" : "pending"} 
                  label={customer.status === "active" ? "Active" : "Pending"} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
