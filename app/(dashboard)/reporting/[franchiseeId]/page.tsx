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
  Inventory as InventoryIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
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
  borderBottom: "1px solid #f0f0f0",
  padding: "12px 16px",
};

const BODY_CELL_SX = {
  fontSize: "13px",
  color: "#2b2b2b",
  borderBottom: "1px solid #f5f5f5",
  padding: "12px 16px",
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

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionCard title="Customers" bodyPadding={0}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={HEADER_CELL_SX}>Name</TableCell>
                    <TableCell sx={HEADER_CELL_SX}>Location</TableCell>
                    <TableCell sx={HEADER_CELL_SX}>Margin</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="center">Equipment</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="right">Avg Fuel</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CUSTOMER_ROWS.map((c) => (
                    <TableRow
                      key={c.name}
                      sx={{
                        "&:hover": { background: "#fafafa" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>
                        {c.name}
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX}>{c.location}</TableCell>
                      <TableCell sx={BODY_CELL_SX}>{c.margin}</TableCell>
                      <TableCell sx={BODY_CELL_SX} align="center">{c.equipment}</TableCell>
                      <TableCell sx={BODY_CELL_SX} align="right">{c.avgFuel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionCard title="Drivers" bodyPadding={0}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={HEADER_CELL_SX}>Name</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="center">Jobs</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="right">Hours</TableCell>
                    <TableCell sx={HEADER_CELL_SX}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DRIVER_ROWS.map((d) => (
                    <TableRow
                      key={d.name}
                      sx={{
                        "&:hover": { background: "#fafafa" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>
                        {d.name}
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX} align="center">{d.jobs}</TableCell>
                      <TableCell sx={BODY_CELL_SX} align="right">{d.hours}</TableCell>
                      <TableCell sx={BODY_CELL_SX}>
                        <StatusChip status={d.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionCard title="Inventory" bodyPadding={0}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={HEADER_CELL_SX}>Product</TableCell>
                    <TableCell sx={HEADER_CELL_SX}>Category</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="center">Stock</TableCell>
                    <TableCell sx={HEADER_CELL_SX} align="right">Price</TableCell>
                    <TableCell sx={HEADER_CELL_SX}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {INVENTORY_ROWS.map((item) => (
                    <TableRow
                      key={item.product}
                      sx={{
                        "&:hover": { background: "#fafafa" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell sx={{ ...BODY_CELL_SX, fontWeight: 500 }}>
                        {item.product}
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX}>{item.category}</TableCell>
                      <TableCell sx={BODY_CELL_SX} align="center">
                        {item.stock} {item.unit}
                      </TableCell>
                      <TableCell sx={BODY_CELL_SX} align="right">{item.price}</TableCell>
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
        </Grid>
      </Grid>
    </div>
  );
}
