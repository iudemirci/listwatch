import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

import TopList from "../components/topmovies/TopList";
import SortingBar from "../components/topmovies/SortingBar";
import Button from "../ui/Button";
import Paragraph from "../ui/Paragraph";

const fetchMovies = async ({ genre, sort, page }) => {
  let url = `discover/movie?language=en-US&vote_count.gte=300&page=${page}`;

  if (genre) {
    url += `&with_genres=${genre}`;
  }

  if (sort) {
    url += `films&sort_by=${sort}`;
  }

  const { data } = await api.get(url);
  return { movies: data.results };
};

function Films() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL to state
  function getInitialFilters() {
    const params = new URLSearchParams(location.search);
    return {
      genre: params.get("genre") || "",
      sort: params.get("sort") || "popularity.desc",
      page: parseInt(params.get("page")) || 1,
    };
  }
  const [filters, setFilters] = useState(getInitialFilters);

  // Sync state when url changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      genre: params.get("genre") || "",
      sort: params.get("sort") || "popularity.desc",
      page: parseInt(params.get("page")) || 1,
    };

    if (
      newFilters.genre !== filters.genre ||
      newFilters.sort !== filters.sort ||
      newFilters.page !== filters.page
    ) {
      setFilters(newFilters);
    }
  }, [location.search]);

  // Set URL when state changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (filters.genre) params.set("genre", filters.genre);
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.page) params.set("page", filters.page);

    const newUrl = `?${params.toString()}`;

    if (newUrl !== location.search) {
      navigate(newUrl, { replace: true });
    }
  }, [filters, navigate, location.search]);

  // Fetch data with React Query
  const { data, isPending: isMoviesPending } = useQuery({
    queryKey: ["movies", filters],
    queryFn: () => fetchMovies(filters),
    // keepPreviousData: true,
  });

  // Handle functions
  function handleFilterChange(e) {
    setFilters((prev) => ({
      ...prev,
      genre: e.target.value || null,
      page: 1,
    }));
  }

  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      sort: e.target.value,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <section>
      {
        <SortingBar
          handleFilter={handleFilterChange}
          handleSort={handleSortChange}
        />
      }
      <TopList movies={data?.movies || []} isPending={isMoviesPending} />
      <div className="center relative flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            className={"px-4 py-0 text-lg"}
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
          >
            &larr;
          </Button>
          <Button
            className={"px-4 py-0 text-lg"}
            onClick={() => handlePageChange(filters.page + 1)}
          >
            &rarr;
          </Button>
        </div>

        <div>
          <Paragraph>Page {filters.page}</Paragraph>
        </div>
      </div>
    </section>
  );
}

export default Films;
