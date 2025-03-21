import { mdiTextBoxEdit, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import PopupBlur from "../../ui/PopupBlur";
import StarRating from "../StarRating";
import Button from "../../ui/Button";

import { useDeleteItem } from "../../hooks/lists/useDeleteItem";
import toast from "react-hot-toast";
import Poster from "../Poster";

import { useUpdateRating } from "../../hooks/lists/useUpdateRating";
function AccountListItem({ item, edit, setEdit }) {
  const [IsPopupOpen, setIsPopupOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const { deleteItem, isPending: isDeleting } = useDeleteItem();
  const { updateRating, isPending: isUpdating } = useUpdateRating();

  function handleUpdateRating() {
    if (!rating) return setError("No rating given.");

    updateRating(
      { rating, id: item.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["listItems"]);
          toast.success(`Rating updated on ${item.title}`);
        },
        onError: () => {
          toast.error(
            `Something went wrong with updating rating of ${item.title}`,
          );
        },
      },
    );

    setIsPopupOpen("");
    setEdit(!edit);
  }

  return (
    <li className="outline-grey-primary/50 hover:outline-primary relative flex flex-col gap-1 rounded-lg outline-2 duration-300 hover:outline-2">
      <Link to={`/films/${item.itemID}`}>
        <Poster path={item.posterPath} />
      </Link>
      {!edit && (
        <span className="bg-primary/80 text-grey-secondary absolute top-1 right-1 flex size-5 items-center justify-center rounded-md text-sm font-black">
          {item.userRating}
        </span>
      )}

      {edit && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg bg-black/70">
          <Icon
            path={mdiTrashCan}
            size={1.3}
            className="text-primary cursor-pointer opacity-60 transition-all duration-300 hover:opacity-100"
            onClick={() =>
              deleteItem(item.id, {
                onSuccess: () => {
                  toast.success(`${item.title} deleted`);
                  queryClient.invalidateQueries(["listItems"]);
                },
                onError: () =>
                  toast.error(`${item.title} could not be deleted`),
              })
            }
          />
          <Icon
            path={mdiTextBoxEdit}
            size={1.3}
            className="text-grey-primary cursor-pointer opacity-60 transition-all duration-300 hover:opacity-100"
            onClick={() => setIsPopupOpen(!IsPopupOpen)}
          />
        </div>
      )}

      {IsPopupOpen && (
        <PopupBlur>
          <div className="bg-grey-secondary border-grey-primary flex flex-col items-center gap-2 rounded-lg border-2 p-4">
            {error && (
              <p className="bg-primary rounded-lg px-2 py-1 text-sm">{error}</p>
            )}
            <StarRating onSetRating={setRating} />
            <div className="flex gap-2">
              <Button onClick={() => handleUpdateRating()}>
                Update Rating
              </Button>
              <Button
                type="secondary"
                onClick={() => {
                  setError("");
                  setIsPopupOpen(!IsPopupOpen);
                }}
              >
                Discard
              </Button>
            </div>
          </div>
        </PopupBlur>
      )}
    </li>
  );
}

export default AccountListItem;

// currentItem === item.id &&
