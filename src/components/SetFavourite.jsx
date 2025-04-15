import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import toast from "react-hot-toast";

import Button from "../ui/Button";

import { useSetFavouriteItem } from "../hooks/user/useSetFavouriteItem";
import { useGetFavouriteItems } from "../hooks/user/useGetFavouriteItems";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Title from "../ui/Title";
import Paragraph from "../ui/Paragraph";
import Poster from "./Poster";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

function SetFavourite({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { favouriteItems, isPending: isGettingPending } =
    useGetFavouriteItems();
  const { setFavouriteItem, isPending: isSettingPending } =
    useSetFavouriteItem();
  const isExisting = favouriteItems?.find((fav) => fav.id === item.id);

  function handleInsert(item) {
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
      <Button
        type="secondary"
        className={`flex items-center gap-0.5 ${isExisting && "border-grey-primary/50 hover:border-grey-primary/50 text-grey-primary hover:text-grey-primary"}`}
        onClick={() => handleInsert(item)}
        disabled={isSettingPending || isExisting}
      >
        <Icon path={mdiStar} size={0.89} />
        {isExisting ? "Already favourite" : "Set favourite"}
      </Button>

      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <Dialog
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              className="relative z-50"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50"
                aria-hidden="true"
              />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-grey-secondary w-full max-w-md space-y-4 rounded-xl p-6"
                >
                  <DialogTitle>
                    <Title as="h1" level={5} type="white">
                      Replace a Favourite
                    </Title>
                  </DialogTitle>
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
                </DialogPanel>
              </div>
            </Dialog>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default SetFavourite;
