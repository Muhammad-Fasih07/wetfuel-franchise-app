import { useQuery } from "@tanstack/react-query";
import { fetchFranchiseeReport } from "../api/reporting";

export function useReporting(franchiseeId: string) {
  return useQuery({
    queryKey: ["reporting", franchiseeId],
    queryFn: () => fetchFranchiseeReport(franchiseeId),
    enabled: Boolean(franchiseeId),
  });
}
