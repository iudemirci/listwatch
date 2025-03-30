import { useQuery } from "@tanstack/react-query";
import { getSearchData } from "../../services/apiMoviedb";

export function useSearchData(searchTerm, options) {
  const { data, isPending } = useQuery({
    queryKey: ["movieDB", `search_${searchTerm}`],
    queryFn: () => getSearchData(searchTerm),
    enabled: options.enabled ?? !!searchTerm,
    ...options,
  });

  return { data, isPending };
}
