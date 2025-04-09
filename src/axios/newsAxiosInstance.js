import axios from "axios";

const newsApi = axios.create({
  baseURL: "/api",
  headers: {
    application: "json",
  },
});

newsApi.interceptors.request.use((config) => {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  if (API_KEY) {
    config.params = {
      ...config.params,
      apiKey: API_KEY,
    };
  }
  return config;
});

newsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error response from News API", error);
    return Promise.reject(error);
  },
);

export default newsApi;
