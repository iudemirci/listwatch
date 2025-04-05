import { useQuery } from "@tanstack/react-query";
import { getLastVisited } from "../../services/apiUser";

export function useGetLastVisited(userID) {
  const { data, isPending } = useQuery({
    queryKey: ["lastVisited"],
    queryFn: () => getLastVisited(userID),
    enabled: !!userID,
  });
  return { data, isPending };
}
