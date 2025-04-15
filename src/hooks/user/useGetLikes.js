import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";

async function getLikes() {
  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;

  const { data: likes, error } = await supabase
    .from("likes")
    .select("*")
    .eq("userID", userID)
    .order("createdAt", { ascending: false });

  if (error) throw new Error("There was something wrong with getting likes");

  return likes;
}

export function useGetLikes() {
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const { data, isPending } = useQuery({
    queryKey: ["user", "likes"],
    queryFn: getLikes,
    enabled: !!isLoggedIn,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const shouldShowLoading = isLoggedIn && isPending;

  return { data, isPending: shouldShowLoading };
}
