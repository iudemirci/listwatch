import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getVoteCounts,
  voteOnComment,
  deleteVote,
} from "../../../services/apiReview";

function ReviewVotes({ reviewID, userID }) {
  const queryClient = useQueryClient();
  const { data: votes, isVotesPending } = useQuery({
    queryKey: [`${reviewID}`, `votes`],
    queryFn: () => getVoteCounts(reviewID, userID),
  });

  const { mutate, isPending: isVotingPending } = useMutation({
    mutationKey: ["giveVote"],
    mutationFn: voteOnComment,
  });
  const { mutate: removeVote, isPending: isRemovingPending } = useMutation({
    mutationKey: ["deleteVote"],
    mutationFn: () => deleteVote(reviewID, userID),
    onSuccess: () => queryClient.invalidateQueries(["votes"]),
  });
  function handleVote(value) {
    if (isVotingPending || isRemovingPending) return;

    if (votes?.hasVoted && votes?.voteType === value) return removeVote();

    mutate(
      {
        reviewID: reviewID,
        userID: userID,
        vote: value,
      },
      { onSuccess: () => queryClient.invalidateQueries(["votes"]) },
    );
  }

  return (
    <div className="text-grey-primary flex gap-0.5 text-xs">
      <span
        className={`group flex cursor-pointer items-center ${votes?.hasVoted && votes?.voteType && "text-primary"}`}
        onClick={() => handleVote(true)}
      >
        <Icon
          path={mdiChevronUp}
          size={0.7}
          className="group-hover:text-primary duration-300"
        />
        {!votes?.thumbsUp ? "" : votes?.thumbsUp}
      </span>
      <span
        className={`group flex cursor-pointer items-center ${votes?.hasVoted && !votes?.voteType && "text-primary"}`}
        onClick={() => handleVote(false)}
      >
        <Icon
          path={mdiChevronDown}
          size={0.7}
          className="group-hover:text-primary duration-300"
        />
        {!votes?.thumbsDown ? "" : votes?.thumbsDown}
      </span>
    </div>
  );
}

export default ReviewVotes;
