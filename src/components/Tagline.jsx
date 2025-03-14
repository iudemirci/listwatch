import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";

function Tagline({ tagline }) {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Tagline</Title>
      <Paragraph type={"primary"}>{tagline || "No tagline found"}</Paragraph>
    </div>
  );
}

export default Tagline;
