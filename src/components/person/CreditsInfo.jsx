import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { memo, useMemo, useState } from "react";
import { groupBy, map, uniq } from "lodash";
import dayjs from "dayjs";

import Button from "../../ui/Button";
import CreditsItem from "./CreditsItem";
import Skeleton from "../../ui/Skeleton";
import LinkToId from "../../ui/LinkToId";

import crewCategories from "../../assets/crewCategories.json";
import Title from "../../ui/Title";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

const currentDate = dayjs().format("YYYY-MM-DD");

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

  function filterUpcoming(arr) {
    if (!arr) return [];

    const upcoming = [];
    const previous = [];

    arr.forEach((item) => {
      const date = item.release_date || item.first_air_date;
      if (!date || date.trim() === "") {
        upcoming.push(item);
      } else if (date && dayjs(date).isAfter(currentDate)) {
        upcoming.push(item);
      } else {
        previous.push(item);
      }
    });
    return { upcoming, previous };
  }

  const grouped = groupBy(arr, "id");
  const deduped = map(grouped, (entries) => ({
    ...entries[0],
    job: uniq(entries.map((entry) => entry.job)),
  }));

  const { upcoming, previous } = filterUpcoming(deduped);

  return { upcoming: filterDate(upcoming), previous: filterDate(previous) };
}

//component
function CreditsInfo({ credits, isPending, gender }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAll, setShowAll] = useState({
    cast: false,
    director: false,
    writer: false,
    producer: false,
    composer: false,
  });

  const tabs = useMemo(() => {
    return [
      {
        title: gender === 2 ? "Actor" : "Actress",
        label: "cast",
        data: filterUnique(credits?.cast) || [],
      },
      {
        title: "Director",
        label: "director",
        data:
          filterUnique(
            credits?.crew.filter((item) => item.job === "Director"),
          ) || [],
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
  }, [credits, gender]);

  const validTabs = tabs?.filter(
    (tab) =>
      (tab?.data?.upcoming?.length || 0) > 0 ||
      (tab?.data?.previous?.length || 0) > 0,
  );

  function showAllToggle(label) {
    setShowAll((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }

  return (
    <TabGroup
      selectedIndex={selectedTab}
      onChange={(e) => {
        setSelectedTab(e);
        setShowAll((prevState) => ({ ...prevState }));
      }}
    >
      <TabList className="text-text-default border-grey-primary/60 relative mb-1 py-0.5 text-sm font-medium tracking-wider lg:text-base">
        <div className="left-0 flex w-full gap-2">
          {isPending
            ? [...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className={`h-5 ${i % 2 === 0 ? "w-15" : "w-20"}`}
                />
              ))
            : validTabs?.map((tab) => (
                <Tab
                  key={tab.title}
                  className="data-[selected]:text-primary cursor-pointer whitespace-nowrap uppercase focus:outline-0"
                >
                  {tab?.title}
                </Tab>
              ))}
        </div>
      </TabList>
      <TabPanels>
        {isPending
          ? [...Array(2)].map((_, i) => (
              <Skeleton key={i} className="mb-2 h-8.5" />
            ))
          : validTabs?.map((tab) => (
              <TabPanel key={tab.label}>
                <ul
                  className={`border-grey-primary/50 divide-grey-primary/50 flex flex-col divide-y-1 ${tab?.data?.upcoming?.length || tab?.data?.previous?.length >= 10 ? "border-t-1" : "border-y-1"}`}
                >
                  {isPending ? (
                    <Skeleton className={"h-20 rounded-2xl"} />
                  ) : (
                    <>
                      {tab?.data?.upcoming?.length > 0 && (
                        <Disclosure
                          defaultOpen={
                            tab?.data?.upcoming?.length >
                            tab?.data?.previous?.length
                          }
                        >
                          {({ open }) => (
                            <div className="divide-grey-primary/50 divide-y-1">
                              <div className="flex flex-col">
                                <DisclosureButton className="flex cursor-pointer items-center justify-between py-2 outline-0">
                                  <Title level={6} className="">
                                    Upcoming
                                    <span className="text-grey-primary relative ml-3 after:absolute after:top-1/2 after:-left-2 after:-translate-y-1/2 after:text-xs after:text-gray-400 after:content-['•']">
                                      {tab?.data?.upcoming?.length}
                                    </span>
                                  </Title>
                                  <Icon
                                    path={!open ? mdiChevronDown : mdiChevronUp}
                                    size={1}
                                  />
                                </DisclosureButton>
                              </div>

                              <DisclosurePanel className="divide-grey-primary/50 divide-y-1">
                                {tab?.data?.upcoming
                                  ?.slice(
                                    0,
                                    showAll[tab.label] ? tab.data?.length : 10,
                                  )
                                  ?.map((credit, i) => (
                                    <LinkToId
                                      key={i}
                                      type={credit?.media_type}
                                      item={credit}
                                    >
                                      <CreditsItem item={credit} />
                                    </LinkToId>
                                  ))}

                                {!isPending &&
                                  tab.data?.upcoming?.length > 10 &&
                                  !showAll[tab.label] && (
                                    <Button
                                      className="mt-2"
                                      onClick={() => showAllToggle(tab.label)}
                                    >
                                      Show all
                                    </Button>
                                  )}
                              </DisclosurePanel>
                            </div>
                          )}
                        </Disclosure>
                      )}

                      {tab?.data?.previous?.length > 0 && (
                        <Disclosure
                          defaultOpen={
                            tab?.data?.previous?.length >=
                            tab?.data?.upcoming?.length
                          }
                        >
                          {({ open }) => (
                            <div className="divide-grey-primary/50 divide-y-1">
                              <div className="flex flex-col">
                                <DisclosureButton className="flex cursor-pointer items-center justify-between py-2 outline-0">
                                  <Title level={6} className="">
                                    Previous
                                    <span className="text-grey-primary relative ml-3 after:absolute after:top-1/2 after:-left-2 after:-translate-y-1/2 after:text-xs after:text-gray-400 after:content-['•']">
                                      {tab?.data?.previous?.length}
                                    </span>
                                  </Title>
                                  <Icon
                                    path={!open ? mdiChevronDown : mdiChevronUp}
                                    size={1}
                                  />
                                </DisclosureButton>
                              </div>

                              <DisclosurePanel className="divide-grey-primary/50 relative divide-y-1">
                                {tab?.data?.previous
                                  ?.slice(
                                    0,
                                    showAll[tab.label] ? tab.data?.length : 10,
                                  )
                                  ?.map((credit, i) => (
                                    <LinkToId
                                      key={i}
                                      type={credit?.media_type}
                                      item={credit}
                                    >
                                      <CreditsItem item={credit} />
                                    </LinkToId>
                                  ))}

                                {!isPending &&
                                  tab.data?.previous?.length > 10 &&
                                  !showAll[tab.label] && (
                                    <Button
                                      className="mt-2"
                                      onClick={() => showAllToggle(tab.label)}
                                    >
                                      Show all
                                    </Button>
                                  )}
                              </DisclosurePanel>
                            </div>
                          )}
                        </Disclosure>
                      )}
                    </>
                  )}
                </ul>
              </TabPanel>
            ))}
      </TabPanels>
    </TabGroup>
  );
}

export default memo(CreditsInfo);
