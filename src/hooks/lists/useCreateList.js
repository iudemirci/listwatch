import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createList as createListApi } from "../../services/apiList";

export function useCreateList() {
  const queryClient = useQueryClient();
  const { mutate: createList, isPending } = useMutation({
    mutationFn: createListApi,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["user", "lists"],
      }),
  });

  return { isPending, createList };
}
