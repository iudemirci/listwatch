import { mdiPlayCircleOutline, mdiShare } from "@mdi/js";
import Icon from "@mdi/react";
import dayjs from "dayjs";
import { AnimatePresence } from "motion/react";

import Title from "../../ui/Title";
import LinkToId from "../../ui/LinkToId";
import GenreList from "../shared/GenreList";
import VoteCountPopularity from "./VoteCountPopularity";
import PosterRibbon from "../PosterRibbon";
import PopupBlur from "../../ui/PopupBlur";
import Skeleton from "../../ui/Skeleton";
import Videos from "../shared/Videos";

import { useFetchGenres } from "../../hooks/moviedb/useFetchGenres";
import { useTrailerPopover } from "../../hooks/useTrailerPopover";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const SIZE = "/w780";

function MovieDetailCard({ movie }) {
  const { data: genres, isPending: isGenresPending } = useFetchGenres(
    movie?.id,
  );

  const movieGenres =
    !isGenresPending &&
    genres.filter((genre) => movie.genre_ids.includes(genre.id));

  const { isOpen, setIsOpen, setShouldFetch, isPending, movieTrailer } =
    useTrailerPopover({
      id: movie?.id,
      type: movie?.release_date ? "movie" : "tv",
    });

  return (
    <>
      <LinkToId type={"movie"} item={movie} className="relative">
        <div className="bg-grey-secondary/70 hover:bg-grey-secondary h-full cursor-pointer rounded-xl duration-300">
          <div
            className="group/slide relative h-40 w-full overflow-hidden rounded-lg sm:h-50 md:h-35 lg:h-40 2xl:h-45"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }}
            onMouseEnter={() => setShouldFetch(true)}
          >
            <img
              src={`${BASE_URL}${SIZE}${movie?.backdrop_path}`}
              alt={`${movie?.title} backdrop`}
              loading="lazy"
              className="size-full object-cover"
            />
            <div
              className="absolute inset-0 z-2"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)`,
              }}
            />
            <PosterRibbon size="big" poster={true} />
            <Icon
              path={mdiPlayCircleOutline}
              size={1.4}
              className="group-hover/slide:text-primary absolute bottom-1 left-1 z-3 shrink-0 duration-300"
            />
          </div>

          <div className="col-span-3 flex flex-col p-3 sm:col-span-4">
            <Title level={7} type="grey">
              {dayjs(movie?.release_date).format("MMM DD")}
            </Title>

            <div className="gap-1">
              <Title level={6} className={"line-clamp-1 hover:underline"}>
                {movie?.title}
              </Title>
            </div>

            <div className="pt-3">
              <VoteCountPopularity
                popularity={movie?.popularity}
                vote={movie?.vote_count}
              />
            </div>

            <div className="pt-1">
              <GenreList genres={movieGenres} max={2} type="movie" />
            </div>

            <Icon
              path={mdiShare}
              size={1}
              className="text-grey-primary group-hover:text-primary absolute right-3 bottom-3 duration-300"
            />
          </div>
        </div>
      </LinkToId>

      <AnimatePresence>
        {isOpen && (
          <PopupBlur setIsOpen={setIsOpen}>
            <div className="w-175" onClick={(e) => e.stopPropagation()}>
              {isPending ? (
                <Skeleton className="aspect-video rounded-lg" />
              ) : (
                <Videos movieTrailer={movieTrailer} />
              )}
            </div>
          </PopupBlur>
        )}
      </AnimatePresence>
    </>
  );
}

export default MovieDetailCard;
