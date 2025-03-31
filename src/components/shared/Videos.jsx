import { memo, useEffect, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

function Videos({ movieTrailer }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Trigger animation on mount
  }, []);

  if (!movieTrailer) return null;

  return (
    <div
      className={`bg-grey-secondary aspect-video items-center justify-center overflow-hidden rounded-2xl transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <LiteYouTubeEmbed
        id={movieTrailer.key}
        playlist={false}
        noCookie={true}
        title={`Trailer ${movieTrailer.name}`}
      />
    </div>
  );
}

export default memo(Videos);
