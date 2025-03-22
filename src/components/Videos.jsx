import LiteYouTubeEmbed from "react-lite-youtube-embed";

function Videos({ videoData }) {
  const movieTrailer = videoData?.results.find(
    (video) => video.type === "Trailer",
  );

  if (!movieTrailer) return null;

  return (
    <div className="flex flex-col gap-2">
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
