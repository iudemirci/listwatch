import Paragraph from "../../ui/Paragraph";
import SetFavourite from "../SetFavourite";

import TrailerPopover from "../popover/TrailerPopover";
function SeriesHighlight({ series }) {
  return (
    <div className="flex flex-col flex-wrap justify-between md:flex-wrap md:gap-1.5 lg:gap-y-0">
      <div className="flex items-center gap-2 pb-2">
        <Paragraph type={"secondary"}>
          {series?.first_air_date?.split("-").at(0)}
        </Paragraph>
        <Paragraph type={"secondary"}>
          {series?.number_of_seasons} Season
          {series?.number_of_seasons > 1 ? "s" : ""}
        </Paragraph>
        <Paragraph type={"secondary"}>
          {series?.number_of_episodes} Episode
          {series?.number_of_episodes > 1 ? "s" : ""}
        </Paragraph>
        <Paragraph type={"secondary"}>
          {series?.original_language?.toUpperCase()}
        </Paragraph>
      </div>
      <div className="flex gap-2">
        <TrailerPopover
          id={series?.id}
          type={series?.release_date ? "movie" : "tv"}
        />
        <SetFavourite item={series || []} />
      </div>
    </div>
  );
}

export default SeriesHighlight;
