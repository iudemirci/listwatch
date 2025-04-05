import {
  mdiInformation,
  mdiListBox,
  mdiMovie,
  mdiNewspaper,
  mdiShare,
  mdiStar,
} from "@mdi/js";
import Paragraph from "../../ui/Paragraph";
import Icon from "@mdi/react";

function GuideTable() {
  const content = [
    {
      icon: <Icon path={mdiMovie} size={0.8} />,
      text: "Keep track by listing your favourite movies",
    },
    {
      icon: <Icon path={mdiStar} size={0.8} />,
      text: "Rate movies as you keep track and record",
    },
    {
      icon: <Icon path={mdiShare} size={0.8} />,
      text: "Share you watchlist with you friends",
    },
    {
      icon: <Icon path={mdiNewspaper} size={0.8} />,
      text: "Write reviews for the world if you need to",
    },
    {
      icon: <Icon path={mdiInformation} size={0.8} />,
      text: "Get quick and detailed information about any movie",
    },
    {
      icon: <Icon path={mdiListBox} size={0.8} />,
      text: "Interact with you friends and others with you lists",
    },
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-1.5 pt-2 md:grid-cols-3 2xl:gap-2 2xl:pt-4">
      {content.map((item, i) => {
        return (
          <div
            className="bg-grey-secondary/75 hover:bg-grey-secondary flex items-center gap-1 rounded-2xl p-2.5 duration-300 md:p-2 lg:gap-2 lg:p-2.5 2xl:p-4"
            key={i}
          >
            <Paragraph>
              <span className="text-primary">{item.icon}</span>
            </Paragraph>
            <Paragraph type={"primary"}>{item.text}</Paragraph>
          </div>
        );
      })}
    </div>
  );
}

export default GuideTable;
