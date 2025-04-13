import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";

import Poster from "./../Poster";
import LinkToId from "../../ui/LinkToId";
import CustomSwiper from "../../ui/CustomSwiper";
import Skeleton from "../../ui/Skeleton";
import Paragraph from "../../ui/Paragraph";
import PosterRibbon from "../PosterRibbon";
import TrailerPopover from "../popover/TrailerPopover";
import WatchlistButton from "../WatchlistButton";
import PosterLike from "../PosterLike";

function PosterList({
  movies,
  isPending,
  perItem = 3,
  lastVisited = false,
  watchlist = false,
}) {
  var settings = {
    perItem: perItem,
    space: 12,
    loop: false,
    ItemToSlide: 2,
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
                movie?.type ??
                (movie?.release_date || movie?.release_date === ""
                  ? "movie"
                  : "tv");
              return (
                <SwiperSlide key={index} virtualIndex={index}>
                  <li className="relative flex size-full flex-col rounded-lg">
                    <LinkToId item={movie} type={finalType}>
                      <Poster
                        path={movie?.poster_path}
                        iconSize={2}
                        className="!rounded-b-none"
                      />
                      {movie?.type !== "person" && !watchlist && (
                        <PosterRibbon size="small" poster={true} />
                      )}
                      <div className="bg-grey-secondary/50 relative flex flex-col gap-1 rounded-b-lg px-1.5 py-2">
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
                        {!lastVisited && (
                          <div className="absolute top-1 right-1">
                            <PosterLike item={movie} />
                          </div>
                        )}
                        <Paragraph type="primary" className="line-clamp-1">
                          {movie?.title || movie?.name}
                        </Paragraph>

                        {!lastVisited && !watchlist && (
                          <div className="pt-2">
                            <WatchlistButton item={movie} />
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <TrailerPopover
                                id={movie?.id}
                                type={
                                  movie?.release_date ||
                                  movie?.release_date === ""
                                    ? "movie"
                                    : "tv"
                                }
                                className="mt-1.5 flex w-full items-center justify-center gap-1 py-1.5 2xl:py-1.5"
                              />
                            </div>
                          </div>
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
