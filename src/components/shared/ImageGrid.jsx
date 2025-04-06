import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { mdiChevronRight } from "@mdi/js";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Skeleton from "../../ui/Skeleton";
import Title from "../../ui/Title";
import MdiIcon from "../../ui/MdiIcon";
import ImageHoverMask from "../ImageHoverMask";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";

function ImageGrid({ type }) {
  const { id } = useParams("id");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const isUpdating = useRef(false);

  const { data: movieImages, isPending } = useMovieDB(type, id, "images");
  const backdropImages = movieImages?.backdrops?.map((img) => ({
    src: `https://image.tmdb.org/t/p/w780${img.file_path}`,
  }));

  const optimizedImg = backdropImages?.map((img) => ({
    src: img.src.replace("/w780/", "/original/"),
  }));

  useEffect(() => {
    const imgIndex = parseInt(searchParams.get("img"), 10);

    if (
      !isNaN(imgIndex) &&
      imgIndex >= 0 &&
      imgIndex < backdropImages?.length
    ) {
      setIndex(imgIndex);
      setOpen(true);
    }
  }, [searchParams, backdropImages?.length]);

  if (backdropImages?.length === 0) return null;

  return (
    <section className="w-full">
      <Title
        level={3}
        className="group border-grey-primary/50 hover:text-primary flex cursor-pointer items-center border-b-1 pb-0.5 duration-300"
        onClick={() => setOpen(true)}
      >
        Photos <MdiIcon path={mdiChevronRight} size={1} />
      </Title>

      <div className="flex gap-x-2 py-2 lg:gap-x-3 lg:py-3">
        {isPending
          ? [...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-8/6 flex-1 rounded-lg sm:aspect-8/5"
              />
            ))
          : backdropImages?.slice(0, 3).map((img, i) => (
              <div
                key={i}
                className="group relative aspect-8/6 flex-1 cursor-pointer overflow-hidden rounded-lg sm:aspect-8/5"
              >
                <img
                  src={img.src}
                  className={`size-full object-cover duration-500`}
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                    setSearchParams({ img: i });
                  }}
                />
                <ImageHoverMask />
              </div>
            ))}
      </div>

      <div className="flex gap-x-2 lg:gap-x-3">
        {isPending
          ? [...Array(2)].map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-16/8 min-w-35 flex-2 rounded-lg"
              />
            ))
          : backdropImages?.slice(3, 5).map((img, i) => (
              <div
                key={i}
                className="group relative aspect-16/8 min-w-35 flex-2 cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={img.src}
                  className={`size-full object-cover duration-500`}
                  onClick={() => {
                    setIndex(i + 3);
                    setOpen(true);
                    setSearchParams({ img: i + 3 });
                  }}
                />
                <ImageHoverMask />
              </div>
            ))}

        {/* Render the "+ More" image only if there are extra images */}
        {backdropImages?.length > 5 && (
          <div className="hover:border-primary relative hidden flex-1 overflow-hidden rounded-lg border-2 border-transparent duration-300 sm:inline-flex">
            <div
              className="bg-background-default/60 hover:text-primary absolute inset-0 z-2 flex cursor-pointer items-center justify-center text-white duration-300"
              onClick={() => {
                setIndex(5);
                setOpen(true);
              }}
            >
              {backdropImages?.length - 5 > 0
                ? `+ ${backdropImages?.length - 5}`
                : ""}
            </div>
            {isPending ? (
              <Skeleton className="flex-1" />
            ) : (
              backdropImages?.[5]?.src && (
                <img
                  src={backdropImages?.[5]?.src}
                  className={`size-full object-cover duration-500`}
                />
              )
            )}
          </div>
        )}
      </div>

      <Lightbox
        slides={optimizedImg}
        open={open}
        index={index}
        close={() => {
          setOpen(false);
          setSearchParams({});
        }}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{
          height: 75,
          border: 2,
          padding: 0,
          gap: 6,
          imageFit: "cover",
          borderColor: "var(--color-grey-primary)",
          borderRadius: 10,
        }}
        zoom={{
          maxZoomPixelRatio: 2,
          scrollToZoom: true,
        }}
        controller={{ closeOnBackdropClick: true }}
        on={{
          view: ({ index }) => {
            if (!isUpdating.current) {
              isUpdating.current = true;
              setIndex(index);
              setSearchParams({ img: index });
              setTimeout(() => (isUpdating.current = false), 100);
            }
          },
        }}
      />
    </section>
  );
}

export default ImageGrid;
