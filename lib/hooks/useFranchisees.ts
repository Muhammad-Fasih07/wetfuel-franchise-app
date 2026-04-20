import { useQuery } from "@tanstack/react-query";
import { fetchFranchisees } from "../api/franchisees";

export function useFranchisees() {
  return useQuery({
    queryKey: ["franchisees"],
    queryFn: fetchFranchisees,
  });
}
