import { useMemo } from "react";

import HomePoster from "../components/homepage/HomePoster.jsx";
import GreetingText from "../components/homepage/GreetingText";
import GuideTable from "../components/homepage/GuideTable.jsx";
import PosterList from "../components/shared/PosterList";
import PeopleList from "../components/person/PeopleList";
import News from "../components/homepage/News.jsx";
import InTheatersList from "../components/homepage/InTheatersList.jsx";
import ScrollToTopButton from "../ui/ScrollToTopButton.jsx";
import BudgetAndRevenue from "../components/homepage/BudgetAndRevenue.jsx";
import LastVisited from "../components/shared/LastVisited.jsx";
import Watchlist from "../components/homepage/Watchlist.jsx";
import Section from "../components/homepage/Section.jsx";

import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { useMovieDB } from "../hooks/moviedb/useMovieDB.js";
import { mergeRandomAndShuffle } from "../utilities/mergeRandomAndShuffle.js";
import AddItemPopover from "../components/popover/AddItemPopover.jsx";
import { useGetLists } from "../hooks/lists/useGetLists.js";
import FadeIn from "../ui/FadeIn.jsx";
import ListCard from "../components/lists/ListCard.jsx";

const adultKeywords =
  /adult|xxx|porn|erotic|av|idol|gravure|softcore|hardcore|nude|playboy|lingerie/i;
const cjkRegex =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
const blocklist = [5009810, 5009979, 5248794, 2710789];

function Homepage() {
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

  const { data: userLists } = useGetLists();
  const watchlist = userLists?.find((list) => list.listName === "Watchlist");

  const { data: lists, isPending } = useGetLists(true);

  return (
    <>
      <HomePoster movies={popularMovies} />
      <ScrollToTopButton />
      <AddItemPopover />

      <div className="flex flex-col gap-8 lg:gap-12">
        <FadeIn duration={20}>
          <GreetingText />
        </FadeIn>

        <FadeIn duration={30}>
          <Section>
            <News />
          </Section>
        </FadeIn>

        <FadeIn duration={40}>
          <Section title="Trending Movies">
            <PosterList
              movies={popularMovies}
              isPending={isPopularMoviesPending}
            />
          </Section>
        </FadeIn>

        <FadeIn duration={50}>
          <Section title="Trending People">
            <PeopleList
              people={filteredPeople}
              isPending={isPeoplePending}
              perItem={3}
              maxItem={6}
              space={10}
            />
          </Section>
        </FadeIn>

        <FadeIn duration={60}>
          <Section title="list&watch lets you...">
            <GuideTable />
          </Section>
        </FadeIn>

        <FadeIn duration={70}>
          <Section title="Trending Shows">
            <PosterList
              movies={popularSeries}
              isPending={isPopularSeriesPending}
            />
          </Section>
        </FadeIn>

        <FadeIn duration={80}>
          <Section title="From your Watchlist">
            {token ? (
              watchlist?.items?.length > 0 ? (
                <PosterList
                  movies={watchlist?.items?.slice(0, 20)}
                  watchlist={true}
                />
              ) : (
                <Watchlist logged={true} />
              )
            ) : (
              <Watchlist />
            )}
          </Section>
        </FadeIn>

        <FadeIn duration={85}>
          <Section title="Most recent lists" linkID="/lists" mount={true}>
            <ul className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-4">
              {lists?.slice(0, 4)?.map((list) => (
                <ListCard key={list?.id} list={list} homepage={true} />
              ))}
            </ul>
          </Section>
        </FadeIn>

        <FadeIn duration={90}>
          <Section title="On the Air">
            <PosterList movies={onTheAir} isPending={isAiringPending} />
          </Section>
        </FadeIn>

        <FadeIn duration={100}>
          <Section
            title="In theaters"
            className="flex flex-col gap-2 2xl:gap-4"
          >
            <InTheatersList
              movies={nowPlaying}
              isPending={isNowPlayingPending}
            />
          </Section>
        </FadeIn>

        <FadeIn duration={110}>
          <Section>
            <BudgetAndRevenue
              ids={nowPlayingIDs}
              isPending={isNowPlayingPending}
            />
          </Section>
        </FadeIn>

        <FadeIn duration={120}>
          <Section title="Fan Favourites">
            <PosterList
              movies={mergedTopContent}
              isPending={isTopContentPending}
            />
          </Section>
        </FadeIn>

        <FadeIn duration={130}>
          <LastVisited />
        </FadeIn>
      </div>
    </>
  );
}

export default Homepage;
