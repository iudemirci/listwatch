import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import ReleasesTab from "./ReleasesTab";
import CastTab from "./CastTab";
import Paragraph from "../../ui/Paragraph";
import CrewTab from "./CrewTab";
import DetailsTab from "./DetailsTab";
import { useLocation, useParams } from "react-router-dom";
import GenresTab from "./GenresTab";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import { useState } from "react";

const tabs = ["CAST", "CREW", "DETAILS", "GENRES", "RELEASES"];

function DetailedInformation({ item, credits }) {
  const { id } = useParams("id");
  const type = useLocation().pathname.split("/")[1];
  const [expanded, setExpanded] = useState(false);

  const { data: titles } = useMovieDB(type, id, "alternative_titles");
  const { data: dates } = useMovieDB(
    type === "movie" ? type : undefined,
    id,
    "release_dates",
  );
  const { data: keywords } = useMovieDB(type, id, "keywords");
  return (
    <div>
      <TabGroup>
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
      </TabGroup>
      <div className="pt-6">
        <Paragraph type="tertiary" className="flex items-center gap-1">
          More at
          {item?.imdb_id && (
            <a
              className="border-grey-secondary hover:border-grey-primary cursor-pointer rounded-xs border-2 px-1 py-0.5 text-[10px] duration-100"
              href={`https://www.imdb.com/title/${item?.imdb_id}`}
              target="_blank"
            >
              IMDB
            </a>
          )}
          <a
            className="border-grey-secondary hover:border-grey-primary cursor-pointer rounded-xs border-2 px-1 py-0.5 text-[10px] duration-100"
            href={`https://www.themoviedb.org/${type}/${id}`}
            target="_blank"
          >
            TMDB
          </a>
        </Paragraph>
      </div>
    </div>
  );
}

export default DetailedInformation;
