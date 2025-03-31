import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiPlay } from "@mdi/js";

import Videos from "../shared/Videos";
import PopupBlur from "../../ui/PopupBlur";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import { AnimatePresence } from "motion/react";
import Skeleton from "../../ui/Skeleton";

function TrailerPopover() {
  const { id } = useParams("id");
  const type = useLocation().pathname.split("/")[1];
  const [isOpen, setIsOpen] = useState(false);
  const { data: movieVideo, isPending: isVideoPending } = useMovieDB(
    type,
    id,
    "videos",
  );
  const movieTrailer =
    movieVideo?.find((video) => video.type === "Trailer" && "Clip") || [];
  // if (movieTrailer?.length === 0) return null;
  return (
    movieTrailer && (
      <>
        <button
          className="hover:bg-primary bg-grey-secondary text-grey-primary-light hover:text-text-default pointer-events-auto hidden cursor-pointer items-center self-start rounded-lg px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:flex lg:py-1"
          onClick={() => setIsOpen(true)}
        >
          <Icon path={mdiPlay} size={0.7} />
          Trailer
        </button>
        <AnimatePresence>
          {isOpen && (
            <PopupBlur setIsOpen={setIsOpen}>
              <div className="w-175" onClick={(e) => e.stopPropagation()}>
                {isVideoPending ? (
                  <Skeleton className="aspect-video rounded-lg" />
                ) : (
                  <Videos movieTrailer={movieTrailer} />
                )}
              </div>
            </PopupBlur>
          )}
        </AnimatePresence>
      </>
    )
  );
}

export default TrailerPopover;
