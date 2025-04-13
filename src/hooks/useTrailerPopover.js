import { useMemo, useState } from "react";
import { useMovieDB } from "./moviedb/useMovieDB";

export function useTrailerPopover({ id, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data: movieVideo, isPending } = useMovieDB(type, id, "videos", {
    enabled: shouldFetch,
  });

  const movieTrailer = useMemo(() => {
    return (
      movieVideo?.find((video) => video.type === "Trailer" && "Clip") ||
      movieVideo?.[0] ||
      []
    );
  }, [movieVideo]);

  return {
    isOpen,
    setIsOpen,
    shouldFetch,
    setShouldFetch,
    isPending,
    movieTrailer,
  };
}
