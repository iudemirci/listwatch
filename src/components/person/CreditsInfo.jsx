import { useState } from "react";
import Button from "../../ui/Button";
import CreditsItem from "../CreditsItem";
import Skeleton from "../../ui/Skeleton";
import LinkToId from "../../ui/LinkToId";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import dayjs from "dayjs";

function filterDate(arr) {
  return arr?.sort((a, b) => {
    const dateB = dayjs(b.release_date || b.first_air_date);
    const dateA = dayjs(a.release_date || a.first_air_date);
    return dateB - dateA;
  });
}
function CreditsInfo({ id, gender }) {
  const [isShow, setIsShow] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);

  const { data: credits, isPending } = useMovieDB(
    undefined,
    id,
    "person_credits",
  );
  const cast = filterDate(credits?.cast) || [];
  const producer =
    (credits &&
      filterDate(credits?.crew.filter((item) => item.job !== "Director"))) ||
    [];
  const director =
    (credits &&
      filterDate(credits?.crew.filter((item) => item.job === "Director"))) ||
    [];

  const tabs = [
    {
      title: gender === 2 ? "Actor" : "Actress",
      label: "cast",
      data: filterDate(credits?.cast) || [],
    },
    {
      title: "Producer",
      label: "producer",
      data:
        filterDate(credits?.crew.filter((item) => item.job !== "Director")) ||
        [],
    },
    {
      title: "Director",
      label: "director",
      data:
        filterDate(credits?.crew.filter((item) => item.job === "Director")) ||
        [],
    },
  ];

  return (
    <TabGroup onChange={() => setIsShow(false)}>
      <TabList className="text-text-default border-grey-primary/60 relative mt-4 mb-1 border-b-1 py-0.5 text-sm font-medium tracking-wider lg:text-base">
        <div className="absolute bottom-[-1px] left-0 flex w-full gap-2">
          {tabs?.map((tab) => {
            if (tab?.data?.length === 0) return null;
            return (
              <Tab
                key={tab.title}
                className="data-[selected]:text-primary cursor-pointer whitespace-nowrap uppercase focus:outline-0 data-[selected]:border-b-1"
              >
                {tab?.title}
              </Tab>
            );
          })}
        </div>
      </TabList>
      <TabPanels>
        {tabs?.map((tab) => (
          <TabPanel key={tab.label}>
            <ul className="flex flex-col">
              {isPending ? (
                <Skeleton className={"h-20 rounded-2xl"} />
              ) : (
                tab?.data
                  ?.slice(0, isShow ? cast?.length : 10)
                  ?.map((credit, i) => (
                    <LinkToId key={i} type={credit?.media_type} item={credit}>
                      <CreditsItem item={credit} />
                    </LinkToId>
                  ))
              )}
              {!isPending && tab.data?.length > 10 && !isShow && (
                <Button
                  className="mt-2 self-end"
                  onClick={() => setIsShow((s) => !s)}
                >
                  Show all
                </Button>
              )}
            </ul>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}

export default CreditsInfo;
