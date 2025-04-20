import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

import Title from "../ui/Title";
import Paragraph from "../ui/Paragraph";
import Poster from "./Poster";
import PopupBlur from "../ui/PopupBlur";

import { useSetFavouriteItem } from "../hooks/user/useSetFavouriteItem";
import { useGetFavouriteItems } from "../hooks/user/useGetFavouriteItems";
import { useDispatch } from "react-redux";
import { openSignupPopup } from "../store/popupSlice";

function SetFavourite({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const { favouriteItems, isPending: isGettingPending } =
    useGetFavouriteItems();
  const { setFavouriteItem, isPending: isSettingPending } =
    useSetFavouriteItem();
  const isExisting = favouriteItems?.find((fav) => fav.id === item.id);

  function handleInsert(item) {
    if (!token) {
      return dispatch(openSignupPopup());
    }

    if (isExisting) {
      toast.dismiss();
      toast.error(
        `You already have ${item?.title || item?.name} set as favourite`,
      );
      return;
    }

    if (favouriteItems?.length >= 4) {
      setIsModalOpen(true);
    } else {
      setFavouriteItem(item, {
        onSuccess: () => {
          queryClient.invalidateQueries(["user", "setFavourite"]);
        },
        onError: (e) => toast.error(e.message),
      });
    }
  }

  function handleReplace(replaceID) {
    setIsModalOpen(false);

    setFavouriteItem(
      { ...item, replace_id: replaceID },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["user", "setFavourite"]);
        },
        onError: (e) => toast.error(e.message),
      },
    );
  }

  return (
    <>
      <button
        className={`hover:bg-primary bg-grey-secondary text-grey-primary-light hover:text-text-default pointer-events-auto flex cursor-pointer items-center gap-0.5 self-start rounded-lg px-1.5 py-1 text-xs duration-300 md:px-1.5 ${isExisting && "border-grey-primary/50 hover:border-grey-primary/50 text-grey-primary-light/60 bg-grey-secondary/60 hover:text-grey-primary"}`}
        onClick={() => handleInsert(item)}
        disabled={isSettingPending || isExisting}
      >
        <Icon path={mdiStar} size={0.7} />
        {isExisting ? "Already favourite" : "Set favourite"}
      </button>

      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <PopupBlur
              setIsOpen={() => {
                setIsModalOpen(false);
              }}
              isOpen={isModalOpen}
            >
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <motion.div
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-grey-secondary w-full max-w-md space-y-4 rounded-xl p-6"
                >
                  <Title as="h1" level={5} type="white">
                    Replace a Favourite
                  </Title>
                  <Paragraph type="secondary">
                    You already have 4 favourites. Choose one to replace:
                  </Paragraph>

                  <ul className="grid grid-cols-2 gap-3">
                    {favouriteItems.map((fav) => (
                      <li key={fav.id}>
                        <button
                          className="hover:bg-grey-primary/15 border-grey-primary/50 flex w-full cursor-pointer flex-col items-center gap-1 rounded-lg border p-2 duration-300"
                          onClick={() => handleReplace(fav.id)}
                        >
                          <div className="w-25">
                            <Poster path={fav.poster_path} />
                          </div>
                          <Title level={6} className="line-clamp-1">
                            {fav.title}
                          </Title>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="text-right">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="hover:text-text-default cursor-pointer text-sm text-gray-500 duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </div>
            </PopupBlur>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default SetFavourite;
