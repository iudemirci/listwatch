import MovieGenreButton from "./MovieGenreButton";

function MovieGenreList({ genresArr }) {
  return (
    <ul className="flex flex-wrap gap-1 lg:gap-1.5">
      {genresArr?.map((genre) => (
        <li key={genre?.id}>
          <MovieGenreButton id={genre?.id} />
        </li>
      ))}
    </ul>
  );
}

export default MovieGenreList;
