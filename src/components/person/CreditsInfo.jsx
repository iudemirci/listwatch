import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { groupBy, map, uniq } from "lodash";
import dayjs from "dayjs";

import Button from "../../ui/Button";
import CreditsItem from "./CreditsItem";
import Skeleton from "../../ui/Skeleton";
import LinkToId from "../../ui/LinkToId";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import crewCategories from "../../assets/crewCategories.json";

//filtering
function filterUnique(arr) {
  if (!arr) return [];

  function filterDate(arr) {
    return arr?.sort((a, b) => {
      const dateA = dayjs(a.release_date || a.first_air_date || "2100-01-01");
      const dateB = dayjs(b.release_date || b.first_air_date || "2100-01-01");
      return dateB - dateA;
    });
  }

  const grouped = groupBy(arr, "id");
  const deduped = map(grouped, (entries) => ({
    ...entries[0],
    job: uniq(entries.map((entry) => entry.job)),
  }));
  return filterDate(deduped);
}

//component
function CreditsInfo({ id, gender }) {
  const [showAll, setShowAll] = useState({
    cast: false,
    director: false,
    writer: false,
    producer: false,
    composer: false,
  });

  const { data: credits, isPending } = useMovieDB(
    undefined,
    id,
    "person_credits",
  );

  const tabs = [
    {
      title: gender === 2 ? "Actor" : "Actress",
      label: "cast",
      data: filterUnique(credits?.cast) || [],
    },
    {
      title: "Director",
      label: "director",
      data:
        filterUnique(credits?.crew.filter((item) => item.job === "Director")) ||
        [],
    },
    {
      title: "Writer",
      label: "writer",
      data:
        filterUnique(
          credits?.crew.filter((item) =>
            crewCategories.writerJobs.includes(item.job),
          ),
        ) || [],
    },
    {
      title: "Producer",
      label: "producer",
      data:
        filterUnique(
          credits?.crew.filter(
            (item) =>
              ![
                "Director",
                "Writer",
                ...crewCategories.writerJobs,
                ...crewCategories.composingJobs,
              ].includes(item.job),
          ),
        ) || [],
    },
    {
      title: "Composer",
      label: "composer",
      data:
        filterUnique(
          credits?.crew.filter((item) =>
            crewCategories.composingJobs.includes(item.job),
          ),
        ) || [],
    },
  ];

  function showAllToggle(label) {
    setShowAll((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }

  return (
    <TabGroup onChange={() => setShowAll((prevState) => ({ ...prevState }))}>
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
        {tabs?.map((tab) => {
          if (tab?.data?.length === 0) return null;
          return (
            <TabPanel key={tab.label}>
              <ul className="flex flex-col pt-1">
                {isPending ? (
                  <Skeleton className={"h-20 rounded-2xl"} />
                ) : (
                  tab?.data
                    ?.slice(0, showAll[tab.label] ? tab.data?.length : 10)
                    ?.map((credit, i) => (
                      <LinkToId key={i} type={credit?.media_type} item={credit}>
                        <CreditsItem item={credit} />
                      </LinkToId>
                    ))
                )}
                {!isPending && tab.data?.length > 10 && !showAll[tab.label] && (
                  <Button
                    className="mt-2 self-end"
                    onClick={() => showAllToggle(tab.label)}
                  >
                    Show all
                  </Button>
                )}
              </ul>
            </TabPanel>
          );
        })}
      </TabPanels>
    </TabGroup>
  );
}

export default CreditsInfo;
