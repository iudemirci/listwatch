import { mdiShare } from "@mdi/js";
import Icon from "@mdi/react";
import dayjs from "dayjs";

import Title from "../../ui/Title";
import LinkToId from "../../ui/LinkToId";
import GenreList from "../shared/GenreList";
import VoteCountPopularity from "./VoteCountPopularity";

import { useFetchGenres } from "../../hooks/moviedb/useFetchGenres";
import PosterRibbon from "../PosterRibbon";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const SIZE = "/w780";

function MovieDetailCard({ movie }) {
  const { data: genres, isPending: isGenresPending } = useFetchGenres();

  const movieGenres =
    !isGenresPending &&
    genres.filter((genre) => movie.genre_ids.includes(genre.id));

  return (
    <LinkToId type={"movie"} item={movie} className="relative">
      <div className="group bg-grey-secondary/70 hover:bg-grey-secondary h-full cursor-pointer rounded-xl duration-300">
        <div className="h-40 w-full overflow-hidden rounded-lg sm:h-50 md:h-35 lg:h-40 2xl:h-45">
          <img
            src={`${BASE_URL}${SIZE}${movie?.backdrop_path}`}
            alt={`${movie?.title} backdrop`}
            loading="lazy"
            className="size-full object-cover"
          />
          <PosterRibbon size="big" />
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
            <GenreList genres={movieGenres} max={2} />
          </div>

          <Icon
            path={mdiShare}
            size={1}
            className="text-grey-primary group-hover:text-primary absolute right-3 bottom-3 duration-300"
          />
        </div>
      </div>
    </LinkToId>
  );
}

export default MovieDetailCard;
