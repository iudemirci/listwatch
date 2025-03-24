import { Image } from "antd";
import Title from "../ui/Title";
import Paragraph from "../ui/Paragraph";
import useWindowWidth from "../hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { useFetchMovieItem } from "../hooks/moviedb/useFetchMovieItem";
import Skeleton from "../ui/Skeleton";

function ImageGrid({ id }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLength, setImageLength] = useState(9);
  const width = useWindowWidth();

  const { data: movieImages, isPending } = useFetchMovieItem(
    `/movie/${id}/images`,
    `${id}_images`,
  );

  const backdropImages = movieImages?.backdrops
    .slice(0, width >= 1024 ? 10 : 9)
    .map((image) => image.file_path);

  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Images</Title>
      <ul className="grid grid-cols-3 gap-1 gap-x-3 lg:grid-cols-4">
        <Image.PreviewGroup>
          {backdropImages?.map((image, i) => {
            let colSpanClass = "rounded-lg overflow-hidden";

            if (backdropImages.length === 1) colSpanClass += " col-span-full";
            else if (i % 6 === 0) colSpanClass += " col-span-2 row-span-2";
            else colSpanClass += " col-span-1";

            return (
              <li key={i} className={colSpanClass}>
                {!isLoaded && <Skeleton />}

                <Image
                  src={`https://image.tmdb.org/t/p/w780${image}`}
                  className={`rounded-lg duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setIsLoaded(true)}
                  c
                />
              </li>
            );
          })}
        </Image.PreviewGroup>
      </ul>
    </div>
  );
}

export default ImageGrid;
