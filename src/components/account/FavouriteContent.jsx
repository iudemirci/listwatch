import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";

import { useGetFavouriteItems } from "../../hooks/user/useGetFavouriteItems.js";
import Poster from "../Poster";
import LinkToId from "../../ui/LinkToId";
import FavouriteContentItem from "./FavouriteContentItem";

function FavouriteContent() {
  const { favouriteItems, isPending, isFetched } = useGetFavouriteItems();

  const filledFavourites = [...(favouriteItems ?? [])];
  while (filledFavourites?.length < 4) {
    filledFavourites.push(null);
  }

  return (
    <div className="flex w-full items-start gap-2 pt-2 lg:gap-3">
      {filledFavourites.map((movie, idx) => (
        <FavouriteContentItem key={idx} movie={movie} />
      ))}
      {/* <div className="group absolute inset-0 flex items-center justify-center before:absolute before:inset-0"></div> */}
    </div>
  );
}

export default FavouriteContent;
