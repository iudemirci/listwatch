import { useLocation, useParams } from "react-router-dom";

import Title from "../../ui/Title";
import GenreList from "../shared/GenreList";
import MovieHighlight from "../movie/MovieHighlight";
import SeriesHighlight from "../series/SeriesHighlight";
import LinkToId from "../../ui/LinkToId";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import Paragraph from "../../ui/Paragraph";

function TitleOverview({ movie }) {
  const type = useLocation().pathname.split("/")[1];
  const { id } = useParams("id");
  const { data: credits, isPending: isCreditsPending } = useMovieDB(
    type,
    id,
    "credits",
  );
  const director =
    credits?.crew?.find((person) => person?.job === "Director") || {};

  return (
    <>
      <div className={"flex flex-col gap-2.5"}>
        <LinkToId type={type} item={movie}>
          <Title level={2} className={"hover:text-primary duration-300"}>
            {movie?.title || movie?.name}
          </Title>
        </LinkToId>

        <div className="flex flex-col gap-3">
          <GenreList genres={movie.genres} />
        </div>

        {type === "tv" ? (
          <SeriesHighlight series={movie} />
        ) : (
          <MovieHighlight movie={movie} director={director} />
        )}
      </div>
    </>
  );
}

export default TitleOverview;
