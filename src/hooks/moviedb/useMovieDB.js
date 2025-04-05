import { useQuery } from "@tanstack/react-query";
import { getMovieItem } from "../../services/apiMoviedb";

export function useMovieDB(type, id, endpoint) {
  return useQuery({
    queryKey: ["movieDB", type, id, endpoint].filter(Boolean),
    queryFn: () => getMovieItem(type, id, endpoint),
    enabled: () => {
      if (endpoint === "collection") return !!endpoint && !!id;
      if (endpoint === "release_dates") return !!type;
    },
    staleTime: 60 * 1000 * 5,
  });
}
