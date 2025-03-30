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
  trending: (type) => `3/trending/${type}/day?language=en-US`,
  person_credits: (id) => `3/person/${id}/combined_credits?language=en-US`,
  tv_credits: (season, id) => `3/tv/${id}/season/${season}?language=en-US`,
};

export default movieEndpoints;
