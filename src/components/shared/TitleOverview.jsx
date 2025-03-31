import { useLocation } from "react-router-dom";

import Title from "../../ui/Title";
import GenreList from "../shared/GenreList";
import MovieHighlight from "../movie/MovieHighlight";
import SeriesHighlight from "../series/SeriesHighlight";
import LinkToId from "../../ui/LinkToId";

function TitleOverview({ movie }) {
  const type = useLocation().pathname.split("/")[1];
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
          <MovieHighlight movie={movie} />
        )}
      </div>
    </>
  );
}

export default TitleOverview;
