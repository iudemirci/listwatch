import { Spin } from "antd";
import TopList from "../components/topmovies/TopList";
import { useFetchMovieDB } from "../hooks/moviedb/useFetchMovieDB";
import Button from "../ui/Button";
import Paragraph from "../ui/Paragraph";
import { useState } from "react";
import SortingBar from "../components/topmovies/SortingBar";
import { useFetchGenres } from "../hooks/moviedb/useFetchGenres";

function Films() {
  const [offset, setOffset] = useState(1);
  const [genre, setGenre] = useState(null);
  let url = `discover/movie?language=en-US&page=${offset}&sort_by=vote_average.desc&vote_count.gte=200`;

  const { data: genres, isPending: isGenresPending } = useFetchGenres();
  const {
    data: movies,
    isPending: isMoviesPending,
    refetch,
  } = useFetchMovieDB(url, `topMovies_${offset}`);

  if (genre) {
    url += `&with_genres=${genre}`;
    refetch();
  }
  console.log(url);

  function handlePrev() {
    if (offset === 1) return;
    setOffset(offset - 1);
  }
  function handleNext() {
    setOffset(offset + 1);
  }

  if (isMoviesPending) return <Spin />;

  return (
    <section>
      {!isGenresPending && (
        <SortingBar setGenre={setGenre} genres={genres} refetch={refetch} />
      )}
      <TopList movies={movies} />
      <div className="center relative flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Button className={"px-4 py-0 text-lg"} onClick={handlePrev}>
            &larr;
          </Button>
          <Button className={"px-4 py-0 text-lg"} onClick={handleNext}>
            &rarr;
          </Button>
        </div>

        <div>
          <Paragraph>Page {offset}</Paragraph>
        </div>
      </div>
    </section>
  );
}

export default Films;
