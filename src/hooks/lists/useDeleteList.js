import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletelist as deleteListApi } from "../../services/apiList";

export function useDeleteList() {
  const { mutate: deleteList, isPending } = useMutation({
    mutationFn: deleteListApi,
  });

  return { deleteList, isPending };
}
