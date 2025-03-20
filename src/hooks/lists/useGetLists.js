import { useQuery } from "@tanstack/react-query";
import { getLists } from "../../services/apiList";

export function useGetLists() {
  const { isPending, data, isFetched } = useQuery({
    queryKey: ["lists"],
    queryFn: () => getLists(),
    initialData: [],
  });

  return { isPending, data, isFetched };
}
