import { SwiperSlide } from "swiper/react";
import "swiper/css";

import PaddingBottom from "../ui/PaddingBottom";
import Title from "../ui/Title";
import MoviePoster from "./Poster";
import LinkToId from "../ui/LinkToId";
import CustomSwiper from "../ui/CustomSwiper";
import Skeleton from "../ui/Skeleton";

var settings = {
  perItem: 3,
  delay: 6000,
  space: 6,
  loop: false,
  ItemToSlide: 2,
};

function PosterList({ movies, isPending, title, type }) {
  return (
    <PaddingBottom>
      <Title level={3}>{title}</Title>
      <ul className="pt-2 2xl:pt-4">
        <CustomSwiper {...settings}>
          {isPending
            ? [...Array(6)].map((_, index) => (
                <SwiperSlide key={index} className="aspect-2/3">
                  <Skeleton />
                </SwiperSlide>
              ))
            : movies?.map((movie) => (
                <SwiperSlide key={movie?.id}>
                  <li className="aspect-[2/3]">
                    <LinkToId movieID={movie?.id} type={type}>
                      <MoviePoster
                        path={movie?.poster_path}
                        className={
                          "hover:border-primary border-2 border-transparent duration-300"
                        }
                      />
                    </LinkToId>
                  </li>
                </SwiperSlide>
              ))}
        </CustomSwiper>
      </ul>
    </PaddingBottom>
  );
}

export default PosterList;
