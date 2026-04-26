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
                transition: "all 200ms ease",
                "&:hover": {
                  background: "linear-gradient(90deg, rgba(59,130,246,0.02) 0%, rgba(255,255,255,0) 100%)",
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
                      background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                      color: "#3b82f6",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    <BusinessIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#2b2b2b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {customer.name}
                    </p>
                    <p style={{ fontSize: "11px", color: "#887b6a", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {customer.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span style={{ fontSize: "13px", color: "#2b2b2b", fontWeight: 500 }}>
                  {customer.franchisee}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    color: "#887b6a",
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 14 }} />
                  {customer.contact}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX} align="center">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "32px",
                    height: "32px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#3b82f6",
                    background: "rgba(59,130,246,0.1)",
                    borderRadius: "8px",
                    padding: "0 8px",
                  }}
                >
                  {customer.equipment}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#2b2b2b",
                  }}
                >
                  <FuelIcon sx={{ fontSize: 16, color: "#ce1c1a" }} />
                  {customer.avgFuelPerMonth}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX} align="center">
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#15803d" }}>
                  {customer.totalDeliveries}
                </span>
              </TableCell>
              <TableCell sx={BODY_CELL_SX}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: customer.registrationType === "admin" ? "#8b5cf6" : "#3b82f6",
                    background: customer.registrationType === "admin" 
                      ? "rgba(139,92,246,0.1)"
                      : "rgba(59,130,246,0.1)",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
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
