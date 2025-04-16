import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";

import DiscoverList from "../components/discover/DiscoverList";
import SortingBar from "../components/discover/SortingBar";

import ScrollToTopButton from "../ui/ScrollToTopButton";
import { fetchMovies } from "../services/apiMoviedb";
import { useFilters } from "../hooks/useFilters";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Discover() {
  useDocumentTitle("Discover | list&watch", false);

  const { genre, sort, type, setFilter } = useFilters();
  const [selectedDisplay, setSelectedDisplay] = useState(0);
  const loadMoreRef = useRef(null);

  // infinite fetching
  const { data, isFetchingNextPage, isPending, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["movies", { type, genre, sort }],
      queryFn: fetchMovies,
      placeholderData: (prevData) => prevData,
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage?.movies?.page;
        const totalPages = lastPage?.movies?.total_pages;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });
  const movies = useMemo(
    () => data?.pages.flatMap((page) => page.movies.results) || [],
    [data],
  );

  // listening to the intersection of loadMoreRef
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className="pt-6">
      {
        <SortingBar
          type={type}
          setFilter={setFilter}
          selectedDisplay={selectedDisplay}
          setSelectedDisplay={setSelectedDisplay}
        />
      }
      <DiscoverList
        movies={movies}
        isPending={isPending}
        isFetchingNextPage={isFetchingNextPage}
        selectedDisplay={selectedDisplay}
      />
      <ScrollToTopButton />
      <div ref={loadMoreRef} style={{ height: 1, visibility: "hidden" }} />
    </section>
  );
}

export default Discover;
