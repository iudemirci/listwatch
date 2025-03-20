import { useMutation } from "@tanstack/react-query";
import { updateRating as updateRatingApi } from "../../services/apiList";

export function useUpdateRating() {
  const { mutate: updateRating, isPending } = useMutation({
    mutationFn: ({ rating, id }) => updateRatingApi(rating, id),
  });

  return { updateRating, isPending };
}
