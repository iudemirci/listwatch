import { useQuery } from "@tanstack/react-query";
import { getLists } from "../../services/apiList";

const token = localStorage.getItem("token");
const isLoggedIn = Boolean(token);

export function useGetLists() {
  const { isPending, data, isFetched } = useQuery({
    queryKey: ["user", "lists"],
    queryFn: () => getLists(),
    initialData: [],
    enabled: !!isLoggedIn,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { isPending, data, isFetched };
}
