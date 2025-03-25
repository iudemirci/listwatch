import { Spin } from "antd";

import HomePoster from "../components/HomePoster";
import GreetingText from "../components/GreetingText";
import GuideTable from "../components/GuideTable";
import PosterList from "../components/PosterList";
import PeopleList from "../components/person/PeopleList";
import MovieDetailCard from "../components/movie/MovieDetailCard";

import { useFetchMovieDB } from "../hooks/moviedb/useFetchMovieDB.js";

function Homepage() {
  const { data: popularMovies, isPending: isPopularMoviesPending } =
    useFetchMovieDB("/trending/movie/day?language=en-US", "popularMovies");

  const { data: popularPeople, isPending: isPeoplePending } = useFetchMovieDB(
    "/trending/person/day?language=en-US",
    "popularPeople",
  );
  const { data: popularSeries, isPending: isPopularSeriesPending } =
    useFetchMovieDB("/trending/tv/day?language=en-US", "popularSeries");

  return (
    <>
      <HomePoster movies={popularMovies} />
      <GreetingText />
      <PosterList
        movies={popularMovies}
        isPending={isPopularMoviesPending}
        title={"Trending Movies"}
      />
      <GuideTable />
      <PeopleList
        people={popularPeople}
        isPending={isPeoplePending}
        title={"Trending People"}
        className={"pb-8"}
      />
      <PosterList
        type="tv"
        movies={popularSeries}
        isPending={isPopularSeriesPending}
        title={"Trending Series"}
        delay={7000}
      />
      <MovieDetailCard />
    </>
  );
}

export default Homepage;
