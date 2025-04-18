import { useState } from "react";
import { Popover } from "react-tiny-popover";
import Paragraph from "./Paragraph";
import profile from "../assets/profile.png";
import useWindowWidth from "../hooks/useWindowWidth";
import Title from "./Title";
import { cn } from "../hooks/cn";
import { Link } from "react-router-dom";

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
        {people.slice(0, numberPeople).map((person, i) => (
          <Popover
            key={person.id}
            isOpen={isPopoverOpen === i}
            content={
              <div className="border-grey-primary bg-background-default mx-1 rounded-xs border-1 p-1 text-center 2xl:p-2">
                <Paragraph>
                  <span>{person.name}</span>
                  <br />
                  <span className="text-zinc-500">
                    Popularity: {person.popularity}
                  </span>
                </Paragraph>
              </div>
            }
            positions={"bottom"}
            padding={4}
          >
            <li
              className="border-grey-secondary bg-grey-secondary aspect-square size-full cursor-pointer overflow-hidden rounded-full border-1"
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
        ))}
      </ul>
    </>
  );
}

export default PeopleList;
