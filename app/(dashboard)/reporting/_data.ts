// TODO: replace with real reporting data from lib/api/reporting.ts

import type { StatusChipKind } from "@/components/ui/StatusChip";

export interface FranchiseePerformanceRow {
  id: string;
  name: string;
  customers: number;
  drivers: number;
  fuel: string;
  fuelGal: number;
  jobs: number;
  avgJobTime: string;
  driverHrs: string;
  status: Extract<StatusChipKind, "active" | "frozen">;
}

export const PERFORMANCE_ROWS: FranchiseePerformanceRow[] = [
  { id: "1", name: "AlphaFuel Co.", customers: 84, drivers: 6, fuel: "8,200 gal", fuelGal: 8200, jobs: 342, avgJobTime: "1h 12m", driverHrs: "1,240 hrs", status: "active" },
  { id: "2", name: "PrimeFuel LLC", customers: 62, drivers: 4, fuel: "6,100 gal", fuelGal: 6100, jobs: 261, avgJobTime: "1h 05m", driverHrs: "920 hrs", status: "active" },
  { id: "3", name: "SouthFuel Inc.", customers: 45, drivers: 3, fuel: "4,800 gal", fuelGal: 4800, jobs: 198, avgJobTime: "58m", driverHrs: "710 hrs", status: "active" },
  { id: "4", name: "NorthFuel Ltd.", customers: 38, drivers: 3, fuel: "3,900 gal", fuelGal: 3900, jobs: 156, avgJobTime: "1h 02m", driverHrs: "580 hrs", status: "frozen" },
  { id: "5", name: "WestEnd Fuel", customers: 29, drivers: 2, fuel: "2,600 gal", fuelGal: 2600, jobs: 114, avgJobTime: "55m", driverHrs: "390 hrs", status: "active" },
  { id: "6", name: "Gulf Fuel Co.", customers: 21, drivers: 2, fuel: "1,900 gal", fuelGal: 1900, jobs: 89, avgJobTime: "52m", driverHrs: "280 hrs", status: "active" },
  { id: "7", name: "EastStar Fuel", customers: 17, drivers: 1, fuel: "1,400 gal", fuelGal: 1400, jobs: 64, avgJobTime: "50m", driverHrs: "210 hrs", status: "active" },
  { id: "8", name: "TexLine Fuel", customers: 12, drivers: 1, fuel: "980 gal", fuelGal: 980, jobs: 43, avgJobTime: "48m", driverHrs: "140 hrs", status: "frozen" },
];

export function getPerformanceRowById(id: string) {
  return PERFORMANCE_ROWS.find((r) => r.id === id);
}
