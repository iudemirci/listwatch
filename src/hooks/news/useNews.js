import { useQuery } from "@tanstack/react-query";
import newsApi from "../../axios/newsAxiosInstance";

const fetchNews = async () => {
  const response = await newsApi.get("/everything", {
    params: {
      q: "cinema or movie",
      sortBy: "popularity",
      pageSize: 10,
    },
  });

  return response.data.articles;
};

function useNews() {
  const { data, isPending } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });
  return { data, isPending };
}

export default useNews;
