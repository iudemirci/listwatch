import { twMerge } from "tailwind-merge";
import styles from "./HomePoster.module.css";
import { useEffect, useMemo, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

function HomePoster({ path, movies, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const filteredPaths = useMemo(() => {
    if (path) return path;

    return movies
      ?.map((movie) => movie?.backdrop_path)
      ?.filter((path) => path !== null);
  }, [path, movies]);

  const randomPath = useMemo(() => {
    if (path) return path;
    if (filteredPaths) {
      const index = Math.floor(Math.random() * filteredPaths?.length);
      return filteredPaths[index];
    }
    return null;
  }, [path, filteredPaths]);

  return (
    <div
      className={twMerge(
        `${styles.wrapper} bg-grey-secondary/50 relative w-full pt-[50rem] duration-200 sm:w-[125%] md:w-[130%] lg:w-[135%] 2xl:w-[140%]`,
        className,
      )}
    >
      {randomPath && (
        <img
          src={randomPath && `${BASE_URL}/w1280${randomPath}`}
          alt="backdrop"
          className={`absolute inset-0 -z-1 h-full w-full object-cover object-center transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </div>
  );
}

export default HomePoster;
