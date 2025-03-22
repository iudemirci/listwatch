import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import capitalize from "lodash/capitalize";

function Keywords({ keywords }) {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Keywords</Title>

      <ul className="flex flex-wrap gap-1">
        {!keywords.length ? (
          <Paragraph type="primary">No keywords found</Paragraph>
        ) : (
          keywords?.map((keyword, i) => (
            <li
              key={i}
              className="2xl: border-grey-primary hover:border-primary cursor-pointer rounded-2xl border-1 px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:py-1"
            >
              {capitalize(keyword?.name)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Keywords;
