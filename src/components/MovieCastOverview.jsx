import Paragraph from "./Paragraph";
import Title from "./Title";

function MovieCastOverview() {
  const writers = ["J.R.R. Tolkien", "Fran Walsh", "Philippa Boyens"];
  const stars = ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"];

  return (
    <ul className="border-grey-primary divide-grey-primary flex flex-col divide-y border-y-1">
      <li className="flex items-center gap-2 py-2 2xl:gap-4">
        <Title level={3}>Director</Title>
        <Paragraph type={"primary"}>Peter Jackson</Paragraph>
      </li>
      <li className="flex items-center gap-2 py-2 2xl:gap-4">
        <Title level={3}>Writers</Title>
        {writers.map((writer) => (
          <Paragraph key={writer} type={"primary"}>
            {writer}
          </Paragraph>
        ))}
      </li>
      <li className="flex items-center gap-2 py-2 2xl:gap-4">
        <Title level={3}>Stars</Title>
        {stars.map((star) => (
          <Paragraph key={star} type={"primary"}>
            {star}
          </Paragraph>
        ))}
      </li>
    </ul>
  );
}

export default MovieCastOverview;
