import { useQuery } from "@tanstack/react-query";
import { getListItems as getListItemsApi } from "../../services/apiList";

export function useGetListItems(id) {
  const { data, isPending } = useQuery({
    queryKey: ["listItems", id],
    queryFn: () => getListItemsApi(id),
  });

  return { data, isPending };
}
