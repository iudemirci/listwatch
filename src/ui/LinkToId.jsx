import { Link } from "react-router-dom";
import { cn } from "../utilities/cn";

function LinkToId({ movieID, children, type = "movie", className, ...props }) {
  return (
    <Link
      to={`/discover/${type}/${movieID}`}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkToId;
