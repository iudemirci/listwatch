import Icon from "@mdi/react";
import {
  mdiCog,
  mdiCloseBox,
  mdiPencil,
  mdiPlusBoxOutline,
  mdiTrashCan,
} from "@mdi/js";
import { Link } from "react-router-dom";
import { ConfigProvider, Pagination } from "antd";
import toast from "react-hot-toast";
import { useState } from "react";

import PopupBlur from "../../ui/PopupBlur";
import AccountListItem from "./AccountListItem";
import Title from "../../ui/Title";

import { useDeleteList } from "../../hooks/lists/useDeleteList";
import { useQueryClient } from "@tanstack/react-query";
import { useGetListItems } from "../../hooks/lists/useGetListItems";

function AccountList({ currentList }) {
  const [settings, setSettings] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(12);
  const defaultOffset = 12;
  const itemsInListCount = 3;

  const queryClient = useQueryClient();
  const { deleteList, isPending: isDeleting } = useDeleteList();
  const { data: listItems, isPending: isItemsPending } = useGetListItems(
    currentList.id,
  );

  if (isItemsPending) return <div>loading...</div>;

  return !isDeleting ? (
    <>
      <div className="flex items-center justify-between gap-2">
        <Title level={3}>{currentList.listName}</Title>
        <div className="flex gap-2">
          {listItems && listItems.length ? (
            <Icon
              path={mdiCog}
              size={1.2}
              className="text-grey-primary cursor-pointer"
              onClick={() => setSettings((s) => !s)}
            />
          ) : null}
          {/* <Popconfirm
          autoAdjustOverflow={true}
          title={"Are you sure?"}
          okText={"Confirm"}
          onConfirm={() => {
            deleteList(currentList.id, {
              onSuccess: () => {
                queryClient.invalidateQueries(["lists"]);
                },
                });
                }}
                > */}
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
          {/* </Popconfirm> */}
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-x-2">
        {listItems.slice(0, itemsInListCount).map((item) => (
          <AccountListItem key={item.id} item={item} />
        ))}

        {listItems.length < itemsInListCount && (
          <Link to={"/films"}>
            <li className="text-grey-primary outline-grey-primary/50 hover:outline-primary flex aspect-2/3 items-center justify-center rounded-lg outline-2">
              <Icon path={mdiPlusBoxOutline} size={1.3} />
            </li>
          </Link>
        )}
      </ul>

      {/* LIST OPEN */}
      {settings && (
        <ConfigProvider
          theme={{
            token: {
              fontSize: "18px",
            },
            components: {
              Pagination: {
                itemSize: 48,
                colorText: "#71717b",
              },
            },
          }}
        >
          <PopupBlur>
            <div className="bg-grey-secondary/90 flex h-111 w-[90%] flex-col justify-between gap-2 rounded-lg p-3">
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
                        setSettings((s) => !s);
                        setEdit(false);
                      }}
                    />
                  </div>
                </div>
                <ul className="grid grid-cols-4 gap-1.5">
                  {listItems
                    .slice(offset - defaultOffset, offset)
                    .map((item, i) => (
                      <AccountListItem
                        key={i}
                        item={item}
                        edit={edit}
                        setEdit={setEdit}
                      />
                    ))}
                </ul>
              </div>
              <div>
                <Pagination
                  align="center"
                  simple={{ readOnly: true }}
                  defaultCurrent={currentPage}
                  pageSize={defaultOffset}
                  total={listItems.length}
                  onChange={(page) => {
                    setCurrentPage(page);
                    setOffset(defaultOffset * page);
                  }}
                />
              </div>
            </div>
          </PopupBlur>
        </ConfigProvider>
      )}
    </>
  ) : (
    <div>deleting...</div>
  );
}

export default AccountList;
