import { useState } from "react";
import { mdiImageOff } from "@mdi/js";
import Icon from "@mdi/react";

import Skeleton from "../../ui/Skeleton";

const IMAGE_BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
function EpisodeStill({ src, alt }) {
  console.log(`${IMAGE_BASE_URL}/w500${src}`);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!src) {
    return (
      <div className="border-grey-secondary relative min-h-45 w-full rounded-lg border-2">
        <Icon
          path={mdiImageOff}
          size={2}
          className="text-grey-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    );
  }

  return (
    <>
      {!imgLoaded && <Skeleton className="size-full min-h-45" />}

      <img
        src={`${IMAGE_BASE_URL}/w500${src}`}
        alt={`${alt} still`}
        className={`size-full object-cover ${imgLoaded ? "opacity-100" : "opacity-0"} duration-100`}
        onLoad={() => setImgLoaded(true)}
      />
    </>
  );
}

export default EpisodeStill;
