import { useContext } from "react";
import TopList from "../components/TopList";
import { MoviesContext } from "../contexts/MoviesContext";

function Films() {
  const { popularMovies } = useContext(MoviesContext);
  return (
    <>
      <TopList movies={popularMovies} />
    </>
  );
}

export default Films;
