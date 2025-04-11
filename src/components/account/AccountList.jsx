import Icon from "@mdi/react";
import {
  mdiCog,
  mdiCloseBox,
  mdiPencil,
  mdiPlusBoxOutline,
  mdiTrashCan,
} from "@mdi/js";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import PopupBlur from "../../ui/PopupBlur";
import AccountListItem from "./AccountListItem";
import Title from "../../ui/Title";
import Skeleton from "../../ui/Skeleton";

import { useDeleteList } from "../../hooks/lists/useDeleteList";
import { useGetListItems } from "../../hooks/lists/useGetListItems";

let itemsInListCount = 3;

function AccountList({ currentList }) {
  const [settings, setSettings] = useState(false);
  const [edit, setEdit] = useState(false);
  const [offset, setOffset] = useState(0);
  let itemsPerPage = 8;

  const queryClient = useQueryClient();
  const { deleteList, isPending: isDeleting } = useDeleteList();
  const { data: listItems, isPending: isItemsPending } = useGetListItems(
    currentList.id,
  );
  const endOffset = offset + itemsPerPage;

  const currentListItems =
    !isItemsPending && listItems.slice(offset, endOffset);
  const pageCount =
    !isItemsPending && Math.ceil(listItems.length / itemsPerPage);

  function handlePageClick(event) {
    const newOffset = (event.selected * itemsPerPage) % listItems.length;
    setOffset(newOffset);
  }

  function handlePopup() {
    setSettings((s) => !s);
    setEdit(false);

    if (document.body.style.overflow === "hidden")
      return (document.body.style.overflow = "auto");
    document.body.style.overflow = "hidden";
  }

  // if (isItemsPending) return <div>loading...</div>;

  return !isDeleting ? (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Title level={3}>{currentList.listName}</Title>
        <div className="flex gap-2">
          {listItems && listItems?.length ? (
            <Icon
              path={mdiCog}
              size={1.2}
              className="text-grey-primary cursor-pointer"
              onClick={() => handlePopup()}
            />
          ) : null}

          <Icon
            size={1.2}
            path={mdiTrashCan}
            className="text-primary cursor-pointer"
            onClick={() => {
              deleteList(currentList.id, {
                onSuccess: () => {
                  queryClient.invalidateQueries(["lists"]);
                  toast.success(`${currentList.listName} deleted`);
                },
                onError: () =>
                  toast.error(`${currentList.listName} could not be deleted`),
              });
            }}
          />
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-x-2 md:grid-cols-5 lg:grid-cols-7">
        {isItemsPending
          ? [...Array(itemsInListCount)].map((_, i) => (
              <Skeleton key={i} className={"aspect-2/3 rounded-lg"} />
            ))
          : listItems
              ?.slice(0, itemsInListCount)
              .map((item) => <AccountListItem key={item.id} item={item} />)}

        {listItems?.length - itemsInListCount < 0 && (
          <Link to={"/discover"}>
            <li className="text-grey-primary outline-grey-primary/50 hover:outline-primary flex aspect-2/3 items-center justify-center rounded-lg outline-2">
              <Icon path={mdiPlusBoxOutline} size={1.3} />
            </li>
          </Link>
        )}
      </ul>

      {/* LIST OPEN */}
      {settings && (
        <PopupBlur>
          <div className="bg-grey-secondary/90 m-4 flex max-w-100 flex-col justify-between gap-2 rounded-lg p-3 sm:p-4 md:max-w-110 lg:max-w-120 2xl:max-w-170">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Title level={3}>{currentList.listName}</Title>

                <div className="flex items-center gap-2">
                  <Icon
                    path={mdiPencil}
                    size={1.3}
                    className={
                      !edit
                        ? "text-grey-primary cursor-pointer"
                        : "text-primary cursor-pointer"
                    }
                    onClick={() => setEdit((s) => !s)}
                  />
                  <Icon
                    path={mdiCloseBox}
                    size={1.3}
                    className="text-primary cursor-pointer"
                    onClick={() => {
                      handlePopup();
                    }}
                  />
                </div>
              </div>
              <ul className="grid grid-cols-4 grid-rows-2 gap-1.5 sm:grid-cols-5 lg:gap-2">
                {currentListItems.map((item, i) => (
                  <AccountListItem
                    key={i}
                    item={item}
                    edit={edit}
                    setEdit={setEdit}
                  />
                ))}
              </ul>
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              pageClassName="pageClass"
              containerClassName="containerClass"
              activeClassName="activeClass"
            />
          </div>
        </PopupBlur>
      )}
    </div>
  ) : (
    <div>deleting...</div>
  );
}

export default AccountList;
