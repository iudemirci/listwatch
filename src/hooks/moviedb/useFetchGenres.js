import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "../../services/apiMoviedb";

export function useFetchGenres() {
  const { data, isPending } = useQuery({
    queryKey: ["movieDB", "genres"],
    queryFn: getMovieGenres,
  });

  return { data, isPending };
}
