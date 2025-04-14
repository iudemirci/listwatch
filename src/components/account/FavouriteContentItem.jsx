import { mdiPlusBoxOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";

import LinkToId from "../../ui/LinkToId";
import Poster from "../Poster";
import { useDeleteFavouriteItem } from "../../hooks/user/useDeleteFavouriteItem";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function FavouriteContentItem({ movie }) {
  const { deleteFavouriteItem, isPending } = useDeleteFavouriteItem();
  const queryClient = useQueryClient();

  function handleDelete() {
    deleteFavouriteItem(movie?.id, {
      onSuccess: () => {
        toast.dismiss();
        toast.success(`${movie?.title || movie?.name} removed from favourites`);
        queryClient.invalidateQueries(["user", "favouriteItems"]);
      },
    });
  }

  return movie ? (
    <div className="group flex-1 rounded-lg">
      <LinkToId item={movie} type={movie?.type}>
        <Poster path={movie?.poster_path} />
      </LinkToId>

      <button
        className={`bg-grey-secondary text-grey-primary-light hover:bg-primary hover:text-text-default mt-2 flex w-full cursor-pointer items-center justify-center gap-1 self-center rounded-lg py-1.5 pr-1 text-xs duration-300 focus:outline-0 sm:opacity-0 sm:group-hover:opacity-100 ${isPending && "bg-grey-secondary/60 text-grey-primary-light/60"}`}
        onClick={handleDelete}
        disabled={isPending}
      >
        Remove
      </button>
    </div>
  ) : (
    <div className="border-grey-primary/50 group bg-grey-secondary hover:border-text-default aspect-2/3 flex-1 cursor-pointer rounded-lg border-1 duration-300">
      <Link
        to="/discover"
        className="flex size-full items-center justify-center"
      >
        <Icon
          path={mdiPlusBoxOutline}
          size={1}
          className="text-grey-primary/50 group-hover:text-text-default duration-300"
        />
      </Link>
    </div>
  );
}

export default FavouriteContentItem;
