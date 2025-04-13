import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";

const token = localStorage.getItem("token");
const isLoggedIn = Boolean(token);

async function getLikes() {
  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;

  const { data: likes, error } = await supabase
    .from("likes")
    .select("*")
    .eq("userID", userID);

  if (error) throw new Error("There was something wrong with getting likes");

  return likes;
}

export function useGetLikes() {
  const { data, isPending } = useQuery({
    queryKey: ["user", "likes"],
    queryFn: getLikes,
    enabled: !!isLoggedIn,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  return { data, isPending };
}
