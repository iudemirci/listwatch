import Icon from "@mdi/react";
import {
  mdiCog,
  mdiCloseBox,
  mdiTextBoxEdit,
  mdiPlusBoxOutline,
} from "@mdi/js";
import { Link } from "react-router-dom";
import Title from "../../ui/Title";
import { useState } from "react";
import PopupBlur from "../../pages/PopupBlur";
import AccountListItem from "./AccountListItem";
import { ConfigProvider, Pagination } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateListName } from "../user/userSlice";

function AccountList({ list }) {
  const { list_name: listName, items } = list;
  const defaultOffset = 12;
  const [offset, setOffset] = useState(12);
  const itemsInListCount = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [isListOpen, setIsListOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  function handleListOpen() {
    setIsListOpen(!isListOpen);
    setEdit(false);
  }

  function onSubmit(e) {
    dispatch(updateListName(listName, e.listName));
  }

  return (
    <section className="w-[100%]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Title level={3}>{listName}</Title>

          {items.length ? (
            <Icon
              path={mdiCog}
              size={1}
              className="text-grey-primary"
              onClick={() => handleListOpen()}
            />
          ) : null}
        </div>
        <ul className="grid grid-cols-3 gap-x-2">
          {items.slice(0, itemsInListCount).map((item) => (
            <AccountListItem key={item.id} item={item} />
          ))}
          {items.length < 3 && (
            <Link to={"/films"}>
              <div className="text-grey-primary outline-grey-primary/50 hover:outline-primary flex aspect-2/3 items-center justify-center rounded-lg outline-2">
                <Icon path={mdiPlusBoxOutline} size={1.3} />
              </div>
            </Link>
          )}
        </ul>
      </div>

      {isListOpen && (
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
                  {!edit ? (
                    <Title level={3}>{listName}</Title>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        placeholder={listName}
                        className="bg-text-default text-background-default w-50 rounded-lg px-2 py-1 text-sm"
                        {...register("listName")}
                      />
                    </form>
                  )}
                  <div className="flex items-center gap-2">
                    <Icon
                      path={mdiTextBoxEdit}
                      size={1.3}
                      className={!edit ? "text-grey-primary" : "text-primary"}
                      onClick={() => setEdit(!edit)}
                    />
                    <Icon
                      path={mdiCloseBox}
                      size={1.3}
                      className="text-primary cursor-pointer"
                      onClick={() => handleListOpen()}
                    />
                  </div>
                </div>
                <ul className="grid grid-cols-4 gap-1.5">
                  {items
                    .slice(offset - defaultOffset, offset)
                    .map((item, i) => (
                      <AccountListItem
                        key={i}
                        item={item}
                        edit={edit}
                        setEdit={setEdit}
                        listName={listName}
                        onListOpen={handleListOpen}
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
                  total={items.length}
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
    </section>
  );
}

export default AccountList;
