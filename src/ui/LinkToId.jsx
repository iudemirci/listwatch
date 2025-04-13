import { Link } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { kebabCase } from "lodash";
import { useQueryClient } from "@tanstack/react-query";

import { getMovieItem } from "../services/apiMoviedb";

function LinkToId({ item, children, type = "movie", className, ...props }) {
  const queryClient = useQueryClient();

  //prefetch
  const prefetchMovie = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["movieDB", type, item?.id + "", "item"],
      queryFn: () => getMovieItem(type, item?.id, "item"),
    });
  };

  const prefetchCredits = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["movieDB", type, item?.id + "", "credits"],
      queryFn: () => getMovieItem(type, item?.id, "credits"),
    });
  };
  const prefetchPersonCredits = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["movieDB", item?.id + "", "person_credits"],
      queryFn: () => getMovieItem(undefined, item?.id, "person_credits"),
    });
  };

  const handleMouseEnter = useCallback(() => {
    prefetchMovie();
    if (type === "movie") prefetchCredits();
    if (type === "person") prefetchPersonCredits();
  }, [type]);

  const slug = useMemo(() => {
    return kebabCase(item?.title || item?.name).replace(/-/g, "_");
  }, [item?.title, item?.name]);

  const path = `/${type}/${item?.id}/${slug}`;

  return (
    <Link
      to={path}
      className={twMerge("block cursor-pointer", className)}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
}

export default memo(LinkToId);
