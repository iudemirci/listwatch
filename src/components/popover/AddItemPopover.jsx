import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { debounce } from "lodash";
import { useState } from "react";
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

function AddItemPopover() {
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const listName = useSelector((state) => state.popup.addListName);
  const isAddItemOpen = useSelector((state) => state.popup.isAddItemOpen);
  const item = useSelector((state) => state.popup.addItem);
  const year = getYear(item?.release_date || item?.first_air_date) || "";
  const type = item?.release_date || item?.release_date === "" ? "movie" : "tv";
  const { addItem, isPending: isAddingPending } = useAddItemToList();

  const debouncedHandleClick = debounce(() => {
    if (listName !== "Watchlist" && !rating)
      return toast.error("Give it a rating!");

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
          setRating(null);
        },
      },
    );
  }, 300);

  return (
    <AnimatePresence>
      {isAddItemOpen && (
        <PopupBlur
          setIsOpen={() => dispatch(closeAddItemPopup())}
          isOpen={isAddItemOpen}
          reset={() => setRating(null)}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-grey-tertiary border-grey-secondary relative m-3 flex w-130 flex-col gap-2.5 rounded-lg border-1 p-8"
          >
            <Icon
              path={mdiClose}
              size={1.2}
              className="text-grey-primary-light hover:text-text-default absolute top-4 right-4 cursor-pointer duration-300"
              onClick={() => {
                dispatch(closeAddItemPopup());
              }}
            />
            <div className="flex gap-4">
              <div className="w-25">
                <Poster path={item?.poster_path} />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex flex-1 flex-col gap-2">
                  <Title level={5}>
                    {listName === "Watched" && "I watched..."}
                    {listName === "Watchlist" && "I want to watch..."}
                  </Title>
                  <div className="flex items-baseline gap-1 2xl:gap-0">
                    <LinkToId type={type} item={item}>
                      <Title level={4} className="font-bold hover:underline">
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

                <div className="flex gap-2">
                  <Button onClick={debouncedHandleClick}>Save</Button>
                  {isAddingPending && <Spinner />}
                </div>
              </div>
            </div>
          </motion.div>
        </PopupBlur>
      )}
    </AnimatePresence>
  );
}

export default AddItemPopover;
