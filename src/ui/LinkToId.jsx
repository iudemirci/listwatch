import { Link } from "react-router-dom";
import { cn } from "../utilities/cn";

function LinkToId({ movieID, children, type = "films", className, ...props }) {
  return (
    <Link
      to={`/${type}/${movieID}`}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkToId;
