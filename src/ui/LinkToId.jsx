import { Link } from "react-router-dom";
import { cn } from "../utilities/cn";
import { kebabCase } from "lodash";

function LinkToId({ item, children, type = "movie", className, ...props }) {
  return (
    <Link
      to={`/${type}/${item?.id}/${kebabCase(item?.title || item?.name).replace(/-/g, "_")}`}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkToId;
