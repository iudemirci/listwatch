import LinkToId from "../../ui/LinkToId";
import Poster from "../Poster";
import Skeleton from "../../ui/Skeleton";
import { getYear } from "../../utilities/getYear";
import dayjs from "dayjs";
import Paragraph from "../../ui/Paragraph";
import Title from "../../ui/Title";

function DiscoverList({
  movies,
  isPending,
  isFetchingNextPage,
  selectedDisplay,
}) {
  const skeletonItems = [...Array(20)].map((_, index) => {
    if (selectedDisplay === 0) {
      return <Skeleton key={index} className={"aspect-2/3 rounded-lg"} />;
    } else {
      return <Skeleton key={index} className={"mt-1 h-18 rounded-lg pb-1"} />;
    }
  });
  return (
    <div className="lg:pb8 flex flex-col items-center gap-4 pb-6">
      <ul
        className={`w-[100%] ${selectedDisplay === 0 ? "grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-10" : "divide-grey-primary/50 flex flex-col divide-y-1 overflow-hidden rounded-lg"}`}
      >
        {isPending
          ? skeletonItems
          : movies.map((movie, i) => {
              if (selectedDisplay === 0) {
                return (
                  <li
                    key={i}
                    className="hover:outline-primary rounded-lg outline-2 outline-transparent duration-300 hover:outline-2"
                  >
                    <LinkToId
                      item={movie}
                      type={movie.release_date ? "movie" : "tv"}
                      className={"aspect-2/3"}
                    >
                      <Poster
                        path={movie?.poster_path}
                        className="aspect-2/3"
                        title={movie?.title || movie?.name}
                        year={getYear(
                          movie?.release_date || movie?.first_air_date,
                        )}
                      />
                    </LinkToId>
                  </li>
                );
              } else {
                return (
                  <li
                    key={movie?.id}
                    className="hover:bg-grey-secondary px-1 py-2 duration-100"
                  >
                    <LinkToId
                      item={movie}
                      type={
                        movie?.release_date || movie?.release_date === ""
                          ? "movie"
                          : "tv"
                      }
                    >
                      <div className="flex gap-2">
                        <div className="w-10">
                          <Poster path={movie?.poster_path} />
                        </div>
                        <div className="line-clamp-1 flex flex-col gap-0.5 2xl:pl-1">
                          <Title level={4}>{movie?.title || movie?.name}</Title>
                          <Paragraph type="secondary">
                            {dayjs(
                              movie?.release_date || movie?.first_air_date,
                            ).format("YYYY")}
                          </Paragraph>
                        </div>
                      </div>
                    </LinkToId>
                  </li>
                );
              }
            })}

        {isFetchingNextPage && skeletonItems}
      </ul>
    </div>
  );
}

export default DiscoverList;
