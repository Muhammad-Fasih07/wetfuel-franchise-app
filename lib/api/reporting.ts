import type {
  CustomerReportRow,
  DriverReportRow,
  FranchiseeReport,
} from "../../types/reporting";

export async function getNetworkReport(
  range: string,
): Promise<FranchiseeReport[]> {
  // TODO: replace with real API call to fetch network report for the range.
  void range;
  return [];
}

export async function getFranchiseeReport(
  id: string,
): Promise<FranchiseeReport | null> {
  // TODO: replace with real API call to fetch a single franchisee report.
  void id;
  return null;
}

export async function fetchFranchiseeReport(
  franchiseeId: string,
): Promise<FranchiseeReport | null> {
  // TODO: replace with real API call to fetch a franchisee report.
  return getFranchiseeReport(franchiseeId);
}

export async function fetchCustomerReportRows(
  franchiseeId: string,
): Promise<CustomerReportRow[]> {
  // TODO: replace with real API call to fetch customer report rows.
  void franchiseeId;
  return [];
}

export async function fetchDriverReportRows(
  franchiseeId: string,
): Promise<DriverReportRow[]> {
  // TODO: replace with real API call to fetch driver report rows.
  void franchiseeId;
  return [];
}
