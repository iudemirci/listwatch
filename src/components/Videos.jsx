import LiteYouTubeEmbed from "react-lite-youtube-embed";

import Title from "../ui/Title";

function Videos({ videoData }) {
  const movieTrailer = videoData?.results.find(
    (video) => video.type === "Trailer",
  );

  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Videos</Title>
      <div className="overflow-hidden rounded-lg">
        <LiteYouTubeEmbed
          id={movieTrailer?.key}
          playlist={false}
          noCookie={true}
          title={`Trailer ${movieTrailer?.name}`}
        />
      </div>
    </div>
  );
}

export default Videos;
