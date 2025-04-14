import { useState } from "react";

const sortOptions = [
  {
    name: "Vote Average \u{2193}",
    value: "vote_average.desc",
  },
  {
    name: "Vote Average \u{2191}",
    value: "vote_average.asc",
  },
  {
    name: "Popularity \u{2193}",
    value: "popularity.desc",
  },
  {
    name: "Popularity \u{2191}",
    value: "popularity.asc",
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

function ListCustomSort({ setOptions, options }) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <select
      value={selected}
      className="text-grey-primary hover:text-text-default cursor-pointer truncate rounded-lg p-1.5 text-sm font-semibold duration-300 focus:outline-none"
      onChange={(e) => {
        setSelected(e.target.value);
        setOptions({
          ...options,
          sort: e.target.value,
        });
      }}
    >
      {sortOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-grey-secondary text-text-default"
        >
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default ListCustomSort;
