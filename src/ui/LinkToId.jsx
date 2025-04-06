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

  const prefetchCredits = async () => {
    await queryClient.prefetchQuery({
      queryKey: [type, item?.id, "credits"],
      queryFn: () => getMovieItem(type, item?.id, "credits"),
    });
  };
  const prefetchPersonCredits = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["movieDB", item?.id, "person_credits"],
      queryFn: () => getMovieItem(undefined, item?.id, "person_credits"),
    });
  };

  return (
    <Link
      to={`/${type}/${item?.id}/${kebabCase(item?.title || item?.name).replace(/-/g, "_")}`}
      className={cn("cursor-pointer", className)}
      onMouseEnter={() => {
        prefetchMovie();
        if (type === "movie") prefetchCredits();
        if (type === "person") prefetchPersonCredits();
      }}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkToId;
