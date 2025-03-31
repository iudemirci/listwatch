import { Link } from "react-router-dom";
import { cn } from "../utilities/cn";
import { kebabCase } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { getMovieItem } from "../services/apiMoviedb";

function LinkToId({ item, children, type = "movie", className, ...props }) {
  const queryClient = useQueryClient();

  //prefetch
  const prefetchMovie = async () => {
    await queryClient.prefetchQuery({
      queryKey: [type, item?.id, "item"],
      queryFn: () => getMovieItem(type, item?.id, "item"),
    });
  };

  return (
    <Link
      to={`/${type}/${item?.id}/${kebabCase(item?.title || item?.name).replace(/-/g, "_")}`}
      className={cn("cursor-pointer", className)}
      onMouseEnter={prefetchMovie}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkToId;
