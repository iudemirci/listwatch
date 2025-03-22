import Paragraph from "../../ui/Paragraph";

function MovieHighlight({ movie }) {
  return (
    <div className="flex flex-col justify-between md:flex-wrap md:gap-1.5 lg:gap-y-0">
      <div className="flex items-center gap-2">
        <Paragraph type={"secondary"}>
          {movie?.release_date?.split("-").at(0)}
        </Paragraph>
        <Paragraph type={"secondary"}>{movie?.runtime} mins</Paragraph>
        <Paragraph type={"secondary"}>
          {movie?.original_language?.toUpperCase()}
        </Paragraph>
      </div>
    </div>
  );
}

export default MovieHighlight;
