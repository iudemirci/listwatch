import { useLocation, useNavigate } from "react-router-dom";

function GenreList({ genres, max, type }) {
  const navigate = useNavigate();
  const location = useLocation();
  const finalType = type || location.pathname.split("/")[1];
  const maxGenres = max ? max : genres.length;

  return (
    <ul className="flex flex-wrap items-center gap-1 lg:gap-1.5">
      {genres &&
        genres?.slice(0, maxGenres)?.map((genre) => (
          <li
            key={genre.id}
            className="border-primary hover:bg-primary pointer-events-auto cursor-pointer rounded-lg border-1 px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:py-1"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate(`/discover?type=${finalType}&genre=${genre.id}`);
            }}
          >
            {genre.name}
          </li>
        ))}
    </ul>
  );
}

export default GenreList;
