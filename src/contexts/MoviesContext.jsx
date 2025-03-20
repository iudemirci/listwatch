import { createContext } from "react";
import useFetchGenres from "../hooks/useFetchGenres";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  let movieGenres = useFetchGenres("/genre/movie/list");

  const value = {
    movieGenres,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}

export { MoviesProvider, MoviesContext };
