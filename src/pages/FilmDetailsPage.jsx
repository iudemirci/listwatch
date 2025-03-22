import { Spin } from "antd";
import { useParams } from "react-router-dom";

import FilmInfo from "../components/movie/FilmInfo";

import { useFetchMovieItem } from "../hooks/moviedb/useFetchMovieItem";

function FilmDetailsPage() {
  const { id } = useParams("id");

  const { data: movie, isPending: isMoviePending } = useFetchMovieItem(
    `/movie/${Number(id)}?language=en-US`,
    id,
  );

  if (isMoviePending) return <Spin />;

  return <FilmInfo movie={movie} isMoviePending={isMoviePending} />;
}

export default FilmDetailsPage;
