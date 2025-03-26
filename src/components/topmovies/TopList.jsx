import LinkToId from "../../ui/LinkToId";
import Poster from "../Poster";
import Skeleton from "../../ui/Skeleton";

function TopList({ movies, isPending }) {
  return (
    <div className="lg:pb8 flex flex-col items-center gap-4 pb-6">
      <ul className="grid w-[100%] grid-cols-4 gap-2 lg:grid-cols-5">
        {isPending
          ? [...Array(20)].map((_, index) => (
              <Skeleton key={index} className={"aspect-2/3 rounded-lg"} />
            ))
          : movies.map((movie, i) => (
              <li
                key={i}
                className="hover:outline-primary rounded-lg outline-2 outline-transparent duration-300 hover:outline-2"
              >
                <LinkToId movieID={movie?.id} className={"aspect-2/3"}>
                  <Poster path={movie?.poster_path} className="aspect-2/3" />
                </LinkToId>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default TopList;
