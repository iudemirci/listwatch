import { useMutation } from "@tanstack/react-query";
import { deleteItem as deleteItemApi } from "../../services/apiList";

export function useDeleteItem() {
  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: deleteItemApi,
  });
  return { deleteItem, isPending };
}
