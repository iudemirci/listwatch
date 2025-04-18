import Title from "./Title";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

function MovieVideos({ movie }) {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Videos</Title>
      <LiteYouTubeEmbed
        id="5xH0HfJHsaY"
        playlist={false}
        noCookie={true}
        title={movie?.title}
      />
    </div>
  );
}

export default MovieVideos;
