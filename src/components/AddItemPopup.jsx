import { mdiCloseBox } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "../ui/Button";
import Title from "../ui/Title";
import { useDispatch, useSelector } from "react-redux";
import PopupBlur from "../pages/PopupBlur";
import { addToList, getCurrentListIds } from "./user/userSlice";
import Poster from "./Poster";
import StarRating from "./StarRating";
import { useState } from "react";

function AddItemPopup({ handlePopup, item, listName }) {
  const currList = useSelector(getCurrentListIds(listName, item.id));
  console.log(currList);
  const [rating, setRating] = useState();
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  function onSubmit() {
    if (currList.length > 0)
      return setError("You already have this item in this list.");

    dispatch(
      addToList(listName, item.id, item.poster_path, rating, item.title),
    );
    handlePopup("");
  }

  return (
    <PopupBlur>
      <div className="bg-grey-secondary/90 flex w-[90%] flex-col gap-2 rounded-lg px-3 py-4">
        <div className="flex items-center justify-between">
          <Title level={3}>To {listName}</Title>
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
          <div className="col-span-2 flex flex-col gap-4">
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
