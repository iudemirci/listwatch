import styles from "./HomePoster.module.css";

function HomePoster({ movies }) {
  const filteredPaths = movies
    ?.map((movie) => movie?.backdrop_path)
    ?.filter((path) => path !== null);
  const randomPath =
    filteredPaths &&
    filteredPaths[Math.floor(Math.random() * filteredPaths?.length)];

  return (
    <div
      className={`${styles.wrapper} w-[100%] pt-[50rem] sm:w-[120%] md:w-[130%] lg:w-[135%] 2xl:w-[140%]`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${randomPath})`,
      }}
    ></div>
  );
}

export default HomePoster;
