import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { useSelector } from "react-redux";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";

import Poster from "../Poster";
import TitleOverview from "../TitleOverview";
import CastOverview from "../CastOverview";
import Highlight from "./MovieHighlight";
import Videos from "../Videos";
import ImageGrid from "../ImageGrid";
import Title from "../../ui/Title";
import PeopleList from "../person/PeopleList";
import Tagline from "../Tagline";
import Languages from "../Languages";
import ListDropdownButton from "../ListDropdownButton";
import Keywords from "../Keywords";

import useWindowWidth from "../../hooks/useWindowWidth";
import { useFetchMovieItem } from "../../hooks/moviedb/useFetchMovieItem";
import SetFavourite from "../SetFavourite";

function FilmInfo({ movie }) {
  const token = useSelector((state) => state.auth.token);
  const id = movie.id;

  const width = useWindowWidth();
  const { data: movieImages, isPending: isImagesPending } = useFetchMovieItem(
    `/movie/${id}/images`,
    `${id}_images`,
  );

  const { data: movieVideo, isPending: isVideoPending } = useFetchMovieItem(
    `/movie/${id}/videos?language=en-US)`,
    `${id}_videos`,
  );

  const { data: credits, isPending: isCreditsPending } = useFetchMovieItem(
    `/movie/${id}/credits?language=en-US`,
    `${id}_credits`,
  );

  const { data: keywords, isPending: isKeywordsPending } = useFetchMovieItem(
    `/movie/${id}/keywords`,
    `${id}_keywords`,
  );

  return (
    <div className="grid grid-cols-3 items-start gap-x-3 gap-y-6 pt-4 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 md:pt-8 lg:gap-x-6 lg:gap-y-8 2xl:grid-cols-4">
      <section className="flex flex-col items-center gap-2">
        <Poster path={movie?.poster_path} preview={true} />
        <Highlight movie={movie} />
      </section>

      <section className="col-span-2 flex flex-col gap-4 sm:col-span-3 md:col-span-2 2xl:col-span-3">
        <TitleOverview movie={movie} />
        {width >= 1024 && <CastOverview />}

        {width >= 1024 && <Highlight movie={movie} />}
      </section>
      <section className="col-span-full flex flex-wrap justify-center gap-2">
        {token && (
          <>
            <ListDropdownButton item={movie} />
            <SetFavourite item={movie} />
          </>
        )}
      </section>

      <section className="col-span-full 2xl:col-span-3">
        {!isVideoPending && <Videos videoData={movieVideo} />}
      </section>

      {width < 1024 && (
        <section className="col-span-full">
          {!isCreditsPending && <CastOverview people={credits} />}
        </section>
      )}

      <section className="col-span-full 2xl:col-start-4">
        <Title level={3}>Top Cast</Title>
        {!isCreditsPending && (
          <PeopleList
            people={credits.cast}
            className={"2xl:grid 2xl:grid-cols-3"}
          />
        )}
      </section>

      <section className="col-span-full">
        {!isImagesPending && <ImageGrid images={movieImages} />}
      </section>

      <section className="col-span-full">
        {!isKeywordsPending && <Keywords keywords={keywords.keywords} />}
      </section>

      <section className="col-span-full">
        <Tagline tagline={movie?.tagline} />
      </section>

      <section className="col-span-full">
        <Languages movieLanguages={movie?.spoken_languages} />
      </section>

      <section className="col-span-full">
        {width < 1024 && <Highlight movie={movie} />}
      </section>
    </div>
  );
}

export default FilmInfo;
