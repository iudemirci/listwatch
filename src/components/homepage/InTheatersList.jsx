import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import MovieDetailCard from "./MovieDetailCard";
import Skeleton from "../../ui/Skeleton";

import { NextArrow, PrevArrow } from "../../ui/CustomSwiper";

function InTheatersList({ movies, isPending }) {
  return (
    <div className="group relative size-full">
      <div className="group overflow-hidden rounded-lg">
        <Swiper
          modules={[Autoplay, Navigation, FreeMode, Mousewheel]}
          slidesPerView={1}
          autoplay={{
            delay: 10000,
          }}
          freeMode={true}
          spaceBetween={13}
          grabCursor={true}
          navigation={{
            prevEl: `.swiper-prev`,
            nextEl: `.swiper-next`,
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {isPending
            ? [...Array(3)].map((_, i) => (
                <SwiperSlide key={i}>
                  <Skeleton className="aspect-video" />
                </SwiperSlide>
              ))
            : movies?.map((movie) => (
                <SwiperSlide key={movie?.id}>
                  <MovieDetailCard movie={movie} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
      <PrevArrow className="swiper-prev" />
      <NextArrow className="swiper-next" />
    </div>
  );
}

export default InTheatersList;
