import { useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "./hooks/auth/useGetUser.js";
import Router from "./routes/Router.jsx";
import { useEffect } from "react";
import { getMovieItem } from "./services/apiMoviedb.js";

function App() {
  useGetUser();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["movieDB", "movie", "trending"],
      queryFn: () => getMovieItem("movie", undefined, "trending"),
    });
    // queryClient.prefetchQuery(["movieDB", "person", "popular_people"], () =>
    //   getMovieItem("person", undefined, "popular_people"),
    // );
    // queryClient.prefetchQuery(["movieDB", "tv", "popular_series"], () =>
    //   getMovieItem("tv", undefined, "popular_series"),
    // );
  }, [queryClient]);

  return <Router />;
}

export default App;
