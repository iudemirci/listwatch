import movieEndpoints from "../assets/movieEndpoints";
import api from "../axios/axiosInstance";

export async function getMovieDB(url) {
  const res = await api.get(url);

  return res.data.results;
}

export async function getMovieGenres() {
  const res = await api.get("3/genre/movie/list");
  return res.data.genres;
}

export async function getMovieItem(type, id, endpoint) {
  let endpointURL;
  if (id !== undefined && type !== undefined) {
    endpointURL = movieEndpoints[endpoint](type, id);
  } else if (id !== undefined) {
    endpointURL = movieEndpoints[endpoint](id);
  } else if (type !== undefined) {
    endpointURL = movieEndpoints[endpoint](type);
  } else {
    endpointURL = movieEndpoints[endpoint]();
  }
  const res = await api.get(endpointURL);

  if (endpoint === "list") {
    return res.data;
  }

  return res.data.results || res.data;
}

export async function getSearchData(searchTerm) {
  const res = await api.get(
    `3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
  );
  return res.data;
}

export async function fetchMovies({ pageParam = 1, queryKey }) {
  const [, { genre, sort, type }] = queryKey;

  let url = `3/discover/${type}?include_adult=false?language=en-US&vote_count.gte=300&page=${pageParam}`;

  if (genre) {
    url += `&with_genres=${genre}`;
  }

  if (sort) {
    url += `discover&sort_by=${sort}`;
  }

  const { data } = await api.get(url);
  return { movies: data };
}
