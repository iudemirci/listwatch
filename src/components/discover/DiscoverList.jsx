import LinkToId from "../../ui/LinkToId";
import Poster from "../Poster";
import Skeleton from "../../ui/Skeleton";
import { getYear } from "../../utilities/getYear";

const skeletonItems = [...Array(20)].map((_, index) => (
  <Skeleton key={index} className={"aspect-2/3 rounded-lg"} />
));

function DiscoverList({ movies, isPending, isFetchingNextPage }) {
  return (
    <div className="lg:pb8 flex flex-col items-center gap-4 pb-6">
      <ul className="grid w-[100%] grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-10">
        {isPending
          ? skeletonItems
          : movies.map((movie, i) => {
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
            })}

        {isFetchingNextPage && skeletonItems}
      </ul>
    </div>
  );
}

export default DiscoverList;
