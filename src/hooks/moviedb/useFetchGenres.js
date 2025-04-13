import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "../../services/apiMoviedb";

export function useFetchGenres(id) {
  const { data, isPending } = useQuery({
    queryKey: ["movieDB", "movie", id, "genres"],
    queryFn: getMovieGenres,
    enabled: !!id,
  });

  return { data, isPending };
}
