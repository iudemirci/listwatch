import { useMutation } from "@tanstack/react-query";
import { deleteFavouriteItem as deleteFavouriteItemApi } from "../../services/apiUser";

export function useDeleteFavouriteItem() {
  const { mutate: deleteFavouriteItem, isPending } = useMutation({
    mutationFn: deleteFavouriteItemApi,
  });

  return { deleteFavouriteItem, isPending };
}
