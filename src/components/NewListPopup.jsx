import toast from "react-hot-toast";
import Icon from "@mdi/react";
import { mdiCloseBox } from "@mdi/js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateList } from "../hooks/lists/useCreateList";
import { useGetLists } from "../hooks/lists/useGetLists";

import Button from "../ui/Button";
import Title from "../ui/Title";
import PopupBlur from "../ui/PopupBlur";

function NewListPopup({ handlePopup }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { createList, isPending: isCreatingPending } = useCreateList();
  const { data: lists, isPending: isListsPending } = useGetLists();

  function onSubmit(list) {
    if (!list.listName) return setError("You need to give a name to your list");

    if (lists.filter((l) => l.listName === list.listName).length)
      return setError("You already have a list with the same name");

    createList(list, {
      onSuccess: () => {
        toast.success("List created successfully");
        handlePopup();
      },
      onError: () => toast.error("Something went wrong creating the list"),
    });
  }

  return (
    <PopupBlur>
      <div className="bg-grey-secondary/90 flex w-[90%] flex-col gap-2 rounded-lg px-3 py-4">
        <div className="flex items-center justify-between">
          <Title level={3}>Create new list</Title>
          <Icon
            path={mdiCloseBox}
            size={1.3}
            className="text-primary cursor-pointer"
            onClick={() => handlePopup()}
          />
        </div>
        <form
          className="flex flex-col items-start gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="My Custom List"
            className="bg-text-default text-background-default w-50 rounded-lg px-2 py-1 text-sm"
            {...register("listName")}
          />
          {error && (
            <p className="bg-primary rounded-lg px-2 py-1 text-sm">{error}</p>
          )}
          <Button className={"self-start"}>Create</Button>
        </form>
      </div>
    </PopupBlur>
  );
}

export default NewListPopup;
