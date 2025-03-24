import { useParams } from "react-router-dom";
import ReactReadMoreReadLess from "react-read-more-read-less";

import Title from "../../ui/Title";
import Poster from "../Poster";
import Paragraph from "../../ui/Paragraph";
import CreditsInfo from "./CreditsInfo";
import Skeleton from "../../ui/Skeleton";
import PersonOverview from "./PersonOverview";
import ImageGrid from "../ImageGrid";

import useWindowWidth from "../../hooks/useWindowWidth";
import { useFetchMovieItem } from "../../hooks/moviedb/useFetchMovieItem";

function PersonInfo() {
  const { id } = useParams("id");
  const width = useWindowWidth();

  const { data: person, isPending: isPersonPending } = useFetchMovieItem(
    `/person/${id}?language=en-US`,
    `person_${id}`,
  );
  return (
    <div className="grid grid-cols-3 items-start gap-x-3 gap-y-6 pt-4 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 md:pt-8 lg:gap-x-6 lg:gap-y-8 2xl:grid-cols-4">
      <div>
        {isPersonPending ? (
          <Skeleton className={"aspect-2/3 rounded-lg"} />
        ) : (
          <Poster path={person.profile_path} preview={true} />
        )}
      </div>

      <section className="col-span-2 2xl:col-span-3">
        {isPersonPending ? (
          [...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className={"mb-2 h-7 rounded-lg lg:h-10 lg:w-90"}
            />
          ))
        ) : (
          <PersonOverview person={person} />
        )}
      </section>

      <section className="col-span-full flex flex-col gap-2">
        <Title level={3}>Biography</Title>
        {isPersonPending ? (
          [...Array(5)].map((_, i) => (
            <Skeleton key={i} className={"h-3 rounded-lg"} />
          ))
        ) : (
          <Paragraph type={"secondary"}>
            <ReactReadMoreReadLess
              charLimit={1000}
              readMoreText={
                <span className="hover:text-primary text-text-default duration-300">
                  Read more &darr;
                </span>
              }
              readLessText={
                <span className="hover:text-primary text-text-default duration-300">
                  Read less &uarr;
                </span>
              }
            >
              {person?.biography}
            </ReactReadMoreReadLess>
          </Paragraph>
        )}
      </section>

      <section className="col-span-full flex flex-col gap-2">
        <CreditsInfo id={id} gender={person?.gender} />
      </section>

      <section className="col-span-full">
        <ImageGrid type="person" id={id} />
      </section>
    </div>
  );
}

export default PersonInfo;
