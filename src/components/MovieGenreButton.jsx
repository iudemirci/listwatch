import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

function MovieGenreButton({ id }) {
  const { movieGenres } = useContext(MoviesContext);

  return (
    <span className="2xl: border-primary hover:bg-primary cursor-pointer rounded-2xl border-1 px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:py-1">
      {movieGenres.find((ids) => ids.id === id)?.name}
    </span>
  );
}

export default MovieGenreButton;
