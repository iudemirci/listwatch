import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../services/apiReview";

export function useReadReviews(movieID) {
  const { data, isPending } = useQuery({
    queryKey: ["supabase", movieID, "reviews"],
    queryFn: () => getReviews(movieID),
    enabled: !!movieID,
  });
  return { data, isPending };
}
