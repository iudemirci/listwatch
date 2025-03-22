import { Link } from "react-router-dom";

import Title from "../ui/Title";
import GenreList from "./GenreList";
import MovieHighlight from "./movie/MovieHighlight";

function TitleOverview({ movie }) {
  return (
    <>
      <div className={"flex flex-col gap-2.5"}>
        <Link to={`/films/${movie.id}`}>
          <Title
            level={2}
            className={"hover:text-primary text-zinc-500 duration-300"}
          >
            {movie?.title || movie?.name}
          </Title>
        </Link>

        <div className="flex flex-col gap-3">
          <GenreList genres={movie.genres} />
        </div>

        <MovieHighlight movie={movie} />
      </div>
    </>
  );
}

export default TitleOverview;
