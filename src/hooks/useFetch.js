import { useEffect, useState } from "react";
import api from "../axios/axiosInstance";

function useFetch(url) {
  const [response, setReponse] = useState([]);

  async function fetchData() {
    try {
      const res = await api.get(url);
      setReponse(res.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return response;
}

export default useFetch;
