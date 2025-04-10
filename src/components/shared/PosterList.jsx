import { mdiPlus, mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";

import Poster from "./../Poster";
import LinkToId from "../../ui/LinkToId";
import CustomSwiper from "../../ui/CustomSwiper";
import Skeleton from "../../ui/Skeleton";
import Paragraph from "../../ui/Paragraph";

import PosterRibbon from "../PosterRibbon";

function PosterList({
  movies,
  isPending,
  perItem = 3,
  buttons = true,
  lastVisited = false,
}) {
  var settings = {
    perItem: perItem,
    space: 12,
    loop: false,
    ItemToSlide: 2,
    buttons: buttons,
  };

  return (
    <ul className="pt-2 2xl:pt-4">
      <CustomSwiper {...settings}>
        {isPending
          ? [...Array(6)].map((_, index) => (
              <SwiperSlide key={index} className="aspect-2/3">
                <Skeleton className={"rounded-t-lg"} />
              </SwiperSlide>
            ))
          : movies?.map((movie, index) => {
              const finalType =
                movie?.type ?? (movie?.release_date ? "movie" : "tv");
              return (
                <SwiperSlide key={index} virtualIndex={index}>
                  <li className="relative flex size-full flex-col overflow-hidden rounded-lg">
                    <LinkToId item={movie} type={finalType}>
                      <Poster
                        path={movie?.poster_path}
                        iconSize={2}
                        className="!rounded-b-none"
                      />
                      {movie?.type !== "person" && (
                        <PosterRibbon size="small" />
                      )}
                      <div className="bg-grey-secondary/50 flex flex-col gap-1 rounded-b-lg px-1.5 py-2">
                        {!lastVisited &&
                          (movie?.vote_average ? (
                            <span className="text-grey-primary-light flex text-xs">
                              <Icon
                                path={mdiStar}
                                size={0.6}
                                className="text-primary"
                              />
                              {movie?.vote_average?.toFixed(1)}
                            </span>
                          ) : (
                            <Icon
                              path={mdiStar}
                              size={0.6}
                              className="text-grey-primary-light"
                            />
                          ))}

                        <Paragraph type="primary" className="line-clamp-1">
                          {movie?.title || movie?.name}
                        </Paragraph>

                        {!lastVisited && (
                          <button className="bg-grey-secondary text-grey-primary-light hover:bg-primary hover:text-text-default mt-1 flex w-full cursor-pointer items-center justify-center gap-1 self-center rounded-lg py-1.5 pr-1 text-xs duration-300">
                            <Icon path={mdiPlus} size={0.7} />
                            Watchlist
                          </button>
                        )}
                      </div>
                    </LinkToId>
                  </li>
                </SwiperSlide>
              );
            })}
      </CustomSwiper>
    </ul>
  );
}

export default PosterList;
