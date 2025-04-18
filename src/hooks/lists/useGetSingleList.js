import { useQuery } from "@tanstack/react-query";
import { getSingleList } from "../../services/apiList";

export function useGetSingeList(id) {
  const { data, isPending, isFetched, isError } = useQuery({
    queryKey: ["app", "list", id],
    queryFn: () => getSingleList(id),
    retry: false,
  });
  return { data, isPending, isFetched, isError };
}
