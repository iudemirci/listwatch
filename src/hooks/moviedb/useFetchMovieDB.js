import { useQuery } from "@tanstack/react-query";
import { getMovieDB } from "../../services/apiMoviedb";

export function useFetchMovieDB(url, id) {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["movieDB", id],
    queryFn: () => getMovieDB(url),
  });

  return { data, isPending, refetch };
}
