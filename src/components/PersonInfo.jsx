import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/axiosInstance";
import Title from "./Title";
import MoviePoster from "./MoviePoster";
import PersonImageGrid from "./PersonImageGrid";
import Imdb from "./Imdb";
import Paragraph from "./Paragraph";
import Flex from "./Flex";
import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import useWindowWidth from "../hooks/useWindowWidth";

function PersonInfo() {
  const { id } = useParams("id");
  const [person, setPerson] = useState();
  const [credits, setCredits] = useState();
  const width = useWindowWidth();

  console.log(person);
  console.log(credits);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/person/${Number(id)}?language=en-US`);
        const res2 = await api.get(
          `/person/${Number(id)}/combined_credits?language=en-US`,
        );

        setPerson(res.data);
        setCredits(res2.data.cast);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="grid grid-cols-3 items-start gap-x-3 gap-y-6 pt-4 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 md:pt-8 lg:gap-x-6 lg:gap-y-8 2xl:grid-cols-4">
      <div>
        <MoviePoster path={person?.profile_path} preview={true} />
      </div>

      <section className="col-span-2 2xl:col-span-3">
        <div className={"flex flex-col gap-2"}>
          <Title level={2}>{person?.name}</Title>
          <div className="flex flex-col gap-2">
            <Paragraph type={"secondary"}>{person?.place_of_birth}</Paragraph>
            <div className="flex gap-2">
              <Paragraph type={"secondary"}>{person?.birthday}</Paragraph>
              {person?.deathday && (
                <>
                  <Paragraph type={"secondary"}>/</Paragraph>
                  <Paragraph type={"secondary"}>{person?.birthday}</Paragraph>
                </>
              )}
            </div>
          </div>
          {width >= 1024 && person?.biography ? (
            <section className="col-span-full flex flex-col gap-2">
              <Title level={3}>Biography</Title>
              <Paragraph type={"secondary"}>{person?.biography}</Paragraph>
            </section>
          ) : null}
          <Imdb id={person?.imdb_id} type={"person"} />
        </div>
      </section>

      {width <= 1024 && person?.biography ? (
        <section className="col-span-full flex flex-col gap-2">
          <Title level={3}>Biography</Title>
          <Paragraph type={"secondary"}>{person?.biography}</Paragraph>
        </section>
      ) : null}

      <section className="col-span-full flex flex-col gap-2">
        <Title level={3}>Credits</Title>
        <ul className="divide-grey-primary flex flex-col divide-y-2">
          {credits?.slice(0, 20)?.map((credit) => (
            <li className="bg-grey-tertiary hover:bg-grey-secondary grid grid-cols-4 gap-x-4 rounded-2xl p-2 duration-300 sm:grid-cols-5 lg:grid-cols-7 2xl:grid-cols-10">
              <div className="bg-grey-primary aspect-auto">
                <MoviePoster path={credit?.poster_path} />
              </div>
              <div className="col-span-3 flex flex-col gap-1 sm:col-span-4 lg:col-span-6 2xl:col-span-9">
                <div>
                  <Flex>
                    <Title level={4}>{credit?.title || credit?.name}</Title>
                    {credit?.vote_average ? (
                      <Flex className={"items-center gap-0"}>
                        <Icon
                          path={mdiStar}
                          size={0.7}
                          className="text-primary"
                        />
                        <Title level={5}>
                          {credit?.vote_average.toFixed(1)}
                        </Title>
                      </Flex>
                    ) : null}
                  </Flex>

                  <Flex className={"hidden sm:flex"}>
                    <Paragraph type={"primary"}>{credit?.character}</Paragraph>
                    <Paragraph type={"secondary"}>
                      {credit?.release_date || credit?.first_air_date}
                    </Paragraph>
                  </Flex>
                </div>
                <Paragraph type={"secondary"} className={"line-clamp-4"}>
                  {credit?.overview}
                </Paragraph>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="col-span-full">
        <PersonImageGrid />
      </section>
    </div>
  );
}

export default PersonInfo;
