import { useQuery } from "@tanstack/react-query";
import { getLists } from "../../services/apiList";

export function useGetLists(global = false) {
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const { data, isPending, isFetched } = useQuery({
    queryKey: ["user", "lists", global ? "global" : "personal"],
    queryFn: () => getLists(global),
    enabled: global ? true : !!isLoggedIn,
    staleTime: 10 * 60 * 1000,
  });

  return { isPending, data, isFetched };
}
