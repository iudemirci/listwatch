import { Link, useNavigate } from "react-router-dom";

function GenreList({ genres, max, type = "movie" }) {
  const navigate = useNavigate();
  const maxGenres = max ? max : genres.length;

  return (
    <ul className="flex flex-wrap items-center gap-1 lg:gap-1.5">
      {genres &&
        genres?.slice(0, maxGenres)?.map((genre) => (
          <li
            key={genre.id}
            className="2xl: border-primary hover:bg-primary pointer-events-auto cursor-pointer rounded-2xl border-1 px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:py-1"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate(
                `/discover?type=${type === "series" ? "tv" : type}&genre=${genre.id}`,
              );
            }}
          >
            {genre.name}
          </li>
        ))}
    </ul>
  );
}

export default GenreList;
