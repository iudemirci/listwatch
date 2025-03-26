import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useEffect, useState } from "react";
import genres from "../../assets/genres.json";

const sortFilters = [
  {
    name: "Popularity \u{2193}",
    value: "popularity.desc",
  },
  {
    name: "Popularity \u{2191}",
    value: "popularity.asc",
  },
  {
    name: "Vote Average \u{2193}",
    value: "vote_average.desc",
  },
  {
    name: "Vote Average \u{2191}",
    value: "vote_average.asc",
  },

  {
    name: "Title \u{2193}",
    value: "title.desc",
  },
  {
    name: "Title \u{2191}",
    value: "title.asc",
  },
];

const tabStyle =
  "cursor-pointer data-[selected]:bg-grey-primary/40 data-[hover]:bg-grey-primary/40 rounded-2xl px-2 py-1 duration-300 data-[selected]:text-white";
const sortStyle =
  "bg-grey-secondary rounded-2xl p-1.5 text-sm font-semibold w-40";

function SortingBar({ type, setFilter }) {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSort, setSelectedSort] = useState("popularity.desc");
  const [currentGenres, setCurrentGenres] = useState(0);

  useEffect(() => {
    setSelectedGenre("");
    setSelectedSort("popularity.desc");
  }, [currentGenres]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-4">
      <TabGroup
        onChange={(i) => {
          setFilter("type", i === 0 ? "movie" : "tv");
          setCurrentGenres(i);
        }}
        defaultIndex={type === "movie" ? 0 : 1}
      >
        <TabList className="bg-grey-secondary flex gap-1 rounded-4xl px-1.5 py-1 text-sm">
          <Tab value="movie" className={tabStyle}>
            Movies
          </Tab>
          <Tab value="tv" className={tabStyle}>
            Tv Shows
          </Tab>
        </TabList>
      </TabGroup>

      <div className="flex gap-2">
        {/* Sorting By */}
        <select
          value={selectedSort}
          className={sortStyle}
          onChange={(e) => {
            setFilter("sort", e.target.value);
            setSelectedSort(e.target.value);
          }}
        >
          {sortFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.name}
            </option>
          ))}
        </select>

        {/* Genres */}
        <select
          value={selectedGenre}
          className={sortStyle}
          onChange={(e) => {
            setFilter("genre", e.target.value);
            setSelectedGenre(e.target.value);
          }}
        >
          <option value="">Select a genre</option>
          {currentGenres === 0
            ? genres.movie_genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))
            : genres.tv_genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
        </select>
      </div>
    </div>
  );
}

export default SortingBar;
