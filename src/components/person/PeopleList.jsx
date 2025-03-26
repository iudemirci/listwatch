import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import "swiper/css";

import Paragraph from "../../ui/Paragraph";
import profile from "../../assets/profile.png";
import Title from "../../ui/Title";

import { cn } from "../../utilities/cn";
import CustomSwiper from "../../ui/CustomSwiper";
import Skeleton from "../../ui/Skeleton";

var settings = {
  perItem: 5,
  delay: 5000,
  space: 2,
  ItemToSlide: 3,
};

const skeleton = (
  <Skeleton className={"aspect-square rounded-full px-2 py-1"} />
);

function PeopleList({ people, isPending, title, className }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Title level={3}>{title}</Title>
      <ul className={cn("pt-2 2xl:pt-4", className)}>
        {!isPending && !people?.length && (
          <Paragraph type="primary">No cast information found</Paragraph>
        )}

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
                      className="hover:border-primary aspect-square size-full cursor-pointer overflow-hidden rounded-full border-2 border-transparent duration-300 hover:border-2"
                      onMouseEnter={() => setIsPopoverOpen(i)}
                      onMouseLeave={() => setIsPopoverOpen(null)}
                    >
                      <Link to={`/person/${person?.id}`}>
                        {!isLoaded && skeleton}
                        <img
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                              : profile
                          }
                          className={`bg-grey-secondary pointer-events-none object-contain ${isLoaded ? "opacity-100" : "opacity-0"} duration-300`}
                          onLoad={() => setIsLoaded(true)}
                        />
                      </Link>
                    </li>
                  </Popover>
                </SwiperSlide>
              ))}
          </CustomSwiper>
        </div>
      </ul>
    </>
  );
}

export default PeopleList;
