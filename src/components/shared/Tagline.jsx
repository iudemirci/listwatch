import Paragraph from "../../ui/Paragraph";
import Skeleton from "../../ui/Skeleton";
import Title from "../../ui/Title";

function Tagline({ tagline, isPending }) {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Tagline</Title>
      {isPending ? (
        <Skeleton className={"h-4 w-full"} />
      ) : (
        <Paragraph type={"primary"}>{tagline || "No tagline found"}</Paragraph>
      )}
    </div>
  );
}

export default Tagline;
