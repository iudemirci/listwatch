import Imdb from "../ui/Imdb";
import Paragraph from "../ui/Paragraph";

function Highlight({ movie }) {
  console.log(movie);
  return (
    // <div className="flex flex-col gap-1 md:flex-row md:flex-wrap md:gap-1.5 lg:gap-y-0">
    <div className="flex flex-col justify-between md:flex-wrap md:gap-1.5 lg:gap-y-0">
      <div className="flex items-center gap-2">
        <Imdb id={movie?.imdb_id} />
        <Paragraph type={"secondary"}>
          {movie?.release_date?.split("-").at(0)}
        </Paragraph>
        <Paragraph type={"secondary"}>{movie?.runtime} mins</Paragraph>
      </div>
      <div className="flex items-center gap-2">
        <Paragraph type={"primary"}>Language:</Paragraph>
        <Paragraph type={"secondary"}>
          {movie?.original_language?.toUpperCase()}
        </Paragraph>
      </div>
    </div>
  );
}

export default Highlight;
