import { useMutation } from "@tanstack/react-query";
import { updateReview } from "../../services/apiReview";

export function useUpdateReview() {
  const { mutate } = useMutation({
    mutationKey: ["updateReview"],
    mutationFn: (info) => updateReview(info),
  });

  return { mutate };
}
