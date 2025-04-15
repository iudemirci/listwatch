import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { useGetLikes } from "../../hooks/user/useGetLikes";
import Paragraph from "../../ui/Paragraph";
import PosterLike from "../PosterLike";
import LinkToId from "../../ui/LinkToId";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import { useState } from "react";

const MAX_ITEMS = 10;

function LikesList() {
  const [showAll, setShowAll] = useState(false);
  const { data: likes, isPending: isLikesPending } = useGetLikes();

  return (
    <ul
      className={`divide-grey-primary/50 line border-grey-primary/50 divide-y-1 ${showAll && "border-b-1"}`}
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
