import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import api from "../axios/axiosInstance";

import Button from "./Button";
import PaddingBottom from "./PaddingBottom";
import Title from "./Title";
import Paragraph from "./Paragraph";
import MoviePoster from "./MoviePoster";
import LinkToMovie from "./LinkToMovie";

function AllFilmsList() {
  const [offset, setOffset] = useState(1);
  const [movies, setMovies] = useState([]);
  const { movieGenres } = useContext(MoviesContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(
          `/movie/top_rated?language=en-US&page=${offset}`,
        );
        setMovies(res.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [offset]);

  function handlePrev() {
    if (offset === 1) return;
    setOffset(offset - 1);
  }
  function handleNext() {
    setOffset(offset + 1);
  }

  return (
    <PaddingBottom>
      <div className="flex items-center justify-between py-4">
        <Title level={3}>Movies</Title>
        <select className="rounded-2xl bg-zinc-800 p-1 px-1.5 text-xs font-semibold focus:outline-0">
          {movieGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-center gap-4">
        <ul className="grid grid-cols-4 gap-1.5 lg:grid-cols-5">
          {movies.map((movie) => (
            <li key={movie.id} className="rounded-xs border-2 border-zinc-800">
              <LinkToMovie movieID={movie?.id}>
                <MoviePoster path={movie?.poster_path} />
              </LinkToMovie>
            </li>
          ))}
        </ul>
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
      </div>
    </PaddingBottom>
  );
}

export default AllFilmsList;
