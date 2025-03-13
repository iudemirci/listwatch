import Paragraph from "./Paragraph";
import Title from "./Title";

function MovieLanguages({ movieLanguages }) {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Spoken Languages</Title>
      <ul className="flex gap-2">
        {movieLanguages?.map((language) => (
          <li key={language?.english_name}>
            <Paragraph type={"primary"}>{language?.english_name}</Paragraph>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieLanguages;
