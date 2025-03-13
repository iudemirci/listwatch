import { useEffect, useState } from "react";
import api from "../axios/axiosInstance";

function useFetchGenres(url) {
  const [response, setReponse] = useState([]);

  async function fetchData() {
    try {
      const res = await api.get(url);
      setReponse(res.data.genres);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return response;
}

export default useFetchGenres;
