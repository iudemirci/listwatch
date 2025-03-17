import { mdiCloseBox } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import Title from "../ui/Title";
import { useDispatch, useSelector } from "react-redux";
import { createList, getLists } from "./user/userSlice";
import PopupBlur from "../pages/PopupBlur";
import { useState } from "react";

function NewListPopup({ handlePopup }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const lists = useSelector(getLists);
  const dispatch = useDispatch();

  function onSubmit(e) {
    if (e.listName === "")
      return setError("You need to give a name to your list.");

    if (lists.find((list) => list.list_name === e.listName))
      return setError("You already have a list with the same name.");

    dispatch(createList(e.listName));
    setError("");
    handlePopup();
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
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
