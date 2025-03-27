import HomePoster from "../components/HomePoster";
import GreetingText from "../components/GreetingText";
import GuideTable from "../components/GuideTable";
import PosterList from "../components/PosterList";
import PeopleList from "../components/person/PeopleList";
import MovieDetailCard from "../components/movie/MovieDetailCard";

import { useFetchMovieDB } from "../hooks/moviedb/useFetchMovieDB.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

function Homepage() {
  const { data: popularMovies, isPending: isPopularMoviesPending } =
    useFetchMovieDB("/trending/movie/day?language=en-US", "popularMovies");

  const { data: popularPeople, isPending: isPeoplePending } = useFetchMovieDB(
    "/trending/person/day?language=en-US",
    "popularPeople",
  );
  const { data: popularSeries, isPending: isPopularSeriesPending } =
    useFetchMovieDB("/trending/tv/day?language=en-US", "popularSeries");

  useDocumentTitle("list&watch | Dicover new content.", false);

  return (
    <>
      <HomePoster movies={popularMovies} />
      <div className="flex flex-col gap-6 lg:gap-8">
        <GreetingText />
        <section>
          <PosterList
            movies={popularMovies}
            isPending={isPopularMoviesPending}
            title={"Trending Movies"}
          />
        </section>
        <section>
          <GuideTable />
        </section>
        <section>
          <PeopleList
            people={popularPeople}
            isPending={isPeoplePending}
            title={"Trending People"}
          />
        </section>

        <section>
          <PosterList
            type="tv"
            movies={popularSeries}
            isPending={isPopularSeriesPending}
            title={"Trending Series"}
            delay={7000}
          />
        </section>
        <section>
          <MovieDetailCard />
        </section>
      </div>
    </>
  );
}

export default Homepage;
