import { debounce } from "lodash";
import { mdiHeart } from "@mdi/js";
import Icon from "@mdi/react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useGetLikes } from "../hooks/user/useGetLikes";
import { useLike } from "../hooks/user/useLike";
import Spinner from "../ui/Spinner";

function PosterLike({ item }) {
  const queryClient = useQueryClient();
  const { mutate, isPending: isLikingPending } = useLike();
  const { data: likes, isPending: isLikesPending } = useGetLikes();
  const isLiked = likes?.filter((like) => like?.id === item?.id)?.length > 0;
  function handleClick(e) {
    e.preventDefault();

    debounce(() => {
      mutate(
        {
          id: item?.id,
          title: item?.title || item?.name,
          poster_path: item?.poster_path,
        },
        {
          onSettled: () => {
            queryClient.invalidateQueries(["user", "likes"]);
          },
        },
      );
    }, 300)();
  }

  return (
    <div className={`z-2 flex cursor-pointer items-center justify-center`}>
      {isLikesPending || isLikingPending ? (
        <div className="mt-2 mr-1">
          <Spinner />
        </div>
      ) : (
        <Icon
          path={mdiHeart}
          size={0.9}
          className={`duration-300 ${isLiked ? "text-primary hover:text-grey-primary/50" : "text-grey-primary/50 hover:text-primary"}`}
          onClick={handleClick}
        />
      )}
    </div>
  );
}

export default PosterLike;
