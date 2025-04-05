import Poster from "./Poster";
import Flex from "../ui/Flex";
import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import Title from "../ui/Title";
import Paragraph from "../ui/Paragraph";
import { getYear } from "../utilities/getYear";

function CreditsItem({ item, ...props }) {
  return (
    <li
      className="border-grey-primary/50 group flex cursor-pointer gap-2 border-b-1 px-2 py-1.5 duration-300"
      {...props}
    >
      <Poster
        path={item?.poster_path || item?.still_path}
        className="aspect-2/3 w-10"
      />
      <div className="flex flex-1 flex-col gap-0.5">
        <Flex className="justify-between pr-2">
          <Title
            level={4}
            className="group-hover:text-primary line-clamp-1 duration-300"
          >
            {item?.title || item?.name}
          </Title>
          <Paragraph type={"secondary"}>
            {getYear(item?.release_date) ||
              getYear(item?.first_air_date) ||
              getYear(item?.air_date) ||
              "UPCOMING"}
          </Paragraph>
        </Flex>

        {item?.job && <Paragraph type={"secondary"}>{item?.job}</Paragraph>}

        <div className="flex gap-2">
          {item?.vote_average ? (
            <Flex className={"items-center gap-0"}>
              <Icon path={mdiStar} size={0.5} className="text-primary" />
              <Paragraph type="secondary">
                {item?.vote_average.toFixed(1)}
              </Paragraph>
            </Flex>
          ) : null}
          <Paragraph type="secondary">
            {item?.media_type === "tv" && "TV Series"}
          </Paragraph>
        </div>

        {item?.character && (
          <Paragraph type={"secondary"}>{item?.character}</Paragraph>
        )}
      </div>
    </li>
  );
}

export default CreditsItem;
