import { useState } from "react";
import Button from "../../ui/Button";
import ListItem from "../ListItem";
import { useFetchMovieItem } from "../../hooks/moviedb/useFetchMovieItem";
import { Link } from "react-router-dom";
import Skeleton from "../../ui/Skeleton";

function filterDate(arr) {
  return arr.sort(
    (a, b) =>
      b.release_date?.split("-").at(0) - a.release_date?.split("-").at(0) ||
      b.first_air_date?.split("-").at(0) - a.first_air_date?.split("-").at(0),
  );
}

function CreditsInfo({ id, gender }) {
  const [isShow, setIsShow] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);

  const { data: credits, isPending } = useFetchMovieItem(
    `/person/${id}/combined_credits?language=en-US`,
    `person_${id}_credits`,
  );
  const cast = credits && filterDate(credits?.cast);
  const producer =
    credits &&
    filterDate(credits?.crew.filter((item) => item.job !== "Director"));
  const director =
    credits &&
    filterDate(credits?.crew.filter((item) => item.job === "Director"));

  const tabs = [
    {
      label: cast?.length > 0 && gender === 1 ? "Actress" : "Actor",
    },
    {
      label: producer?.length > 0 && "Producer",
    },
    {
      label: director?.length > 0 && "Director",
    },
  ];
  let currentLabel = cast;
  if (currentTab === 1) currentLabel = cast;
  else if (currentTab === 2) currentLabel = producer;
  else if (currentTab === 3) currentLabel = director;

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-2">
        {isPending
          ? [...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className={
                  i % 2 === 1
                    ? "h-8 w-20 rounded-2xl lg:h-10 lg:w-25"
                    : "h-8 w-15 rounded-2xl lg:h-10 lg:w-20"
                }
              />
            ))
          : tabs.map((tab, i) => {
              if (tab.label)
                return (
                  <Button
                    key={tab.label}
                    type={currentTab === i + 1 ? "primary" : "secondary"}
                    onClick={() => {
                      setCurrentTab(i + 1);
                      setIsShow((s) => !s);
                    }}
                  >
                    {tab.label}
                  </Button>
                );
            })}
      </div>
      <ul>
        {isPending ? (
          <Skeleton className={"h-20 rounded-2xl"} />
        ) : (
          currentLabel
            .slice(0, isShow ? currentLabel?.length : 10)
            ?.map((credit, i) => (
              <Link
                key={i}
                to={
                  credit?.media_type === "movie"
                    ? `/films/${credit.id}`
                    : `/tv/${credit.id}`
                }
              >
                <ListItem key={i} item={credit} />
              </Link>
            ))
        )}

        {currentLabel?.length > 10 && (
          <Button
            className={"mt-2 self-start"}
            onClick={() => setIsShow((s) => !s)}
          >
            {isShow ? "Show less" : "Show all"}
          </Button>
        )}
      </ul>
    </>
  );
}

export default CreditsInfo;
