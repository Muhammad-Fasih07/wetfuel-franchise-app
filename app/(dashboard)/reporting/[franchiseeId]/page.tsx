"use client";

import { useParams } from "next/navigation";
import { useAppRouter } from "@/lib/hooks/useAppRouter";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Inventory as InventoryIcon,
  AcUnit as FreezeIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  Phone as PhoneIcon,
  Store as StoreIcon,
  CalendarToday as CalendarIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { getPerformanceRowById } from "../_data";
import { BODY_CELL_SX, HEADER_CELL_SX, MONO_DATA_CELL_SX } from "@/lib/styles/tableStyles";

// TODO: replace with real customer data scoped to the franchisee
const CUSTOMER_ROWS = [
  { name: "Lone Star Logistics", location: "Houston, TX", margin: "12%", equipment: 6, avgFuel: "1,200 gal" },
  { name: "Bayou Transport", location: "Houston, TX", margin: "9%", equipment: 4, avgFuel: "880 gal" },
  { name: "Gulfside Hauling", location: "Galveston, TX", margin: "10%", equipment: 3, avgFuel: "640 gal" },
  { name: "Texan Movers", location: "Houston, TX", margin: "11%", equipment: 5, avgFuel: "1,020 gal" },
];

// TODO: replace with real driver data scoped to the franchisee
const DRIVER_ROWS: Array<{
  name: string;
  jobs: number;
  hours: string;
  status: "active" | "frozen" | "flagged";
}> = [
  { name: "Marcus Reed", jobs: 64, hours: "210 hrs", status: "active" },
  { name: "Avery Chen", jobs: 58, hours: "192 hrs", status: "active" },
  { name: "Liam Patel", jobs: 41, hours: "138 hrs", status: "active" },
  { name: "Sofia Ortiz", jobs: 22, hours: "78 hrs", status: "flagged" },
];

// TODO: replace with real inventory data scoped to the franchisee
const INVENTORY_ROWS: Array<{
  product: string;
  category: string;
  stock: number;
  unit: string;
  price: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}> = [
  { product: "Engine Oil 5W-30", category: "Lubricants", stock: 45, unit: "bottles", price: "$8.99", status: "in-stock" },
  { product: "Gear Oil 80W-90", category: "Lubricants", stock: 12, unit: "bottles", price: "$12.50", status: "low-stock" },
  { product: "Mobile Phone Charger", category: "Accessories", stock: 28, unit: "units", price: "$15.99", status: "in-stock" },
  { product: "Coolant/Antifreeze", category: "Fluids", stock: 34, unit: "gallons", price: "$19.99", status: "in-stock" },
  { product: "Brake Fluid DOT 4", category: "Fluids", stock: 8, unit: "bottles", price: "$6.99", status: "low-stock" },
  { product: "Windshield Washer Fluid", category: "Fluids", stock: 52, unit: "gallons", price: "$4.99", status: "in-stock" },
  { product: "Air Fresheners", category: "Accessories", stock: 0, unit: "packs", price: "$2.99", status: "out-of-stock" },
  { product: "Motor Oil 10W-40", category: "Lubricants", stock: 38, unit: "bottles", price: "$9.99", status: "in-stock" },
];

