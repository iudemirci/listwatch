import { useLocation, useParams } from "react-router-dom";
import { memo, useMemo } from "react";

import Title from "../../ui/Title";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import Paragraph from "../../ui/Paragraph";
import { Icon } from "@iconify/react/dist/iconify.js";
import Skeleton from "../../ui/Skeleton";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const SIZE = "/w92";

function WhereToWatch() {
  const { id } = useParams("id");
  const type = useLocation().pathname.split("/")[1];

  const { data: whereToWatch, isPending: isWherePending } = useMovieDB(
    type,
    id,
    "where_to_watch",
  );

  const isData =
    whereToWatch?.US?.flatrate?.length > 0 ||
    whereToWatch?.US?.buy?.length > 0 ||
    whereToWatch?.US?.rent?.length > 0;

  const tabs = useMemo(() => {
    return [
      {
        data: whereToWatch?.US?.flatrate,
        label: "STREAM",
      },
      {
        data: whereToWatch?.US?.buy,
        label: "BUY",
      },
      {
        data: whereToWatch?.US?.rent,
        label: "RENT",
      },
    ];
  }, [whereToWatch]);

  return (
    <div className="border-grey-primary/50 overflow-hidden rounded-lg border-1">
      <div className="bg-grey-secondary flex items-center justify-between px-2 py-1">
        <Title level={5}>Where to Watch</Title>
        <a
          href="https://www.justwatch.com/"
          target="_blank"
          className="hover:text-primary group flex items-center gap-0.5 duration-100"
        >
          <Icon icon="arcticons:justwatch" fontSize={20} />
          <Paragraph
            type="tertiary"
            className="group-hover:text-primary duration-100"
          >
            JustWatch
          </Paragraph>
        </a>
      </div>

      <div className="divide-grey-primary/50 flex flex-col divide-y-1 px-2 py-1">
        {isWherePending ? (
          [...Array(2)].map((_, i) => (
            <Skeleton key={i} className="my-0.5 h-9" />
          ))
        ) : !isData ? (
          <Paragraph type="tertiary" className="py-1.5">
            No watch data found
          </Paragraph>
        ) : (
          tabs?.map((provider) => {
            if (!provider?.data) return null;

            return (
              <ul
                key={provider?.label}
                className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-1.5"
              >
                <span className="bg-grey-secondary rounded-sm px-2 py-0.5 text-[10px] font-normal">
                  {provider?.label}
                </span>

                {provider?.data?.map((item) => (
                  <li key={item?.provider_id}>
                    <a
                      href={whereToWatch?.US?.link}
                      target="_blank"
                      className="group flex cursor-pointer items-center gap-1"
                    >
                      <div className="w-6 overflow-hidden rounded-lg">
                        <img src={`${BASE_URL}${SIZE}${item?.logo_path}`} />
                      </div>
                      <Paragraph
                        type="tertiary"
                        className="group-hover:text-text-default duration-100"
                      >
                        {item?.provider_name}
                      </Paragraph>
                    </a>
                  </li>
                ))}
              </ul>
            );
          })
        )}
      </div>
    </div>
  );
}

export default memo(WhereToWatch);
