import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import dayjs from "dayjs";

import Paragraph from "../../../ui/Paragraph";
import ReadMore from "../../../utilities/ReadMore";
import Title from "../../../ui/Title";
import Skeleton from "../../../ui/Skeleton";
import AccountIcon from "../../review/accountIcon";
import SubmitReview from "./SubmitReview";
import ReviewVotes from "./ReviewVotes";
import ReviewsOptions from "./ReviewsOptions";
import { useGetUser } from "../../../hooks/auth/useGetUser";
import { useState } from "react";

function Reviews({ reviews, isPending }) {
  const [edit, setEdit] = useState(false);
  const token = localStorage.getItem("token");
  const { user } = useGetUser() || [];
  const isUserReviewed =
    reviews?.filter((review) => review.userID === user?.id)?.length === 0;
  const sortedReviews =
    reviews?.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }) || [];
  return (
    <>
      <div className="divide-grey-primary/50 flex flex-col divide-y-1">
        <Title level={3} className="pb-1">
          {!token
            ? "Sign in to share your opinion with the world!"
            : "Popular Reviews"}
        </Title>
        <SubmitReview
          token={token}
          isReviewed={isUserReviewed}
          edit={edit}
          setEdit={setEdit}
        />
        <ul className="divide-grey-secondary flex flex-col divide-y-1">
          {isPending ? (
            <Skeleton className="mt-2 aspect-5/2 rounded-lg" />
          ) : (
            sortedReviews?.slice(0, 10)?.map((review) => (
              <li
                key={review?.id}
                className={`relative flex flex-1 gap-3 pt-3 pb-2`}
              >
                <AccountIcon path={review?.avatarPath} />
                <div className="flex w-full flex-col gap-2 py-0.5">
                  <div className="flex flex-col gap-0.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Paragraph
                          type="tertiary"
                          className="text-text-default cursor-pointer font-semibold"
                        >
                          {review?.username}
                        </Paragraph>
                        <Paragraph
                          type="secondary"
                          className="flex justify-center"
                        >
                          <Icon
                            path={mdiStar}
                            size={0.7}
                            className="text-primary"
                          />
                          {review?.rating > 5
                            ? review?.rating / 2
                            : review?.rating}
                        </Paragraph>
                      </div>
                      {/* options */}
                      {review?.userID === user?.id && (
                        <ReviewsOptions
                          review={review}
                          userID={user?.id}
                          setEdit={setEdit}
                        />
                      )}
                    </div>
                    <Paragraph
                      type="tertiary"
                      className="text-grey-primary/60 text-[10px] font-medium"
                    >
                      {dayjs(review?.createdAt).format("MMM D YYYY HH:mm")}
                    </Paragraph>
                  </div>

                  <div>
                    <Paragraph
                      type="secondary"
                      className="font-normal tracking-[0.2px] whitespace-pre-line"
                    >
                      <ReadMore charLimit={400}>{review?.review}</ReadMore>
                    </Paragraph>
                  </div>
                  {/* votes */}
                  <ReviewVotes reviewID={review.reviewID} userID={user?.id} />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default Reviews;