export default function FranchiseeReportPage() {
  const router = useAppRouter();
  const params = useParams<{ franchiseeId: string }>();
  const id = params?.franchiseeId ?? "";
  const row = getPerformanceRowById(id);

  if (!row) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <PageHeader
          title="Report not found"
          subtitle="No performance data exists for this franchisee."
          action={
            <Button
              variant="ghost"
              fullWidth={false}
              startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
              onClick={() => router.push("/reporting")}
            >
              Back to reporting
            </Button>
          }
        />
        <SectionCard>
          <EmptyState
            title="No reporting data found."
            subtitle="The franchisee may have been removed or has not produced any data yet."
            action={
              <Button
                fullWidth={false}
                onClick={() => router.push("/reporting")}
              >
                Go to reporting
              </Button>
            }
          />
        </SectionCard>
      </div>
    );
  }

  const performanceRows = [
    { label: "Active Drivers", value: String(row.drivers) },
    { label: "Trucks Enrolled", value: String(row.drivers) },
    { label: "Avg Fuel/Month", value: row.fuel },
    { label: "Customers", value: String(row.customers) },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader
        breadcrumb={`Network / Reporting / ${row.name}`}
        icon={<StoreIcon sx={{ fontSize: 24 }} />}
        title={`${row.name} — Report`}
        subtitle="Detailed performance breakdown."
        action={
          <Button
            variant="ghost"
            fullWidth={false}
            startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
            onClick={() => router.push("/reporting")}
          >
            Back to reporting
          </Button>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="FUEL DELIVERED"
            value={row.fuel}
            subtext="This period"
            trend="up"
            trendValue="+9%"
            icon={<LocalGasStationOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="CUSTOMERS"
            value={String(row.customers)}
            subtext="Active accounts"
            trend="up"
            trendValue="+4%"
            icon={<PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="JOBS DONE"
            value={String(row.jobs)}
            subtext={`Avg ${row.avgJobTime} per job`}
            trend="up"
            trendValue="+12%"
            icon={<CheckCircleOutlineIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            label="DRIVER HOURS"
            value={row.driverHrs}
            subtext={`${row.drivers} active drivers`}
            trend="neutral"
            icon={<AccessTimeOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        <Grid item xs={12} md={8} lg={8}>
          <SectionCard bodyPadding="20px 24px" style={{ height: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: "1 1 200px", minWidth: 0 }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "8px",
                    background: "var(--bg-surface-hover)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <StoreIcon sx={{ fontSize: 22 }} />
                </div>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 4px 0", lineHeight: 1.2 }}>
                    {row.name}
                  </h2>
                  <StatusChip status={row.status} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "0 0 auto", minWidth: "160px" }}>
                <Button
                  fullWidth
                  startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                  onClick={() => router.push(`/franchisees/${row.id}`)}
                >
                  Edit Details
                </Button>
                <button
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-surface-hover)",
                    color: row.status === "active" ? "var(--error-text)" : "var(--success-text)",
                    fontWeight: 500,
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background-color var(--transition-fast)",
                  }}
                >
                  <FreezeIcon sx={{ fontSize: 16 }} />
                  {row.status === "active" ? "Freeze Account" : "Unfreeze Account"}
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "8px",
              }}
            >
              {[
                { label: "Location", value: "Houston, TX", icon: <LocationIcon sx={{ fontSize: 16 }} /> },
                { label: "Admin", value: "John Martinez", icon: <PersonIcon sx={{ fontSize: 16 }} /> },
                { label: "Email", value: "admin@alphafuel.com", icon: <EmailIcon sx={{ fontSize: 16 }} /> },
                { label: "Phone", value: "(713) 555-0142", icon: <PhoneIcon sx={{ fontSize: 16 }} /> },
                { label: "Registered", value: "Jan 15, 2024", icon: <CalendarIcon sx={{ fontSize: 16 }} /> },
              ].map((info) => (
                <div
                  key={info.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    background: "var(--bg-surface-hover)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)" }}>
                    {info.icon}
                    <span style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {info.label}
                    </span>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <SectionCard title="Performance" bodyPadding="0 24px 16px" style={{ height: "100%" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {performanceRows.map((m, idx) => (
                <li
                  key={m.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 0",
                    borderBottom:
                      idx < performanceRows.length - 1
                        ? "1px solid var(--border-subtle)"
                        : "none",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                    {m.label}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {m.value}
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </Grid>
      </Grid>

      <SectionCard title="Customers" bodyPadding={0}>
        <TableContainer>
          <Table sx={{ tableLayout: "fixed", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "30%" }}>Customer Name</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "22%" }}>Location</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "16%" }}>Margin</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "16%", textAlign: "center" }}>Equipment Count</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "16%", textAlign: "right" }}>Avg Fuel/Month</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CUSTOMER_ROWS.map((c) => (
                <TableRow
                  key={c.name}
                  sx={{
                    transition: "background-color var(--transition-fast)",
                    "&:hover": { background: "var(--bg-surface-hover)" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>{c.name}</TableCell>
                  <TableCell sx={BODY_CELL_SX}>{c.location}</TableCell>
                  <TableCell sx={MONO_DATA_CELL_SX}>{c.margin}</TableCell>
                  <TableCell sx={{ ...MONO_DATA_CELL_SX, textAlign: "center" }}>{c.equipment}</TableCell>
                  <TableCell sx={{ ...MONO_DATA_CELL_SX, textAlign: "right" }}>{c.avgFuel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionCard>

      <SectionCard title="Drivers" bodyPadding={0}>
        <TableContainer>
          <Table sx={{ tableLayout: "fixed", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "30%" }}>Driver Name</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "22%", textAlign: "center" }}>Jobs Completed</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "22%", textAlign: "right" }}>Total Hours</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "26%" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DRIVER_ROWS.map((d) => (
                <TableRow
                  key={d.name}
                  sx={{
                    transition: "background-color var(--transition-fast)",
                    "&:hover": { background: "var(--bg-surface-hover)" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>{d.name}</TableCell>
                  <TableCell sx={{ ...MONO_DATA_CELL_SX, textAlign: "center" }}>{d.jobs}</TableCell>
                  <TableCell sx={{ ...MONO_DATA_CELL_SX, textAlign: "right" }}>{d.hours}</TableCell>
                  <TableCell sx={BODY_CELL_SX}>
                    <StatusChip status={d.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionCard>

      <SectionCard title="Inventory" bodyPadding={0}>
        <TableContainer>
          <Table sx={{ tableLayout: "fixed", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "30%" }}>Product Name</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "20%" }}>Category</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "18%", textAlign: "center" }}>Current Stock</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "16%", textAlign: "right" }}>Unit Price</TableCell>
                <TableCell sx={{ ...HEADER_CELL_SX, width: "16%" }}>Stock Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {INVENTORY_ROWS.map((item) => (
                <TableRow
                  key={item.product}
                  sx={{
                    transition: "background-color var(--transition-fast)",
                    "&:hover": { background: "var(--bg-surface-hover)" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>{item.product}</TableCell>
                  <TableCell sx={BODY_CELL_SX}>{item.category}</TableCell>
                  <TableCell sx={{ ...MONO_DATA_CELL_SX, textAlign: "center" }}>
                    {item.stock} {item.unit}
                  </TableCell>
                  <TableCell sx={{ ...MONO_DATA_CELL_SX, textAlign: "right" }}>{item.price}</TableCell>
                  <TableCell sx={BODY_CELL_SX}>
                    <StatusChip
                      status={
                        item.status === "in-stock"
                          ? "active"
                          : item.status === "low-stock"
                            ? "flagged"
                            : "frozen"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionCard>
    </div>
  );
}
