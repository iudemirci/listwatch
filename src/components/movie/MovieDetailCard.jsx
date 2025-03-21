import Paragraph from "../../ui/Paragraph";
import PaddingBottom from "../../ui/PaddingBottom";
import Title from "../../ui/Title";
import MoviePoster from "../Poster";
import LinkToMovie from "../../ui/LinkToId";
import GenreList from "../GenreList";
import { useFetchGenres } from "../../hooks/moviedb/useFetchGenres";
import { Spin } from "antd";

function MovieDetailCard({ movies }) {
  const { data: genres, isPending: isGenresPending } = useFetchGenres();

  if (isGenresPending) return <Spin />;

  return (
    <PaddingBottom>
      <Title level={3}>In Theaters</Title>
      <div className="grid gap-4 pt-2 lg:grid-cols-2 2xl:pt-4">
        {movies.slice(0, 6).map((movie) => {
          const movieGenres = genres.filter((genre) =>
            movie.genre_ids.includes(genre.id),
          );
          const movieGenreNames = movieGenres.map((genre) => genre.name);
          return (
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
                </div>

                <div className="flex gap-1 lg:gap-1.5">
                  <GenreList genres={movieGenreNames} />
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
          );
        })}
      </div>
    </PaddingBottom>
  );
}

export default MovieDetailCard;
