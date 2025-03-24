import LinkToId from "../../ui/LinkToId";
import PaddingBottom from "../../ui/PaddingBottom";
import Poster from "../Poster";
import Skeleton from "../../ui/Skeleton";

function TopList({ movies, isPending }) {
  return (
    <PaddingBottom>
      <div className="flex flex-col items-center gap-4">
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
                  <LinkToId movieID={movie?.id}>
                    <Poster path={movie?.poster_path} />
                  </LinkToId>
                </li>
              ))}
        </ul>
      </div>
    </PaddingBottom>
  );
}

export default TopList;
