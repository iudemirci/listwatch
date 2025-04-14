import { useMutation } from "@tanstack/react-query";
import { setFavouriteItem as setFavouriteItemApi } from "../../services/apiUser";

export function useSetFavouriteItem() {
  const { mutate: setFavouriteItem, isPending } = useMutation({
    mutationFn: setFavouriteItemApi,
  });

  return { setFavouriteItem, isPending };
}
