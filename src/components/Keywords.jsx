import Title from "../ui/Title";
import _ from "lodash";

function Keywords({ keywords }) {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Keywords</Title>

      <ul className="flex flex-wrap gap-1">
        {keywords?.map((keyword, i) => (
          <li
            key={i}
            className="2xl: border-grey-primary hover:bg-primary cursor-pointer rounded-2xl border-1 px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:py-1"
          >
            {_.capitalize(keyword?.name)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Keywords;
