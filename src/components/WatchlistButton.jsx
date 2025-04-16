import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch } from "react-redux";
import { openAddItemPopup, openSignupPopup } from "../store/popupSlice";
import { memo } from "react";

function WatchlistButton({ item }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  function handleWatchlist(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      dispatch(openSignupPopup());
    }
    if (token && item) {
      dispatch(openAddItemPopup(item));
    }
  }

  return (
    <button
      className={`bg-grey-secondary text-grey-primary-light hover:bg-primary hover:text-text-default mt-1 flex w-full cursor-pointer items-center justify-center gap-1 self-center rounded-lg py-1.5 pr-1 text-xs duration-300 focus:outline-0`}
      onClick={handleWatchlist}
    >
      <Icon path={mdiPlus} size={0.7} />
      Watchlist
    </button>
  );
}

export default memo(WatchlistButton);
