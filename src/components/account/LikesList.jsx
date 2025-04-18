import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import Paragraph from "../../ui/Paragraph";
import PosterLike from "../PosterLike";
import LinkToId from "../../ui/LinkToId";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiHeart } from "@mdi/js";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Skeleton from "../../ui/Skeleton";

const MAX_ITEMS = 10;

function LikesList({ likes, isLikesPending }) {
  const [showAll, setShowAll] = useState(false);

  return isLikesPending ? (
    [...Array(5)].map((_, idx) => <Skeleton key={idx} className="mt-1 h-6" />)
  ) : likes?.length === 0 ? (
    <div className="flex w-full flex-col items-center pt-8 text-center">
      <Icon path={mdiHeart} size={1} className="text-grey-primary/50" />
      <Paragraph type="primary" className="mt-2 font-extrabold">
        Start liking items
      </Paragraph>
      <Paragraph type="tertiary">
        Give quick likes to shows and movies and keep track.
      </Paragraph>
      <Link to="/discover" className="mt-6">
        <Button type="secondary" size="default_wide">
          Discover
        </Button>
      </Link>
    </div>
  ) : (
    <ul
      className={`divide-grey-primary/50 border-grey-primary/50 divide-y-1 pt-2 ${showAll && "border-b-1"}`}
    >
      {likes?.slice(0, !showAll ? MAX_ITEMS : likes?.length)?.map((like) => (
        <li
          key={like?.id}
          className="flex items-center justify-between gap-2 py-1"
        >
          <div className="flex min-w-0 items-center gap-1.5">
            <PosterLike item={like} />
            <Paragraph type="tertiary" className="whitespace-nowrap">
              You liked
            </Paragraph>
            <Paragraph
              type="primary"
              className="min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <LinkToId
                item={like}
                type={like.type}
                className="hover:text-primary block truncate overflow-hidden text-ellipsis whitespace-nowrap duration-300"
              >
                {like.title}
              </LinkToId>
            </Paragraph>
          </div>
          <div className="whitespace-nowrap">
            <Paragraph type="tertiary">
              {dayjs(like?.createdAt).fromNow()}
            </Paragraph>
          </div>
        </li>
      ))}
      {!showAll && likes?.length > MAX_ITEMS && (
        <div className="justify-self-end py-1">
          <button
            onClick={() => setShowAll(true)}
            className="group flex cursor-pointer items-center"
          >
            <Paragraph
              type="primary"
              className="group-hover:text-primary duration-300"
            >
              Show all
            </Paragraph>
            <Icon
              path={mdiChevronDown}
              size={0.8}
              className="group-hover:text-primary duration-300"
            />
          </button>
        </div>
      )}
    </ul>
  );
}

export default LikesList;
