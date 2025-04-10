import { mdiPlayCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { sampleSize, shuffle } from "lodash";
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
import Poster from "../Poster";
import Paragraph from "../../ui/Paragraph";
import { NextArrow, PrevArrow } from "../../ui/CustomSwiper";
import Skeleton from "../../ui/Skeleton";
import VoteCountPopularity from "./VoteCountPopularity";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import { mergeRandomAndShuffle } from "../../utilities/mergeRandomAndShuffle";
import LinkToId from "../../ui/LinkToId";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const SIZE = "/w1280";

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
                  <LinkToId
                    item={movie}
                    type={movie?.media_type === "tv" ? "tv" : "movie"}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${BASE_URL}${SIZE}${movie?.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center bottom",
                      }}
                      className="group relative z-1 flex aspect-video size-full cursor-pointer items-end gap-2 rounded-xl px-3 md:px-6"
                    >
                      <div
                        className="absolute inset-0 z-1"
                        style={{
                          background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(19,19,20,0.8) 70%, var(--color-background-default) 90%, var(--color-background-default) 100%)`,
                        }}
                      />

                      <div className="z-3 max-w-15 md:max-w-25 lg:max-w-30">
                        <Poster path={movie?.poster_path} />
                      </div>

                      <div className="z-3 flex items-center">
                        <Icon
                          path={mdiPlayCircleOutline}
                          size={isScreenBig ? 2.5 : 1.5}
                          className="group-hover:text-primary mr-2 mb-2 shrink-0 duration-300"
                        />
                        <div className="z-3 flex flex-col gap-0.5">
                          <Title
                            level={2}
                            className="text-xl leading-5.5 font-normal sm:text-2xl lg:text-3xl lg:leading-7 2xl:text-3xl"
                          >
                            '{movie?.title || movie?.name}'
                          </Title>
                          <Paragraph type="tertiary">See more</Paragraph>
                          <VoteCountPopularity
                            popularity={movie?.popularity}
                            vote={movie?.vote_count}
                          />
                        </div>
                      </div>
                    </div>
                  </LinkToId>
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
