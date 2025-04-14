import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./HomePoster.module.css";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

function HomePoster({ path, short, movies, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const filteredItems = useMemo(() => {
    if (path) return path;

    return movies
      ?.map((movie) => movie?.backdrop_path)
      ?.filter((path) => path !== null);
  }, [path, movies]);

  const randomItem = useMemo(() => {
    if (path) return path;
    if (filteredItems) {
      const index = Math.floor(Math.random() * filteredItems?.length);
      return filteredItems[index];
    }
    return null;
  }, [path, filteredItems]);

  useEffect(() => {
    if (randomItem) {
      const img = new Image();
      img.src = `${BASE_URL}/w1280${randomItem}`;
      img.onload = () => setImageLoaded(true);
    }
  }, [randomItem]);

  const height = short ? "pt-[30rem]" : "pt-[50rem]";
  return (
    <div
      className={twMerge(
        `${styles.wrapper} bg-grey-secondary/50 relative w-full ${height} duration-200 sm:w-[125%] md:w-[130%] lg:w-[135%] 2xl:w-[140%]`,
        className,
      )}
    >
      {randomItem && (
        <div
          className={`pointer-events-none fixed inset-0 -z-1 h-full w-full transition-opacity duration-200 select-none ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${BASE_URL}/w1280${randomItem})`,
            backgroundPosition: short ? "top" : "center",
            backgroundSize: "cover",
          }}
        />
      )}
    </div>
  );
}

export default HomePoster;
