import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

import { useQueryClient } from "@tanstack/react-query";
import { useSetFavouriteItem } from "../hooks/user/useSetFavouriteItem";

function SetFavourite({ item }) {
  const queryClient = useQueryClient();

  const { setFavouriteItem, isPending } = useSetFavouriteItem();

  function handleClick(item) {
    function toastMessage() {
      return {
        onSuccess: () => {
          queryClient.invalidateQueries(["user", "setFavourite"]);
        },
        onError: (e) => toast.error(e.message),
      };
    }
    setFavouriteItem(item, toastMessage());
  }

  return (
    <Button
      type="secondary"
      className={"flex items-center gap-0.5"}
      onClick={() => handleClick(item)}
      disabled={isPending}
    >
      <Icon path={mdiStar} size={0.89} />
      Set favourite
    </Button>
  );
}

export default SetFavourite;
