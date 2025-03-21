import Button from "../ui/Button";
import Icon from "@mdi/react";
import { mdiStarPlus } from "@mdi/js";
import ListButton from "./ListButton";
import { useState } from "react";
import { Dropdown, Spin } from "antd";
import NewListPopup from "./NewListPopup";
import AddItemPopup from "./AddItemPopup";
import { useGetLists } from "../hooks/lists/useGetLists";
import { useDispatch } from "react-redux";
import { setSelectedList } from "../store/userSlice";

function ListDropdownButton({ item }) {
  const [popupType, setPopupType] = useState(null);
  const { data: lists, isPending: isListsPending } = useGetLists();
  const dispatch = useDispatch();

  function handlePopup(type, list) {
    if (!type) setPopupType("");
    setPopupType(type);

    if (type === "list") dispatch(setSelectedList(list));

    if (document.body.style.overflow === "hidden")
      return (document.body.style.overflow = "auto");
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      <Dropdown
        dropdownRender={() => (
          <div className="font-exo flex flex-col items-start gap-0.5">
            <ListButton onClick={() => handlePopup("create")}>
              Create New List
            </ListButton>

            {isListsPending ? (
              <Spin />
            ) : (
              lists.map((list) => (
                <ListButton
                  key={list.id}
                  type={"list"}
                  onClick={() => handlePopup("list", list)}
                >
                  {list.listName}
                </ListButton>
              ))
            )}
          </div>
        )}
      >
        <Button type="primary" className={"flex items-center gap-1"}>
          <Icon path={mdiStarPlus} size={0.89} /> List now
        </Button>
      </Dropdown>

      {popupType === "create" && <NewListPopup handlePopup={handlePopup} />}

      {popupType === "list" && (
        <AddItemPopup
          item={item}
          listName={popupType}
          handlePopup={handlePopup}
        />
      )}
    </>
  );
}

export default ListDropdownButton;
