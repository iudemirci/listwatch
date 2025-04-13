import { memo, useEffect, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Title from "../../ui/Title";

function Videos({ movieTrailer }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`bg-grey-secondary shadow-grey-secondary aspect-video items-center justify-center overflow-hidden rounded-2xl shadow-2xl transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {movieTrailer?.length !== 0 ? (
        <LiteYouTubeEmbed
          rel="prefetch"
          id={movieTrailer.key}
          playlist={false}
          noCookie={true}
          title={`Trailer ${movieTrailer.name}`}
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <Title level={5} type="white">
            No trailer found
          </Title>
        </div>
      )}
    </div>
  );
}

export default memo(Videos);
