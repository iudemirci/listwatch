import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import toast from "react-hot-toast";

import Button from "../ui/Button";

import { useQueryClient } from "@tanstack/react-query";
import { useUpdateFavouriteItem } from "../hooks/user/useUpdateFavouriteItem";
import Spinner from "../ui/Spinner";
import { useGetUser } from "../hooks/auth/useGetUser";

function SetFavourite({ item }) {
  const queryClient = useQueryClient();
  const { user } = useGetUser() || [];
  const userID = user?.id || "";

  const { updateFavouriteItem, isUpdatePending } = useUpdateFavouriteItem();

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
    updateFavouriteItem({ userID, i }, toastMessage());
  }

  return (
    <Button
      type="secondary"
      className={"flex items-center gap-0.5"}
      onClick={() => handleClick(item)}
    >
      {isUpdatePending ? <Spinner /> : <Icon path={mdiStar} size={0.89} />}
      Set favourite
    </Button>
  );
}

export default SetFavourite;
