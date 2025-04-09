import Title from "../../ui/Title";
import DetailedInfoButton from "./DetailedInfoButton";

import { getLanguageName } from "../../utilities/getIsoTo";

function DetailsTab({ item, titles }) {
  const tabs = item && {
    Studios: item?.production_companies?.map((company) => company.name) || [],
    Countries: item?.production_countries?.map((country) => country.name) || [],
    "Primary Language": [getLanguageName(item?.original_language)],
    "Spoken Languages":
      item?.spoken_languages?.map((lang) => lang?.english_name) || [],
    "Alternative Titles":
      titles?.titles?.map((t) => t.title) || titles?.map((t) => t.title),
  };

  return (
    <div className="flex flex-col gap-3.5 pt-2">
      {Object.keys(tabs).map((tab) => (
        <div key={tab} className="flex flex-col gap-1">
          <Title level={5} type="white">
            {tab}
          </Title>
          <div className="flex flex-wrap gap-x-1 gap-y-1.5">
            {tabs[tab].map((info, i) => {
              if (tab !== "Alternative Titles")
                return <DetailedInfoButton key={i}>{info}</DetailedInfoButton>;
              if (tab === "Alternative Titles") {
                return (
                  <span key={i} className="text-grey-primary-light text-xs">
                    {info}
                    {i < tabs["Alternative Titles"]?.length - 1 && ", "}
                  </span>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DetailsTab;
