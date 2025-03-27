import { useSearchParams } from "react-router-dom";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilter = (filters) => {
    console.log(filters);
    const newParams = new URLSearchParams(searchParams);

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  return {
    genre: searchParams.get("genre") || "",
    sort: searchParams.get("sort") || "popularity.desc",
    type: searchParams.get("type") || "movie",
    setFilter,
  };
};
