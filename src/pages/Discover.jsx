import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import DiscoverList from "../components/discover/DiscoverList";
import SortingBar from "../components/discover/SortingBar";

import { useFilters } from "../hooks/useFilters";
import { fetchMovies } from "../services/apiMoviedb";
import { useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";

function Discover() {
  const { genre, sort, type, setFilter } = useFilters();

  const loadMoreRef = useRef(null);

  // infinity fetching
  const { data, isFetchingNextPage, isPending, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["movies", { type, genre, sort }],
      queryFn: fetchMovies,
      initialData: keepPreviousData,
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage?.movies?.page;
        const totalPages = lastPage?.movies?.total_pages;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  //debounce to reduce unnecessary calls
  const debouncedFetch = debounce(() => {
    fetchNextPage();
  }, 250);

  const movies = useMemo(
    () => data?.pages.flatMap((page) => page.movies.results) || [],
    [data],
  );

  // listening to the intersection of loadMoreRef
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          debouncedFetch();
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, debouncedFetch]);

  return (
    <section>
      {<SortingBar type={type} setFilter={setFilter} />}
      <DiscoverList
        movies={movies}
        isPending={isPending}
        isFetchingNextPage={isFetchingNextPage}
      />

      <div ref={loadMoreRef} style={{ height: 1, visibility: "hidden" }} />
    </section>
  );
}

export default Discover;
