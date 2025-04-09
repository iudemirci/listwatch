import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import ReleasesTab from "./ReleasesTab";
import CastTab from "./CastTab";
import CrewTab from "./CrewTab";
import DetailsTab from "./DetailsTab";
import { useLocation, useParams } from "react-router-dom";
import GenresTab from "./GenresTab";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import { useState } from "react";
import Skeleton from "../../ui/Skeleton";
import MoreAtLinks from "../shared/MoreAtLinks";

const tabs = ["CAST", "CREW", "DETAILS", "GENRES", "RELEASES"];

function DetailedInformation({ item, credits, isCreditsPending }) {
  const { id } = useParams("id");
  const type = useLocation().pathname.split("/")[1];
  const [expanded, setExpanded] = useState(false);

  const { data: titles } = useMovieDB(type, id, "alternative_titles");
  const { data: dates } = useMovieDB(
    type === "movie" ? type : undefined,
    id,
    "release_dates",
  );
  const { data: keywords, isPending: isKeywordsLoading } = useMovieDB(
    type,
    id,
    "keywords",
  );

  return (
    <div>
      <TabGroup className="pb-6">
        <TabList className="text-text-default border-grey-primary/60 relative mt-4 mb-1 border-b-1 py-0.5 text-sm font-medium tracking-wider lg:text-base">
          <div className="absolute bottom-[-1px] left-0 flex gap-2">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className="data-[selected]:text-primary cursor-pointer focus:outline-0 data-[selected]:border-b-1"
              >
                {tab}
              </Tab>
            ))}
          </div>
        </TabList>

        {isKeywordsLoading || isCreditsPending ? (
          <Skeleton className="mt-4 h-25" />
        ) : (
          <TabPanels>
            <TabPanel>
              <CastTab
                credits={credits?.cast}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            </TabPanel>
            <TabPanel>
              <CrewTab credits={credits?.crew} />
            </TabPanel>
            <TabPanel>
              <DetailsTab item={item} titles={titles} />
            </TabPanel>
            <TabPanel>
              <GenresTab item={item} keywords={keywords} />
            </TabPanel>
            <TabPanel>
              <ReleasesTab dates={dates} />
            </TabPanel>
          </TabPanels>
        )}
      </TabGroup>
      <MoreAtLinks imdbID={item?.imdb_id} />
    </div>
  );
}

export default DetailedInformation;
