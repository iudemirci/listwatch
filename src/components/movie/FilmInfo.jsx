import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { useSelector } from "react-redux";

import Poster from "../Poster";
import TitleOverview from "../TitleOverview";
import CastOverview from "../CastOverview";
import Videos from "../Videos";
import ImageGrid from "../ImageGrid";
import Title from "../../ui/Title";
import PeopleList from "../person/PeopleList";
import Tagline from "../Tagline";
import Languages from "../Languages";
import ListDropdownButton from "../ListDropdownButton";
import SetFavourite from "../SetFavourite";
import Keywords from "../Keywords";
import Imdb from "../../ui/Imdb";
import Rating from "../Rating";
import Paragraph from "../../ui/Paragraph";
import Skeleton from "../../ui/Skeleton";
import PosterList from "../PosterList";
import HomePoster from "../HomePoster";
import Reviews from "../Reviews";

import { useFetchMovieItem } from "../../hooks/moviedb/useFetchMovieItem";

function FilmInfo({ id, movie, isMoviePending }) {
  const token = useSelector((state) => state.auth.token);

  const { data: credits, isPending: isCreditsPending } = useFetchMovieItem(
    `/movie/${id}/credits?language=en-US`,
    `${id}_credits`,
  );

  const { data: movieVideo, isPending: isVideoPending } = useFetchMovieItem(
    `/movie/${id}/videos?language=en-US)`,
    `${id}_videos`,
  );

  const { data: similarMovies, isPending: isSimilarPending } =
    useFetchMovieItem(
      `/movie/${id}/similar?language=en-US&page=1`,
      `${id}_similar`,
    );

  const { data: reviews, isPending: isReviewsPending } = useFetchMovieItem(
    `/movie/${id}/reviews?language=en-US&page=1`,
    `${id}_reviews`,
  );

  return (
    <div className="mt-[23rem] grid grid-cols-3 items-start gap-x-3 gap-y-6 pt-4 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 md:pt-8 lg:gap-x-6 lg:gap-y-8 2xl:grid-cols-4">
      <HomePoster path={movie?.backdrop_path} className="pt-[40rem]" />
      <section className="row-span-2">
        {isMoviePending ? (
          <Skeleton className={"aspect-2/3 rounded-lg"} />
        ) : (
          <Poster path={movie.poster_path} preview={true} />
        )}
        {isMoviePending ? (
          <Skeleton
            className={"mt-2 h-4.5 w-20 justify-self-center rounded-lg lg:h-7"}
          />
        ) : (
          <Rating
            rating={movie?.vote_average}
            className={"justify-self-center pt-2"}
          />
        )}
      </section>

      <section className="col-span-2 flex flex-col gap-8 sm:col-span-3 md:col-span-2 2xl:col-span-3">
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
          <Title level={3}>Overview</Title>
          {isMoviePending ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className={"aspect-50/1"} />
            ))
          ) : (
            <Paragraph type={"secondary"}>{movie?.overview}</Paragraph>
          )}
        </div>
      </section>
      <section className="col-span-full flex flex-col gap-2 lg:hidden 2xl:col-span-3">
        <Title level={3}>Overview</Title>
        {isMoviePending ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className={"aspect-30/1"} />
          ))
        ) : (
          <Paragraph type={"secondary"}>{movie?.overview}</Paragraph>
        )}
      </section>
      {token && (
        <section className="col-span-full flex flex-wrap items-center gap-2">
          <>
            <ListDropdownButton item={movie || []} />
            <SetFavourite item={movie || []} />
          </>
          <Imdb id={movie?.imdb_id} />
        </section>
      )}

      <section className="col-span-full">
        {isVideoPending ? (
          <Skeleton className={"aspect-video"} />
        ) : (
          <Videos videoData={movieVideo} />
        )}
      </section>

      <section className="col-span-full flex flex-col gap-2 lg:row-start-4">
        {isCreditsPending ? (
          [...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className={"aspect-12/1 md:aspect-15/1 lg:aspect-23/1"}
            />
          ))
        ) : (
          <CastOverview people={credits} />
        )}
      </section>
      <section className="col-span-full">
        <Title level={3}>Cast</Title>
        <PeopleList people={credits?.cast} isPending={isCreditsPending} />
      </section>
      <section className="col-span-full">
        <ImageGrid id={id} />
      </section>
      <section className="col-span-full">
        <Keywords id={id} />
      </section>
      <section className="col-span-full">
        <Tagline tagline={movie?.tagline} isPending={isMoviePending} />
      </section>
      <section className="col-span-full">
        <Languages movieLanguages={movie?.spoken_languages} />
      </section>
      {similarMovies?.results?.length > 0 && (
        <section className="col-span-full">
          <PosterList
            title={"Similar movies"}
            movies={similarMovies?.results || []}
            isPending={isSimilarPending}
          />
        </section>
      )}
      {(isReviewsPending || reviews?.results?.length !== 0) && (
        <section className="col-span-full">
          <Reviews reviews={reviews?.results} isPending={isReviewsPending} />
        </section>
      )}
    </div>
  );
}

export default FilmInfo;
