import { useQuery } from "@tanstack/react-query";
import { getMovieItem } from "../../services/apiMoviedb";

export function useMovieDB(type, id, endpoint, options = {}) {
  return useQuery({
    queryKey: ["movieDB", type, id, endpoint].filter(Boolean),
    queryFn: () => getMovieItem(type, id, endpoint),
    enabled:
      typeof options.enabled !== "undefined"
        ? options.enabled
        : (() => {
            if (endpoint === "collection") return !!endpoint && !!id;
            if (endpoint === "release_dates") return !!type;
            return true;
          })(),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
  });
}
