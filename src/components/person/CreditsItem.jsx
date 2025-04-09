import Poster from "../Poster";
import Flex from "../../ui/Flex";
import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import Title from "../../ui/Title";
import Paragraph from "../../ui/Paragraph";
import { getYear } from "../../utilities/getYear";
import { memo } from "react";

function CreditsItem({ item, ...props }) {
  const year =
    getYear(item?.release_date) ||
    getYear(item?.first_air_date) ||
    getYear(item?.air_date) ||
    null;

  return (
    <li
      className="hover:bg-grey-secondary/30 group flex cursor-pointer gap-2 py-1.5 duration-300"
      {...props}
    >
      <Poster
        path={item?.poster_path || item?.still_path}
        className="aspect-2/3 w-10"
      />
      <div className="flex flex-1 flex-col gap-0.5">
        <Flex className="justify-between pr-2">
          <Title
            level={6}
            className="group-hover:text-primary line-clamp-1 duration-300"
          >
            {item?.title || item?.name}
          </Title>
          <Paragraph type={"secondary"}>
            {year || (
              <span className="rounded-lg border-1 px-1 text-[11px]">
                UPCOMING
              </span>
            )}
          </Paragraph>
        </Flex>

        <div className="flex items-center gap-2">
          {item?.vote_average ? (
            <Flex className={"items-center gap-0.5"}>
              <Icon path={mdiStar} size={0.5} className="text-primary" />
              <Paragraph type="secondary">
                {item?.vote_average.toFixed(1)}
              </Paragraph>
            </Flex>
          ) : (
            <Icon path={mdiStar} size={0.5} className="text-grey-primary" />
          )}
          <Paragraph type="secondary">
            {item?.media_type === "tv" && "TV Series"}
          </Paragraph>
        </div>

        {item?.character && (
          <Paragraph type={"secondary"}>{item?.character}</Paragraph>
        )}
        {item?.job && (
          <Paragraph type={"secondary"} className="line-clamp-1">
            {item?.job?.join(" / ")}
          </Paragraph>
        )}
      </div>
    </li>
  );
}

export default memo(CreditsItem);
