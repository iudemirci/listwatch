import HomePoster from "../components/homepage/HomePoster.jsx";
import GreetingText from "../components/homepage/GreetingText";
import GuideTable from "../components/homepage/GuideTable.jsx";
import PosterList from "../components/shared/PosterList";
import PeopleList from "../components/person/PeopleList";
import MovieDetailCard from "../components/homepage/MovieDetailCard.jsx";

import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { useMovieDB } from "../hooks/moviedb/useMovieDB.js";
import Title from "../ui/Title.jsx";
import { useGetLastVisited } from "../hooks/user/useGetLastVisited.js";
import { useGetUser } from "../hooks/auth/useGetUser.js";

const adultKeywords =
  /adult|xxx|porn|erotic|av|idol|gravure|softcore|hardcore|nude|playboy|lingerie/i;
const cjkRegex =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
const blocklist = [5009810, 5009979, 5248794, 2710789];

function Homepage() {
  const { user } = useGetUser();
  useDocumentTitle("list&watch | Dicover new content.", false);
  const { data: popularMovies, isPending: isPopularMoviesPending } = useMovieDB(
    "movie",
    undefined,
    "trending",
  );
  const { data: popularPeople, isPending: isPeoplePending } = useMovieDB(
    "person",
    undefined,
    "trending",
  );
  const filteredPeople =
    popularPeople?.filter((person) => {
      const isCJK = cjkRegex.test(person.name);
      const isAdultMovie = person.known_for?.some((work) =>
        adultKeywords.test(work.title || work.name || work.overview),
      );
      const isLowPopularityFemale =
        person.gender === 1 && person.popularity < 5;
      const isBlocked = blocklist.includes(person.id);

      return !isCJK && !isAdultMovie && !isLowPopularityFemale && !isBlocked;
    }) || [];

  const { data: popularSeries, isPending: isPopularSeriesPending } = useMovieDB(
    "tv",
    undefined,
    "trending",
  );

  const { data: lastVisited, isPending: isLastPending } = useGetLastVisited(
    user?.id,
  );

  return (
    <>
      <HomePoster movies={popularMovies} />
      <div className="flex flex-col gap-8 lg:gap-12">
        <GreetingText />
        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>Trending Movies</Title>
          <PosterList
            movies={popularMovies}
            isPending={isPopularMoviesPending}
            title={"Trending Movies"}
          />
        </section>
        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>In list&watch you can;</Title>
          <GuideTable />
        </section>
        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>Trending People</Title>
          <PeopleList
            people={filteredPeople}
            isPending={isPeoplePending}
            title={"Trending People"}
            perItem={4}
            maxItem={9}
          />
        </section>

        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>Trending Shows</Title>
          <PosterList
            type="tv"
            movies={popularSeries}
            isPending={isPopularSeriesPending}
          />
        </section>
        <section>
          <Title level={3}>Last visited</Title>
          <PosterList movies={lastVisited} isPending={isLastPending} />
        </section>
        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>In theaters</Title>
          <MovieDetailCard />
        </section>
      </div>
    </>
  );
}

export default Homepage;
