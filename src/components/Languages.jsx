import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";

function Languages({ movieLanguages }) {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Spoken Languages</Title>
      <ul className="flex gap-2">
        {!movieLanguages.length && (
          <Paragraph type="primary">No language information found</Paragraph>
        )}
        {movieLanguages?.map((language) => (
          <li key={language?.english_name}>
            <Paragraph type={"primary"}>{language?.english_name}</Paragraph>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Languages;
