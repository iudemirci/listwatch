import Skeleton from "../../ui/Skeleton.jsx";
import FavouriteContentItem from "./FavouriteContentItem";

function FavouriteContent({ favouriteItems, isPending }) {
  const filledFavourites = [...(favouriteItems ?? [])];
  while (filledFavourites?.length < 4) {
    filledFavourites.push(null);
  }

  return (
    <div className="flex w-full items-start gap-2 pt-2 lg:gap-3">
      {isPending
        ? [...Array(4)].map((_, idx) => (
            <Skeleton key={idx} className="aspect-2/3" />
          ))
        : filledFavourites.map((movie, idx) => (
            <FavouriteContentItem key={idx} movie={movie} />
          ))}
    </div>
  );
}

export default FavouriteContent;
