import LinkToId from "../../ui/LinkToId";
import DetailedInfoButton from "./DetailedInfoButton";
import crewCategories from "../../assets/crewCategories.json";
import Title from "../../ui/Title";

const formatCrew = (crewData) => {
  return crewData?.reduce((acc, person) => {
    const category = crewCategories.jobMappings[person.job];
    if (!category) return acc;
    if (!acc[category]) {
      acc[category] = new Set();
    }
    acc[category].add(JSON.stringify({ id: person.id, name: person.name }));

    return acc;
  }, {});
};

const getFormattedCrew = (crewData) => {
  const rawCrew = formatCrew(crewData);

  const formattedCrew = Object.entries(rawCrew).map(([category, members]) => ({
    category,
    members: [...members].map((member) => JSON.parse(member)), // Convert back to objects
  }));

  formattedCrew.sort((a, b) => {
    return (
      crewCategories.categoryOrder.indexOf(a.category) -
      crewCategories.categoryOrder.indexOf(b.category)
    );
  });

  return formattedCrew;
};

function CrewTab({ credits }) {
  const sortedData = getFormattedCrew(credits);

  return (
    <div className="flex flex-col gap-3.5 pt-2">
      {sortedData.map((data) => (
        <div key={data.category} className="flex flex-col gap-1">
          <Title level={5} type="white">
            {data.category}
          </Title>
          <div className="flex flex-wrap gap-x-1 gap-y-1.5">
            {data.members.map((member) => (
              <LinkToId key={member.id} type="person" item={member}>
                <DetailedInfoButton>{member.name}</DetailedInfoButton>
              </LinkToId>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CrewTab;
