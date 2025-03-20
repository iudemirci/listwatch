import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUser";

export function useGetUser() {
  const {
    isPending,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { user, error, isPending };
}
