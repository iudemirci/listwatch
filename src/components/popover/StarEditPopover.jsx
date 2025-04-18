import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";

import PopupBlur from "../../ui/PopupBlur";
import Button from "../../ui/Button";
import StarRating from "../StarRating";

import { useUpdateRating } from "../../hooks/lists/useUpdateRating";
import { closeStarEdit } from "../../store/popupSlice";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useParams } from "react-router-dom";

function StarEditPopover() {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.isStarEditOpen);
  const { id } = useParams("id");
  const { uuid, title } = useSelector((state) => state.popup.addItem);
  const queryClient = useQueryClient();
  const { updateRating, isPending } = useUpdateRating();

  function handleRating() {
    if (!rating) {
      toast.dismiss();
      toast.error("Give new rating");
      return;
    }
    updateRating(
      { rating, uuid },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success(`${title} rating updated to ${rating}`);
          queryClient.invalidateQueries(["user", "list", id]);
          setRating(0);
          dispatch(closeStarEdit());
        },
        onError: () => {
          toast.dismiss();
          toast.error("Something went wrong updating the rating");
        },
      },
    );
  }

  function handleCancel() {
    dispatch(closeStarEdit());
    setRating(0);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <PopupBlur
          setIsOpen={() => {
            dispatch(closeStarEdit());
            setRating(0);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ ease: "easeInOut" }}
            className="bg-grey-tertiary border-grey-primary/70 z-50 flex flex-col gap-2 rounded-lg border p-4"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="flex gap-1.5">
              <StarRating onSetRating={setRating} defaultRating={rating} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRating} disabled={isPending}>
                Save
              </Button>
              <Button type="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              {isPending && <Spinner />}
            </div>
          </motion.div>
        </PopupBlur>
      )}
    </AnimatePresence>
  );
}

export default StarEditPopover;
