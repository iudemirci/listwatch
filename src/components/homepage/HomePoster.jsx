import { twMerge } from "tailwind-merge";
import styles from "./HomePoster.module.css";
import { useMemo } from "react";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

function HomePoster({ path, movies, className }) {
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
        `${styles.wrapper} bg-grey-secondary/50 w-[100%] pt-[50rem] sm:w-[125%] md:w-[130%] lg:w-[135%] 2xl:w-[140%]`,
        className,
      )}
      style={{
        backgroundImage:
          path || randomPath ? `url(${BASE_URL}/w1280${randomPath}` : "none",
      }}
    ></div>
  );
}

export default HomePoster;
