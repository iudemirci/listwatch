import Button from "../../../ui/Button";
import AccountIcon from "../../AccountIcon";
import StarRating from "../../StarRating";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useInsertReviews } from "../../../hooks/reviews/useInsertReviews";
import Spinner from "../../../ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "../../../hooks/auth/useGetUser";
import { useSelector } from "react-redux";
import { useUpdateReview } from "../../../hooks/reviews/useUpdateReview";

const reviewID = uuidv4();

function SubmitReview({ token, isReviewed, edit, setEdit }) {
  const { selectedReview, selectedRating, selectedReviewID } = useSelector(
    (state) => state.user,
  );
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();
  const { id } = useParams("id");
  const { register, handleSubmit, reset } = useForm();
  const { mutate: insertReview, isPending } = useInsertReviews();
  const { mutate: updateReview } = useUpdateReview();
  const { user } = useGetUser() || [];
  const username = user?.user_metadata?.username || "";

  if (!token || (!isReviewed && !edit)) {
    return null;
  }

  //handle submit
  function onSubmit(info) {
    if (!rating) return toast("You need to give a rating");

    const newReview = {
      movieID: id,
      createdAt: new Date().toISOString(),
      reviewID: selectedReviewID || reviewID,
      username: username,
      rating: rating,
      review: info.review,
      avatarPath: null,
      source: "user",
    };

    if (edit) {
      return updateReview(newReview, {
        onSuccess: () => {
          setEdit(false);
          queryClient.invalidateQueries(["reviews"]);
          toast.dismiss();
          toast.success("Review update!");
          reset();
          setRating(0);
          setText("");
        },
      });
    }
    return insertReview(newReview, {
      onSuccess: () => {
        setEdit(false);
        queryClient.invalidateQueries(["reviews"]);
        toast.dismiss();
        toast.success("Review sent!");
        setText("");
        reset();
        setRating(0);
      },
    });
  }

  //handle errors
  function onError(error) {
    toast.dismiss();
    toast(error.review?.message);
  }

  return (
    <div className="flex w-full gap-2 py-4">
      <AccountIcon />
      <div className="flex w-full flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <textarea
            value={text}
            {...register("review", {
              required: "Write your review!",
              minLength: {
                value: 10,
                message: "We need more of your opinion!",
              },
            })}
            placeholder={"Share your review!"}
            rows="1"
            draggable="false"
            spellCheck="false"
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="none"
            onInput={(e) => {
              setText(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="text-grey-primary outline-grey-primary/60 focus:outline-primary min-h-25 w-full resize-none rounded-lg bg-zinc-800 p-2 text-xs outline-2 duration-300"
          />
          <div className="flex justify-between">
            <div className="outline-primary focus:outline-2">
              <StarRating
                size={1}
                onSetRating={setRating}
                defaultRating={rating}
              />
            </div>
            {isPending ? <Spinner /> : <Button>Add review</Button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitReview;
