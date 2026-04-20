import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api/auth";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "session-user"],
    queryFn: fetchCurrentUser,
  });
}
