import { useQuery } from "@tanstack/react-query";
import { getFavouriteItems } from "../../services/apiUser";

export function useGetFavouriteItems() {
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const {
    data: favouriteItems,
    isPending,
    isFetched,
  } = useQuery({
    queryKey: ["user", "favouriteItems"],
    queryFn: getFavouriteItems,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!isLoggedIn,
  });

  return { favouriteItems, isPending, isFetched };
}
