import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Poster from "../components/Poster";
import TitleOverview from "../components/shared/TitleOverview";
import Videos from "../components/shared/Videos";
import ImageGrid from "../components/shared/ImageGrid";
import Title from "../ui/Title";
import PeopleList from "../components/person/PeopleList";
import ListDropdownButton from "../components/ListDropdownButton";
import SetFavourite from "../components/SetFavourite";

import Rating from "../components/shared/Rating";
import Paragraph from "../ui/Paragraph";
import Skeleton from "../ui/Skeleton";
import PosterList from "../components/shared/PosterList";
import HomePoster from "../components/homepage/HomePoster";
import Reviews from "../components/shared/reviews/Reviews";
import DetailedInformation from "../components/detailed_info/DetailedInformation";
import ListPreviewCard from "../components/shared/ListPreviewCard";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { getYear } from "../utilities/getYear";
import { useMovieDB } from "../hooks/moviedb/useMovieDB";
import { useInsertReviews } from "../hooks/reviews/useInsertReviews";
import { useEffect } from "react";
import { useReadReviews } from "../hooks/reviews/useReadReviews";
import { useQueryClient } from "@tanstack/react-query";

function FilmDetailsPage() {
  const { id } = useParams("id");
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const { data: movie, isPending: isMoviePending } = useMovieDB(
    "movie",
    id,
    "item",
  );

  //document title
  useDocumentTitle(
    `${movie?.title} (${getYear(movie?.release_date)}) | list&watch`,
    isMoviePending,
  );
  const { data: credits, isPending: isCreditsPending } = useMovieDB(
    "movie",
    id,
    "credits",
  );
  const { data: movieVideo, isPending: isVideoPending } = useMovieDB(
    "movie",
    id,
    "videos",
  );
  const movieTrailer =
    movieVideo?.find((video) => video.type === "Trailer" && "Clip") || [];
  const { data: similarMovies, isPending: isSimilarPending } = useMovieDB(
    "movie",
    id,
    "similar",
  );
  const { data: relatedMovies, isPending: isRelatedPending } = useMovieDB(
    undefined,
    movie?.belongs_to_collection?.id,
    "collection",
  );

  const { data: userLists, isPending: isUserListsPending } = useMovieDB(
    "movie",
    id,
    "lists",
  );
  const { data: reviewsMovieDB, isPending: isReviewsMovieDBPending } =
    useMovieDB("movie", id, "reviews");

  const { data: reviews, isPending: isReviewsPending } = useReadReviews(id);
  // sending reviews to supabase
  const { mutate: insertReviews } = useInsertReviews();
  useEffect(() => {
    if (reviewsMovieDB && reviewsMovieDB.length > 0) {
      const formattedReview = reviewsMovieDB.map((review) => ({
        reviewID: review.id,
        movieID: id,
        userID: null,
        username: review.author_details.username,
        avatarPath: review.author_details.avatar_path,
        review: review.content,
        createdAt: review.created_at,
        rating: review.author_details.rating,
        source: "api",
      }));
      insertReviews(formattedReview, {
        onSuccess: () => queryClient.invalidateQueries(["reviews"]),
      });
    }
  }, [id, reviewsMovieDB, insertReviews, queryClient]);

  return (
    <div className="mt-[23rem] flex flex-col items-start gap-x-3 gap-y-6 pt-4 md:gap-x-4 md:gap-y-8 md:pt-8 lg:gap-x-6 lg:gap-y-10 2xl:gap-y-12">
      <HomePoster path={movie?.backdrop_path} className="pt-[40rem]" />
      <div className="2xl-grid-cols-4 grid w-full grid-cols-3 gap-x-3 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 lg:gap-x-8">
        <section className="row-span-2">
          {isMoviePending ? (
            <Skeleton className={"aspect-2/3 rounded-lg"} />
          ) : (
            <Poster path={movie.poster_path} preview={true} />
          )}
          {isMoviePending ? (
            <Skeleton
              className={
                "mt-2 h-4.5 w-20 justify-self-center rounded-lg lg:h-7"
              }
            />
          ) : (
            <Rating
              rating={movie?.vote_average}
              className={"justify-self-center pt-2"}
            />
          )}
        </section>

        <section className="col-span-2 flex flex-col gap-8 sm:col-span-3 md:col-span-2">
          <div className="flex flex-col gap-2">
            {isMoviePending ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className={"aspect-24/1"} />
              ))
            ) : (
              <TitleOverview movie={movie} />
            )}
          </div>

          <div className="hidden flex-col gap-2 lg:flex">
            {isMoviePending ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className={"aspect-50/1"} />
              ))
            ) : (
              <>
                <Title level={5}>{movie?.tagline}</Title>
                <Paragraph type={"secondary"}>{movie?.overview}</Paragraph>
              </>
            )}
          </div>
        </section>
      </div>

      <section className="col-span-full flex flex-col gap-1 lg:hidden 2xl:col-span-3">
        {isMoviePending ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className={"aspect-30/1"} />
          ))
        ) : (
          <>
            <Title level={5}>{movie?.tagline}</Title>
            <Paragraph type={"secondary"}>{movie?.overview}</Paragraph>
          </>
        )}
      </section>

      {token && (
        <section className="flex flex-wrap items-center gap-2">
          <>
            <ListDropdownButton item={movie || []} />
            <SetFavourite item={movie || []} />
          </>
        </section>
      )}

      <section className="w-full lg:absolute lg:hidden">
        {isVideoPending ? (
          <Skeleton className={"aspect-video rounded-2xl"} />
        ) : (
          <Videos movieTrailer={movieTrailer} />
        )}
      </section>

      <section>
        <DetailedInformation item={movie} credits={credits} />
      </section>

      <section className="w-full">
        <PeopleList
          people={credits?.cast}
          isPending={isCreditsPending}
          perItem={5}
        />
      </section>

      <section className="w-full">
        <ImageGrid />
      </section>

      {relatedMovies?.parts?.length > 0 && (
        <section className="divide-grey-primary/50 w-full divide-y-1">
          <Title level={3} className="pb-0.5">
            Related movies
          </Title>
          <PosterList
            title={"related movies"}
            movies={relatedMovies?.parts || []}
            isPending={isSimilarPending}
            buttons={false}
          />
        </section>
      )}

      {similarMovies?.length > 0 && (
        <section className="divide-grey-primary/50 w-full divide-y-1">
          <Title level={3} className="pb-0.5">
            Similar movies
          </Title>
          <PosterList
            title={"Similar movies"}
            movies={similarMovies || []}
            isPending={isSimilarPending}
            perItem={3}
          />
        </section>
      )}

      <div className="flex w-full flex-col gap-x-6 gap-y-6 lg:flex-row lg:gap-x-10 lg:gap-y-8">
        <section className="divide-grey-primary/50 col-span-full flex-2 divide-y-1 lg:order-2 lg:col-start-4 lg:row-start-[99]">
          <div className="flex items-center justify-between">
            <Title level={3} className="pb-1">
              Popular lists
            </Title>
            {userLists?.length !== 0 && (
              <span className="text-grey-primary-light hover:text-text-default cursor-pointer text-sm duration-300">
                MORE+
              </span>
            )}
          </div>
          {userLists?.length !== 0 ? (
            <div className="grid gap-2 pt-2 sm:grid-cols-2 lg:grid-cols-1 lg:pt-4">
              {userLists?.slice(0, 4)?.map((l) => (
                <ListPreviewCard key={l.id} listID={l?.id} />
              ))}
            </div>
          ) : (
            <Paragraph type="tertiary" className="pt-2">
              No lists found
            </Paragraph>
          )}
        </section>

        {(isReviewsPending || reviews?.results?.length !== 0) && (
          <section className="order-1 col-span-full lg:col-span-3 lg:row-start-[99] lg:flex-3 2xl:flex-4">
            <Reviews reviews={reviews} isPending={isReviewsPending} />
          </section>
        )}
      </div>
    </div>
  );
}

export default FilmDetailsPage;
