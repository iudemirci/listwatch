import { useMutation } from "@tanstack/react-query";
import { addItemToList } from "../../services/apiList";

export function useAddItemToList() {
  const {
    isPending,
    mutate: addItem,
    error,
  } = useMutation({
    mutationFn: addItemToList,
  });

  return { addItem, isPending, error };
}
