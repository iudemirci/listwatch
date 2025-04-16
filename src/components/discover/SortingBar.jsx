import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useEffect, useState } from "react";
import genres from "../../assets/genres.json";
import { useFilters } from "../../hooks/useFilters";
import { mdiFormatAlignJustify, mdiTableLarge } from "@mdi/js";
import Icon from "@mdi/react";

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

const display = [
  {
    path: mdiTableLarge,
  },
  {
    path: mdiFormatAlignJustify,
  },
];

const tabStyle =
  "cursor-pointer data-[selected]:bg-grey-primary/40 data-[hover]:bg-grey-primary/40 rounded-2xl px-2 py-1 duration-300 data-[selected]:text-white";
const sortStyle =
  "text-grey-primary hover:text-text-default duration-300 cursor-pointer truncate rounded-lg p-1.5 text-sm font-semibold focus:outline-none";

function SortingBar({ type, setFilter, selectedDisplay, setSelectedDisplay }) {
  const { genre } = useFilters();

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSort, setSelectedSort] = useState("popularity.desc");
  const [currentGenres, setCurrentGenres] = useState(0);

  useEffect(() => {
    setSelectedGenre(genre);
    setSelectedSort("popularity.desc");
  }, [currentGenres, genre]);

  return (
    <div className="border-grey-primary/50 mb-4 flex flex-wrap items-center justify-between gap-2 py-0.5 sm:border-y-1">
      <TabGroup
        onChange={(i) => {
          setFilter({
            type: i === 0 ? "movie" : "tv",
            sort: "popularity.desc",
            genre: null,
          });
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
      <div className="border-grey-primary/50 flex w-full gap-2 border-y-1 py-1 sm:w-auto sm:border-none">
        {/* Sorting By */}
        <select
          value={selectedSort}
          className={sortStyle}
          onChange={(e) => {
            setFilter({ sort: e.target.value });
            setSelectedSort(e.target.value);
          }}
        >
          {sortFilters.map((filter) => (
            <option
              key={filter.value}
              value={filter.value}
              className="bg-grey-secondary text-text-default"
            >
              {filter.name}
            </option>
          ))}
        </select>

        {/* Genres */}
        <select
          value={selectedGenre}
          className={sortStyle}
          onChange={(e) => {
            setFilter({ genre: e.target.value });
            setSelectedGenre(e.target.value);
          }}
        >
          <option value="" className="bg-grey-secondary text-text-default">
            Select a genre
          </option>
          {currentGenres === 0
            ? genres.movie_genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                  className="bg-grey-secondary text-text-default"
                >
                  {genre.name}
                </option>
              ))
            : genres.tv_genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                  className="bg-grey-secondary text-text-default"
                >
                  {genre.name}
                </option>
              ))}
        </select>

        {display.map((icon, idx) => (
          <div
            key={idx}
            className={`hover:bg-grey-secondary cursor-pointer rounded-sm p-0.5 duration-300 ${selectedDisplay === idx && "text-primary"}`}
            onClick={() => setSelectedDisplay(idx)}
          >
            <Icon path={icon.path} size={1} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortingBar;
