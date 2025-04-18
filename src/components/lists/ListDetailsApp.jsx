import { useParams } from "react-router-dom";
import { mdiBookEdit, mdiStar, mdiStarCog, mdiTrashCan } from "@mdi/js";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Icon from "@mdi/react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import Title from "../../ui/Title";
import Poster from "../Poster";
import Skeleton from "../../ui/Skeleton";
import LinkToId from "../../ui/LinkToId";
import AccountIcon from "../AccountIcon";
import Paragraph from "../../ui/Paragraph";
import ListBar from "./ListBar";
import HomePoster from "../homepage/HomePoster";
import ListDeletePopover from "../popover/ListDeletePopover";
import StarEditPopover from "../popover/StarEditPopover";
import EmptyCustomLists from "../account/EmptyCustomLists";
import Spinner from "../../ui/Spinner";

import { useGetSingeList } from "../../hooks/lists/useGetSingleList";
import { useGetUser } from "../../hooks/auth/useGetUser";
import { useDeleteItem } from "../../hooks/lists/useDeleteItem";
import { openStarEdit } from "../../store/popupSlice";
import { AnimatePresence, motion } from "motion/react";
import { useRenameList } from "../../hooks/lists/useRenameList";

function ListDetailsApp() {
  const { id } = useParams("id");
  const [selectedDisplay, setSelectedDisplay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { user } = useGetUser();
  const { deleteItem, isPending: isDeletePending } = useDeleteItem();
  const { renameList, isPending: isRenamingPending } = useRenameList();

  const {
    data: list,
    isPending: isListPending,
    isFetched,
    isError,
  } = useGetSingeList(id);
  const { listName, username, items, userID } = list?.[0] || [];
  const isUser = userID === user?.id;

  function handleDelete(e, item) {
    e.preventDefault();
    e.stopPropagation();

    deleteItem(item?.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["app", "list", id]);
        toast.dismiss();
        toast.success(`${item?.title} is removed from ${listName}`);
      },
      onError: (e) => {
        toast.dismiss();
        toast.error(e.message);
      },
    });
  }

  function handleEdit(e, item) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(openStarEdit(item));
  }

  function handleRename(e) {
    if (!newName.trim()) return;

    renameList(
      { id, newName },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("app", "list", id);
          toast.dismiss();
          toast.success("List renamed successfully");
          setNewName("");
          setIsEdit(false);
        },
        onError: () => {
          toast.dismiss();
          toast.error("Something went wrong");
        },
      },
    );
  }

  return (
    <div className="my-6 mt-[16rem] flex flex-col gap-4">
      <ListDeletePopover />
      <StarEditPopover />
      <HomePoster path={items?.[0]?.poster_path} short={true} />
      <div className="flex items-center gap-1">
        {isListPending ? (
          <Skeleton className="size-9 rounded-full" />
        ) : (
          <AccountIcon path={null} />
        )}

        {isListPending ? (
          <Skeleton className="h-5 w-40" />
        ) : (
          <>
            <Title level={6} type="grey">
              List by
            </Title>
            <Title
              level={6}
              className="hover:text-primary cursor-pointer font-bold duration-300"
            >
              {username}
            </Title>
          </>
        )}
      </div>
      <ListBar
        isUser={isUser}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        item={items}
        isPending={isListPending}
        setSelectedDisplay={setSelectedDisplay}
        selectedDisplay={selectedDisplay}
      />
      {isListPending ? (
        <Skeleton className="h-6 lg:h-10" />
      ) : isEdit ? (
        <div className="flex flex-col gap-1">
          <input
            className="bg-grey-secondary h-8 rounded-md px-2 lg:h-9"
            placeholder={listName}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="self-end">
            <button
              className={`bg-primary hover:bg-primary-dark border-text-default cursor-pointer rounded-sm border px-3 py-0.5 text-sm duration-300`}
              onClick={handleRename}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <Title level={2}>{listName}</Title>
      )}
      <ul
        className={`mt-4 ${selectedDisplay === 0 ? "grid grid-cols-4 gap-2 text-center md:grid-cols-5 lg:grid-cols-8" : "divide-grey-primary/50 border-grey-primary/50 flex flex-col divide-y-1 overflow-hidden border-y"}`}
      >
        {isListPending
          ? [...Array(20)].map((_, idx) => {
              if (selectedDisplay === 0) {
                return (
                  <li key={idx} className="flex flex-col gap-1">
                    <div className="aspect-2/3">
                      <Skeleton />
                    </div>
                    <Paragraph type="primary">
                      <Icon
                        path={mdiStar}
                        size={0.5}
                        className="text-primary mx-auto"
                      />
                    </Paragraph>
                  </li>
                );
              } else {
                return (
                  <li key={idx} className="mt-1 h-18 pb-1">
                    <Skeleton />
                  </li>
                );
              }
            })
          : items?.map((item) => {
              if (selectedDisplay === 0) {
                return (
                  <li key={item?.id} className="flex flex-col gap-1">
                    <LinkToId
                      item={item}
                      type={
                        item?.type ||
                        (item?.release_date || item?.release_date === ""
                          ? "movie"
                          : "tv")
                      }
                      className="relative"
                    >
                      <Poster path={item?.poster_path} />
                      <AnimatePresence>
                        {isEdit && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ ease: "easeInOut" }}
                            className="border-primary group absolute top-0 left-0 flex size-full flex-col items-center justify-center gap-2 rounded-lg border bg-black/70 duration-300"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <Icon
                              path={mdiStarCog}
                              size={1.5}
                              className="hover:text-primary mr-2 duration-300"
                              onClick={(e) => handleEdit(e, item)}
                            />

                            {isDeletePending ? (
                              <Spinner />
                            ) : (
                              <Icon
                                path={mdiTrashCan}
                                size={1.5}
                                className="hover:text-primary duration-300"
                                onClick={(e) => handleDelete(e, item)}
                              />
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </LinkToId>

                    <div className="flex items-center justify-center">
                      <Icon
                        path={mdiStar}
                        size={0.5}
                        className="text-primary"
                      />
                      <Paragraph type="tertiary">{item?.userRating}</Paragraph>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li
                    key={item?.id}
                    className="hover:bg-grey-secondary relative px-1 py-2 duration-100"
                  >
                    <LinkToId
                      item={item}
                      type={
                        item?.type ||
                        (item?.release_date || item?.release_date === ""
                          ? "movie"
                          : "tv")
                      }
                    >
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center">
                          <Icon
                            path={mdiStar}
                            size={0.5}
                            className="text-primary"
                          />
                          <Paragraph type="tertiary">
                            {item?.userRating}
                          </Paragraph>
                        </div>
                        <div className="max-w-10 min-w-10">
                          <Poster path={item?.poster_path} />
                        </div>
                        <div className="line-clamp-1 flex flex-col gap-0.5 2xl:pl-1">
                          <Title level={4}>{item?.title || item?.name}</Title>
                          <Paragraph type="secondary">
                            {dayjs(
                              item?.release_date || item?.first_air_date,
                            ).format("YYYY")}
                          </Paragraph>
                        </div>
                      </div>
                      <AnimatePresence>
                        {isEdit && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ ease: "easeInOut" }}
                            className="border-primary group absolute top-0 left-0 flex size-full items-center justify-end rounded-lg border bg-black/70 duration-300"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <Icon
                              path={mdiStarCog}
                              size={1.5}
                              className="hover:text-primary mr-2 duration-300"
                              onClick={(e) => handleEdit(e, item)}
                            />
                            {isDeletePending ? (
                              <div className="mr-2">
                                <Spinner />
                              </div>
                            ) : (
                              <Icon
                                path={mdiTrashCan}
                                size={1.5}
                                className="hover:text-primary mr-2 duration-300"
                                onClick={(e) => handleDelete(e, item)}
                              />
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </LinkToId>
                  </li>
                );
              }
            })}
      </ul>
      {isFetched && items?.length === 0 && (
        <div className="pb-8">
          <EmptyCustomLists existing={listName} />
        </div>
      )}
    </div>
  );
}

export default ListDetailsApp;
