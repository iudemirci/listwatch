import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axios/axiosInstance";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { MoviesContext } from "../../contexts/MoviesContext";
import Poster from "../Poster";
import Rating from "../Rating";
import TitleOverview from "../TitleOverview";
import CastOverview from "../CastOverview";
import Highlight from "../Highlight";
import Videos from "../Videos";
import ImageGrid from "../ImageGrid";
import useWindowWidth from "../../hooks/useWindowWidth";
import { Title } from "@vidstack/react";
import PeopleList from "../person/PeopleList";
import Keywords from "../Keywords";
import Tagline from "../Tagline";
import Languages from "../Languages";

function FilmInfo() {
  const { id } = useParams("id");
  const [movie, setMovie] = useState({});
  const { popularPeople } = useContext(MoviesContext);
  const width = useWindowWidth();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/movie/${Number(id)}?language=en-US`);

        setMovie(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="grid grid-cols-3 items-start gap-x-3 gap-y-6 pt-4 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 md:pt-8 lg:gap-x-6 lg:gap-y-8 2xl:grid-cols-4">
      <section>
        <Poster path={movie?.poster_path} preview={true} />
        <Rating rating={movie?.vote_average} />
      </section>
      <section className="col-span-2 flex flex-col gap-4 sm:col-span-3 md:col-span-2 2xl:col-span-3">
        <TitleOverview movie={movie} />
        {width >= 1024 && <CastOverview />}

        {width >= 1024 && <Highlight movie={movie} />}
      </section>
      <section className="col-span-full 2xl:col-span-3">
        <Videos movie={movie} />
      </section>
      {width < 1024 && (
        <section className="col-span-full">
          <CastOverview />
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
        <ImageGrid />
      </section>
      <section className="col-span-full">
        <Keywords movieID={id} />
      </section>
      <section className="col-span-full">
        <Tagline tagline={movie?.tagline} />
      </section>
      <section className="col-span-full">
        <Languages movieLanguages={movie?.spoken_languages} />
      </section>
      <section className="col-span-full">
        {width < 1024 && <Highlight movie={movie} />}
      </section>
    </div>
  );
}

export default FilmInfo;
