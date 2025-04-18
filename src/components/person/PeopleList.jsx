import { useState } from "react";
import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
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
const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

function PeopleList({
  people,
  isPending,
  className,
  perItem,
  maxItem,
  space = 2,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  var settings = {
    perItem: perItem,
    maxItem: maxItem,
    space: space,
    ItemToSlide: 3,
  };

  return (
    <ul className={cn("pt-2 2xl:pt-4", className)}>
      <CustomSwiper {...settings}>
        {isPending &&
          [...Array(8)].map((_, index) => (
            <SwiperSlide key={index}>{skeleton}</SwiperSlide>
          ))}
        {!isPending &&
          people?.slice(0, 20).map((person, idx) => (
            <SwiperSlide key={idx}>
              <li>
                <LinkToId type="person" item={person}>
                  <div className="bg-grey-secondary hover:border-primary flex aspect-square items-center justify-center overflow-hidden rounded-full border-2 border-transparent duration-300">
                    {person.profile_path ? (
                      <>
                        {!isLoaded && skeleton}
                        <img
                          src={`${BASE_URL}/w185${person.profile_path}`}
                          className={`bg-grey-secondary pointer-events-none object-contain ${isLoaded ? "opacity-100" : "opacity-0"} duration-300`}
                          onLoad={() => setIsLoaded(true)}
                        />
                      </>
                    ) : (
                      <Icon path={mdiAccount} size={1.8} />
                    )}
                  </div>
                  <div className="mt-1.5 items-center justify-center">
                    <div className="flex place-content-center gap-1">
                      <Paragraph type="tertiary">{idx + 1}</Paragraph>
                      <Paragraph type="secondary">
                        ({person?.popularity})
                      </Paragraph>
                    </div>
                    <Paragraph
                      type="primary"
                      className="overflow-hidden text-center text-ellipsis whitespace-nowrap duration-300"
                    >
                      {person?.name}
                    </Paragraph>
                  </div>
                </LinkToId>
              </li>
            </SwiperSlide>
          ))}
      </CustomSwiper>
    </ul>
  );
}

export default PeopleList;
