import Paragraph from "../ui/Paragraph";
import useWindowWidth from "../hooks/useWindowWidth";
import { useState } from "react";
import { useFetchMovieItem } from "../hooks/moviedb/useFetchMovieItem";
import Skeleton from "../ui/Skeleton";
import Title from "../ui/Title";

function ImageGrid({ id, type = "movie" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLength, setImageLength] = useState(9);
  const width = useWindowWidth();
  const screenBackdrop = width >= 1024 ? 10 : 9;
  const screenProfiles = width >= 1024 ? 5 : 6;

  const { data: movieImages, isPending } = useFetchMovieItem(
    `/${type}/${id}/images`,
    `${id}_images`,
  );

  const backdropImages =
    type !== "person"
      ? movieImages?.backdrops
          .slice(0, screenBackdrop)
          ?.map((image) => image.file_path)
      : movieImages?.profiles
          .slice(0, screenProfiles)
          ?.map((img) => img.file_path);

  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Images</Title>
      <ul className="grid grid-cols-3 gap-1 gap-x-3 lg:grid-cols-4">
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
