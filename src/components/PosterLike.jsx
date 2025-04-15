import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { mdiHeart } from "@mdi/js";
import Icon from "@mdi/react";
import { useQueryClient } from "@tanstack/react-query";

import { useGetLikes } from "../hooks/user/useGetLikes";
import { useLike } from "../hooks/user/useLike";
import { openSignupPopup } from "../store/popupSlice";

function PosterLike({ item }) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { mutate, isPending: isLikingPending } = useLike();
  const { data: likes, isPending: isLikesPending } = useGetLikes();

  const isLiked = likes?.filter((like) => like?.id === item?.id)?.length > 0;

  function handleClick(e) {
    e.preventDefault();
    if (!token) {
      dispatch(openSignupPopup());
    } else if (token) {
      debounce(() => {
        mutate(
          {
            id: item?.id,
            title: item?.title || item?.name,
            poster_path: item?.poster_path,
            type:
              ((item.type === "movie" || item.type === "tv") && item.type) ||
              (item?.release_date || item?.release_date === ""
                ? "movie"
                : "tv"),
          },
          {
            onSettled: () => {
              queryClient.invalidateQueries(["user", "likes"]);
            },
          },
        );
      }, 300)();
    }
  }

  return (
    <div className={`z-2 flex cursor-pointer items-center justify-center`}>
      <Icon
        path={mdiHeart}
        size={0.9}
        className={`duration-300 ${isLiked ? "text-primary hover:text-grey-primary/50" : "text-grey-primary/50 hover:text-primary"}`}
        onClick={handleClick}
      />
    </div>
  );
}

export default PosterLike;
