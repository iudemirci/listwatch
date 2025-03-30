import { mdiCloseBox } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "../../ui/Button";
import Title from "../../ui/Title";
import PopupBlur from "../../ui/PopupBlur";
import Poster from "../Poster";
import StarRating from "../StarRating";
import { useState } from "react";
import { useAddItemToList } from "../../hooks/lists/useAddItemToList";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetListItems } from "../../hooks/lists/useGetListItems";

function AddItemPopup({ handlePopup, item }) {
  const [rating, setRating] = useState();
  const [error, setError] = useState("");

  const selectedList = useSelector((state) => state.user.selectedList);
  const { addItem, isPending: isAddingPending } = useAddItemToList();
  const { data: listItems, isPending: isListItemsPending } = useGetListItems(
    selectedList.id,
  );

  function onSubmit() {
    if (!rating) return setError("You need to give a rating");

    if (listItems.filter((i) => Number(i.itemID) === item.id).length)
      return setError(
        `You already have ${item.title} in ${selectedList.listName}`,
      );

    addItem(
      {
        itemID: item.id,
        listID: selectedList.id,
        title: item.title,
        userRating: rating,
        posterPath: item.poster_path,
        type: "movie",
      },
      {
        onSuccess: () => {
          toast.success(`${item.title} added to ${selectedList.listName}`);
          handlePopup();
        },

        onError: () =>
          toast.error(
            `${item.title} could not be added to ${selectedList.listName}`,
          ),
      },
    );
  }

  return (
    <PopupBlur>
      <div className="bg-grey-secondary/90 flex w-[90%] flex-col gap-2 rounded-lg px-3 py-4">
        <div className="flex items-center justify-between">
          <Title level={3}>To {selectedList.listName}</Title>
          <Icon
            path={mdiCloseBox}
            size={1.3}
            className="text-primary cursor-pointer"
            onClick={() => handlePopup()}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-4">
          <div className="flex flex-col items-center gap-2">
            <Poster path={item.poster_path} />
            <Button onClick={() => onSubmit()}>Add to list</Button>
          </div>
          <div className="col-span-2 flex flex-col items-start gap-4">
            <Title level={2}>{item.title}</Title>
            <StarRating onSetRating={setRating} />
            {error && (
              <p className="bg-primary rounded-lg px-2 py-1 text-sm">{error}</p>
            )}
          </div>
        </div>
      </div>
    </PopupBlur>
  );
}

export default AddItemPopup;
