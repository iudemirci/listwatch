import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import GenreList from "./GenreList";

function TitleOverview({ movie }) {
  return (
    <div className={"flex flex-col gap-4"}>
      <Title level={2} className={"text-zinc-500"}>
        {movie?.title || movie?.name}
      </Title>

      <div className="flex flex-col gap-3">
        <GenreList genresArr={movie?.genres} />

        <div className="flex flex-col gap-2">
          <Paragraph type={"secondary"}>{movie?.overview}</Paragraph>
        </div>
      </div>
    </div>
  );
}

export default TitleOverview;
