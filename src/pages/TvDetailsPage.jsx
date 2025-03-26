import { useParams } from "react-router-dom";
import TvInfo from "../components/series/TvInfo";

import { useFetchMovieItem } from "../hooks/moviedb/useFetchMovieItem";

function TvDetailsPage() {
  const { id } = useParams("id");

  const { data: series, isPending: isSeriesPending } = useFetchMovieItem(
    `/tv/${Number(id)}?language=en-US`,
    id,
  );

  return <TvInfo id={id} series={series} isSeriesPending={isSeriesPending} />;
}

export default TvDetailsPage;
