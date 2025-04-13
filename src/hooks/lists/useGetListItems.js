import { useQuery } from "@tanstack/react-query";
import { getListItems as getListItemsApi } from "../../services/apiList";

const token = localStorage.getItem("token");
const isLoggedIn = Boolean(token);

export function useGetListItems(id) {
  const { data, isPending } = useQuery({
    queryKey: ["userListItems", id],
    queryFn: () => getListItemsApi(id),
    enabled: !!isLoggedIn && !!id,
  });

  return { data, isPending };
}
