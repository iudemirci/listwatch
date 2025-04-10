import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import Flex from "../../ui/Flex";
import Title from "../../ui/Title";
import Poster from "../Poster";
import LinkToId from "../../ui/LinkToId";
import Paragraph from "../../ui/Paragraph";

function KnownForItem({ item }) {
  return (
    <LinkToId
      item={item}
      type={item?.type === "Tv Show" ? "tv" : "movie"}
      className="size-full"
    >
      <div className="border-grey-primary/50 group hover:bg-grey-secondary/30 flex cursor-pointer rounded-lg border-1 duration-300">
        <div className="aspect-2/3 max-w-15 min-w-15 flex-2 lg:max-w-18">
          <Poster path={item?.poster} />
        </div>
        <div className="group-hover:text-primary flex-1 px-3 py-2 duration-300">
          <Title level={6} className="line-clamp-1">
            {item?.title}
          </Title>
          <div className="flex items-center gap-2">
            {item?.rating ? (
              <Flex className="items-center gap-0.5">
                <Icon path={mdiStar} size={0.5} className="text-primary" />
                <Paragraph type="secondary">{item?.rating}</Paragraph>
              </Flex>
            ) : (
              <Icon path={mdiStar} size={0.5} className="text-grey-primary" />
            )}
            <Paragraph type="secondary" className="capitalize">
              {item?.type}
            </Paragraph>
          </div>
          {item?.credit && (
            <Paragraph type="secondary" className="line-clamp-1">
              {item?.credit}
            </Paragraph>
          )}
          <Paragraph type="secondary">{item?.year}</Paragraph>
        </div>
      </div>
    </LinkToId>
  );
}

export default KnownForItem;
