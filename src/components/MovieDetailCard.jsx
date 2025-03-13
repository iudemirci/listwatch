import Paragraph from "./Paragraph";
import PaddingBottom from "./PaddingBottom";
import Title from "./Title";
import MovieRating from "./MovieRating";
import MovieGenreButton from "./MovieGenreButton";
import MoviePoster from "./MoviePoster";
import LinkToMovie from "./LinkToMovie";

function MovieDetailCard({ movies }) {
  return (
    <PaddingBottom>
      <Title level={3}>In Theaters</Title>
      <div className="grid gap-4 pt-2 lg:grid-cols-2 2xl:pt-4">
        {movies.slice(0, 6).map((movie) => (
          <div key={movie.id} className="grid grid-cols-4 gap-2 2xl:gap-4">
            <LinkToMovie movieID={movie?.id}>
              <MoviePoster
                path={movie?.poster_path}
                className={"border-1 border-zinc-800"}
              />
            </LinkToMovie>
            <div className="col-span-3 flex flex-col gap-2">
              <div className="flex flex-wrap items-end gap-1">
                <LinkToMovie movieID={movie?.id}>
                  <Title level={4}>{movie?.title}</Title>
                </LinkToMovie>

                <MovieRating rating={movie?.vote_average} />
              </div>

              <div className="flex gap-1 lg:gap-1.5">
                {movie?.genre_ids.map((id) => (
                  <MovieGenreButton key={id} id={id} />
                ))}
              </div>

              <div className="line-clamp-5 overflow-hidden text-ellipsis">
                <Paragraph type={"primary"}>{movie?.overview}</Paragraph>
              </div>
              <div className="flex gap-1">
                <Paragraph type={"secondary"}>Release Date:</Paragraph>
                <Paragraph type={"primary"}>{movie?.release_date}</Paragraph>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PaddingBottom>
  );
}

export default MovieDetailCard;
