import { useMutation } from "@tanstack/react-query";
import supabase from "../../services/supabase";

export function useInsertReviews() {
  const { mutate } = useMutation({
    mutationKey: ["insertReviews"],
    mutationFn: async (reviews) => {
      if (!reviews || reviews.length === 0) return;

      const { data, error } = await supabase
        .from("reviews")
        .upsert(reviews, { onConflict: ["reviewID"] });

      if (error) throw error;
      return data;
    },
  });
  return { mutate };
}
