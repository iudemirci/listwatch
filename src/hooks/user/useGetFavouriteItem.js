import { useQuery } from "@tanstack/react-query";
import { getFavouriteItem as getFavouriteItemApi } from "../../services/apiUser";

export function useGetFavouriteItem() {
  const { data: favouriteItem, isPending } = useQuery({
    queryKey: ["favouriteItem"],
    queryFn: getFavouriteItemApi,
  });

  return { favouriteItem, isPending };
}
