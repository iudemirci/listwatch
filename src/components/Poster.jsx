import { memo, useState } from "react";
import { mdiImageOff } from "@mdi/js";
import Icon from "@mdi/react";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

import Skeleton from "../ui/Skeleton";
import Paragraph from "../ui/Paragraph";
import ImageHoverMask from "./ImageHoverMask";

import { cn } from "../utilities/cn";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

function Poster({
  path,
  preview = false,
  title,
  year,
  iconSize = 1,
  className,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  if (!path)
    return (
      <div
        className={cn(
          "border-grey-secondary bg-background-default relative flex aspect-2/3 items-end justify-center rounded-lg border-2 text-center",
          className,
        )}
      >
        <Icon
          path={mdiImageOff}
          size={iconSize}
          className="text-grey-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        {title && (
          <Paragraph type="tertiary" className="pb-3">
            {title}({year})
          </Paragraph>
        )}
      </div>
    );

  return (
    <div
      className={cn(
        `group relative aspect-2/3 overflow-hidden rounded-lg ${preview && "shadow-grey-secondary/20 cursor-pointer shadow-lg"}`,
        className,
      )}
      onClick={() => setOpen(true)}
    >
      {!isLoaded && <Skeleton className={"aspect-2/3"} />}

      <img
        src={`${BASE_URL}${preview ? "/w780" : "/w342"}${path}`}
        className={`pointer-events-none size-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        alt={`Movie Poster`}
        {...props}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      {preview && (
        <>
          <ImageHoverMask />
          <Lightbox
            slides={[
              {
                src: `${BASE_URL}/original${path}`,
              },
            ]}
            open={open}
            close={() => setOpen(false)}
            plugins={[Zoom]}
            zoom={{
              maxZoomPixelRatio: 2,
              scrollToZoom: true,
            }}
            controller={{ closeOnBackdropClick: true }}
            render={{
              buttonNext: () => null,
              buttonPrev: () => null,
            }}
            carousel={{
              finite: true,
              preload: 2,
              padding: 0,
            }}
          />
        </>
      )}
    </div>
  );
}

export default memo(Poster);
