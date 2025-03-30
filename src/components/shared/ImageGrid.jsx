import { useParams } from "react-router-dom";
import { useState } from "react";
import Skeleton from "../../ui/Skeleton";
import Title from "../../ui/Title";

import useWindowWidth from "../../hooks/useWindowWidth";
import { useMovieDB } from "../../hooks/moviedb/useMovieDB";

function ImageGrid({ type = "movie" }) {
  const { id } = useParams("id");
  const [isLoaded, setIsLoaded] = useState(false);
  const width = useWindowWidth();
  const screenBackdrop = width >= 1024 ? 10 : 9;
  const screenProfiles = width >= 1024 ? 5 : 6;

  const { data: movieImages, isPending } = useMovieDB(type, id, "images");

  const backdropImages =
    type !== "person"
      ? movieImages?.backdrops
          .slice(0, screenBackdrop)
          ?.map((image) => image.file_path)
      : movieImages?.profiles
          .slice(0, screenProfiles)
          ?.map((img) => img.file_path);

  return (
    <div className="divide-grey-primary/50 flex flex-col gap-2 divide-y-1">
      <Title level={3} className="pb-0.5">
        Images
      </Title>
      <ul className="grid grid-cols-3 gap-x-2 gap-y-1.5 lg:grid-cols-4">
        {isPending
          ? [...Array(type !== "person" ? screenBackdrop : screenProfiles)].map(
              (_, i) => (
                <Skeleton
                  key={i}
                  className={`col-span-1 rounded-lg ${i % 6 === 0 && "col-span-2 row-span-2"} ${
                    type !== "person" ? "aspect-video" : "aspect-2/3"
                  }`}
                />
              ),
            )
          : backdropImages?.map((image, i) => {
              let colSpanClass = "rounded-lg overflow-hidden";

              if (backdropImages.length === 1) colSpanClass += " col-span-full";
              else if (i % 6 === 0) colSpanClass += " col-span-2 row-span-2";
              else colSpanClass += " col-span-1";

              return (
                <li key={i} className={colSpanClass}>
                  {!isLoaded && <Skeleton />}

                  <img
                    src={`https://image.tmdb.org/t/p/w780${image}`}
                    className={`rounded-lg duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setIsLoaded(true)}
                  />
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default ImageGrid;
