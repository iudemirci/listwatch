import { useMutation } from "@tanstack/react-query";
import { updateFavouriteItem as updateFavouriteItemApi } from "../../services/apiUser";

export function useUpdateFavouriteItem() {
  const { mutate: updateFavouriteItem, isPending } = useMutation({
    mutationFn: updateFavouriteItemApi,
  });

  return { updateFavouriteItem, isPending };
}
