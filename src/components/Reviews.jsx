import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";

import profile from "../assets/profile.png";
import Paragraph from "../ui/Paragraph";

import { useFetchMovieDB } from "../hooks/moviedb/useFetchMovieDB";
import ReadMore from "../utilities/ReadMore";
import Title from "../ui/Title";
import dayjs from "dayjs";
import Skeleton from "../ui/Skeleton";

function Reviews({ reviews, isPending }) {
  console.log(reviews);

  return (
    <div className="divide-grey-primary flex flex-col divide-y-1">
      <Title level={3} className="pb-2">
        Popular Reviews
      </Title>
      <ul className="divide-grey-secondary flex flex-col divide-y-1">
        {isPending ? (
          <Skeleton className="mt-2 aspect-5/2 rounded-lg" />
        ) : (
          reviews?.slice(0, 10)?.map((review) => [
            <li key={review?.id} className="flex gap-3 py-3">
              <img
                src={
                  review?.author_details?.avatar_path
                    ? `https://image.tmdb.org/t/p/w185${review?.author_details?.avatar_path}`
                    : profile
                }
                className="aspect-square h-10 w-10 rounded-full"
              />
              <div className="flex flex-col gap-2 py-0.5">
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex gap-2">
                    <Paragraph type="tertiary">
                      Review by
                      <b className="text-text-default pl-1 font-semibold">
                        {review?.author}
                      </b>
                    </Paragraph>
                    <Paragraph type="secondary" className="flex justify-center">
                      <Icon
                        path={mdiStar}
                        size={0.7}
                        className="text-primary"
                      />
                      {review?.author_details?.rating / 2}
                    </Paragraph>
                  </div>
                  <Paragraph type="tertiary">
                    {dayjs(review?.created_at).format("MMM D YYYY HH:mm")}
                  </Paragraph>
                </div>
                <div>
                  <Paragraph type="secondary">
                    <ReadMore limit={400}>{review?.content}</ReadMore>
                  </Paragraph>
                </div>
              </div>
            </li>,
          ])
        )}
      </ul>
    </div>
  );
}

export default Reviews;
