import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";

import PopupBlur from "../../ui/PopupBlur";

import { closeListDeletePopup } from "../../store/popupSlice";
import Title from "../../ui/Title";
import Button from "../../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteList } from "../../hooks/lists/useDeleteList";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";

function ListDeletePopover() {
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.popup.isListDeleteOpen);
  const { deleteList, isPending } = useDeleteList();
  const queryClient = useQueryClient();

  function handleDelete() {
    deleteList(id, {
      onSuccess: () => {
        toast.dismiss();
        toast.success("List successfully deleted");
        dispatch(closeListDeletePopup());
        queryClient.invalidateQueries("user", "lists");
        navigate("/account");
      },
      onError: () => {
        toast.dismiss();
        toast.error("Something went wrong");
        dispatch(closeListDeletePopup());
      },
    });
  }

  function handleCancel() {
    dispatch(closeListDeletePopup());
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <PopupBlur setIsOpen={() => dispatch(closeListDeletePopup())}>
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
              <Title level={4}>Are you sure? </Title>
              {isPending && <Spinner />}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDelete}>Delete</Button>
              <Button type="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </PopupBlur>
      )}
    </AnimatePresence>
  );
}

export default ListDeletePopover;
