import LinkToMovie from "./LinkToMovie";
import MovieGenreList from "./MovieGenreList";
import Paragraph from "./Paragraph";
import Title from "./Title";

function MovieTitleOverview({ movie }) {
  return (
    <div className={"flex flex-col gap-4"}>
      <LinkToMovie movieID={movie?.id}>
        <Title level={2} className={"text-zinc-500"}>
          {movie?.title}
        </Title>
      </LinkToMovie>
      <div className="flex flex-col gap-3">
        <MovieGenreList genresArr={movie?.genres} />

        <div className="flex flex-col gap-2">
          <Paragraph type={"secondary"}>{movie?.overview}</Paragraph>
        </div>
      </div>
    </div>
  );
}

export default MovieTitleOverview;
