import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import styles from "./HomePoster.module.css";

function HomePoster() {
  const { inTheaters } = useContext(MoviesContext);
  const randomMovie = inTheaters[Math.floor(Math.random() * inTheaters.length)];
  // if (isMoviesLoading) {
  //   return <div className={styles.wrapper}>Loading...</div>;
  // }
  // Math.floor(Math.random() * movies.length)
  return (
    <div
      className={`${styles.wrapper} w-[100%] pt-[35rem] 2xl:w-[140%] sm:w-[120%] md:w-[130%] lg:pt-[40rem] lg:w-[135%] 2xl:pt-[50rem]`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${randomMovie?.backdrop_path})`,
      }}
    ></div>
  );
}

export default HomePoster;
