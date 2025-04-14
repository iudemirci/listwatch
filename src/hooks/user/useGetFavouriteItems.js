import { useQuery } from "@tanstack/react-query";
import { getFavouriteItems } from "../../services/apiUser";

export function useGetFavouriteItems() {
  const {
    data: favouriteItems,
    isPending,
    isFetched,
  } = useQuery({
    queryKey: ["user", "favouriteItems"],
    queryFn: getFavouriteItems,
  });

  return { favouriteItems, isPending, isFetched };
}
