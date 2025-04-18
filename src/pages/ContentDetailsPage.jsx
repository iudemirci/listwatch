import { useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import Poster from "../components/Poster";
import TitleOverview from "../components/shared/TitleOverview";
import Videos from "../components/shared/Videos";
import ImageGrid from "../components/shared/ImageGrid";
import Title from "../ui/Title";
import PeopleList from "../components/person/PeopleList";
import SetFavourite from "../components/SetFavourite";
import Rating from "../components/shared/Rating";
import Paragraph from "../ui/Paragraph";
import Skeleton from "../ui/Skeleton";
import PosterList from "../components/shared/PosterList";
import HomePoster from "../components/homepage/HomePoster";
import Reviews from "../components/shared/reviews/Reviews";
import DetailedInformation from "../components/detailed_info/DetailedInformation";
import ListPreviewCard from "../components/shared/ListPreviewCard";
import EpisodeInfo from "../components/series/EpisodeInfo";
import PosterRibbon from "../components/PosterRibbon";
import WhereToWatch from "../components/shared/WhereToWatch";
import ScrollToTopButton from "../ui/ScrollToTopButton";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { getYear } from "../utilities/getYear";
import { useMovieDB } from "../hooks/moviedb/useMovieDB";
import { useInsertReviews } from "../hooks/reviews/useInsertReviews";
import { useReadReviews } from "../hooks/reviews/useReadReviews";
import LastVisited from "../components/shared/LastVisited";
import { addLastVisited } from "../store/lastVisitedSlice";
import PosterLike from "../components/PosterLike";
import AddItemPopover from "../components/popover/AddItemPopover";
import { createPortal } from "react-dom";

function ContentDetailsPage() {
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const { id } = useParams("id");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    data: movie,
    isPending: isMoviePending,
    isError: isMovieError,
  } = useMovieDB(type, id, "item");

  useEffect(() => {
    if (type && movie) {
      dispatch(
        addLastVisited({
          title: movie?.title || movie?.name,
          type,
          id: movie?.id,
          poster_path: movie.poster_path,
          date: new Date().toISOString(),
        }),
      );
    }
  }, [dispatch, type, movie]);

  //document title
  useDocumentTitle(
    `${movie?.title || movie?.name} (${getYear(movie?.release_date || movie?.first_air_date) || "UPCOMING"}) | list&watch`,
    isMoviePending,
  );

  const { data: credits, isPending: isCreditsPending } = useMovieDB(
    type,
    id,
    "credits",
  );

  const {
    data: movieVideo,
    isPending: isVideoPending,
    hasFetched: hasVideoFetched,
  } = useMovieDB(type, id, "videos");

  const movieTrailer = useMemo(() => {
    return (
      movieVideo?.find((video) => video.type === "Trailer" && "Clip") ||
      movieVideo?.[0] ||
      []
    );
  }, [movieVideo]);

  const { data: similarMovies, isPending: isSimilarPending } = useMovieDB(
    type,
    id,
    "similar",
  );

  const { data: relatedMovies } = useMovieDB(
    undefined,
    movie?.belongs_to_collection?.id,
    "collection",
  );

  const { data: userListsMovieDB } = useMovieDB(type, id, "lists");
  const { data: reviewsMovieDB } = useMovieDB(type, id, "reviews");

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

  if (isMovieError)
    return createPortal(
      <div className="absolute top-1/2 left-1/2 -translate-1/2">
        Content not found :(
      </div>,
      document.body,
    );

  return (
    <>
      <ScrollToTopButton threshold={2000} />
      <AddItemPopover />
      <div className="mt-[23rem] flex flex-col items-start gap-x-3 gap-y-6 pt-4 md:gap-x-4 md:gap-y-8 md:pt-8 lg:gap-x-6 lg:gap-y-10 2xl:gap-y-12">
        <HomePoster path={movie?.backdrop_path} className="pt-[40rem]" />
        <div className="2xl-grid-cols-4 grid w-full grid-cols-3 gap-x-3 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 lg:gap-x-8">
          <section className="aspect-2/3">
            {isMoviePending ? (
              <Skeleton className={"aspect-2/3"} />
            ) : (
              <div className="relative overflow-hidden rounded-lg">
                <Poster
                  path={movie.poster_path}
                  preview={true}
                  iconSize={2}
                  type="big"
                  className="outline-grey-secondary/75 shadow-grey-secondary/50 shadow-md outline-1"
                />
                <PosterRibbon size="big" poster={true} item={movie} />
              </div>
            )}
            {isMoviePending ? (
              <Skeleton
                className={
                  "mt-2 h-4.5 w-20 justify-self-center rounded-lg lg:h-7"
                }
              />
            ) : (
              <div className="flex items-center gap-1 justify-self-center pt-2">
                <Rating rating={movie?.vote_average} />
                <PosterLike item={movie} />
              </div>
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

            <div className="hidden flex-col gap-2 2xl:flex">
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

        <section className="flex w-full flex-col gap-1 2xl:col-span-3 2xl:hidden">
          {isMoviePending ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="mb-1 h-4" />
            ))
          ) : (
            <>
              <Title level={5}>
                {movie?.tagline || movie?.title || movie?.name}
              </Title>
              <Paragraph type={"secondary"}>{movie?.overview}</Paragraph>
            </>
          )}
        </section>

        <section
          className={`w-full lg:absolute lg:hidden ${movieTrailer?.length === 0 && hasVideoFetched && "absolute hidden"}`}
        >
          {isVideoPending ? (
            <Skeleton className={"aspect-video rounded-2xl"} />
          ) : movieTrailer?.length !== 0 ? (
            <Videos movieTrailer={movieTrailer} />
          ) : null}
        </section>

        <section className="w-full">
          <WhereToWatch />
        </section>

        <section className="w-full">
          <DetailedInformation
            item={movie}
            credits={credits}
            isCreditsPending={isCreditsPending}
          />
        </section>

        {type === "tv" && (
          <section className="w-full">
            <EpisodeInfo id={id} series={movie} isPending={isMoviePending} />
          </section>
        )}

        {credits?.cast?.length > 0 && (
          <section className="w-full">
            <PeopleList
              people={credits?.cast}
              isPending={isCreditsPending}
              perItem={4}
              maxItem={8}
            />
          </section>
        )}

        <ImageGrid type={type} />

        {relatedMovies?.parts?.length > 0 && (
          <section className="divide-grey-primary/50 w-full divide-y-1">
            <Title level={3} className="pb-0.5">
              Related movies
            </Title>
            <PosterList
              title={"related movies"}
              movies={relatedMovies?.parts || []}
              isPending={isSimilarPending}
            />
          </section>
        )}

        {(isSimilarPending || similarMovies?.length > 0) && (
          <section className="divide-grey-primary/50 w-full divide-y-1">
            <Title level={3} className="pb-0.5">
              Similar {type === "movie" ? "movies" : "shows"}
            </Title>
            <PosterList
              title={"Similar movies"}
              movies={similarMovies || []}
              isPending={isSimilarPending}
              perItem={3}
            />
          </section>
        )}

        <div className="mb-6 flex w-full flex-col gap-x-6 gap-y-6 lg:mb-8 lg:flex-row lg:gap-x-10 lg:gap-y-8">
          <section className="divide-grey-primary/50 col-span-full flex-2 divide-y-1 lg:order-2 lg:col-start-4 lg:row-start-[99]">
            <div className="flex items-center justify-between">
              <Title level={3} className="pb-1">
                Popular lists
              </Title>
              {userListsMovieDB?.length !== 0 && (
                <span className="text-grey-primary-light hover:text-text-default cursor-pointer text-sm duration-300">
                  MORE+
                </span>
              )}
            </div>
            {userListsMovieDB?.length !== 0 ? (
              <div className="grid gap-2 pt-2 sm:grid-cols-2 lg:grid-cols-1 lg:pt-4">
                {userListsMovieDB?.slice(0, 4)?.map((l) => (
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

      <LastVisited />
    </>
  );
}

export default ContentDetailsPage;
