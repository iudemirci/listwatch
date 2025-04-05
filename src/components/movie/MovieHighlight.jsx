import Paragraph from "../../ui/Paragraph";
import { getYear } from "../../utilities/getYear";
import TrailerPopover from "../popover/TrailerPopover";

function MovieHighlight({ movie }) {
  return (
    <>
      <div className="flex flex-col justify-between md:flex-wrap md:gap-1.5 lg:gap-y-0">
        <div className="flex items-center gap-2">
          {movie?.release_date ? (
            <Paragraph type="secondary">
              {getYear(movie?.release_date)}
            </Paragraph>
          ) : (
            <Paragraph type="secondary">UPCOMING</Paragraph>
          )}

          {movie?.runtime ? (
            <Paragraph type={"secondary"}>{movie?.runtime} mins</Paragraph>
          ) : null}
          <Paragraph type={"secondary"}>
            {movie?.original_language?.toUpperCase()}
          </Paragraph>
        </div>
      </div>
      <TrailerPopover />
    </>
  );
}

export default MovieHighlight;
