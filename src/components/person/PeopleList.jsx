import { useState } from "react";
import { Popover } from "react-tiny-popover";

import Paragraph from "../../ui/Paragraph";
import profile from "../../assets/profile.png";
import useWindowWidth from "../../hooks/useWindowWidth";
import Title from "../../ui/Title";
import { cn } from "../../utilities/cn";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

function PeopleList({ people, title, className }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);
  const width = useWindowWidth();
  let numberPeople = 4;
  if (width >= 640) numberPeople = 7;
  if (width >= 1535) numberPeople = 15;

  return (
    <>
      <Title level={3}>{title}</Title>
      <ul className={cn("flex gap-1 pt-2 md:gap-2 2xl:pt-4", className)}>
        {!people.length && (
          <Paragraph type="primary">No cast information found</Paragraph>
        )}
        <Swiper
          spaceBetween={5}
          slidesPerView={4}
          freeMode={true}
          mousewheel={{ forceToAxis: true }}
          autoplay={{
            delay: 5000,
          }}
        >
          {people.slice(0, 20).map((person, i) => (
            <SwiperSlide key={person.id}>
              <Popover
                isOpen={isPopoverOpen === i}
                content={
                  <div className="border-primary bg-background-default mx-1 rounded-lg border-2 px-2 py-1 text-center">
                    <div className={"flex flex-col"}>
                      <Paragraph type="primary">{person.name}</Paragraph>
                      {person.character && (
                        <Paragraph type="secondary">
                          as {person.character}
                        </Paragraph>
                      )}
                    </div>
                  </div>
                }
                positions={"bottom"}
                padding={4}
              >
                <li
                  className="hover:outline-primary aspect-square size-full cursor-pointer overflow-hidden rounded-full outline-2 outline-transparent duration-300 hover:outline-2"
                  onMouseEnter={() => setIsPopoverOpen(i)}
                  onMouseLeave={() => setIsPopoverOpen(null)}
                >
                  <Link to={`/person/${person?.id}`}>
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                          : profile
                      }
                      className="pointer-events-none object-contain"
                    />
                  </Link>
                </li>
              </Popover>
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
    </>
  );
}

export default PeopleList;
