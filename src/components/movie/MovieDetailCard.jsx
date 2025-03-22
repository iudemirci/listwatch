import Icon from "@mdi/react";
import { mdiShare } from "@mdi/js";
import { Spin } from "antd";

import Paragraph from "../../ui/Paragraph";
import PaddingBottom from "../../ui/PaddingBottom";
import Title from "../../ui/Title";
import MoviePoster from "../Poster";
import LinkToMovie from "../../ui/LinkToId";
import GenreList from "../GenreList";

import { useFetchGenres } from "../../hooks/moviedb/useFetchGenres";
import { useEffect, useRef, useState } from "react";

function MovieDetailCard({ movies }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const { data: genres, isPending: isGenresPending } = useFetchGenres();

  // adding to the count with a timeout to imitate lazy loading
  function loadMoreItems() {
    if (isLoading || visibleCount >= movies.length) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => Math.min(prevCount + 4, movies.length));
      setIsLoading(false);
    }, 500);
  }

  // listening window
  useEffect(() => {
    const handleScroll = () => {
      const scrollBottomThreshold = 100;

      const isNearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - scrollBottomThreshold;

      if (isNearBottom && !isLoading && visibleCount < movies.length) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, visibleCount, movies.length]);

  if (isGenresPending) return <Spin />;

  return (
    <PaddingBottom>
      <Title level={3}>In Theaters</Title>
      {movies.slice(0, visibleCount).map((movie) => {
        // Destructring genres
        const movieGenres = genres.filter((genre) =>
          movie.genre_ids.includes(genre.id),
        );

        return (
          <LinkToMovie
            key={movie?.id}
            movieID={movie?.id}
            className={"grid gap-4 pt-2 lg:grid-cols-2 2xl:pt-4"}
          >
            <div className="group bg-grey-secondary/75 hover:bg-grey-secondary grid cursor-pointer grid-cols-5 gap-2 rounded-xl p-2 duration-300 2xl:gap-4">
              <MoviePoster
                path={movie?.poster_path}
                className={"col-span-2 self-center"}
              />
              <div className="col-span-3 flex flex-col gap-1">
                <div className="flex flex-wrap items-end gap-1">
                  <Title level={4}>{movie?.title}</Title>
                </div>

                <div className="flex gap-1 lg:gap-1.5">
                  <GenreList genres={movieGenres} />
                </div>

                <div>
                  <Paragraph type={"secondary"}>
                    {movie?.overview.slice(0, 189)}
                    {movie?.overview.length > 189 && "..."}
                  </Paragraph>
                </div>
                <div className="flex items-center gap-1">
                  <Paragraph type={"secondary"}>Release Date:</Paragraph>
                  <Paragraph type={"primary"}>{movie?.release_date}</Paragraph>
                </div>
                <Icon
                  path={mdiShare}
                  size={1}
                  className="text-grey-primary group-hover:text-primary duration-300"
                />
              </div>
            </div>
          </LinkToMovie>
        );
      })}
      {isLoading && <Spin />}
    </PaddingBottom>
  );
}

export default MovieDetailCard;
