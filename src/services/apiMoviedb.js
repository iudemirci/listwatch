import api from "../axios/axiosInstance";

export async function getMovieDB(url) {
  const res = await api.get(url);

  return res.data.results;
}

export async function getMovieGenres() {
  const res = await api.get("/genre/movie/list");

  return res.data.genres;
}

export async function getMovieItem(url) {
  const res = await api.get(url);

  return res.data;
}

export async function getSearchData(searchTerm) {
  const res = await api.get(
    `/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
  );
  // console.log(res.data);
  return res.data;
}

export async function fetchMovies({ pageParam = 1, queryKey }) {
  const [, { genre, sort, type }] = queryKey;

  let url = `discover/${type}?include_adult=false?language=en-US&vote_count.gte=300&page=${pageParam}`;

  if (genre) {
    url += `&with_genres=${genre}`;
  }

  if (sort) {
    url += `discover&sort_by=${sort}`;
  }

  const { data } = await api.get(url);
  return { movies: data };
}
