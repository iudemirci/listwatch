import { useQuery } from "@tanstack/react-query";
import { getMovieItem } from "../../services/apiMoviedb";

export function useFetchMovieItem(url, id) {
  const { data, isPending } = useQuery({
    queryKey: ["movieDB", id],
    queryFn: () => getMovieItem(url),
  });

  return { data, isPending };
}
