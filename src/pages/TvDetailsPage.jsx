import { useParams } from "react-router-dom";
import TvInfo from "../components/series/TvInfo";

import { useFetchMovieItem } from "../hooks/moviedb/useFetchMovieItem";
import { Spin } from "antd";
import { useFetchMovieDB } from "../hooks/moviedb/useFetchMovieDB";

function TvDetailsPage() {
  const { id } = useParams("id");

  const { data: series, isPending: isSeriesPending } = useFetchMovieItem(
    `/tv/${Number(id)}?language=en-US`,
    id,
  );

  const { data: popularPeople, isPending: isPeoplePending } = useFetchMovieDB(
    "/trending/person/day?language=en-US",
    `${id}_cast`,
  );

  if (isSeriesPending || isPeoplePending) return <Spin />;

  return <TvInfo series={series} cast={popularPeople} />;
}

export default TvDetailsPage;
