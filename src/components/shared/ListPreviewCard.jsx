import { capitalize } from "lodash";
import Paragraph from "../../ui/Paragraph";
import Title from "../../ui/Title";

import Poster from "../Poster";
import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import Skeleton from "../../ui/Skeleton";
import AccountIcon from "../review/accountIcon";

function ListPreviewCard({ listID }) {
  const { data: list, isPending: isListPending } = useMovieDB(
    undefined,
    listID,
    "list",
  );

  const {
    item_count,
    average_rating,
    name,
    created_by: { avatar_path = null, username } = {},
    results,
  } = list || {};

  return isListPending ? (
    <Skeleton className="h-35 rounded-lg" />
  ) : (
    <div className="bg-grey-tertiary shadow-grey-secondary group hover:bg-grey-secondary flex h-35 cursor-pointer justify-between gap-2 rounded-lg p-2 shadow-xs duration-300">
      <div className="flex flex-col justify-between gap-1 py-2.5 pl-0.5">
        <Title
          level={5}
          className="group-hover:text-grey-primary-light line-clamp-1 duration-300"
        >
          {capitalize(name)}
        </Title>

        <div className="flex flex-col gap-1">
          <div className="flex">
            <span className="text-grey-primary pl-1 text-xs font-medium tracking-wide">
              {item_count} titles
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <AccountIcon path={avatar_path} className="size-5" />
            <Paragraph type="tertiary" className="line-clamp-1">
              {username}
            </Paragraph>{" "}
            <span className="text-grey-primary flex pl-1 text-xs font-medium tracking-wide">
              <Icon path={mdiStar} size={0.6} className="text-grey-primary" />
              {average_rating} avg.
            </span>
          </div>
        </div>
      </div>
      <div className="aspect-2/3">
        <Poster path={results?.[0]?.poster_path} className="relative" />
      </div>
    </div>
  );
}

export default ListPreviewCard;
