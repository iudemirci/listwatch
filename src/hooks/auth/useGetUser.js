import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/apiUser";

export function useGetUser() {
  const token = localStorage.getItem("token");

  const {
    isPending,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!token,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return { user, error, isPending };
}
