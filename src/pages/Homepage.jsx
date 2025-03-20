import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

import HomePoster from "../components/HomePoster";
import GreetingText from "../components/GreetingText";
import GuideTable from "../components/GuideTable";
import MoviesList from "../components/PosterList";
import PeopleList from "../components/person/PeopleList";
import MovieDetailCard from "../components/movie/MovieDetailCard";
import { useFetchMovieDB } from "../hooks/moviedb/usePopularMovies";
import { Spin } from "antd";

function Homepage() {
  const { data: popularMovies, isPending: isPopularMoviesPending } =
    useFetchMovieDB("/trending/movie/day?language=en-US", "popularMovies");
  const { data: popularPeople, isPending: isPeoplePending } = useFetchMovieDB(
    "/trending/person/day?language=en-US",
    "popularPeople",
  );
  const { data: popularSeries, isPending: isPopularSeriesPending } =
    useFetchMovieDB("/trending/tv/day?language=en-US", "popularSeries");

  const { data: inTheaters, isPending: isInTheatersPending } = useFetchMovieDB(
    "/movie/now_playing",
    "inTheaters",
  );

  if (
    isPopularMoviesPending ||
    isPeoplePending ||
    isPopularSeriesPending ||
    isInTheatersPending
  )
    return <Spin />;
  return (
    <>
      <HomePoster movies={popularMovies} />
      <GreetingText />
      <MoviesList movies={popularMovies} title={"Trending Movies"} />
      <GuideTable />
      <PeopleList
        people={popularPeople}
        title={"Trending People"}
        className={"pb-8"}
      />
      <MoviesList
        type="tv"
        movies={popularSeries}
        title={"Trending Series"}
        autoPlay={9000}
      />
      <MovieDetailCard movies={inTheaters} />
    </>
  );
}

export default Homepage;
