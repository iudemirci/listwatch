import { useMemo, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { mdiStar } from "@mdi/js";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import Skeleton from "../../ui/Skeleton";
import Paragraph from "../../ui/Paragraph";
import MdiIcon from "../../ui/MdiIcon";
import Title from "../../ui/Title";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import EpisodeStill from "./EpisodeStill";
import { getMovieItem } from "../../services/apiMoviedb";

function shortenText(text) {
  const sentences = text.match(/[^.!?]+[.!?]/g) || [];
  return sentences.slice(0, 1).join(" ").trim();
}
function EpisodeInfo({ series, isPending, id }) {
  const queryClient = useQueryClient();
  const [index, setIndex] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);

  const seasons = useMemo(() => {
    return (
      series?.seasons?.filter(
        (season) => season.name !== "Specials" && season.episode_count !== 0,
      ) || []
    );
  }, [series]);

  useEffect(() => {
    if (!seasons || !id) return;

    const promises = Array.from({ length: seasons?.length }, (_, i) =>
      queryClient.prefetchQuery({
        queryKey: ["movieDB", i + 1, id, "tv_credits"],
        queryFn: () => getMovieItem(i + 1, id, "tv_credits"),
        staleTime: 60 * 1000 * 5,
      }),
    );
    Promise.all(promises);
  }, [id, seasons, queryClient]);

  const { data: seriesSeasons, isPending: isSeasonsPending } = useMovieDB(
    index + 1,
    id,
    "tv_credits",
  );

  const data =
    seriesSeasons?.episodes?.map((episode) => ({
      episode: `E${episode?.episode_number}`,
      rating: +episode?.vote_average?.toFixed(1),
    })) || [];
  const average =
    +(
      data?.reduce((acc, currValue) => acc + currValue.rating, 0) / data?.length
    ).toFixed(1) || 0;
  function handleSelectedIndex(i) {
    setIndex(i);
    setSelectedEpisode(0);
  }

  return (
    <TabGroup selectedIndex={index} onChange={handleSelectedIndex}>
      <TabList className="text-text-default border-grey-primary/60 relative mt-4 mb-1 border-b-1 py-0.5 text-sm font-medium tracking-wider lg:text-base">
        <div className="absolute bottom-[-1px] left-0 flex w-full flex-wrap">
          {isPending ? (
            <Skeleton className="mb-1 h-6" />
          ) : (
            seasons?.map((season, i) => (
              <Tab
                key={season?.id}
                className="data-[selected]:text-primary cursor-pointer px-1 py-0.5 whitespace-nowrap focus:outline-0 data-[selected]:border-b-1"
              >
                S{i + 1}
              </Tab>
            ))
          )}
        </div>
      </TabList>

      <TabPanels>
        <TabGroup
          selectedIndex={selectedEpisode}
          onChange={(e) => setSelectedEpisode(e)}
        >
          <TabList className="text-text-default text-sm font-medium tracking-wider lg:text-base">
            <div className="border-grey-primary/60 flex flex-wrap border-b-1">
              {isSeasonsPending || isPending ? (
                <Skeleton className="mb-1 h-6" />
              ) : (
                seriesSeasons?.episodes?.map((episode) => (
                  <Tab
                    key={episode.id}
                    className="data-[selected]:text-primary hover:bg-grey-secondary cursor-pointer rounded-lg px-1 py-0.5 whitespace-nowrap focus:outline-0"
                  >
                    E{episode.episode_number}
                  </Tab>
                ))
              )}
            </div>

            {isSeasonsPending || isPending ? (
              <Skeleton className="mt-3 h-78 sm:h-51 md:h-52" />
            ) : (
              <>
                <div className="text-grey-primary flex items-center gap-2 pt-3 text-xs font-normal">
                  S{index + 1} Episodes
                  <span className="flex items-center">
                    <MdiIcon
                      path={mdiStar}
                      size={0.6}
                      className="text-primary"
                    />
                    {!average ? "No rating yet" : `${average} average`}
                  </span>
                </div>

                <TabPanels>
                  {seriesSeasons?.episodes?.map((episode) => (
                    <TabPanel key={episode.id}>
                      <div className="flex min-h-75 flex-col gap-4 pt-3 sm:min-h-45 sm:flex-row">
                        <div className="max-h-45 min-h-45 flex-1 overflow-hidden rounded-lg">
                          <EpisodeStill
                            src={episode.still_path}
                            alt={episode.name}
                          />
                        </div>
                        <div className="flex flex-2 flex-col gap-1">
                          <Title level={4}>{episode?.name}</Title>
                          <div className="flex items-center gap-1.5">
                            {episode?.vote_average ? (
                              <span className="flex gap-2">
                                <Paragraph
                                  type="secondary"
                                  className="flex items-center"
                                >
                                  <MdiIcon
                                    path={mdiStar}
                                    size={0.6}
                                    className="text-primary"
                                  />
                                  {episode?.vote_average.toFixed(1)}
                                </Paragraph>
                              </span>
                            ) : (
                              <span className="text-grey-primary text-xs lg:text-sm">
                                No rating yet
                              </span>
                            )}
                            <span className="text-grey-primary-light text-xs">
                              /
                            </span>
                            <Paragraph type="secondary">
                              S{episode?.season_number}.E
                              {episode?.episode_number}
                            </Paragraph>
                            <span className="text-grey-primary-light text-xs">
                              /
                            </span>
                            <Paragraph type="secondary">
                              {dayjs(episode?.air_date).format("MMMM DD, YYYY")}
                            </Paragraph>
                          </div>
                          <Paragraph type="tertiary">
                            {shortenText(episode?.overview)}
                          </Paragraph>
                        </div>
                      </div>
                    </TabPanel>
                  ))}
                </TabPanels>
              </>
            )}
          </TabList>
        </TabGroup>
      </TabPanels>
    </TabGroup>
  );
}

export default EpisodeInfo;
