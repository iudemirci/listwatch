import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axios/axiosInstance";
import { MoviesContext } from "../../contexts/MoviesContext";

function TvInfo() {
  const { id } = useParams("id");
  const [series, setSeries] = useState({});
  const { popularPeople } = useContext(MoviesContext);
  console.log(series);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/tv/${Number(id)}?language=en-US`);

        setSeries(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="grid grid-cols-3 items-start gap-x-3 gap-y-6 pt-4 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 md:pt-8 lg:gap-x-6 lg:gap-y-8 2xl:grid-cols-4">
      {/* <section>
        <Poster path={movie?.poster_path} preview={true} />
        <Rating rating={movie?.vote_average} />
      </section> */}
      {/* <section className="col-span-2 flex flex-col gap-4 sm:col-span-3 md:col-span-2 2xl:col-span-3">
        <MovieTitleOverview movie={movie} />
        {width >= 1024 && <MovieCastOverview />}

        {width >= 1024 && <MovieHighlight movie={movie} />}
      </section> */}
      {/* <section className="col-span-full 2xl:col-span-3">
        <MovieVideos movie={movie} />
      </section>
      {width < 1024 && (
        <section className="col-span-full">
          <MovieCastOverview />
        </section>
      )}
      <section className="col-span-full 2xl:col-start-4">
        <Title level={3}>Top Cast</Title>
        <PeopleList
          people={popularPeople}
          className={"2xl:grid 2xl:grid-cols-3"}
        />
      </section>
      <section className="col-span-full">
        <MovieImageGrid />
      </section>
      <section className="col-span-full">
        <MovieKeywords movieID={id} />
      </section>
      <section className="col-span-full">
        <MovieTagline tagline={movie?.tagline} />
      </section>
      <section className="col-span-full">
        <MovieLanguages movieLanguages={movie?.spoken_languages} />
      </section>
      <section className="col-span-full">
        {width < 1024 && <MovieHighlight movie={movie} />}
      </section> */}
    </div>
  );
}

export default TvInfo;
