import { useContext } from "react";
import AllFilmsList from "../components/AllFilmsList";
import { MoviesContext } from "../contexts/MoviesContext";

function Films() {
  const { popularMovies } = useContext(MoviesContext);
  return (
    <>
      <AllFilmsList movies={popularMovies} />
    </>
  );
}

export default Films;
