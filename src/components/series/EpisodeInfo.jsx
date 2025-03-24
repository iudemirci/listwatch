import { useState } from "react";
import Button from "../../ui/Button";
import Skeleton from "../../ui/Skeleton";
import ListItem from "../ListItem";
import { useQuery } from "@tanstack/react-query";
import { getMovieItem } from "../../services/apiMoviedb";

function EpisodeInfo({ series, isPending, id }) {
  const [currentTab, setCurrentTab] = useState("seasons");
  const [seasonNumber, setSeasonNumber] = useState(1);
  const seasons = series?.seasons?.filter(
    (season) => season.name !== "Specials" && season.episode_count !== 0,
  );

  const { data: seriesSeasons, isPending: isSeasonsPending } = useQuery({
    queryKey: ["movieDB", `${id}_season_${seasonNumber}_episodes`],
    queryFn: () =>
      getMovieItem(`/tv/${id}/season/${seasonNumber}?language=en-US
      `),
    enabled: !!seasonNumber,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button
          className={currentTab === "seasons" ? "bg-primary" : "bg-transparent"}
          onClick={() => setCurrentTab("seasons")}
        >
          Seasons
        </Button>
        <Button
          className={
            currentTab === "episodes" ? "bg-primary" : "bg-transparent"
          }
          onClick={() => setCurrentTab("episodes")}
        >
          Episodes
        </Button>
      </div>
      {(isPending || isSeasonsPending) && (
        <Skeleton className="h-[75px] rounded-xl" />
      )}
      {currentTab === "seasons" && (
        <ul className="flex flex-col">
          {seasons?.map((season) => (
            <ListItem
              key={season?.id}
              item={season}
              type={"season"}
              isTv={true}
              onClick={() => {
                setSeasonNumber(season?.season_number);
                setCurrentTab("episodes");
              }}
            />
          ))}
        </ul>
      )}
      {currentTab === "episodes" && (
        <ul className="flex flex-col">
          {seriesSeasons?.episodes?.map((episode) => (
            <ListItem key={episode.name} item={episode} type={"episode"} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default EpisodeInfo;
