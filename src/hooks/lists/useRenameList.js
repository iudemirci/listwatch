import { useMutation } from "@tanstack/react-query";
import { updateListName } from "../../services/apiList";

export function useRenameList() {
  const { mutate: renameList, isPending } = useMutation({
    mutationFn: ({ id, newName }) => updateListName(id, newName),
  });
  return { renameList, isPending };
}
