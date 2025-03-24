import Paragraph from "../ui/Paragraph";
import Skeleton from "../ui/Skeleton";
import Title from "../ui/Title";

function Languages({ movieLanguages, isPending }) {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Spoken Languages</Title>
      <ul className="flex gap-2">
        {!isPending && !movieLanguages?.length && (
          <Paragraph type="primary">No language information found</Paragraph>
        )}
        {isPending ? (
          <Skeleton className={"h-4 w-full"} />
        ) : (
          movieLanguages?.map((language) => (
            <li key={language?.english_name}>
              <Paragraph type={"primary"}>{language?.english_name}</Paragraph>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Languages;
