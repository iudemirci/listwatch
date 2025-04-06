import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Title from "../ui/Title";
import Poster from "../components/Poster";
import Paragraph from "../ui/Paragraph";
import CreditsInfo from "../components/person/CreditsInfo";
import Skeleton from "../ui/Skeleton";
import PersonOverview from "../components/person/PersonOverview";
import ImageGrid from "../components/shared/ImageGrid";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { useMovieDB } from "../hooks/moviedb/useMovieDB";
import ReadMoreLess from "../utilities/ReadMore";
import { useGetUser } from "../hooks/auth/useGetUser";
import { addLastVisited } from "../services/apiUser";
import ScrollToTopButton from "../ui/ScrollToTopButton";

function PersonDetailsPage() {
  const { id } = useParams("id");
  const token = localStorage.getItem("token");
  const type = location.pathname.split("/")[1];
  const { user } = useGetUser();

  const { data: person, isPending: isPersonPending } = useMovieDB(
    "person",
    id,
    "item",
  );
  useDocumentTitle(`${person?.name} | list&watch`, isPersonPending);

  useEffect(() => {
    if (token && type && user?.id && person) {
      const item = {
        userID: user.id,
        title: person.name,
        type: type,
        id: person.id,
        poster_path: person.profile_path,
      };
      addLastVisited(item);
    }
  }, [token, type, person, user?.id]);

  return (
    <div className="flex flex-col items-start gap-x-3 gap-y-6 pt-4 md:gap-x-4 md:gap-y-8 md:pt-8 lg:gap-x-6 lg:gap-y-10 2xl:gap-y-12">
      <ScrollToTopButton />
      <section className="2xl-grid-cols-4 grid w-full grid-cols-3 gap-x-3 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 lg:gap-x-8">
        {isPersonPending ? (
          <Skeleton className={"aspect-2/3 rounded-lg"} />
        ) : (
          <Poster path={person.profile_path} preview={true} />
        )}

        <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 md:col-span-2">
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

          <div className="hidden flex-col gap-2 2xl:flex">
            {isPersonPending ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className={"aspect-50/1"} />
              ))
            ) : (
              <Paragraph type={"secondary"}>
                <ReadMoreLess charLimit={800}>{person?.biography}</ReadMoreLess>
              </Paragraph>
            )}
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col gap-1 2xl:col-span-3 2xl:hidden">
        {isPersonPending ? (
          [...Array(3)].map((_, i) => <Skeleton key={i} className="mb-1 h-4" />)
        ) : (
          <>
            <Title level={3}>Biography</Title>
            <Paragraph type={"secondary"}>
              <ReadMoreLess charLimit={500}>{person?.biography}</ReadMoreLess>
            </Paragraph>
          </>
        )}
      </section>

      <section className="flex w-full flex-col gap-2">
        <CreditsInfo id={id} gender={person?.gender} />
      </section>

      <section className="w-full">
        <ImageGrid type="person" id={id} />
      </section>
    </div>
  );
}

export default PersonDetailsPage;
