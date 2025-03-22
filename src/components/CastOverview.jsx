import { Link } from "react-router-dom";
import uniqBy from "lodash/uniqBy";

import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";

function CastOverview({ people }) {
  const directors = people?.crew
    .filter((person) => person.job === "Director")
    ?.slice(0, 3);
  let writers = people?.crew.filter(
    (person) => person?.job === "Writer" || person?.department === "Writing",
  );
  writers = uniqBy(writers, "id").slice(0, 3);
  const stars = people?.cast.slice(0, 3);

  const creditsArr = [
    { title: "Directors", content: directors },
    { title: "Writers", content: writers },
    { title: "Stars", content: stars },
  ];

  if (!creditsArr) return <Spin />;

  return (
    <ul className="border-grey-primary divide-grey-primary flex flex-col divide-y border-y-1">
      {creditsArr.map((credit) =>
        credit.content?.length ? (
          <li
            key={credit.title}
            className="divide-primary flex flex-wrap items-center gap-2 py-2 2xl:gap-4"
          >
            <Title level={3}>{credit.title}</Title>
            {credit.content.map((person) => (
              <Paragraph key={person.name} type={"primary"}>
                <Link
                  to={`/person/${person.id}`}
                  className="hover:text-primary flex items-center duration-300"
                >
                  {person.name}
                </Link>
              </Paragraph>
            ))}
          </li>
        ) : null,
      )}
    </ul>
  );
}

export default CastOverview;
