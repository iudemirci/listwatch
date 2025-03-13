import { Link } from "react-router-dom";
import { cn } from "../hooks/cn";

function LinkToMovie({ movieID, children, className }) {
  // const movieTitle = movie.title
  //   .toLowerCase()
  //   .replace(/[^\w\s]/gi, "")
  //   .replaceAll(" ", "_");
  // console.log(movie.id);

  return (
    <Link to={`/films/${movieID}`} className={cn("cursor-pointer", className)}>
      {children}
    </Link>
  );
}

export default LinkToMovie;
