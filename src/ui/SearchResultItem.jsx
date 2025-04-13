import LinkToId from "./LinkToId";
import Poster from "../components/Poster";
import Title from "./Title";
import Paragraph from "./Paragraph";

import { getYear } from "../utilities/getYear";

function SearchResultItem({ result }) {
  const knownFor =
    result?.known_for?.slice(0, 2).map((item) => item?.title || item?.name) ||
    [];

  return (
    <li className="group/search bg-grey-tertiary hover:bg-grey-secondary cursor-pointer duration-300">
      <LinkToId
        className={"flex h-20 gap-2 px-2 py-1.5"}
        type={result?.media_type}
        item={result}
      >
        <div className="w-11 self-center rounded-lg">
          <Poster path={result?.poster_path || result?.profile_path} />
        </div>
        <div className="flex flex-1 flex-col">
          <Title
            level={4}
            className="group-hover/search:text-primary line-clamp-1 !text-base duration-300"
          >
            {result?.title || result?.name}
          </Title>
          <Paragraph type="tertiary">
            {getYear(result?.release_date || result?.first_air_date) ||
              result?.known_for_department}
          </Paragraph>
          {knownFor?.length > 0 && (
            <div className="flex flex-wrap">
              <Paragraph type="secondary" className={"pr-2.5 lg:text-xs"}>
                {knownFor.join(" / ")}
              </Paragraph>
            </div>
          )}
          <Paragraph type="secondary" className={"line-clamp-2 lg:text-xs"}>
            {result?.overview}
          </Paragraph>
        </div>
      </LinkToId>
    </li>
  );
}

export default SearchResultItem;
