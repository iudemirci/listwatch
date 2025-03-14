import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

import HomePoster from "../components/HomePoster";
import GreetingText from "../components/GreetingText";
import GuideTable from "../components/GuideTable";
import MoviesList from "../components/PosterList";
import PeopleList from "../components/person/PeopleList";
import MovieDetailCard from "../components/movie/MovieDetailCard";

function Homepage() {
  const { popularMovies, popularPeople, popularSeries, inTheaters } =
    useContext(MoviesContext);

  return (
    <>
      <HomePoster />
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
