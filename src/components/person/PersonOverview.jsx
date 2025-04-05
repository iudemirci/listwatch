import Paragraph from "../../ui/Paragraph";
import Title from "../../ui/Title";

function PersonOverview({ person }) {
  return (
    <>
      <div className={"flex flex-col gap-2"}>
        <Title level={2}>{person?.name}</Title>
        <div className="flex flex-col gap-1">
          <Title level={5}>{person?.place_of_birth}</Title>
        </div>
      </div>
    </>
  );
}

export default PersonOverview;
