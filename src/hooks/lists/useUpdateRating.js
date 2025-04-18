import { useMutation } from "@tanstack/react-query";
import { updateRating as updateRatingApi } from "../../services/apiList";

export function useUpdateRating() {
  const { mutate: updateRating, isPending } = useMutation({
    mutationFn: ({ rating, uuid }) => updateRatingApi(rating, uuid),
  });

  return { updateRating, isPending };
}
