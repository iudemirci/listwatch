import { createContext } from "react";
import useFetch from "../hooks/useFetch";
import useFetchGenres from "../hooks/useFetchGenres";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  // const fetchPopularMovies = async () => {
  //   setIsMoviesLoading(true);
  //   try {
  //     const res = await api.get("/movie/now_playing?language=en-US&page=1");
  //     setPopularMovies(res.data.results);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsMoviesLoading(false);
  //   }
  // };

  // const fetchPopularPeople = async () => {
  //   setIsMoviesLoading(true);
  //   try {
  //     const res = await api.get("/person/popular?language=en-US&page=1");
  //     setPopularPeople(res.data.results);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsMoviesLoading(false);
  //   }
  // };

  let popularMovies = useFetch("/trending/movie/day?language=en-US");
  let popularPeople = useFetch("/trending/person/day?language=en-US");
  let popularSeries = useFetch("/trending/tv/day?language=en-US");
  let inTheaters = useFetch("/movie/now_playing");
  let movieGenres = useFetchGenres("/genre/movie/list");

  // async function getVideos() {
  //   const videosData = await Promise.all(
  //     upcomingMovies.map(async (movie) => {
  //       const data = await api.get(`/movie/${movie.id}/videos`);
  //       return data.data.results[0];
  //     })
  //   );
  //   setVideos(videosData);
  // }
  // useEffect(() => {
  //   getVideos();
  // }, [upcomingMovies]);

  // useFetch("/movie/950396/videos");

  const value = {
    popularMovies,
    popularPeople,
    popularSeries,
    inTheaters,
    movieGenres,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}

export { MoviesProvider, MoviesContext };
