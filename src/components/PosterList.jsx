import { SwiperSlide } from "swiper/react";
import "swiper/css";

import Title from "../ui/Title";
import MoviePoster from "./Poster";
import LinkToId from "../ui/LinkToId";
import CustomSwiper from "../ui/CustomSwiper";
import Skeleton from "../ui/Skeleton";

function PosterList({ movies, isPending, title, type, delay = 6000 }) {
  var settings = {
    perItem: 3,
    delay: delay,
    space: 6,
    loop: false,
    ItemToSlide: 2,
  };

  return (
    <>
      <Title level={3}>{title}</Title>
      <ul className="pt-2 2xl:pt-4">
        <CustomSwiper {...settings}>
          {isPending
            ? [...Array(6)].map((_, index) => (
                <SwiperSlide key={index} className="aspect-2/3">
                  <Skeleton className={"rounded-lg"} />
                </SwiperSlide>
              ))
            : movies?.map((movie) => (
                <SwiperSlide key={movie?.id}>
                  <li className="aspect-[2/3]">
                    <LinkToId movieID={movie?.id} type={type}>
                      <MoviePoster path={movie?.poster_path} />
                    </LinkToId>
                  </li>
                </SwiperSlide>
              ))}
        </CustomSwiper>
      </ul>
    </>
  );
}

export default PosterList;
