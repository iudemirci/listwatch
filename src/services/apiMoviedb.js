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
