import { mdiPlayCircleOutline } from "@mdi/js";
import { useMediaQuery } from "react-responsive";
import Icon from "@mdi/react";
import { AnimatePresence } from "motion/react";

import Poster from "../Poster";
import LinkToId from "../../ui/LinkToId";
import Paragraph from "../../ui/Paragraph";
import VoteCountPopularity from "./VoteCountPopularity";
import PopupBlur from "../../ui/PopupBlur";
import Skeleton from "../../ui/Skeleton";
import Videos from "../shared/Videos";

import { useTrailerPopover } from "../../hooks/useTrailerPopover";
import Title from "../../ui/Title";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const SIZE = "/w1280";

function NewsSlide({ movie }) {
  const isScreenBig = useMediaQuery({
    query: "(min-width: 1440px)",
  });

  const { isOpen, setIsOpen, setShouldFetch, isPending, movieTrailer } =
    useTrailerPopover({
      id: movie?.id,
      type: movie?.release_date ? "movie" : "tv",
    });

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${BASE_URL}${SIZE}${movie?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
        className="group relative z-1 flex aspect-video size-full h-55 cursor-pointer items-end gap-2 rounded-xl px-3 sm:h-fit md:px-6"
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setShouldFetch(true)}
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
            <div onClick={(e) => e.stopPropagation()}>
              <LinkToId
                item={movie}
                type={movie?.media_type === "tv" ? "tv" : "movie"}
              >
                <Title
                  level={2}
                  className="text-xl leading-5.5 font-normal hover:underline sm:text-2xl lg:text-3xl lg:leading-7 2xl:text-3xl"
                >
                  '{movie?.title || movie?.name}'
                </Title>
              </LinkToId>
            </div>
            <Paragraph type="tertiary">See more</Paragraph>
            <VoteCountPopularity
              popularity={movie?.popularity}
              vote={movie?.vote_count}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <PopupBlur setIsOpen={setIsOpen}>
            <div className="w-175" onClick={(e) => e.stopPropagation()}>
              {isPending ? (
                <Skeleton className="aspect-video rounded-lg" />
              ) : (
                <Videos movieTrailer={movieTrailer} />
              )}
            </div>
          </PopupBlur>
        )}
      </AnimatePresence>
    </>
  );
}

export default NewsSlide;
