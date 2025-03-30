import { useQuery } from "@tanstack/react-query";
import { getFavouriteItem as getFavouriteItemApi } from "../../services/apiUser";

export function useGetFavouriteItem(id) {
  const {
    data: favouriteItem,
    isPending,
    isFetched,
  } = useQuery({
    queryKey: ["favouriteItem"],
    queryFn: () => getFavouriteItemApi(id),
  });

  return { favouriteItem, isPending, isFetched };
}
