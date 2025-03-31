import { useState } from "react";
import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import { Popover } from "react-tiny-popover";
import { SwiperSlide } from "swiper/react";
import "swiper/css";

import Paragraph from "../../ui/Paragraph";
import CustomSwiper from "../../ui/CustomSwiper";
import Skeleton from "../../ui/Skeleton";
import LinkToId from "../../ui/LinkToId";

import { cn } from "../../utilities/cn";

const skeleton = (
  <Skeleton className={"aspect-square rounded-full px-2 py-1"} />
);

function PeopleList({
  people,
  isPending,
  className,
  perItem,
  maxItem,
  buttons = true,
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  var settings = {
    perItem: perItem,
    maxItem: maxItem,
    space: 2,
    ItemToSlide: 3,
    buttons: buttons,
  };

  return (
    <ul className={cn("pt-2 2xl:pt-4", className)}>
      <div>
        <CustomSwiper {...settings}>
          {isPending &&
            [...Array(8)].map((_, index) => (
              <SwiperSlide key={index}>{skeleton}</SwiperSlide>
            ))}
          {!isPending &&
            people?.slice(0, 20).map((person, i) => (
              <SwiperSlide key={person.id}>
                <Popover
                  isOpen={isPopoverOpen === i}
                  content={
                    <div className="border-primary bg-background-default mx-1 rounded-lg border-2 px-2 py-1 text-center">
                      <div className={"flex flex-col"}>
                        <Paragraph type="primary">{person.name}</Paragraph>
                        {person.character && (
                          <Paragraph type="secondary">
                            {person.character}
                          </Paragraph>
                        )}
                      </div>
                    </div>
                  }
                  positions={"bottom"}
                  padding={4}
                >
                  <li
                    className="hover:border-primary bg-grey-secondary flex aspect-square size-full cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-transparent duration-300 hover:border-2"
                    onMouseEnter={() => setIsPopoverOpen(i)}
                    onMouseLeave={() => setIsPopoverOpen(null)}
                  >
                    <LinkToId type="person" item={person}>
                      {!isLoaded && skeleton}
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                          className={`bg-grey-secondary pointer-events-none object-contain ${isLoaded ? "opacity-100" : "opacity-0"} duration-300`}
                          onLoad={() => setIsLoaded(true)}
                        />
                      ) : (
                        <Icon path={mdiAccount} size={1.8} />
                      )}
                    </LinkToId>
                  </li>
                </Popover>
              </SwiperSlide>
            ))}
        </CustomSwiper>
      </div>
    </ul>
  );
}

export default PeopleList;
