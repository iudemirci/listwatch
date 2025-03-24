import Imdb from "../../ui/Imdb";
import Paragraph from "../../ui/Paragraph";
import Title from "../../ui/Title";

function PersonOverview({ person }) {
  return (
    <>
      <div className={"flex flex-col gap-2"}>
        <Title level={2}>{person?.name}</Title>
        <div className="flex flex-col gap-1">
          <Title level={5}>{person?.place_of_birth}</Title>
          <div className="flex gap-2">
            <Title level={4} role={"h4"}>
              {person?.birthday}
            </Title>
            {person?.deathday && (
              <>
                <Title level={4} role={"h4"}>
                  /
                </Title>
                <Title level={4} role={"h4"}>
                  {person?.deathday}
                </Title>
              </>
            )}
          </div>
          <Title level={5} role={"h4"}>
            Known for {person?.known_for_department.toLowerCase()}
          </Title>
        </div>
      </div>
      {/* <Imdb id={person?.imdb_id} type={"person"} /> */}
    </>
  );
}

export default PersonOverview;
