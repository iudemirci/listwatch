import { useMutation } from "@tanstack/react-query";
import { addItemToList } from "../../services/apiList";
import toast from "react-hot-toast";

export function useAddItemToList() {
  const { isPending, mutate: addItem } = useMutation({
    mutationFn: addItemToList,
  });

  return { addItem, isPending };
}
