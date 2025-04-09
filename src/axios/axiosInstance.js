import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
  config.headers.Authorization = `Bearer ${API_KEY}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default api;
