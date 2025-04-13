import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";

async function insertLike(item) {
  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;

  if (!userID) throw new Error("User not authenticated");

  const { data: existingItem, error: fetchError } = await supabase
    .from("likes")
    .select("id")
    .eq("userID", userID)
    .eq("id", item.id)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);

  if (existingItem) {
    const { error: deleteError } = await supabase
      .from("likes")
      .delete()
      .eq("userID", userID)
      .eq("id", item.id);

    toast.dismiss();
    if (deleteError) return toast.error("Failed to remove like");
    toast.success(`${item.title || item.name} removed from likes`);
  } else {
    const { insertError } = await supabase.from("likes").upsert([item], {
      onConflict: "userID,id",
    });

    if (insertError) return toast.error("Failed to like");
    toast.success(`${item.title || item.name} liked`);
  }
}

export function useLike() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["user", "like"],
    mutationFn: insertLike,
  });

  return { mutate, isPending };
}
