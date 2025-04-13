import Icon from "@mdi/react";
import { mdiPlay } from "@mdi/js";

import Videos from "../shared/Videos";
import PopupBlur from "../../ui/PopupBlur";

import { AnimatePresence } from "motion/react";
import Skeleton from "../../ui/Skeleton";
import { twMerge } from "tailwind-merge";
import { useTrailerPopover } from "../../hooks/useTrailerPopover";

function TrailerPopover({ id, type, className }) {
  const { isOpen, setIsOpen, setShouldFetch, isPending, movieTrailer } =
    useTrailerPopover({ id, type });

  return (
    <>
      <button
        className={twMerge(
          `hover:bg-primary bg-grey-secondary text-grey-primary-light hover:text-text-default pointer-events-auto hidden cursor-pointer items-center self-start rounded-lg px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:flex lg:py-1`,
          className,
        )}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setShouldFetch(true)}
      >
        <Icon path={mdiPlay} size={0.7} />
        Trailer
      </button>
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

export default TrailerPopover;
