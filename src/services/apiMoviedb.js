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
