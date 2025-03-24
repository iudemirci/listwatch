import { useFetchMovieItem } from "../hooks/moviedb/useFetchMovieItem";
import Paragraph from "../ui/Paragraph";
import Skeleton from "../ui/Skeleton";
import Title from "../ui/Title";
import capitalize from "lodash/capitalize";

function Keywords({ id }) {
  const { data: keywords, isPending } = useFetchMovieItem(
    `/movie/${id}/keywords`,
    `${id}_keywords`,
  );

  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Keywords</Title>

      <ul className="flex flex-wrap gap-1">
        {!isPending && !keywords.keywords.length && (
          <Paragraph type="primary">No keywords found</Paragraph>
        )}

        {isPending
          ? [...Array(10)].map((_, i) => (
              <Skeleton
                key={i}
                className={`h-5 rounded-2xl ${i % 2 === 1 ? "w-15" : "w-30"}`}
              />
            ))
          : keywords.keywords?.map((keyword, i) => (
              <li
                key={i}
                className="2xl: border-grey-primary hover:border-primary cursor-pointer rounded-2xl border-1 px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:py-1"
              >
                {capitalize(keyword?.name)}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Keywords;
