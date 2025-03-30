import supabase from "./supabase";

export async function getReviews(movieID) {
  let { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("movieID", movieID);

  return data;
}

export async function deleteReview(reviewID, userID) {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("reviewID", reviewID)
    .eq("userID", userID);
  if (error) {
    console.error("Error deleting review:", error);
  }
  return;
}
export async function updateReview(info) {
  const { error } = await supabase
    .from("reviews")
    .update(info)
    .eq("reviewID", info.reviewID);
  if (error) {
    console.error("Error deleting review:", error);
  }
  return;
}

export async function voteOnComment(info) {
  const { error } = await supabase.from("votes").upsert(info, {
    onConflict: ["userID", "reviewID"],
  });

  if (error) {
    console.error("Error upserting vote:", error);
    return;
  }
}

export async function getVoteCounts(reviewID, userID) {
  const { data } = await supabase
    .from("votes")
    .select("vote, userID")
    .eq("reviewID", reviewID);

  const thumbsUp = data.filter((vote) => vote.vote === true).length;
  const thumbsDown = data.filter((vote) => vote.vote === false).length;

  const userVote = data.find((vote) => vote.userID === userID);
  const hasVoted = !!userVote;
  const voteType = userVote?.vote ?? null;

  return { thumbsUp, thumbsDown, hasVoted, voteType };
}

export async function deleteVote(reviewID, userID) {
  const { error } = await supabase
    .from("votes")
    .delete()
    .eq("reviewID", reviewID)
    .eq("userID", userID);
}
