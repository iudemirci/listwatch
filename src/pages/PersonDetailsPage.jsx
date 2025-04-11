import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Title from "../ui/Title";
import Poster from "../components/Poster";
import Paragraph from "../ui/Paragraph";
import CreditsInfo from "../components/person/CreditsInfo";
import Skeleton from "../ui/Skeleton";
import PersonOverview from "../components/person/PersonOverview";
import ImageGrid from "../components/shared/ImageGrid";
import ScrollToTopButton from "../ui/ScrollToTopButton";
import KnownForList from "../components/person/KnownForList";
import MoreAtLinks from "../components/shared/MoreAtLinks";
import LastVisited from "../components/shared/LastVisited";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { useMovieDB } from "../hooks/moviedb/useMovieDB";
import ReadMoreLess from "../utilities/ReadMore";
import { addLastVisited } from "../store/lastVisitedSlice";

function PersonDetailsPage() {
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const type = location.pathname.split("/")[1];

  const { data: person, isPending: isPersonPending } = useMovieDB(
    "person",
    id,
    "item",
  );

  const { data: credits, isPending: isCreditsPending } = useMovieDB(
    undefined,
    id,
    "person_credits",
  );
  useDocumentTitle(`${person?.name} | list&watch`, isPersonPending);

  useEffect(() => {
    if (type && person) {
      dispatch(
        addLastVisited({
          title: person?.name,
          type,
          id: person?.id,
          poster_path: person.profile_path,
          date: new Date().toISOString(),
        }),
      );
    }
  }, [dispatch, type, person]);

  return (
    <div className="flex flex-col items-start gap-x-3 gap-y-6 pt-4 md:gap-x-4 md:gap-y-8 md:pt-8 lg:gap-x-6 lg:gap-y-10 2xl:gap-y-12">
      <ScrollToTopButton />

      <section className="2xl-grid-cols-4 grid w-full grid-cols-3 gap-x-3 sm:grid-cols-4 md:grid-cols-3 md:gap-x-4 lg:gap-x-8">
        {isPersonPending ? (
          <Skeleton className={"aspect-2/3 rounded-lg"} />
        ) : (
          <Poster path={person.profile_path} preview={true} />
        )}

        <div className="col-span-2 flex flex-col sm:col-span-3 md:col-span-2">
          {isPersonPending ? (
            [...Array(2)].map((_, i) => (
              <Skeleton
                key={i}
                className={"mb-2 h-6 rounded-lg lg:h-7 lg:w-90"}
              />
            ))
          ) : (
            <PersonOverview person={person} />
          )}

          <div className="mt-4 hidden flex-col gap-2 2xl:flex">
            {isPersonPending ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className={"aspect-50/1"} />
              ))
            ) : person?.biography?.length > 0 ? (
              <Paragraph type={"secondary"}>
                <ReadMoreLess charLimit={800}>{person?.biography}</ReadMoreLess>
              </Paragraph>
            ) : (
              <Paragraph type="secondary"> No biography found</Paragraph>
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
            {person?.biography?.length > 0 ? (
              <Paragraph type={"secondary"}>
                <ReadMoreLess charLimit={500}>{person?.biography}</ReadMoreLess>
              </Paragraph>
            ) : (
              <Paragraph type="secondary"> No biography found</Paragraph>
            )}
          </>
        )}
      </section>

      <section className="flex w-full flex-col gap-2">
        <Title level={3}>Known For</Title>
        <KnownForList
          name={person?.name || ""}
          credits={credits}
          isCreditsPending={isCreditsPending}
        />
        <MoreAtLinks imdbID={person?.imdb_id} />
      </section>

      <section className="flex w-full flex-col gap-2">
        <CreditsInfo
          credits={credits}
          isPending={isCreditsPending}
          gender={person?.gender}
        />
      </section>

      <section className="w-full">
        <ImageGrid type="person" />
      </section>

      <LastVisited />
    </div>
  );
}

export default PersonDetailsPage;
