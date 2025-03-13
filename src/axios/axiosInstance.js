import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDYwMzU4ZmUyNWM0ZjY5YTY5YmM3NGFjZTU3MjYxZSIsIm5iZiI6MTc0MTM2Nzk1OC4yLCJzdWIiOiI2N2NiMmE5NjM2NTk4MjI2YTFhZmY2ZjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TDmLILI7omrn_84HMyDayxqvweKk71icu1HOzsYxzEg`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
