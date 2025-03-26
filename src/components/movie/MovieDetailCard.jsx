import { useEffect, useState } from "react";
import { mdiShare } from "@mdi/js";
import Icon from "@mdi/react";

import Paragraph from "../../ui/Paragraph";
import Title from "../../ui/Title";
import MoviePoster from "../Poster";
import LinkToId from "../../ui/LinkToId";
import GenreList from "../GenreList";

import { useFetchGenres } from "../../hooks/moviedb/useFetchGenres";
import Skeleton from "../../ui/Skeleton";
import { useFetchMovieDB } from "../../hooks/moviedb/useFetchMovieDB";

const moviesLoadedPerScroll = 2;

function MovieDetailCard() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const { data: genres, isPending: isGenresPending } = useFetchGenres();

  const { data: movies, isPending } = useFetchMovieDB(
    "/movie/now_playing",
    "inTheaters",
  );

  // adding to the count with a timeout to imitate lazy loading
  function loadMoreItems() {
    if (isLoading || visibleCount >= movies.length) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) =>
        Math.min(prevCount + moviesLoadedPerScroll, movies.length),
      );
      setIsLoading(false);
    }, 250);
  }

  // listening window
  useEffect(() => {
    const handleScroll = () => {
      const scrollBottomThreshold = 50;

      const isNearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - scrollBottomThreshold;

      if (isNearBottom && !isLoading && visibleCount < movies?.length) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, visibleCount, movies?.length]);

  return (
    <>
      <Title level={3} className={"pb-2 2xl:pb-4"}>
        In Theaters
      </Title>
      <div className="grid gap-2 pb-8 md:pb-8 lg:grid-cols-2 lg:pb-10">
        {isPending
          ? [...Array(visibleCount)].map((_, i) => (
              <Skeleton
                key={i}
                className={
                  "aspect-video rounded-xl sm:aspect-3/1 lg:aspect-2/1 2xl:aspect-3/1"
                }
              />
            ))
          : movies?.slice(0, visibleCount).map((movie, i) => {
              // Destructring genres
              const movieGenres =
                !isGenresPending &&
                genres.filter((genre) => movie.genre_ids.includes(genre.id));

              return (
                <LinkToId key={movie.id} movieID={movie?.id}>
                  <div className="group bg-grey-secondary/75 hover:bg-grey-secondary relative grid h-full cursor-pointer grid-cols-5 gap-2 rounded-xl p-3 duration-300 2xl:gap-4">
                    <MoviePoster
                      path={movie?.poster_path}
                      className={"col-span-2 sm:col-span-1"}
                    />
                    <div className="col-span-3 flex flex-col gap-1.5 sm:col-span-4">
                      <div className="gap-1">
                        <Title level={4} className={"line-clamp-1"}>
                          {movie?.title}
                        </Title>
                      </div>

                      <div className="flex gap-1 lg:gap-1.5">
                        <GenreList genres={movieGenres} max={2} />
                      </div>

                      <div>
                        <Paragraph
                          type={"secondary"}
                          className={"line-clamp-7 sm:line-clamp-3"}
                        >
                          {movie?.overview}
                        </Paragraph>
                      </div>
                      <div className="flex items-center gap-1">
                        <Paragraph type={"secondary"}>Release Date:</Paragraph>
                        <Paragraph type={"primary"}>
                          {movie?.release_date}
                        </Paragraph>
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
            })}
        {isLoading &&
          [...Array(moviesLoadedPerScroll)].map((_, i) => (
            <Skeleton
              key={i}
              className={
                "aspect-video rounded-xl sm:aspect-3/1 lg:aspect-2/1 2xl:aspect-3/1"
              }
            />
          ))}
      </div>
    </>
  );
}

export default MovieDetailCard;
