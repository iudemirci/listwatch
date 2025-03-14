import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axios/axiosInstance";
import { MoviesContext } from "../../contexts/MoviesContext";
import TitleOverview from "../TitleOverview";
import CastOverview from "../CastOverview";
import Highlight from "../movie/MovieHighlight";
import useWindowWidth from "../../hooks/useWindowWidth";
import Poster from "../Poster";
import Videos from "../Videos";
import PeopleList from "../person/PeopleList";
import ImageGrid from "../ImageGrid";
import Languages from "../Languages";
import _ from "lodash";
import Tagline from "../Tagline";
import Button from "../../ui/Button";
import Flex from "../../ui/Flex";
import ListItem from "../ListItem";

function TvInfo() {
  const { id } = useParams("id");
  const [series, setSeries] = useState({});
  const { popularPeople } = useContext(MoviesContext);
  const width = useWindowWidth();

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
      <Poster path={series?.poster_path} preview="true" />
      <section className="col-span-2 flex flex-col gap-4 sm:col-span-3 md:col-span-2 2xl:col-span-3">
        <TitleOverview movie={series} />
        {width >= 1024 && <CastOverview />}
        {/* {width >= 1024 && <Highlight movie={series} />} */}
      </section>

      <section className="col-span-full 2xl:col-span-3">
        <Videos movie={series} />
      </section>

      {width < 1024 && (
        <section className="col-span-full">
          <CastOverview />
        </section>
      )}

      <section className="col-span-full 2xl:col-start-4">
        <PeopleList
          people={popularPeople}
          className={"2xl:grid 2xl:grid-cols-3"}
          title={"Top Cast"}
        />
      </section>

      <section className="col-span-full flex flex-col gap-2">
        <Flex>
          <Button type="primary">Seasons</Button>
          <Button type="secondary">Episodes</Button>
        </Flex>
        <ul className="flex flex-col">
          {series?.seasons
            ?.filter((season) => season.name !== "Specials")
            ?.map((season) => (
              <ListItem key={season?.id} item={season} isTv={true} />
            ))}
        </ul>
      </section>

      <section className="col-span-full">
        <ImageGrid />
      </section>

      <section className="col-span-full">
        <ul className="flex flex-wrap gap-1">
          {new Array(12).fill(0).map((item, i) => (
            <li
              key={i}
              className="2xl: border-grey-primary hover:bg-primary cursor-pointer rounded-2xl border-1 px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:py-1"
            >
              {_.capitalize(`test ${i}`)}
            </li>
          ))}
        </ul>
      </section>

      <section className="col-span-full">
        <Tagline tagline={series?.tagline} />
      </section>

      <section className="col-span-full">
        <Languages movieLanguages={series?.spoken_languages} />
      </section>
    </div>
  );
}

export default TvInfo;
