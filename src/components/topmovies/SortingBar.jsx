import { Spin } from "antd";
import { useFetchGenres } from "../../hooks/moviedb/useFetchGenres";
import Title from "../../ui/Title";

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

function SortingBar({ handleFilter, handleSort }) {
  const { data: genres, isPending: isGenresPending } = useFetchGenres();

  if (isGenresPending) return <Spin />;

  return (
    <div className="flex items-center justify-between py-4">
      <Title level={3}>Movies</Title>

      <div className="flex gap-2">
        {/* Sorting By */}
        <select
          className="rounded-2xl bg-zinc-800 p-1 px-1.5 text-xs font-semibold"
          onChange={handleSort}
        >
          {sortFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.name}
            </option>
          ))}
        </select>

        {/* Genres */}
        <select
          className="rounded-2xl bg-zinc-800 p-1 px-1.5 text-xs font-semibold"
          onChange={handleFilter}
        >
          <option value={""}>Sort by genre</option>
          {genres.map((genre) => (
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
