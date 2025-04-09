import {
  mdiArrowTopRight,
  mdiPlayCircleOutline,
  mdiThumbUpOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import "swiper/css/thumbs";
import { useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

import Title from "../../ui/Title";
import Poster from "../Poster";
import Paragraph from "../../ui/Paragraph";

import formatToK from "../../utilities/formatToK";
import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import { sampleSize, shuffle } from "lodash";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const SIZE = "/w1280";

function News() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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

  const shuffledItems = useMemo(() => {
    const concatenatedMovies = sampleSize(movies || [], 7);
    const concatenatedShows = sampleSize(tv || [], 7);

    return shuffle([...concatenatedMovies, ...concatenatedShows]);
  }, [movies, tv]);

  return (
    <div className="flex max-h-90 gap-4">
      <div className="overflow-hidden rounded-lg 2xl:w-[70%]">
        <Swiper
          slidesPerGroup={1}
          spaceBetween={25}
          modules={[Autoplay, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={{
            delay: 8500,
          }}
          grabCursor={true}
          className="size-full"
        >
          {shuffledItems?.map((movie, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url(${BASE_URL}${SIZE}${movie?.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="group flex aspect-video size-full cursor-pointer items-end gap-2 rounded-lg p-3 md:px-6"
              >
                <div className="shadow-grey-secondary max-w-15 shadow-2xl 2xl:w-25">
                  <Poster path={movie?.poster_path} />
                </div>

                <div className="flex items-center">
                  <Icon
                    path={mdiPlayCircleOutline}
                    size={isScreenBig ? 2.5 : 1.5}
                    className="group-hover:text-primary mr-2 mb-2 shrink-0 duration-300"
                  />
                  <div className="flex flex-col gap-0.5">
                    <Title
                      level={2}
                      className="text-2xl leading-5.5 font-normal lg:text-3xl lg:leading-7 2xl:text-3xl"
                    >
                      '{movie?.title || movie?.name}'
                    </Title>
                    <Paragraph type="tertiary">See more</Paragraph>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1">
                        <Icon path={mdiThumbUpOutline} size={0.5} />
                        <Paragraph type="tertiary">
                          {movie?.vote_count || 1}
                        </Paragraph>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon path={mdiArrowTopRight} size={0.5} />
                        <Paragraph type="tertiary">
                          {formatToK(movie?.popularity) || 1}
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isScreenBig && (
        <div
          className="bg-grey-secondary w-[30%] flex-grow overflow-hidden rounded-lg px-3 pt-3"
          style={{
            backgroundImage: `linear-gradient(to top, var(--color-background-default), rgba(0, 0, 0, 0.8))`,
          }}
        >
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={15}
            slidesPerView={3}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            direction="vertical"
            autoHeight={false}
            className="h-full"
          >
            {shuffledItems?.map((movie, i) => (
              <SwiperSlide
                key={i}
                className="group hover:bg-grey-secondary/50 !flex cursor-pointer overflow-hidden rounded-lg"
              >
                <div className="w-18 overflow-hidden rounded-lg">
                  <img
                    src={`${BASE_URL}/w300${movie?.poster_path}`}
                    className="object-fit"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-end gap-1 p-2">
                  <Title level={3} className="line-clamp-1 capitalize">
                    '{movie?.title || movie?.name}'
                  </Title>

                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <Icon path={mdiThumbUpOutline} size={0.5} />
                      <Paragraph type="tertiary">
                        {movie?.vote_count || 1}
                      </Paragraph>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon path={mdiArrowTopRight} size={0.5} />
                      <Paragraph type="tertiary">
                        {formatToK(movie?.popularity) || 1}
                      </Paragraph>
                    </div>
                  </div>
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
