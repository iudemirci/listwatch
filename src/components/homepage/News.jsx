import { useMemo, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Thumbs,
  Navigation,
  FreeMode,
  Mousewheel,
} from "swiper/modules";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import Title from "../../ui/Title";
import { NextArrow, PrevArrow } from "../../ui/CustomSwiper";
import Skeleton from "../../ui/Skeleton";
import VoteCountPopularity from "./VoteCountPopularity";
import NewsSlide from "./NewsSlide";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import { mergeRandomAndShuffle } from "../../utilities/mergeRandomAndShuffle";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

function News() {
  const isScreenBig = useMediaQuery({
    query: "(min-width: 1440px)",
  });

  const { data: movies, isPending: isPopularMoviesPending } = useMovieDB(
    "movie",
    undefined,
    "popular",
  );
  const { data: tv, isPending: isPopularTVPending } = useMovieDB(
    "tv",
    undefined,
    "trending",
  );
  const isPending = isPopularMoviesPending || isPopularTVPending;

  const shuffledItems = useMemo(() => {
    return mergeRandomAndShuffle(movies, tv, 10);
  }, [movies, tv]);

  const thumbsSwiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.realIndex;
    if (thumbsSwiperRef.current) {
      thumbsSwiperRef.current.slideTo(currentIndex + 1);
    }
  };

  return (
    <div className="flex max-h-98 gap-4">
      <div className="group relative size-full 2xl:w-[70%]">
        <div className="w-full overflow-hidden rounded-xl">
          <Swiper
            slidesPerGroup={1}
            spaceBetween={25}
            modules={[Autoplay, Thumbs, Navigation]}
            autoplay={{
              delay: 8500,
            }}
            className="size-full"
            grabCursor={true}
            navigation={{
              prevEl: `.swiper-prev`,
              nextEl: `.swiper-next`,
            }}
            onSlideChange={handleSlideChange}
            thumbs={{ swiper: thumbsSwiperRef.current }}
          >
            {isPending ? (
              <Skeleton className="aspect-video" />
            ) : (
              shuffledItems?.map((movie, i) => (
                <SwiperSlide key={i}>
                  <NewsSlide movie={movie} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

        <PrevArrow className="swiper-prev" />
        <NextArrow className="swiper-next" />
      </div>

      {isScreenBig && (
        <div
          className="bg-grey-secondary w-[30%] flex-grow overflow-hidden rounded-xl px-3 pt-3"
          style={{
            backgroundImage: `linear-gradient(to top, var(--color-background-default), rgba(0, 0, 0, 0.8))`,
          }}
        >
          <Swiper
            onSwiper={(swiper) => {
              thumbsSwiperRef.current = swiper;
            }}
            spaceBetween={15}
            slidesPerView={3}
            watchSlidesProgress={true}
            modules={[Thumbs, FreeMode, Mousewheel]}
            freeMode={true}
            direction="vertical"
            autoHeight={false}
            className="h-full"
            scrollbar={{ draggable: true }}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: false,
            }}
          >
            {isPending
              ? [...Array(3)].map((_, i) => (
                  <SwiperSlide key={i}>
                    <Skeleton className="size-full" />
                  </SwiperSlide>
                ))
              : shuffledItems?.map((movie, i) => (
                  <SwiperSlide
                    key={i}
                    className="group hover:bg-grey-secondary/50 !flex cursor-pointer overflow-hidden rounded-lg"
                  >
                    <div className="w-20 overflow-hidden rounded-lg">
                      <img
                        src={`${BASE_URL}/w300${movie?.poster_path}`}
                        className="object-fit"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-end gap-1 p-2">
                      <Title
                        level={5}
                        className="text-text-default line-clamp-1 font-semibold tracking-normal capitalize"
                      >
                        '{movie?.title || movie?.name}'
                      </Title>
                      <VoteCountPopularity
                        popularity={movie?.popularity}
                        vote={movie?.vote_count}
                      />
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default News;
