import dayjs from "dayjs";

const startOfWeek = dayjs().startOf("week");
const endOfWeek = dayjs().endOf("week");
const gte = startOfWeek.format("YYYY-MM-DD");
const lte = endOfWeek.format("YYYY-MM-DD");

const movieEndpoints = {
  item: (type, id) => `3/${type}/${id}?language=en-US`,
  credits: (type, id) => `3/${type}/${id}/credits`,
  videos: (type, id) => `3/${type}/${id}/videos`,
  similar: (type, id) => `3/${type}/${id}/similar?page=1`,
  reviews: (type, id) => `3/${type}/${id}/reviews?page=1`,
  alternative_titles: (type, id) => `3/${type}/${id}/alternative_titles`,
  release_dates: (type, id) => `3/${type}/${id}/release_dates`,
  keywords: (type, id) => `3/${type}/${id}/keywords`,
  images: (type, id) => `3/${type}/${id}/images`,
  collection: (id) => `3/collection/${id}?language=en-US`,
  lists: (type, id) => `3/${type}/${id}/lists?language=en-US&page=1`,
  list: (id) => `4/list/${id}?language=en-US&page=1`,
  now_playing: (type) => `3/${type}/now_playing?language=en-US`,
  upcoming: (type) => `/3/${type}/upcoming?language=en-US&page=1`,
  top_rated: (type) => `/3/${type}/top_rated?language=en-US&page=1`,
  trending: (type) => `3/trending/${type}/day?language=en-US`,
  popular: (type) => `3/${type}/popular?language=en-US&page=1`,
  person_credits: (id) => `3/person/${id}/combined_credits?language=en-US`,
  tv_credits: (season, id) => `3/tv/${id}/season/${season}?language=en-US`,
  external_ids: (type, id) => `3/${type}/${id}/external_ids`,
  where_to_watch: (type, id) => `/3/${type}/${id}/watch/providers`,
  on_the_air: (type) =>
    `/3/discover/${type}?language=en-US&sort_by=vote_count.desc&air_date.gte=${gte}&air_date.lte=${lte}&without_genres=99,10751,16,10762,10763,10764,10766,1078,10767&page=1`,
};

export default movieEndpoints;
