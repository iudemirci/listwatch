import Button from "../ui/Button";
import Icon from "@mdi/react";
import { mdiStarPlus } from "@mdi/js";
import ListButton from "./ListButton";
import { useState } from "react";
import { Dropdown } from "antd";
import NewListPopup from "./NewListPopup";
import AddItemPopup from "./AddItemPopup";
import { useSelector } from "react-redux";
import { getLists } from "./user/userSlice";

function ListDropdownButton({ item }) {
  const [popupType, setPopupType] = useState("");
  const lists = useSelector(getLists);

  function handlePopup(type) {
    setPopupType(type);
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

            {lists.map((list) => (
              <ListButton
                key={list.list_name}
                type={"list"}
                onClick={() => handlePopup(list.list_name)}
              >
                {list.list_name}
              </ListButton>
            ))}
          </div>
        )}
      >
        <Button type="primary" className={"flex items-center gap-1"}>
          <Icon path={mdiStarPlus} size={0.89} /> List now
        </Button>
      </Dropdown>

      {popupType === "create" && <NewListPopup handlePopup={handlePopup} />}

      {lists.find((list) => list.list_name === popupType) && (
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
