"use client";

import { useParams, useRouter } from "next/navigation";
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

const HEADER_CELL_SX = {
  background: "#fafafa",
  fontSize: "11px",
  fontWeight: 600,
  color: "#887b6a",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  borderBottom: "2px solid #e5e5e5",
  padding: "14px 20px",
  whiteSpace: "nowrap",
};

const BODY_CELL_SX = {
  fontSize: "13px",
  color: "#2b2b2b",
  borderBottom: "1px solid #f5f5f5",
  padding: "14px 20px",
};

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
  const router = useRouter();
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader
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

      <SectionCard
        bodyPadding="28px 32px"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(206,28,26,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 60%, #ffd2d2 100%)",
                  color: "#ce1c1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(206,28,26,0.25), inset 0 1px 0 rgba(255,255,255,0.7)",
                  border: "2px solid rgba(206,28,26,0.2)",
                }}
              >
                <StoreIcon sx={{ fontSize: 32 }} />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#2b2b2b",
                    margin: "0 0 4px 0",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {row.name}
                </h2>
                <StatusChip status={row.status} />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  border: "1.5px solid rgba(59,130,246,0.2)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(59,130,246,0.15)",
                    color: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <LocationIcon sx={{ fontSize: 20 }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#887b6a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Location
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#2b2b2b", marginTop: "2px" }}>
                    Houston, TX
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                  border: "1.5px solid rgba(34,197,94,0.2)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(34,197,94,0.15)",
                    color: "#22c55e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 20 }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#887b6a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Admin
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#2b2b2b", marginTop: "2px" }}>
                    John Martinez
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                  border: "1.5px solid rgba(245,158,11,0.2)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(245,158,11,0.15)",
                    color: "#f59e0b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <EmailIcon sx={{ fontSize: 20 }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#887b6a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Email
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#2b2b2b", marginTop: "2px" }}>
                    admin@alphafuel.com
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
                  border: "1.5px solid rgba(139,92,246,0.2)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(139,92,246,0.15)",
                    color: "#8b5cf6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 20 }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#887b6a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Phone
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#2b2b2b", marginTop: "2px" }}>
                    (713) 555-0142
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
                  border: "1.5px solid rgba(239,68,68,0.2)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(239,68,68,0.15)",
                    color: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CalendarIcon sx={{ fontSize: 20 }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#887b6a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Registered
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#2b2b2b", marginTop: "2px" }}>
                    Jan 15, 2024
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "200px" }}>
            <Button
              fullWidth
              startIcon={<EditIcon sx={{ fontSize: 18 }} />}
              onClick={() => router.push(`/franchisees/${row.id}`)}
            >
              Edit Details
            </Button>
            <div
              style={{
                background: row.status === "active" 
                  ? "linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(220,38,38,0.05) 100%)"
                  : "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(21,128,61,0.05) 100%)",
                borderRadius: "10px",
                border: row.status === "active" 
                  ? "1.5px solid rgba(239,68,68,0.3)"
                  : "1.5px solid rgba(34,197,94,0.3)",
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all 200ms ease",
                color: row.status === "active" ? "#dc2626" : "#15803d",
                fontWeight: 600,
                fontSize: "14px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = row.status === "active"
                  ? "0 4px 12px rgba(239,68,68,0.25)"
                  : "0 4px 12px rgba(34,197,94,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <FreezeIcon sx={{ fontSize: 18 }} />
              {row.status === "active" ? "Freeze Account" : "Unfreeze Account"}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard 
        title="Customers" 
        bodyPadding={0}
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
          border: "1px solid #e5e5e5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
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
                    "&:hover": { background: "#fafafa", transition: "background 0.2s ease" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>
                    {c.name}
                  </TableCell>
                  <TableCell sx={BODY_CELL_SX}>{c.location}</TableCell>
                  <TableCell sx={BODY_CELL_SX}>{c.margin}</TableCell>
                  <TableCell sx={{ ...BODY_CELL_SX, textAlign: "center" }}>{c.equipment}</TableCell>
                  <TableCell sx={{ ...BODY_CELL_SX, textAlign: "right" }}>{c.avgFuel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionCard>

      <SectionCard 
        title="Drivers" 
        bodyPadding={0}
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
          border: "1px solid #e5e5e5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
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
                    "&:hover": { background: "#fafafa", transition: "background 0.2s ease" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>
                    {d.name}
                  </TableCell>
                  <TableCell sx={{ ...BODY_CELL_SX, textAlign: "center" }}>{d.jobs}</TableCell>
                  <TableCell sx={{ ...BODY_CELL_SX, textAlign: "right" }}>{d.hours}</TableCell>
                  <TableCell sx={BODY_CELL_SX}>
                    <StatusChip status={d.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionCard>

      <SectionCard 
        title="Inventory" 
        bodyPadding={0}
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
          border: "1px solid #e5e5e5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
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
                    "&:hover": { background: "#fafafa", transition: "background 0.2s ease" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>
                    {item.product}
                  </TableCell>
                  <TableCell sx={BODY_CELL_SX}>{item.category}</TableCell>
                  <TableCell sx={{ ...BODY_CELL_SX, textAlign: "center" }}>
                    {item.stock} {item.unit}
                  </TableCell>
                  <TableCell sx={{ ...BODY_CELL_SX, textAlign: "right" }}>{item.price}</TableCell>
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
