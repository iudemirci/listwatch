import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch } from "react-redux";
import { openAddItemPopup, openSignupPopup } from "../store/popupSlice";
import { useGetLists } from "../hooks/lists/useGetLists";
import { useGetListItems } from "../hooks/lists/useGetListItems";
import { memo } from "react";

function WatchlistButton({ item }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { data: userLists } = useGetLists();
  const watchlist = userLists?.find((list) => list.listName === "Watchlist");
  const { data: watchlistItems } = useGetListItems(watchlist?.listID);
  const alreadyIncluded =
    watchlistItems?.filter((watchItem) => watchItem?.id === item?.id)?.length >
    0;

  function handleWatchlist(e, listName) {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      dispatch(openSignupPopup());
    }
    if (token && item) {
      dispatch(openAddItemPopup(listName, item));
    }
  }

  return (
    <button
      className={`mt-1 flex w-full cursor-pointer items-center justify-center gap-1 self-center rounded-lg py-1.5 pr-1 text-xs duration-300 focus:outline-0 ${
        alreadyIncluded
          ? "bg-grey-secondary/60 text-grey-primary-light/40 !cursor-not-allowed"
          : "bg-grey-secondary text-grey-primary-light hover:bg-primary hover:text-text-default"
      }`}
      onClick={(e) => handleWatchlist(e, "Watchlist")}
      disabled={alreadyIncluded}
    >
      <Icon path={mdiPlus} size={0.7} />
      Watchlist
    </button>
  );
}

export default memo(WatchlistButton);
