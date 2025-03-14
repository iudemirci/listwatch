import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axios/axiosInstance";
import Title from "../../ui/Title";
import Poster from "../Poster";
import PersonImageGrid from "./PersonImageGrid";
import Imdb from "../../ui/Imdb";
import Paragraph from "../../ui/Paragraph";

import useWindowWidth from "../../hooks/useWindowWidth";
import ListItem from "../ListItem";
import Button from "../../ui/Button";
import Flex from "../../ui/Flex";

function PersonInfo() {
  const { id } = useParams("id");
  const [person, setPerson] = useState();
  const [credits, setCredits] = useState();
  const width = useWindowWidth();
  const isNative = width <= 1024;

  // console.log(person);
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
        <Poster path={person?.profile_path} preview={true} />
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

          {!isNative && person?.biography ? (
            <section className="col-span-full flex flex-col gap-2">
              <Title level={3}>Biography</Title>
              <Paragraph type={"secondary"}>{person?.biography}</Paragraph>
            </section>
          ) : null}

          <Imdb id={person?.imdb_id} type={"person"} />
        </div>
      </section>

      {isNative && person?.biography ? (
        <section className="col-span-full flex flex-col gap-2">
          <Title level={3}>Biography</Title>
          <Paragraph type={"secondary"} className={isNative && "line-clamp-10"}>
            {person?.biography}
          </Paragraph>
        </section>
      ) : null}

      <section className="col-span-full">
        <PersonImageGrid />
      </section>

      <section className="col-span-full flex flex-col gap-2">
        <Flex>
          <Button type="primary">Actor</Button>
          <Button type="secondary">Director</Button>
          <Button type="secondary">Producer</Button>
        </Flex>
        <ul className="divide-grey-primary flex flex-col divide-y-2">
          {credits?.slice(0, 20)?.map((credit, i) => (
            <ListItem key={i} item={credit} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default PersonInfo;
