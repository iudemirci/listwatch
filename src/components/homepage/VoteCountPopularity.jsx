import { mdiArrowTopRight, mdiThumbUpOutline } from "@mdi/js";
import Icon from "@mdi/react";

import Paragraph from "../../ui/Paragraph";

import formatToK from "../../utilities/formatToK";

function VoteCountPopularity({ vote, popularity }) {
  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-1">
        <Icon path={mdiThumbUpOutline} size={0.5} />
        <Paragraph type="tertiary">{vote || 1}</Paragraph>
      </div>
      <div className="flex items-center gap-1">
        <Icon path={mdiArrowTopRight} size={0.5} />
        <Paragraph type="tertiary">{formatToK(popularity) || 1}</Paragraph>
      </div>
    </div>
  );
}

export default VoteCountPopularity;
