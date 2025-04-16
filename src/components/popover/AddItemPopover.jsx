import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { memo, useState } from "react";
import toast from "react-hot-toast";

import PopupBlur from "../../ui/PopupBlur";
import Button from "../../ui/Button";
import Title from "../../ui/Title";
import StarRating from "../StarRating";
import Spinner from "../../ui/Spinner";
import Paragraph from "../../ui/Paragraph";
import LinkToId from "../../ui/LinkToId";
import Poster from "../Poster";

import { closeAddItemPopup } from "../../store/popupSlice";
import { getYear } from "../../utilities/getYear";
import { useAddItemToList } from "../../hooks/lists/useAddItemToList";
import { useCreateList } from "../../hooks/lists/useCreateList";
import { useGetLists } from "../../hooks/lists/useGetLists";

function AddItemPopover() {
  const [rating, setRating] = useState(null);
  const [createListName, setCreateListName] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const isAddItemOpen = useSelector((state) => state.popup.isAddItemOpen);
  const item = useSelector((state) => state.popup.addItem);
  const year = getYear(item?.release_date || item?.first_air_date) || "";
  const type = item?.release_date || item?.release_date === "" ? "movie" : "tv";
  const { addItem, isPending: isAddingPending } = useAddItemToList();
  const { isPending: isCreatingPending, createList } = useCreateList();
  const { isPending: isListsPending, data: lists } = useGetLists();

  const debouncedHandleClick = debounce(() => {
    if (listName === "") {
      toast.dismiss();
      toast.error("Select a list first!");
      return;
    }
    if (listName !== "Watchlist" && !rating) {
      toast.dismiss();
      toast.error("Give it a rating!");
      return;
    }

    const savedItem = {
      id: item?.id,
      title: item?.title || item?.name,
      poster_path: item?.poster_path,
      userRating: rating,
      type: type,
      vote_average: +item?.vote_average,
    };

    addItem(
      { listName: listName, item: savedItem },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success(`${item?.title || item?.name} added successfully!`);
          queryClient.invalidateQueries(["user", "lists"]);
          dispatch(closeAddItemPopup());
          setRating(null);
        },
        onError: (e) => {
          toast.dismiss();
          toast.error(e.message);
        },
        onSettled: () => {
          setListName("");
        },
      },
    );
  }, 300);

  function handleCreate() {
    createList(createListName, {
      onSuccess: () => {
        toast.dismiss();
        toast.success(`${createListName} created`);
        setIsCreate(false);
        setCreateListName("");
        setRating(null);
      },
      onError: (e) => {
        toast.dismiss();
        toast.error(e.message);
      },
      onSettled: () => queryClient.invalidateQueries("lists"),
    });
  }

  return (
    <AnimatePresence>
      {isAddItemOpen && (
        <PopupBlur
          setIsOpen={() => {
            dispatch(closeAddItemPopup());
            setListName("");
          }}
          isOpen={isAddItemOpen}
          reset={() => setRating(null)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-grey-tertiary border-grey-secondary absolute bottom-0 mx-4 flex w-full max-w-90 flex-col gap-2.5 rounded-lg border-1 px-4 py-6 sm:max-w-110 lg:max-w-140"
          >
            <div className="bg-grey-secondary/70 flex gap-4 rounded-lg p-2">
              <div className="w-15">
                <Poster path={item?.poster_path} />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex flex-1 flex-col gap-2">
                  <Title level={5} className="text-nowrap">
                    {listName === "Watchlist"
                      ? "I want to watch..."
                      : "I watched..."}
                  </Title>
                  <div className="flex items-baseline gap-1 2xl:gap-0">
                    <LinkToId type={type} item={item}>
                      <Title
                        level={4}
                        className="line-clamp-1 font-bold hover:underline"
                      >
                        {item?.title || item?.name}
                      </Title>
                    </LinkToId>
                    <Paragraph type="tertiary">{year}</Paragraph>
                  </div>
                  {listName !== "Watchlist" && (
                    <StarRating
                      size={1.2}
                      onSetRating={setRating}
                      defaultRating={rating}
                    />
                  )}
                </div>
              </div>
            </div>
            <ul className="divide-grey-primary/50 flex flex-col divide-y overflow-hidden rounded-lg">
              {!isCreate && (
                <li
                  className="bg-grey-secondary/70 hover:bg-grey-secondary cursor-pointer p-2 duration-300"
                  onClick={() => setIsCreate(true)}
                >
                  <Title level={4}>Create new list</Title>
                </li>
              )}
              {!isCreate &&
                lists?.map((list) => (
                  <li
                    key={list?.id}
                    className={`bg-grey-secondary/70 hover:bg-grey-secondary cursor-pointer p-2 duration-300 ${listName === list?.listName && "bg-primary hover:bg-primary"}`}
                    onClick={() => setListName(list?.listName)}
                  >
                    <Title level={4}>{list?.listName}</Title>
                  </li>
                ))}
              {isCreate && (
                <li className="bg-grey-secondary/70 flex flex-col gap-2 rounded-lg p-2">
                  <input
                    value={createListName}
                    onChange={(e) => setCreateListName(e.target.value)}
                    className="bg-grey-primary/50 w-full rounded-lg px-2 py-0.5"
                  />
                  <div className="flex gap-2 self-start">
                    <button
                      className="bg-primary hover:bg-primary-dark cursor-pointer rounded-lg px-2 py-1 text-xs duration-300 lg:text-sm"
                      onClick={handleCreate}
                    >
                      Create
                    </button>
                    <button
                      className="bg-grey-secondary border-grey-primary/50 hover:border-primary cursor-pointer rounded-lg border px-2 py-1 text-xs duration-300 lg:text-sm"
                      onClick={() => setIsCreate(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </li>
              )}
            </ul>
            {!isCreate && (
              <div className="flex gap-2">
                <Button onClick={debouncedHandleClick}>Save</Button>
                {isAddingPending && <Spinner />}
              </div>
            )}
          </motion.div>
        </PopupBlur>
      )}
    </AnimatePresence>
  );
}

export default memo(AddItemPopover);
