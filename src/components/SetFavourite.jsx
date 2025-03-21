import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { SetFavouriteItem } from "../store/userSlice";
import toast from "react-hot-toast";
import { useSetFavouriteItem } from "../hooks/user/useSetFavouriteItem";

function SetFavourite({ item }) {
  const dispatch = useDispatch();
  const { setFavouriteItem, isPending } = useSetFavouriteItem();

  function handleClick(i) {
    // dispatch(SetFavouriteItem(i));

    setFavouriteItem(i, {
      onSuccess: () =>
        toast.success(`${item.title || item.name} set as favourite`),
      onError: () =>
        toast.error(`${item.title || item.name} could not be set as favourite`),
    });
  }

  return (
    <Button
      type="secondary"
      className={"flex gap-0.5"}
      onClick={() => handleClick(item)}
    >
      <Icon path={mdiStar} size={0.89} />
      Set favourite
    </Button>
  );
}

export default SetFavourite;
