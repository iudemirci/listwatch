import { Link } from "react-router-dom";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";

function CastOverview({ people }) {
  // console.log(people);

  const directors = people.crew.filter((person) => person.job === "Director");
  const writers = people.crew.filter((person) => person.job === "Writer");
  const stars = people.cast.slice(0, 3);

  return (
    <ul className="border-grey-primary divide-grey-primary flex flex-col divide-y border-y-1">
      <li className="flex items-center gap-2 overflow-hidden py-2 2xl:gap-4">
        <Title level={3}>Director</Title>
        {directors.map((director) => (
          <Paragraph key={director.name} type={"primary"}>
            <Link
              to={`/person/${director.id}`}
              className="hover:text-primary truncate duration-300"
            >
              {director.name}
            </Link>
          </Paragraph>
        ))}
      </li>
      <li className="flex items-center gap-2 overflow-hidden py-2 2xl:gap-4">
        <Title level={3}>Writers</Title>
        {writers.map((writer) => (
          <Paragraph key={writer.name} type={"primary"}>
            <Link
              to={`/person/${writer.id}`}
              className="hover:text-primary truncate duration-300"
            >
              {writer.name}
            </Link>
          </Paragraph>
        ))}
      </li>
      <li className="flex items-center gap-2 overflow-hidden py-2 2xl:gap-4">
        <Title level={3}>Stars</Title>
        {stars.map((star) => (
          <Paragraph key={star.name} type={"primary"}>
            <Link
              to={`/person/${star.id}`}
              className="hover:text-primary truncate duration-300"
            >
              {star.name}
            </Link>
          </Paragraph>
        ))}
      </li>
    </ul>
  );
}

export default CastOverview;
