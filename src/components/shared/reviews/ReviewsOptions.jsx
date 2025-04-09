import { mdiDotsVertical, mdiPencil, mdiTrashCan } from "@mdi/js";
import MdiIcon from "../../../ui/MdiIcon";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";
import { useDeleteReview } from "../../../hooks/reviews/useDeleteReview";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  resetSelectedReview,
  setSelectedReview,
} from "../../../store/userSlice";
import toast from "react-hot-toast";

function ReviewsOptions({ review, userID, setEdit }) {
  const reviewID = review?.reviewID || null;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  function handleDelete() {
    deleteReview(
      { reviewID, userID },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("reviews");
          setEdit(false);
          dispatch(resetSelectedReview());
          toast.dismiss();
          toast.success("Review deleted successfully");
        },
      },
    );
  }

  function handleEdit() {
    setEdit((s) => !s);
    dispatch(
      setSelectedReview(review?.review, review?.rating, review?.reviewID),
    );
  }

  return (
    <div className="absolute top-0 right-0 my-3">
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton className="focus:outline-0">
              <MdiIcon path={mdiDotsVertical} size={0.9} />
            </PopoverButton>
            <AnimatePresence>
              {open && (
                <PopoverPanel
                  static
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0, x: 40, y: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0, x: 40, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  anchor="left end"
                  className="bg-grey-secondary flex flex-col rounded-lg p-1.5 text-xs font-semibold"
                >
                  <CloseButton disabled={isDeleting} onClick={handleEdit}>
                    <div className="group hover:bg-grey-secondary flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 duration-300">
                      <MdiIcon
                        path={mdiPencil}
                        size={0.7}
                        className="group-hover:text-primary"
                      />
                      <span>Edit</span>
                    </div>
                  </CloseButton>
                  <CloseButton disabled={isDeleting} onClick={handleDelete}>
                    <div className="group hover:bg-grey-secondary flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 duration-300">
                      <MdiIcon
                        path={mdiTrashCan}
                        size={0.7}
                        className="group-hover:text-primary"
                      />
                      <span>Delete</span>
                    </div>
                  </CloseButton>
                </PopoverPanel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    </div>
  );
}

export default ReviewsOptions;
