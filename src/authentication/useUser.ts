import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";
import { User } from "../types/type";

export function useUser() {
  const {
    isPending,
    data: userData,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const user = userData as User | null;



  const isAuthenticated = user?.role === "authenticated";

  return { isPending, user, isAuthenticated, fetchStatus };
}
