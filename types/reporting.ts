export interface FranchiseeReport {
  franchiseeId: string;
  customerCount: number;
  driverCount: number;
  truckCount: number;
  avgFuelDeliveredPerMonth: number;
}

export interface CustomerReportRow {
  customerName: string;
  location: string;
  margins: number;
  equipmentCount: number;
  avgFuelPerMonth: number;
}

export interface DriverReportRow {
  driverCount: number;
  truckCount: number;
}
