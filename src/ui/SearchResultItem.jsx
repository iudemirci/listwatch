import LinkToId from "./LinkToId";
import Poster from "../components/Poster";
import Title from "./Title";
import Paragraph from "./Paragraph";

import { getYear } from "../utilities/getYear";

function SearchResultItem({ result }) {
  return (
    <li className="group bg-grey-tertiary hover:bg-grey-secondary cursor-pointer duration-300">
      <LinkToId
        className={"flex h-20 gap-2 px-2 py-1.5"}
        type={(result?.media_type === "movie" && "films") || result?.media_type}
        movieID={result?.id}
      >
        <div className="w-11 self-center rounded-lg">
          <Poster path={result?.poster_path || result?.profile_path} />
        </div>
        <div className="flex flex-1 flex-col">
          <Title
            level={4}
            className="group-hover:text-primary line-clamp-1 !text-base duration-300"
          >
            {result?.title || result?.name}
          </Title>
          <Paragraph type="secondary">
            {getYear(result?.release_date || result?.first_air_date) ||
              result?.known_for_department}
          </Paragraph>
          {result?.known_for?.length > 0 && (
            <div className="flex flex-wrap">
              {result?.known_for?.slice(0, 2)?.map((item) => (
                <Paragraph key={item.id} type="secondary" className={"pr-2.5"}>
                  {item?.title || item?.name}
                </Paragraph>
              ))}
            </div>
          )}
          <Paragraph type="secondary" className={"line-clamp-2"}>
            {result?.overview}
          </Paragraph>
        </div>
      </LinkToId>
    </li>
  );
}

export default SearchResultItem;
