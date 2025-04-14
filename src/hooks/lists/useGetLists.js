import { useQuery } from "@tanstack/react-query";
import { getLists } from "../../services/apiList";

export function useGetLists() {
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const { isPending, data, isFetched } = useQuery({
    queryKey: ["user", "lists"],
    queryFn: getLists,
    initialData: [],
    enabled: !!isLoggedIn,
  });

  return { isPending, data, isFetched };
}
