import { capitalize } from "lodash";
import Paragraph from "../../ui/Paragraph";
import Title from "../../ui/Title";

import Poster from "../Poster";
import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import Skeleton from "../../ui/Skeleton";
import AccountIcon from "../AccountIcon";
import { memo } from "react";
import { Link } from "react-router-dom";

function ListPreviewCard({ listID }) {
  const { data: list, isPending: isListPending } = useMovieDB(
    undefined,
    listID,
    "list",
  );

  const {
    id,
    item_count,
    average_rating,
    name,
    created_by: { avatar_path = null, username } = {},
    results,
  } = list || {};

  return isListPending ? (
    <Skeleton className="h-35 rounded-lg" />
  ) : (
    <Link to={`/lists/${id}`}>
      <div className="bg-grey-tertiary shadow-grey-secondary group hover:bg-grey-secondary flex h-35 cursor-pointer items-stretch justify-between gap-2 overflow-hidden rounded-lg p-2 shadow-xs duration-300">
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 py-2.5 pl-0.5">
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
            <div className="flex flex-wrap items-center gap-1 truncate overflow-hidden">
              <AccountIcon path={avatar_path} className="size-5" />
              <Paragraph
                type="tertiary"
                className="line-clamp-1 max-w-[10rem] truncate"
              >
                {username}
              </Paragraph>
              <span className="text-grey-primary flex pl-1 text-xs font-medium tracking-wide">
                <Icon path={mdiStar} size={0.6} className="text-grey-primary" />
                {average_rating} avg.
              </span>
            </div>
          </div>
        </div>

        <div className="aspect-2/3 max-w-[85px] shrink-0">
          <Poster
            path={results?.[0]?.poster_path}
            className="relative"
            iconSize={1.5}
          />
        </div>
      </div>
    </Link>
  );
}

export default memo(ListPreviewCard);
