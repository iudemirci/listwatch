import { useParams } from "react-router-dom";

import TitleOverview from "../shared/TitleOverview";
import CastOverview from "../shared/CastOverview";
import Poster from "../Poster";
import Videos from "../shared/Videos";
import PeopleList from "../person/PeopleList";
import ImageGrid from "../shared/ImageGrid";
import Languages from "../shared/Languages";
import Tagline from "../shared/Tagline";
import Rating from "../shared/Rating";
import ListDropdownButton from "../ListDropdownButton";
import SetFavourite from "../SetFavourite";
import Skeleton from "../../ui/Skeleton";
import Title from "../../ui/Title";
import Paragraph from "../../ui/Paragraph";
import Keywords from "../shared/Keywords";
import Imdb from "../../ui/Imdb";
import PosterList from "../shared/PosterList";
import EpisodeInfo from "./EpisodeInfo";
import Reviews from "../shared/reviews/Reviews";

import useDocumentTitle from "../../hooks/useDocumentTitle";
import { getYear } from "../../utilities/getYear";
import { useMovieDB } from "../../hooks/moviedb/useMovieDB";

function TvInfo() {
  const { id } = useParams("id");
  const token = localStorage.getItem("token");

  const { data: series, isPending: isSeriesPending } = useMovieDB(
    "tv",
    id,
    "item",
  );

  //document title
  useDocumentTitle(
    `${series?.name} (${getYear(series?.first_air_date)}) | list&watch`,
    isSeriesPending,
  );

  const { data: credits, isPending: isCreditsPending } = useMovieDB(
    "tv",
    id,
    "credits",
  );
  const { data: seriesVideo, isPending: isVideoPending } = useMovieDB(
    "tv",
    id,
    "videos",
  );
  const { data: reviews, isPending: isReviewsPending } = useMovieDB(
    "tv",
    id,
    "reviews",
  );
  const { data: similarSeries, isPending: isSimilarPending } = useMovieDB(
    "tv",
    id,
    "similar",
  );

  return (
    <div className="grid grid-cols-3 items-start gap-x-3 gap-y-6 pt-4 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 md:pt-8 lg:gap-x-6 lg:gap-y-8 2xl:grid-cols-4">
      <div className="row-span-2">
        {isSeriesPending ? (
          <Skeleton className={"aspect-2/3 rounded-lg"} />
        ) : (
          <Poster path={series.poster_path} preview={true} />
        )}
        {isSeriesPending ? (
          <Skeleton
            className={"mt-2 h-4.5 w-20 justify-self-center rounded-lg lg:h-7"}
          />
        ) : (
          <Rating
            rating={series?.vote_average}
            className={"justify-self-center pt-2"}
          />
        )}
      </div>

      <section className="col-span-2 flex flex-col gap-8 sm:col-span-3 md:col-span-2 2xl:col-span-3">
        <div className="flex flex-col gap-2">
          {isSeriesPending ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className={"aspect-24/1"} />
            ))
          ) : (
            <TitleOverview movie={series} type="series" />
          )}
        </div>
        <div className="hidden flex-col gap-2 lg:flex">
          <Title level={3}>Overview</Title>
          {isSeriesPending ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className={"aspect-50/1"} />
            ))
          ) : (
            <Paragraph type={"secondary"}>{series?.overview}</Paragraph>
          )}
        </div>
      </section>

      <section className="col-span-full flex flex-col gap-2 lg:hidden 2xl:col-span-3">
        <Title level={3}>Overview</Title>
        {isSeriesPending ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className={"aspect-30/1"} />
          ))
        ) : (
          <Paragraph type={"secondary"}>{series?.overview}</Paragraph>
        )}
      </section>
      {token && (
        <section className="col-span-full flex flex-wrap items-center gap-2">
          <>
            <ListDropdownButton item={series || []} />
            <SetFavourite item={series || []} />
          </>
          <Imdb />
        </section>
      )}
      <section className="col-span-full">
        {isVideoPending ? (
          <Skeleton className={"aspect-video rounded-lg"} />
        ) : (
          <Videos videoData={seriesVideo} />
        )}
      </section>

      <section className="col-span-full flex flex-col gap-2 lg:row-start-4">
        {isCreditsPending ? (
          [...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className={"aspect-12/1 md:aspect-15/1 lg:aspect-31/1"}
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
        <EpisodeInfo id={id} series={series} isPending={isSeriesPending} />
      </section>

      <section className="col-span-full">
        <ImageGrid id={id} type="tv" />
      </section>

      <section className="col-span-full">
        <Keywords id={id} type="tv" />
      </section>

      <section className="col-span-full">
        <Tagline tagline={series?.tagline} isPending={isSeriesPending} />
      </section>

      <section className="col-span-full">
        <Languages
          movieLanguages={series?.spoken_languages}
          isPending={isSeriesPending}
        />
      </section>

      <section className="col-span-full">
        <PosterList
          title={"Similar series"}
          movies={similarSeries || []}
          isPending={isSimilarPending}
        />
      </section>

      {reviews?.results?.length > 0 && (
        <section className="col-span-full">
          <Reviews reviews={reviews} isPending={isReviewsPending} />
        </section>
      )}
    </div>
  );
}

export default TvInfo;
