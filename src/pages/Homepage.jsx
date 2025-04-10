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
import ScrollToTopButton from "../ui/ScrollToTopButton.jsx";
import News from "../components/homepage/News.jsx";
import InTheatersList from "../components/homepage/InTheatersList.jsx";
import { useMemo } from "react";
import { mergeRandomAndShuffle } from "../utilities/mergeRandomAndShuffle.js";
import BudgetAndRevenue from "../components/homepage/BudgetAndRevenue.jsx";
import { deleteLastVisited } from "../services/apiUser.js";

const adultKeywords =
  /adult|xxx|porn|erotic|av|idol|gravure|softcore|hardcore|nude|playboy|lingerie/i;
const cjkRegex =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
const blocklist = [5009810, 5009979, 5248794, 2710789];

function Homepage() {
  const { user } = useGetUser();
  const token = localStorage.getItem("token");

  useDocumentTitle("list&watch | Discover new content.", false);

  const { data: popularMovies, isPending: isPopularMoviesPending } = useMovieDB(
    "movie",
    undefined,
    "trending",
  );
  const { data: popularPeople, isPending: isPeoplePending } = useMovieDB(
    "person",
    undefined,
    "popular",
  );

  const filteredPeople = useMemo(() => {
    if (!popularPeople) return [];
    return popularPeople.filter((person) => {
      const isCJK = cjkRegex.test(person.name);
      const isAdultMovie = person.known_for?.some((work) =>
        adultKeywords.test(work.title || work.name || work.overview),
      );
      const isLowPopularityFemale =
        person.gender === 1 && person.popularity < 5;
      const isBlocked = blocklist.includes(person.id);

      return !isCJK && !isAdultMovie && !isLowPopularityFemale && !isBlocked;
    });
  }, [popularPeople]);

  const { data: popularSeries, isPending: isPopularSeriesPending } = useMovieDB(
    "tv",
    undefined,
    "trending",
  );

  //top series merge
  const { data: topSeries, isPending: isTopSeriesPending } = useMovieDB(
    "tv",
    undefined,
    "top_rated",
  );
  const { data: topMovies, isPending: isTopMoviesPending } = useMovieDB(
    "movie",
    undefined,
    "top_rated",
  );
  const isTopContentPending = isTopMoviesPending || isTopSeriesPending;
  const mergedTopContent = useMemo(() => {
    return mergeRandomAndShuffle(topMovies, topSeries, 10);
  }, [topMovies, topSeries]);

  //last visited
  const { data: lastVisited, isPending: isLastPending } = useGetLastVisited(
    user?.id,
  );

  const { data: onTheAir, isPending: isAiringPending } = useMovieDB(
    "tv",
    undefined,
    "on_the_air",
  );

  const { data: nowPlaying, isPending: isNowPlayingPending } = useMovieDB(
    "movie",
    undefined,
    "now_playing",
  );

  const nowPlayingIDs = useMemo(() => {
    return nowPlaying?.slice(0, 6)?.map((movie) => movie.id) || [];
  }, [nowPlaying]);

  return (
    <>
      <HomePoster movies={popularMovies} />
      <ScrollToTopButton />
      <div className="flex flex-col gap-8 lg:gap-12">
        <GreetingText />
        <section>
          <News />
        </section>

        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>Trending Movies</Title>
          <PosterList
            movies={popularMovies}
            isPending={isPopularMoviesPending}
          />
        </section>

        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>Trending People</Title>
          <PeopleList
            people={filteredPeople}
            isPending={isPeoplePending}
            perItem={3}
            maxItem={6}
            space={10}
          />
        </section>

        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>Trending Shows</Title>
          <PosterList
            movies={popularSeries}
            isPending={isPopularSeriesPending}
          />
        </section>

        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>In list&watch you can;</Title>
          <GuideTable />
        </section>

        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>On the Air</Title>
          <PosterList movies={onTheAir} isPending={isAiringPending} />
        </section>

        <section className="divide-grey-primary/40 flex flex-col gap-2 divide-y-1 2xl:gap-4">
          <Title level={3}>In theaters</Title>
          <InTheatersList movies={nowPlaying} isPending={isNowPlayingPending} />
        </section>

        <section className="divide-grey-primary/40 divide-y-1">
          <BudgetAndRevenue
            ids={nowPlayingIDs}
            isPending={isNowPlayingPending}
          />
        </section>

        <section className="divide-grey-primary/40 divide-y-1">
          <Title level={3}>Fan Favourites</Title>
          <PosterList
            movies={mergedTopContent}
            isPending={isTopContentPending}
          />
        </section>
      </div>

      {token && lastVisited?.length > 0 && (
        <section className="full-width-component flex min-w-full items-center justify-center overflow-x-hidden bg-black/70">
          <div className="w-sm px-4 sm:w-lg md:w-xl lg:w-3xl 2xl:w-5xl">
            <button onClick={() => deleteLastVisited(user?.id)}>TEST</button>
            <Title level={3}>Last visited</Title>
            <PosterList
              movies={lastVisited}
              isPending={isLastPending}
              lastVisited={true}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default Homepage;
