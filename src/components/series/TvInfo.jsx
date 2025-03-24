import { useSelector } from "react-redux";
import { capitalize } from "lodash";

import TitleOverview from "../TitleOverview";
import CastOverview from "../CastOverview";
import Highlight from "../movie/MovieHighlight";
import Poster from "../Poster";
import Videos from "../Videos";
import PeopleList from "../person/PeopleList";
import ImageGrid from "../ImageGrid";
import Languages from "../Languages";
import Tagline from "../Tagline";
import Button from "../../ui/Button";
import Flex from "../../ui/Flex";
import ListItem from "../ListItem";
import Rating from "../Rating";
import ListDropdownButton from "../ListDropdownButton";
import SetFavourite from "../SetFavourite";
import Skeleton from "../../ui/Skeleton";
import Title from "../../ui/Title";
import Paragraph from "../../ui/Paragraph";
import Keywords from "../Keywords";

import { useFetchMovieItem } from "../../hooks/moviedb/useFetchMovieItem";
import useWindowWidth from "../../hooks/useWindowWidth";
import PosterList from "../PosterList";
import EpisodeInfo from "./EpisodeInfo";

function TvInfo({ id, series, isSeriesPending }) {
  // console.log(series);
  const token = useSelector((state) => state.auth.token);
  const width = useWindowWidth();

  const { data: credits, isPending: isCreditsPending } = useFetchMovieItem(
    `/tv/${id}/aggregate_credits?language=en-US`,
    `${id}_cast`,
  );

  const { data: seriesVideo, isPending: isVideoPending } = useFetchMovieItem(
    `/tv/${id}/videos?language=en-US`,
    `${id}_videos`,
  );

  const { data: similarSeries, isPending: isSimilarPending } =
    useFetchMovieItem(
      `/tv/${id}/similar?language=en-US&page=1`,
      `${id}_similar`,
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

      <section className="col-span-full flex flex-wrap items-center gap-2">
        {token && (
          <>
            <ListDropdownButton item={series || []} />
            <SetFavourite item={series || []} />
          </>
        )}
      </section>
      {seriesVideo?.length > 0 ? (
        <section className="col-span-full">
          {isVideoPending ? (
            <Skeleton className={"aspect-video rounded-lg"} />
          ) : (
            <Videos videoData={seriesVideo} />
          )}
        </section>
      ) : null}

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
          movies={similarSeries?.results || []}
          type="tv"
          isPending={isSimilarPending}
        />
      </section>
    </div>
  );
}

export default TvInfo;
