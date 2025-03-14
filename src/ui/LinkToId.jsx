import { Link } from "react-router-dom";
import { cn } from "../utilities/cn";

function LinkToId({ movieID, children, type = "films", className }) {
  return (
    <Link
      to={`/${type}/${movieID}`}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </Link>
  );
}

export default LinkToId;
