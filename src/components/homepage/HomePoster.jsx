import { twMerge } from "tailwind-merge";
import styles from "./HomePoster.module.css";

function HomePoster({ path, movies, className }) {
  const filteredPaths =
    path ||
    movies
      ?.map((movie) => movie?.backdrop_path)
      ?.filter((path) => path !== null);
  const randomPath =
    path ||
    (filteredPaths &&
      filteredPaths[Math.floor(Math.random() * filteredPaths?.length)]);

  return (
    <div
      className={twMerge(
        `${styles.wrapper} w-[100%] pt-[50rem] sm:w-[125%] md:w-[130%] lg:w-[135%] 2xl:w-[140%]`,
        className,
      )}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${randomPath})`,
      }}
    ></div>
  );
}

export default HomePoster;
