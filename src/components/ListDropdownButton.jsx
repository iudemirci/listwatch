import { useState } from "react";
import { useDispatch } from "react-redux";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import ListButton from "./ListButton";
import NewListPopup from "./NewListPopup";

import { useGetLists } from "../hooks/lists/useGetLists";
import { setSelectedList } from "../store/userSlice";
import AddItemPopover from "./popover/AddItemPopover";

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
      <Menu as="div">
        {({ open }) => (
          <>
            <MenuButton>
              <span
                className={
                  "border-primary bg-primary hover:bg-primary-dark flex cursor-pointer items-center gap-1 rounded-lg border-2 px-2 py-1 text-[14px] transition-colors duration-300 hover:border-2 lg:text-base 2xl:px-2 2xl:text-lg"
                }
              >
                <Icon path={mdiPlus} size={0.89} /> List now
              </span>
            </MenuButton>
            <AnimatePresence mode="wait">
              {open && (
                <MenuItems
                  as={motion.div}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={"flex flex-col gap-0.5 pt-0.5"}
                  anchor="bottom start"
                  modal={false}
                  static
                >
                  <MenuItem>
                    <ListButton onClick={() => handlePopup("create")}>
                      Create New List
                    </ListButton>
                  </MenuItem>

                  {isListsPending ? (
                    <ListButton type={"list"}>Loading lists...</ListButton>
                  ) : (
                    lists.map((list) => (
                      <MenuItem key={list.id}>
                        <ListButton
                          type={"list"}
                          onClick={() => handlePopup("list", list)}
                        >
                          {list.listName}
                        </ListButton>
                      </MenuItem>
                    ))
                  )}
                </MenuItems>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>

      {popupType === "create" && <NewListPopup handlePopup={handlePopup} />}

      {popupType === "list" && (
        <AddItemPopover
          item={item}
          listName={popupType}
          handlePopup={handlePopup}
        />
      )}
    </>
  );
}

export default ListDropdownButton;
