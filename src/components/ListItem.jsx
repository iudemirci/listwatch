import Poster from "./Poster";
import Flex from "../ui/Flex";
import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import Title from "../ui/Title";
import Paragraph from "../ui/Paragraph";

function ListItem({ item, isTv = false }) {
  return (
    <li className="bg-grey-tertiary hover:bg-grey-secondary border-grey-primary grid grid-cols-4 gap-x-4 rounded-2xl border-b-2 p-2 duration-300 sm:grid-cols-5 lg:grid-cols-7 2xl:grid-cols-10">
      <div className="aspect-auto">
        <Poster path={item?.poster_path} />
      </div>
      <div className="col-span-3 flex flex-col gap-1 sm:col-span-4 lg:col-span-6 2xl:col-span-9">
        <div>
          <Flex>
            <Title level={4}>{item?.title || item?.name}</Title>
            {item?.vote_average ? (
              <Flex className={"items-center gap-0"}>
                <Icon path={mdiStar} size={0.7} className="text-primary" />
                <Title level={5}>{item?.vote_average.toFixed(1)}</Title>
              </Flex>
            ) : null}
          </Flex>

          <Flex className={isTv || "hidden sm:flex"}>
            {item.episode_count && (
              <Flex className={"gap-1"}>
                <Paragraph type={"primary"}>{item?.episode_count}</Paragraph>
                <Paragraph type="secondary">Episodes</Paragraph>
              </Flex>
            )}
            <Paragraph type={"primary"}>{item?.character}</Paragraph>

            <Paragraph type={"secondary"}>
              {item?.release_date?.split("-").at(0) ||
                item?.first_air_date?.split("-").at(0) ||
                item?.air_date?.split("-").at(0)}
            </Paragraph>
          </Flex>
        </div>
        <Paragraph type={"secondary"} className={"line-clamp-4"}>
          {item?.overview}
        </Paragraph>
      </div>
    </li>
  );
}

export default ListItem;
