import { useMutation } from "@tanstack/react-query";
import { deleteReview } from "../../services/apiReview";

export function useDeleteReview() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteReview"],
    mutationFn: ({ reviewID, userID }) => deleteReview(reviewID, userID),
  });
  return { mutate, isPending };
}
