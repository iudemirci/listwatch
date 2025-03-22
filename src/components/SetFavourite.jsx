import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import toast from "react-hot-toast";

import Button from "../ui/Button";

import { useQueryClient } from "@tanstack/react-query";
import { useGetFavouriteItem } from "../hooks/user/useGetFavouriteItem";
import { useSetFavouriteItem } from "../hooks/user/useSetFavouriteItem";
import { useUpdateFavouriteItem } from "../hooks/user/useUpdateFavouriteItem";

function SetFavourite({ item }) {
  const queryClient = useQueryClient();
  const { setFavouriteItem, isSetPending } = useSetFavouriteItem();
  const { updateFavouriteItem, isUpdatePending } = useUpdateFavouriteItem();
  const { favouriteItem, isPending: isFavouritePending } =
    useGetFavouriteItem();

  function handleClick(i) {
    function toastMessage() {
      return {
        onSuccess: () => {
          toast.success(`${item.title || item.name} set as favourite`);
          queryClient.invalidateQueries(["favouriteItem"]);
        },
        onError: () =>
          toast.error(
            `${item.title || item.name} could not be set as favourite`,
          ),
      };
    }

    if (!favouriteItem.length) setFavouriteItem(i, toastMessage());
    if (favouriteItem.length) updateFavouriteItem(i, toastMessage());
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
