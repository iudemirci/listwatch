import Poster from "./Poster";
import Flex from "../ui/Flex";
import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import Title from "../ui/Title";
import Paragraph from "../ui/Paragraph";

function ListItem({ item, type, ...props }) {
  return (
    <li
      className="bg-grey-tertiary hover:bg-grey-secondary border-grey-primary group flex cursor-pointer gap-2 rounded-2xl border-b-2 p-2 duration-300"
      {...props}
    >
      <Poster
        path={item?.poster_path || item?.still_path}
        className={type === "episode" ? "aspect-5/3 w-18" : "aspect-2/3 w-10"}
      />
      <div className="flex flex-1 flex-col gap-1">
        <div>
          <Flex className="justify-between pr-2">
            <div className="flex items-center gap-1">
              {type === "episode" && (
                <span className="text-grey-primary">
                  {item.episode_number}.
                </span>
              )}
              <Title
                level={4}
                className="group-hover:text-primary line-clamp-1 duration-300"
              >
                {item?.title || item?.name}
              </Title>
            </div>
            {item?.vote_average ? (
              <Flex className={"items-center gap-0"}>
                <Icon path={mdiStar} size={0.7} className="text-primary" />
                <Title level={5}>{item?.vote_average.toFixed(1)}</Title>
              </Flex>
            ) : null}
          </Flex>

          <div className="flex gap-1.5">
            {type === "season" && (
              // <>
              <div className="flex gap-1">
                <Paragraph type={"primary"}>{item?.episode_count}</Paragraph>
                <Paragraph type="secondary">Episodes</Paragraph>
              </div>
            )}
            {type === "episode" && (
              <Paragraph type="secondary">
                {item?.runtime && item?.runtime + " mins"}
              </Paragraph>
            )}
            {item?.job && <Paragraph type={"primary"}>{item?.job}</Paragraph>}
            {type !== "episode" && (
              <Paragraph type={"secondary"}>
                {item?.release_date?.split("-").at(0) ||
                  item?.first_air_date?.split("-").at(0) ||
                  item?.air_date?.split("-").at(0)}
              </Paragraph>
            )}
            {item?.character && (
              <Paragraph type={"secondary"}>{item?.character}</Paragraph>
            )}
          </div>
        </div>
        {/* {type !== "episode" && (
          <Paragraph type={"secondary"} className={"line-clamp-4"}>
            {item?.overview}
          </Paragraph>
        )} */}
      </div>
    </li>
  );
}

export default ListItem;
