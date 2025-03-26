import { useSearchParams } from "react-router-dom";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return {
    genre: searchParams.get("genre") || "",
    sort: searchParams.get("sort") || "populaity",
    type: searchParams.get("type") || "movie",
    setFilter,
  };
};
