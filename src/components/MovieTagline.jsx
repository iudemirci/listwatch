import Paragraph from "./Paragraph";
import Title from "./Title";

function MovieTagline({ tagline }) {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Tagline</Title>
      <Paragraph type={"primary"}>{tagline}</Paragraph>
    </div>
  );
}

export default MovieTagline;
